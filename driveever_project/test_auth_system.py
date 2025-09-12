#!/usr/bin/env python3
"""
Comprehensive test script for the DriveEver booking system
Tests authentication, availability checking, and booking creation
"""

import requests
import json
from datetime import datetime, timedelta

# Configuration
BASE_URL = "http://localhost:8000/api/users"
HEADERS = {"Content-Type": "application/json"}

def test_login():
    """Test login to get authentication token"""
    print("=== Testing Login System ===")
    
    # Test login with testlearner
    login_data = {
        "username": "testlearner",
        "password": "testpass123"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/login/", json=login_data, headers=HEADERS)
        print(f"Login response status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            token = data.get('token')
            user = data.get('user')
            print(f"✅ Login successful!")
            print(f"   Token: {token[:20]}...")
            print(f"   User: {user['username']} ({user['user_type']})")
            return token
        else:
            print(f"❌ Login failed: {response.text}")
            return None
            
    except Exception as e:
        print(f"❌ Login error: {e}")
        return None

def test_availability_check(token):
    """Test availability checking with authentication"""
    print("\n=== Testing Availability Check ===")
    
    if not token:
        print("❌ No token available for testing")
        return
    
    availability_data = {
        "instructor_id": 49,  # Our test instructor
        "date": (datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d")
    }
    
    auth_headers = {**HEADERS, "Authorization": f"Token {token}"}
    
    try:
        response = requests.post(
            f"{BASE_URL}/booking/availability/", 
            json=availability_data, 
            headers=auth_headers
        )
        
        print(f"Availability check status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Availability check successful!")
            print(f"   Instructor: {data.get('instructor_name')}")
            print(f"   Date: {data.get('date')}")
            print(f"   Available slots: {data.get('total_slots')}")
            
            # Show first few slots
            slots = data.get('available_slots', [])
            for i, slot in enumerate(slots[:3]):
                print(f"   Slot {i+1}: {slot['start_time']} - {slot['end_time']}")
            
            return True
        else:
            print(f"❌ Availability check failed: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Availability check error: {e}")
        return False

def test_booking_creation(token):
    """Test creating a new booking"""
    print("\n=== Testing Booking Creation ===")
    
    if not token:
        print("❌ No token available for testing")
        return
    
    # Create a booking for next week
    booking_data = {
        "instructor": 49,  # Our test instructor
        "lesson_date": (datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d"),
        "start_time": "09:00",
        "end_time": "10:00",
        "lesson_type": "First Lesson",
        "pickup_location": "123 Main St, Lincoln",
        "dropoff_location": "456 Oak Ave, Lincoln",
        "notes": "Beginner driver - first lesson"
    }
    
    auth_headers = {**HEADERS, "Authorization": f"Token {token}"}
    
    try:
        response = requests.post(
            f"{BASE_URL}/booking/create/", 
            json=booking_data, 
            headers=auth_headers
        )
        
        print(f"Booking creation status: {response.status_code}")
        
        if response.status_code == 201:
            data = response.json()
            print(f"✅ Booking created successfully!")
            print(f"   Booking ID: {data.get('id')}")
            print(f"   Status: {data.get('status')}")
            print(f"   Total Price: £{data.get('total_price')}")
            print(f"   Lesson Type: {data.get('lesson_type')}")
            return data.get('id')
        else:
            print(f"❌ Booking creation failed: {response.text}")
            return None
            
    except Exception as e:
        print(f"❌ Booking creation error: {e}")
        return None

def test_my_bookings(token):
    """Test viewing user's bookings"""
    print("\n=== Testing My Bookings View ===")
    
    if not token:
        print("❌ No token available for testing")
        return
    
    auth_headers = {**HEADERS, "Authorization": f"Token {token}"}
    
    try:
        response = requests.get(f"{BASE_URL}/booking/my-bookings/", headers=auth_headers)
        
        print(f"My bookings status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ My bookings retrieved successfully!")
            print(f"   Total bookings: {data.get('total_bookings')}")
            print(f"   Learner bookings: {len(data.get('learner_bookings', []))}")
            print(f"   Instructor bookings: {len(data.get('instructor_bookings', []))}")
            
            # Show first booking if any
            learner_bookings = data.get('learner_bookings', [])
            if learner_bookings:
                first_booking = learner_bookings[0]
                print(f"   First booking: {first_booking.get('lesson_type')} on {first_booking.get('lesson_date')}")
            
            return True
        else:
            print(f"❌ My bookings failed: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ My bookings error: {e}")
        return False

def main():
    """Main test function"""
    print("🚀 DriveEver Booking System - Comprehensive Test")
    print("=" * 60)
    
    try:
        # Step 1: Test authentication
        token = test_login()
        
        if not token:
            print("\n❌ Authentication failed. Cannot proceed with other tests.")
            return
        
        # Step 2: Test availability checking
        availability_working = test_availability_check(token)
        
        # Step 3: Test booking creation
        booking_id = test_booking_creation(token)
        
        # Step 4: Test viewing bookings
        bookings_working = test_my_bookings(token)
        
        # Summary
        print("\n" + "=" * 60)
        print("🎯 **TEST RESULTS SUMMARY**")
        print("=" * 60)
        
        results = [
            ("Authentication", "✅ PASS" if token else "❌ FAIL"),
            ("Availability Check", "✅ PASS" if availability_working else "❌ FAIL"),
            ("Booking Creation", "✅ PASS" if booking_id else "❌ FAIL"),
            ("View Bookings", "✅ PASS" if bookings_working else "❌ FAIL")
        ]
        
        for test_name, result in results:
            print(f"   {test_name:<20} {result}")
        
        print("\n" + "=" * 60)
        
        if all([token, availability_working, booking_id, bookings_working]):
            print("🎉 **ALL TESTS PASSED!** Your booking system is working perfectly!")
            print("\n🚀 **Ready for Frontend Development!**")
        else:
            print("⚠️  **Some tests failed.** Check the output above for details.")
        
        print("=" * 60)
        
    except Exception as e:
        print(f"\n❌ Test execution error: {e}")
        print("Make sure the Django server is running and accessible")

if __name__ == "__main__":
    main()


