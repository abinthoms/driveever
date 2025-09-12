#!/usr/bin/env python3
"""
Script to set up instructor availability for testing the DriveEver booking system
"""

import os
import sys
import django
from datetime import time

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'driveever_project.settings')
django.setup()

from user_management.models import User, InstructorProfile, InstructorAvailability

def setup_instructor_availability():
    """Set up availability slots for the test instructor"""
    print("Setting up instructor availability for testing...")
    
    try:
        # Get the test instructor
        instructor = User.objects.get(username='testinstructor')
        instructor_profile = InstructorProfile.objects.get(user=instructor)
        
        print(f"✅ Found instructor: {instructor.full_name}")
        
        # Define availability slots (Monday = 0, Sunday = 6)
        availability_slots = [
            # Monday
            {'day_of_week': 0, 'start_time': '09:00', 'end_time': '17:00'},
            # Tuesday  
            {'day_of_week': 1, 'start_time': '09:00', 'end_time': '17:00'},
            # Wednesday
            {'day_of_week': 2, 'start_time': '09:00', 'end_time': '17:00'},
            # Thursday
            {'day_of_week': 3, 'start_time': '09:00', 'end_time': '17:00'},
            # Friday
            {'day_of_week': 4, 'start_time': '09:00', 'end_time': '17:00'},
            # Saturday
            {'day_of_week': 5, 'start_time': '10:00', 'end_time': '16:00'},
        ]
        
        created_count = 0
        for slot_data in availability_slots:
            # Convert time strings to time objects
            start_time = time.fromisoformat(slot_data['start_time'])
            end_time = time.fromisoformat(slot_data['end_time'])
            
            # Create or update availability slot
            slot, created = InstructorAvailability.objects.get_or_create(
                instructor_profile=instructor_profile,
                day_of_week=slot_data['day_of_week'],
                defaults={
                    'start_time': start_time,
                    'end_time': end_time,
                    'is_available': True
                }
            )
            
            if created:
                created_count += 1
                print(f"✅ Created availability for {slot.get_day_of_week_display()}: {start_time} - {end_time}")
            else:
                # Update existing slot
                slot.start_time = start_time
                slot.end_time = end_time
                slot.is_available = True
                slot.save()
                print(f"📝 Updated availability for {slot.get_day_of_week_display()}: {start_time} - {end_time}")
        
        print(f"\n🎯 Availability setup complete! Created {created_count} new slots.")
        
        # Show current availability
        print("\n📅 **Current Instructor Availability:**")
        print("-" * 40)
        availability = InstructorAvailability.objects.filter(
            instructor_profile=instructor_profile,
            is_available=True
        ).order_by('day_of_week', 'start_time')
        
        for slot in availability:
            print(f"   {slot.get_day_of_week_display():<10}: {slot.start_time} - {slot.end_time}")
        
        print("\n" + "="*50)
        print("🚀 **Ready for Testing!**")
        print("="*50)
        print("Now you can:")
        print("1. Test availability checking API")
        print("2. Create test bookings")
        print("3. Test the complete booking flow")
        print("="*50)
        
    except User.DoesNotExist:
        print("❌ Test instructor not found. Run create_test_users.py first.")
    except InstructorProfile.DoesNotExist:
        print("❌ Instructor profile not found. Run create_test_users.py first.")
    except Exception as e:
        print(f"❌ Error setting up availability: {e}")

if __name__ == "__main__":
    setup_instructor_availability()


