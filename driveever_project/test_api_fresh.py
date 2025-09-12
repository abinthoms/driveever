#!/usr/bin/env python
"""
Test API with fresh data to demonstrate validation fixes
"""

import requests
import json
import time

BASE_URL = 'http://localhost:8000'

def test_fresh_user_registration():
    """Test user registration with fresh data"""
    timestamp = int(time.time())
    url = f'{BASE_URL}/api/users/register/'
    data = {
        'username': f'freshuser{timestamp}',
        'email': f'fresh{timestamp}@example.com',
        'password': 'testpass123',
        'user_type': 'learner',
        'full_name': 'Fresh Test User'
    }
    
    print(f"Testing fresh user registration at {url}")
    print(f"Data: {json.dumps(data, indent=2)}")
    
    try:
        response = requests.post(url, json=data)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 201:
            print("✅ Fresh registration successful")
        else:
            print("❌ Fresh registration failed")
            
    except Exception as e:
        print(f"❌ Error: {e}")

def test_duplicate_email_validation():
    """Test that duplicate email is properly rejected"""
    timestamp = int(time.time())
    url = f'{BASE_URL}/api/users/register/'
    
    # First registration
    data1 = {
        'username': f'duplicate{timestamp}',
        'email': f'duplicate{timestamp}@test.com',
        'password': 'testpass123',
        'user_type': 'learner',
        'full_name': 'First User'
    }
    
    print(f"\nTesting duplicate email validation")
    print(f"First registration with: {data1['email']}")
    
    try:
        response1 = requests.post(url, json=data1)
        print(f"First registration status: {response1.status_code}")
        
        if response1.status_code == 201:
            print("✅ First registration successful")
            
            # Second registration with same email
            data2 = {
                'username': f'different{timestamp}',
                'email': f'duplicate{timestamp}@test.com',  # Same email
                'password': 'testpass123',
                'user_type': 'learner',
                'full_name': 'Second User'
            }
            
            print(f"Second registration with same email: {data2['email']}")
            response2 = requests.post(url, json=data2)
            print(f"Second registration status: {response2.status_code}")
            print(f"Second registration response: {response2.text}")
            
            if response2.status_code == 400:
                print("✅ Duplicate email properly rejected")
            else:
                print("❌ Duplicate email should have been rejected")
        else:
            print("❌ First registration failed")
            
    except Exception as e:
        print(f"❌ Error: {e}")

def test_missing_fields_validation():
    """Test that missing required fields are properly handled"""
    url = f'{BASE_URL}/api/users/register/'
    
    print(f"\nTesting missing fields validation")
    
    # Test missing email
    data_missing_email = {
        'username': 'testuser',
        'password': 'testpass123',
        'user_type': 'learner'
    }
    
    print(f"Testing with missing email")
    try:
        response = requests.post(url, json=data_missing_email)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            print("✅ Missing email properly handled")
        else:
            print("❌ Missing email should have been rejected")
            
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # Test missing username
    data_missing_username = {
        'email': 'test@example.com',
        'password': 'testpass123',
        'user_type': 'learner'
    }
    
    print(f"\nTesting with missing username")
    try:
        response = requests.post(url, json=data_missing_username)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            print("✅ Missing username properly handled")
        else:
            print("❌ Missing username should have been rejected")
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == '__main__':
    print("🧪 Testing DriveEver API Validation Fixes")
    print("=" * 60)
    
    test_fresh_user_registration()
    test_duplicate_email_validation()
    test_missing_fields_validation()
    
    print("\n" + "=" * 60)
    print("Validation testing complete!")



