from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from .serializers import (
    UserSerializer, InstructorProfileSerializer, InstructorAvailabilitySerializer,
    LearnerRegistrationSerializer, InstructorRegistrationSerializer, AcademyRegistrationSerializer
)
from .models import InstructorProfile, InstructorAvailability, User, AcademyProfile
from .postcode_service import postcode_service

# Create your views here.

class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LearnerRegistrationView(APIView):
    """
    Simple registration for learners - minimal friction
    """
    def post(self, request):
        serializer = LearnerRegistrationSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'message': 'Learner account created successfully!',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'full_name': user.full_name,
                    'user_type': user.user_type
                }
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class InstructorRegistrationView(APIView):
    """
    Registration for individual instructors with verification fields
    """
    def post(self, request):
        serializer = InstructorRegistrationSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'message': 'Instructor account created successfully! Please wait for ADI verification.',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'full_name': user.full_name,
                    'user_type': user.user_type
                },
                'profile': {
                    'mobile_number': user.instructor_profile.mobile_number,
                    'adi_number': user.instructor_profile.adi_number,
                    'postcodes': user.instructor_profile.postcodes,
                    'price_per_hour': user.instructor_profile.price_per_hour,
                    'is_verified': user.instructor_profile.is_verified
                }
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AcademyRegistrationView(APIView):
    """
    Registration for driving academies
    """
    def post(self, request):
        serializer = AcademyRegistrationSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'message': 'Academy account created successfully!',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'full_name': user.full_name,
                    'user_type': user.user_type
                },
                'profile': {
                    'academy_name': user.academy_profile.academy_name,
                    'owner_name': user.academy_profile.owner_name,
                    'business_email': user.academy_profile.business_email,
                    'main_postcode': user.academy_profile.main_postcode
                }
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserSearchView(APIView):
    """
    Search for instructors and academies by postcode and other criteria
    """
    def get(self, request):
        # Get search parameters
        postcode = request.query_params.get('postcode', '').strip().upper()
        user_type = request.query_params.get('user_type', '').strip().lower()
        price_min = request.query_params.get('price_min', '')
        price_max = request.query_params.get('price_max', '')
        verified_only = request.query_params.get('verified_only', 'false').lower() == 'true'
        
        if not postcode:
            return Response(
                {'error': 'Postcode parameter is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Validate postcode using Postcodes.io API
        postcode_validation = postcode_service.validate_postcode(postcode)
        if not postcode_validation['valid']:
            return Response(
                {'error': f'Invalid postcode: {postcode}. Please enter a valid UK postcode.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get enhanced postcode information
        postcode_info = postcode_service.get_postcode_info(postcode)
        if postcode_info['status'] != 'success':
            return Response(
                {'error': 'Unable to get postcode information'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        results = {
            'instructors': [],
            'academies': [],
            'search_criteria': {
                'postcode': postcode,
                'user_type': user_type,
                'price_min': price_min,
                'price_max': price_max,
                'verified_only': verified_only
            },
            'postcode_info': postcode_info['data'],
            'search_metadata': {
                'postcode_validated': True,
                'coordinates': {
                    'latitude': postcode_info['data'].get('latitude'),
                    'longitude': postcode_info['data'].get('longitude')
                },
                'region': postcode_info['data'].get('region'),
                'admin_district': postcode_info['data'].get('admin_district')
            }
        }
        
        try:
            # Search for instructors
            if not user_type or user_type == 'instructor':
                instructor_query = Q(is_active=True)
                
                # Postcode search (check if postcode outcode is in the instructor's covered areas)
                # Extract the outcode (first part) of the postcode (e.g., "LN5" from "LN5 8NY")
                postcode_outcode = postcode.split()[0] if ' ' in postcode else postcode[:4]
                instructor_query &= Q(postcodes__icontains=postcode_outcode)
                
                # Price filtering
                if price_min:
                    try:
                        price_min_decimal = float(price_min)
                        instructor_query &= Q(price_per_hour__gte=price_min_decimal)
                    except ValueError:
                        pass
                
                if price_max:
                    try:
                        price_max_decimal = float(price_max)
                        instructor_query &= Q(price_per_hour__lte=price_max_decimal)
                    except ValueError:
                        pass
                
                # Verification filtering
                if verified_only:
                    instructor_query &= Q(is_verified=True)
                
                instructors = InstructorProfile.objects.filter(instructor_query).select_related('user')
                
                # If no exact matches found, search for instructors in the same region
                if not instructors.exists():
                    # Get the region from postcode info
                    region = postcode_info['data'].get('region', '')
                    admin_district = postcode_info['data'].get('admin_district', '')
                    
                    # Search for instructors in the same region or admin district
                    nearby_query = Q(is_active=True)
                    if region:
                        # Look for instructors whose postcodes might be in the same region
                        # This is a simplified approach - in production you'd want more sophisticated geolocation
                        nearby_query &= (
                            Q(postcodes__icontains=region) |
                            Q(postcodes__icontains=admin_district)
                        )
                    
                    nearby_instructors = InstructorProfile.objects.filter(nearby_query).select_related('user')
                    
                    # Add a flag to indicate these are nearby, not exact matches
                    for instructor in nearby_instructors:
                        availability = InstructorAvailability.objects.filter(
                            instructor_profile=instructor,
                            is_available=True
                        ).order_by('day_of_week', 'start_time')
                        
                        availability_summary = []
                        for slot in availability:
                            availability_summary.append({
                                'day': slot.get_day_of_week_display(),
                                'time': f"{slot.start_time} - {slot.end_time}"
                            })
                        
                        results['instructors'].append({
                            'id': instructor.id,
                            'user_id': instructor.user.id,
                            'full_name': instructor.user.full_name or instructor.user.username,
                            'email': instructor.user.email,
                            'mobile_number': instructor.mobile_number,
                            'adi_number': instructor.adi_number,
                            'car_model': instructor.car_model,
                            'price_per_hour': str(instructor.price_per_hour),
                            'postcodes': instructor.postcodes,
                            'is_verified': instructor.is_verified,
                            'availability': availability_summary,
                            'availability_count': len(availability_summary),
                            'is_nearby': True,
                            'distance_note': f"Located in {region} region"
                        })
                else:
                    # Process exact matches
                    for instructor in instructors:
                        # Get availability for this instructor
                        availability = InstructorAvailability.objects.filter(
                            instructor_profile=instructor,
                            is_available=True
                        ).order_by('day_of_week', 'start_time')
                        
                        # Format availability for display
                        availability_summary = []
                        for slot in availability:
                            availability_summary.append({
                                'day': slot.get_day_of_week_display(),
                                'time': f"{slot.start_time} - {slot.end_time}"
                            })
                        
                        results['instructors'].append({
                            'id': instructor.id,
                            'user_id': instructor.user.id,
                            'full_name': instructor.user.full_name or instructor.user.username,
                            'email': instructor.user.email,
                            'mobile_number': instructor.mobile_number,
                            'adi_number': instructor.adi_number,
                            'car_model': instructor.car_model,
                            'price_per_hour': str(instructor.price_per_hour),
                            'postcodes': instructor.postcodes,
                            'is_verified': instructor.is_verified,
                            'availability': availability_summary,
                            'availability_count': len(availability_summary),
                            'is_nearby': False
                        })
            
            # Search for academies
            if not user_type or user_type == 'academy':
                academy_query = Q(is_active=True)
                
                # Postcode search (check if postcode matches academy's main postcode or is in address)
                academy_query &= (
                    Q(main_postcode__icontains=postcode) | 
                    Q(address__icontains=postcode)
                )
                
                academies = AcademyProfile.objects.filter(academy_query).select_related('user')
                
                for academy in academies:
                    results['academies'].append({
                        'id': academy.id,
                        'user_id': academy.user.id,
                        'academy_name': academy.academy_name,
                        'owner_name': academy.owner_name,
                        'business_email': academy.business_email,
                        'phone': academy.phone,
                        'address': academy.address,
                        'main_postcode': academy.main_postcode,
                        'description': academy.description
                    })
            
            # Sort results by relevance (verified instructors first, then by price)
            if results['instructors']:
                results['instructors'].sort(key=lambda x: (not x['is_verified'], float(x['price_per_hour'])))
            
            # Add summary statistics
            results['summary'] = {
                'total_instructors': len(results['instructors']),
                'total_academies': len(results['academies']),
                'verified_instructors': len([i for i in results['instructors'] if i['is_verified']]),
                'price_range': {
                    'min': min([float(i['price_per_hour']) for i in results['instructors']]) if results['instructors'] else None,
                    'max': max([float(i['price_per_hour']) for i in results['instructors']]) if results['instructors'] else None
                }
            }
            
            return Response(results, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response(
                {'error': f'Search failed: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class InstructorProfileView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            # Get the instructor profile for the currently logged-in user
            instructor_profile = InstructorProfile.objects.get(user=request.user)
            serializer = InstructorProfileSerializer(instructor_profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except InstructorProfile.DoesNotExist:
            return Response(
                {'error': 'Instructor profile not found for this user'}, 
                status=status.HTTP_404_NOT_FOUND
            )


class InstructorAvailabilityView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """
        Retrieve all availability slots for the currently logged-in instructor
        """
        try:
            # Get the instructor profile for the currently logged-in user
            instructor_profile = InstructorProfile.objects.get(user=request.user)
            
            # Get all availability slots for this instructor
            availability_slots = InstructorAvailability.objects.filter(
                instructor_profile=instructor_profile
            ).order_by('day_of_week', 'start_time')
            
            serializer = InstructorAvailabilitySerializer(availability_slots, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except InstructorProfile.DoesNotExist:
            return Response(
                {'error': 'Instructor profile not found for this user'}, 
                status=status.HTTP_404_NOT_FOUND
            )
    
    def post(self, request):
        """
        Replace all availability slots for the currently logged-in instructor
        """
        try:
            # Get the instructor profile for the currently logged-in user
            instructor_profile = InstructorProfile.objects.get(user=request.user)
            
            # Get the list of availability slots from request data
            availability_data = request.data.get('availability_slots', [])
            
            if not isinstance(availability_data, list):
                return Response(
                    {'error': 'availability_slots must be a list'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Delete existing availability slots for this instructor
            InstructorAvailability.objects.filter(instructor_profile=instructor_profile).delete()
            
            # Create new availability slots
            created_slots = []
            for slot_data in availability_data:
                slot_data['instructor_profile'] = instructor_profile.id
                serializer = InstructorAvailabilitySerializer(data=slot_data)
                
                if serializer.is_valid():
                    slot = serializer.save()
                    created_slots.append(serializer.data)
                else:
                    # If any slot is invalid, rollback by deleting created slots
                    InstructorAvailability.objects.filter(instructor_profile=instructor_profile).delete()
                    return Response(
                        {'error': f'Invalid slot data: {serializer.errors}'}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )
            
            return Response({
                'message': f'Successfully updated availability. Created {len(created_slots)} slots.',
                'availability_slots': created_slots
            }, status=status.HTTP_200_OK)
            
        except InstructorProfile.DoesNotExist:
            return Response(
                {'error': 'Instructor profile not found for this user'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': f'An error occurred: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class InstructorListView(APIView):
    """
    Simple view to list all instructors for testing purposes
    """
    def get(self, request):
        try:
            instructors = InstructorProfile.objects.filter(
                is_active=True
            ).select_related('user')
            
            instructor_list = []
            for instructor in instructors:
                instructor_list.append({
                    'id': instructor.id,
                    'user_id': instructor.user.id,
                    'username': instructor.user.username,
                    'full_name': instructor.user.full_name,
                    'email': instructor.user.email,
                    'mobile_number': instructor.mobile_number,
                    'adi_number': instructor.adi_number,
                    'postcodes': instructor.postcodes,
                    'price_per_hour': str(instructor.price_per_hour),
                    'is_verified': instructor.is_verified,
                    'experience_years': instructor.experience_years,
                    'specialties': instructor.specialties,
                    'bio': instructor.bio
                })
            
            return Response({
                'instructors': instructor_list,
                'total_count': len(instructor_list)
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response(
                {'error': f'Error fetching instructors: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
