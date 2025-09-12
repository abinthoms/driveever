from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.db.models import Q
from datetime import datetime, timedelta
import calendar

from .models import User, InstructorProfile, InstructorAvailability, Booking, Payment
from .serializers import (
    BookingSerializer, 
    BookingCreateSerializer, 
    PaymentSerializer,
    AvailabilityCheckSerializer
)


class CheckAvailabilityView(APIView):
    """
    Check instructor availability for a specific date
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = AvailabilityCheckSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        instructor_id = serializer.validated_data['instructor_id']
        date = serializer.validated_data['date']
        
        try:
            instructor = User.objects.get(id=instructor_id, user_type='instructor')
            instructor_profile = InstructorProfile.objects.get(user=instructor, is_active=True)
        except (User.DoesNotExist, InstructorProfile.DoesNotExist):
            return Response(
                {"error": "Instructor not found or not active"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Get the day of week (0=Monday, 6=Sunday)
        day_of_week = date.weekday()
        
        # Get instructor's availability for this day
        availability_slots = InstructorAvailability.objects.filter(
            instructor_profile=instructor_profile,
            day_of_week=day_of_week,
            is_available=True
        ).order_by('start_time')
        
        if not availability_slots.exists():
            return Response({
                "instructor_id": instructor_id,
                "date": date,
                "available_slots": [],
                "message": "No availability for this date"
            })
        
        # Get existing bookings for this date
        existing_bookings = Booking.objects.filter(
            instructor=instructor,
            lesson_date=date,
            status__in=['pending', 'confirmed']
        )
        
        # Generate available time slots
        available_slots = []
        for slot in availability_slots:
            current_time = slot.start_time
            while current_time < slot.end_time:
                # Check if this time slot conflicts with existing bookings
                end_time = (datetime.combine(datetime.min, current_time) + 
                           timedelta(hours=1)).time()
                
                # Ensure we don't exceed the availability slot
                if end_time > slot.end_time:
                    end_time = slot.end_time
                
                # Check for conflicts
                conflict = existing_bookings.filter(
                    Q(start_time__lt=end_time) & Q(end_time__gt=current_time)
                ).exists()
                
                if not conflict:
                    available_slots.append({
                        "start_time": current_time.strftime("%H:%M"),
                        "end_time": end_time.strftime("%H:%M"),
                        "duration": "1 hour"
                    })
                
                # Move to next hour
                current_time = (datetime.combine(datetime.min, current_time) + 
                              timedelta(hours=1)).time()
        
        return Response({
            "instructor_id": instructor_id,
            "instructor_name": instructor.full_name,
            "date": date,
            "available_slots": available_slots,
            "total_slots": len(available_slots)
        })


class CreateBookingView(APIView):
    """
    Create a new booking
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        # Ensure user is a learner
        if request.user.user_type != 'learner':
            return Response(
                {"error": "Only learners can create bookings"}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = BookingCreateSerializer(
            data=request.data, 
            context={'request': request}
        )
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            booking = serializer.save()
            # Serialize the created booking for response
            response_serializer = BookingSerializer(booking)
            return Response(
                response_serializer.data, 
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, 
                status=status.HTTP_400_BAD_REQUEST
            )


class MyBookingsView(APIView):
    """
    Get user's bookings (both as learner and instructor)
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        
        # Get bookings where user is the learner
        learner_bookings = Booking.objects.filter(
            learner=user
        ).select_related('instructor', 'payment').order_by('-lesson_date', '-start_time')
        
        # Get bookings where user is the instructor
        instructor_bookings = []
        if user.user_type == 'instructor':
            instructor_bookings = Booking.objects.filter(
                instructor=user
            ).select_related('learner', 'payment').order_by('-lesson_date', '-start_time')
        
        # Serialize the data
        learner_data = BookingSerializer(learner_bookings, many=True).data
        instructor_data = BookingSerializer(instructor_bookings, many=True).data
        
        return Response({
            "learner_bookings": learner_data,
            "instructor_bookings": instructor_data,
            "total_bookings": len(learner_data) + len(instructor_data)
        })


class BookingDetailView(APIView):
    """
    Get, update, or delete a specific booking
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, booking_id):
        booking = get_object_or_404(Booking, id=booking_id)
        
        # Check if user has permission to view this booking
        if request.user not in [booking.learner, booking.instructor]:
            return Response(
                {"error": "You don't have permission to view this booking"}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = BookingSerializer(booking)
        return Response(serializer.data)
    
    def put(self, request, booking_id):
        booking = get_object_or_404(Booking, id=booking_id)
        
        # Check if user has permission to update this booking
        if request.user not in [booking.learner, booking.instructor]:
            return Response(
                {"error": "You don't have permission to update this booking"}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Only allow updates to certain fields
        allowed_fields = ['lesson_type', 'pickup_location', 'dropoff_location', 'notes']
        data = {k: v for k, v in request.data.items() if k in allowed_fields}
        
        serializer = BookingSerializer(booking, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CancelBookingView(APIView):
    """
    Cancel a booking
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request, booking_id):
        booking = get_object_or_404(Booking, id=booking_id)
        
        # Check if user has permission to cancel this booking
        if request.user not in [booking.learner, booking.instructor]:
            return Response(
                {"error": "You don't have permission to cancel this booking"}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Check if booking can be cancelled
        if booking.status not in ['pending', 'confirmed']:
            return Response(
                {"error": f"Booking with status '{booking.status}' cannot be cancelled"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if it's too close to the lesson time (e.g., within 24 hours)
        lesson_datetime = datetime.combine(booking.lesson_date, booking.start_time)
        if lesson_datetime - timezone.now() < timedelta(hours=24):
            return Response(
                {"error": "Bookings cannot be cancelled within 24 hours of the lesson"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Cancel the booking
        booking.status = 'cancelled'
        booking.cancelled_at = timezone.now()
        booking.save()
        
        # If there's a payment, mark it as refunded
        if booking.payment and booking.payment.status == 'completed':
            booking.payment.status = 'refunded'
            booking.payment.save()
        
        serializer = BookingSerializer(booking)
        return Response({
            "message": "Booking cancelled successfully",
            "booking": serializer.data
        })


class InstructorBookingsView(APIView):
    """
    Get all bookings for a specific instructor (for calendar view)
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, instructor_id):
        # Verify the instructor exists and is active
        try:
            instructor = User.objects.get(id=instructor_id, user_type='instructor')
            instructor_profile = InstructorProfile.objects.get(user=instructor, is_active=True)
        except (User.DoesNotExist, InstructorProfile.DoesNotExist):
            return Response(
                {"error": "Instructor not found or not active"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Get date range from query parameters
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        
        # Default to next 30 days if no dates specified
        if not start_date:
            start_date = timezone.now().date()
        else:
            start_date = datetime.strptime(start_date, '%Y-%m-%d').date()
        
        if not end_date:
            end_date = start_date + timedelta(days=30)
        else:
            end_date = datetime.strptime(end_date, '%Y-%m-%d').date()
        
        # Get bookings in the date range
        bookings = Booking.objects.filter(
            instructor=instructor,
            lesson_date__range=[start_date, end_date],
            status__in=['pending', 'confirmed']
        ).select_related('learner', 'payment').order_by('lesson_date', 'start_time')
        
        # Get instructor availability for the date range
        availability = InstructorAvailability.objects.filter(
            instructor_profile=instructor_profile
        ).order_by('day_of_week', 'start_time')
        
        # Format response for calendar
        calendar_data = []
        current_date = start_date
        
        while current_date <= end_date:
            day_of_week = current_date.weekday()
            day_availability = availability.filter(day_of_week=day_of_week)
            
            day_bookings = bookings.filter(lesson_date=current_date)
            
            calendar_data.append({
                "date": current_date.strftime('%Y-%m-%d'),
                "day_name": calendar.day_name[day_of_week],
                "availability": [
                    {
                        "start_time": slot.start_time.strftime('%H:%M'),
                        "end_time": slot.end_time.strftime('%H:%M'),
                        "is_available": slot.is_available
                    } for slot in day_availability
                ],
                "bookings": [
                    {
                        "id": booking.id,
                        "start_time": booking.start_time.strftime('%H:%M'),
                        "end_time": booking.end_time.strftime('%H:%M'),
                        "learner_name": booking.learner.full_name,
                        "status": booking.status,
                        "lesson_type": booking.lesson_type
                    } for booking in day_bookings
                ]
            })
            
            current_date += timedelta(days=1)
        
        return Response({
            "instructor_id": instructor_id,
            "instructor_name": instructor.full_name,
            "start_date": start_date.strftime('%Y-%m-%d'),
            "end_date": end_date.strftime('%Y-%m-%d'),
            "calendar_data": calendar_data
        })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def confirm_booking(request, booking_id):
    """
    Confirm a pending booking (instructor action)
    """
    booking = get_object_or_404(Booking, id=booking_id)
    
    # Check if user is the instructor for this booking
    if request.user != booking.instructor:
        return Response(
            {"error": "Only the instructor can confirm this booking"}, 
            status=status.HTTP_403_FORBIDDEN
        )
    
    # Check if booking is in pending status
    if booking.status != 'pending':
        return Response(
            {"error": f"Only pending bookings can be confirmed. Current status: {booking.status}"}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Confirm the booking
    booking.status = 'confirmed'
    booking.save()
    
    serializer = BookingSerializer(booking)
    return Response({
        "message": "Booking confirmed successfully",
        "booking": serializer.data
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def complete_booking(request, booking_id):
    """
    Mark a booking as completed (instructor action)
    """
    booking = get_object_or_404(Booking, id=booking_id)
    
    # Check if user is the instructor for this booking
    if request.user != booking.instructor:
        return Response(
            {"error": "Only the instructor can mark this booking as completed"}, 
            status=status.HTTP_403_FORBIDDEN
        )
    
    # Check if booking is confirmed
    if booking.status != 'confirmed':
        return Response(
            {"error": f"Only confirmed bookings can be marked as completed. Current status: {booking.status}"}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Mark as completed
    booking.status = 'completed'
    booking.save()
    
    serializer = BookingSerializer(booking)
    return Response({
        "message": "Booking marked as completed",
        "booking": serializer.data
    })


