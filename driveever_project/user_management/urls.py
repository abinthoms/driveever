from django.urls import path
from .views import (
    UserRegistrationView, InstructorProfileView, InstructorAvailabilityView,
    LearnerRegistrationView, InstructorRegistrationView, AcademyRegistrationView,
    UserSearchView, InstructorListView
)
from .postcode_views import (
    PostcodeValidationView, PostcodeLookupView, PostcodeAutocompleteView,
    NearestPostcodesView, DistanceCalculationView, BulkPostcodeLookupView,
    PostcodeSearchView
)
from .booking_views import (
    CheckAvailabilityView, CreateBookingView, MyBookingsView, BookingDetailView,
    CancelBookingView, InstructorBookingsView, confirm_booking, complete_booking
)
from .auth_views import login_view, register_and_login_view
from .vehicle_views import VehicleCheckView, VehicleCheckHealthView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('register/learner/', LearnerRegistrationView.as_view(), name='learner-register'),
    path('register/instructor/', InstructorRegistrationView.as_view(), name='instructor-register'),
    path('register/academy/', AcademyRegistrationView.as_view(), name='academy-register'),
    path('search/', UserSearchView.as_view(), name='user-search'),
    path('instructors/', InstructorListView.as_view(), name='instructors-list'),  # Use new view
    path('profile/', InstructorProfileView.as_view(), name='instructor-profile'),
    path('availability/', InstructorAvailabilityView.as_view(), name='instructor-availability'),
    
    # Postcode API endpoints
    path('postcode/validate/', PostcodeValidationView.as_view(), name='postcode-validate'),
    path('postcode/lookup/', PostcodeLookupView.as_view(), name='postcode-lookup'),
    path('postcode/autocomplete/', PostcodeAutocompleteView.as_view(), name='postcode-autocomplete'),
    path('postcode/nearest/', NearestPostcodesView.as_view(), name='postcode-nearest'),
    path('postcode/distance/', DistanceCalculationView.as_view(), name='postcode-distance'),
    path('postcode/bulk/', BulkPostcodeLookupView.as_view(), name='postcode-bulk'),
    path('postcode/search/', PostcodeSearchView.as_view(), name='postcode-search'),
    
    # Authentication endpoints
    path('login/', login_view, name='login'),
    path('register-login/', register_and_login_view, name='register-login'),
    
    # Booking API endpoints
    path('booking/availability/', CheckAvailabilityView.as_view(), name='check-availability'),
    path('booking/create/', CreateBookingView.as_view(), name='create-booking'),
    path('booking/my-bookings/', MyBookingsView.as_view(), name='my-bookings'),
    path('booking/<int:booking_id>/', BookingDetailView.as_view(), name='booking-detail'),
    path('booking/<int:booking_id>/cancel/', CancelBookingView.as_view(), name='cancel-booking'),
    path('booking/<int:booking_id>/confirm/', confirm_booking, name='confirm-booking'),
    path('booking/<int:booking_id>/complete/', complete_booking, name='complete-booking'),
    path('instructor/<int:instructor_id>/bookings/', InstructorBookingsView.as_view(), name='instructor-bookings'),
    
    # Vehicle Check API endpoints
    path('vehicle/check/', VehicleCheckView.as_view(), name='vehicle-check'),
    path('vehicle/health/', VehicleCheckHealthView.as_view(), name='vehicle-health'),
]
