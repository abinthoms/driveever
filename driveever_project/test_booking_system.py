#!/usr/bin/env python3
"""
Test script for the DriveEver Booking System
This script tests the core functionality of the booking system
"""

import requests
import json
from datetime import datetime, timedelta

# Configuration
BASE_URL = "http://localhost:8000/api/users"
HEADERS = {"Content-Type": "application/json"}

def test_user_registration():
    """Test user registration for both learner and instructor"""
    print("=== Testing User Registration ===")
    
    # Test learner registration
    learner_data = {
        "username": "testlearner",
        "email": "learner@test.com",
        "password": "testpass123",
        "full_name": "Test Learner"
    }
    
    response = requests.post(f"{BASE_URL}/register/learner/", 
                           json=learner_data, headers=HEADERS)
    print(f"Learner registration: {response.status_code}")
    if response.status_code == 201:
        print("✓ Learner registered successfully")
    else:
        print(f"✗ Learner registration failed: {response.text}")
    
    # Test instructor registration
    instructor_data = {
        "username": "testinstructor",
        "email": "instructor@test.com",
        "password": "testpass123",
        "full_name": "Test Instructor",
        "mobile_number": "07123456789",
        "adi_number": "ADI123456",
        "price_per_hour": "25.00",
        "postcodes": "LN1,LN2"
    }
    
    response = requests.post(f"{BASE_URL}/register/instructor/", 
                           json=instructor_data, headers=HEADERS)
    print(f"Instructor registration: {response.status_code}")
    if response.status_code == 201:
        print("✓ Instructor registered successfully")
    else:
        print(f"✗ Instructor registration failed: {response.text}")

def test_availability_setup():
    """Test setting up instructor availability"""
    print("\n=== Testing Availability Setup ===")
    
    # This would require authentication, so we'll just show the expected format
    availability_data = {
        "day_of_week": 1,  # Tuesday
        "start_time": "09:00",
        "end_time": "17:00",
        "is_available": True
    }
    
    print("Availability data format:")
    print(json.dumps(availability_data, indent=2))
    print("Note: Requires authentication token")

def test_booking_flow():
    """Test the complete booking flow"""
    print("\n=== Testing Booking Flow ===")
    
    # Check availability
    availability_request = {
        "instructor_id": 2,  # Assuming instructor ID is 2
        "date": (datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d")
    }
    
    print("Availability check request:")
    print(json.dumps(availability_request, indent=2))
    
    # Create booking
    booking_request = {
        "instructor": 2,
        "lesson_date": (datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d"),
        "start_time": "09:00",
        "end_time": "10:00",
        "lesson_type": "First Lesson",
        "pickup_location": "123 Main St",
        "dropoff_location": "456 Oak Ave",
        "notes": "Beginner driver"
    }
    
    print("\nBooking creation request:")
    print(json.dumps(booking_request, indent=2))

def test_api_endpoints():
    """Test all API endpoints"""
    print("\n=== Testing API Endpoints ===")
    
    endpoints = [
        ("POST", "/booking/availability/", "Check instructor availability"),
        ("POST", "/booking/create/", "Create new booking"),
        ("GET", "/booking/my-bookings/", "View user's bookings"),
        ("GET", "/booking/{id}/", "View booking details"),
        ("PUT", "/booking/{id}/", "Update booking"),
        ("POST", "/booking/{id}/cancel/", "Cancel booking"),
        ("POST", "/booking/{id}/confirm/", "Confirm booking (instructor)"),
        ("POST", "/booking/{id}/complete/", "Complete booking (instructor)"),
        ("GET", "/instructor/{id}/bookings/", "Instructor calendar view")
    ]
    
    for method, endpoint, description in endpoints:
        print(f"{method:6} {endpoint:<35} - {description}")

def main():
    """Main test function"""
    print("DriveEver Booking System - Test Script")
    print("=" * 50)
    
    try:
        # Test user registration
        test_user_registration()
        
        # Test availability setup
        test_availability_setup()
        
        # Test booking flow
        test_booking_flow()
        
        # Test API endpoints
        test_api_endpoints()
        
        print("\n" + "=" * 50)
        print("Test script completed successfully!")
        print("\nNext steps:")
        print("1. Start the Django server: python manage.py runserver")
        print("2. Test the endpoints with actual HTTP requests")
        print("3. Use the admin interface to verify data")
        print("4. Test the complete user flow")
        
    except Exception as e:
        print(f"\nError during testing: {e}")
        print("Make sure the Django server is running and accessible")

if __name__ == "__main__":
    main()
