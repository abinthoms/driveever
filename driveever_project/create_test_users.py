#!/usr/bin/env python3
"""
Script to create test users for the DriveEver booking system
Run this script to create test data for development and testing
"""

import os
import sys
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'driveever_project.settings')
django.setup()

from user_management.models import User, InstructorProfile, AcademyProfile
from decimal import Decimal

def create_test_users():
    """Create test users for the booking system"""
    print("Creating test users for DriveEver booking system...")
    
    # Create a test learner
    try:
        learner = User.objects.create_user(
            username='testlearner',
            email='learner@test.com',
            password='testpass123',
            user_type='learner',
            full_name='Test Learner'
        )
        print(f"✅ Created learner: {learner.username} (ID: {learner.id})")
    except Exception as e:
        print(f"⚠️  Learner creation failed: {e}")
        learner = User.objects.get(username='testlearner')
        print(f"📝 Using existing learner: {learner.username} (ID: {learner.id})")
    
    # Create a test instructor
    try:
        instructor = User.objects.create_user(
            username='testinstructor',
            email='instructor@test.com',
            password='testpass123',
            user_type='instructor',
            full_name='Test Instructor'
        )
        print(f"✅ Created instructor: {instructor.username} (ID: {instructor.id})")
    except Exception as e:
        print(f"⚠️  Instructor creation failed: {e}")
        instructor = User.objects.get(username='testinstructor')
        print(f"📝 Using existing instructor: {instructor.username} (ID: {instructor.id})")
    
    # Create instructor profile
    try:
        instructor_profile = InstructorProfile.objects.create(
            user=instructor,
            mobile_number='07123456789',
            adi_number='ADI123456',
            car_model='Ford Fiesta',
            price_per_hour=Decimal('25.00'),
            postcodes='LN1, LN2, LN5',
            is_active=True,
            is_verified=True
        )
        print(f"✅ Created instructor profile for {instructor.username}")
    except Exception as e:
        print(f"⚠️  Instructor profile creation failed: {e}")
        instructor_profile = InstructorProfile.objects.get(user=instructor)
        print(f"📝 Using existing instructor profile")
    
    # Create a test academy
    try:
        academy = User.objects.create_user(
            username='testacademy',
            email='academy@test.com',
            password='testpass123',
            user_type='academy',
            full_name='Test Academy'
        )
        print(f"✅ Created academy: {academy.username} (ID: {academy.id})")
    except Exception as e:
        print(f"⚠️  Academy creation failed: {e}")
        academy = User.objects.get(username='testacademy')
        print(f"📝 Using existing academy: {academy.username} (ID: {academy.id})")
    
    # Create academy profile
    try:
        academy_profile = AcademyProfile.objects.create(
            user=academy,
            academy_name='Test Driving Academy',
            owner_name='John Smith',
            business_email='john@testacademy.com',
            phone='07123456789',
            address='123 Academy Street, Lincoln',
            main_postcode='LN1 1AA',
            description='Professional driving instruction services',
            is_active=True
        )
        print(f"✅ Created academy profile for {academy.username}")
    except Exception as e:
        print(f"⚠️  Academy profile creation failed: {e}")
        academy_profile = AcademyProfile.objects.get(user=academy)
        print(f"📝 Using existing academy profile")
    
    print("\n" + "="*50)
    print("🎯 TEST USERS CREATED SUCCESSFULLY!")
    print("="*50)
    
    print("\n📋 **User Credentials for Testing:**")
    print("-" * 40)
    print("🔹 LEARNER:")
    print(f"   Username: testlearner")
    print(f"   Password: testpass123")
    print(f"   Email: learner@test.com")
    print(f"   User ID: {learner.id}")
    
    print("\n🔹 INSTRUCTOR:")
    print(f"   Username: testinstructor")
    print(f"   Password: testpass123")
    print(f"   Email: instructor@test.com")
    print(f"   User ID: {instructor.id}")
    print(f"   Price: £{instructor_profile.price_per_hour}/hour")
    
    print("\n🔹 ACADEMY:")
    print(f"   Username: testacademy")
    print(f"   Password: testpass123")
    print(f"   Email: academy@test.com")
    print(f"   User ID: {academy.id}")
    
    print("\n🔹 ADMIN:")
    print(f"   Username: admin1")
    print(f"   Password: admin1")
    print(f"   URL: http://localhost:8000/admin/")
    
    print("\n" + "="*50)
    print("🚀 **Next Steps:**")
    print("1. Access Django Admin: http://localhost:8000/admin/")
    print("2. Test API endpoints with the test users")
    print("3. Create instructor availability slots")
    print("4. Test the complete booking flow")
    print("="*50)

if __name__ == "__main__":
    create_test_users()


