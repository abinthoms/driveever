#!/usr/bin/env python
"""
Simple API testing script to debug validation issues
"""

import requests
import json

BASE_URL = 'http://localhost:8000'

def test_user_registration():
    """Test basic user registration"""
    url = f'{BASE_URL}/api/users/register/'
    data = {
        'username': 'testuser123',
        'email': 'test@example.com',
        'password': 'testpass123',
        'user_type': 'learner',
        'full_name': 'Test User'
    }
    
    print(f"Testing user registration at {url}")
    print(f"Data: {json.dumps(data, indent=2)}")
    
    try:
        response = requests.post(url, json=data)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 201:
            print("❌ Registration failed")
        else:
            print("✅ Registration successful")
            
    except Exception as e:
        print(f"❌ Error: {e}")

def test_instructor_registration():
    """Test instructor registration"""
    url = f'{BASE_URL}/api/users/register/instructor/'
    data = {
        'username': 'testinstructor123',
        'email': 'instructor@test.com',
        'password': 'testpass123',
        'full_name': 'Test Instructor',
        'mobile_number': '+447123456789',
        'adi_number': 'ADI123456',
        'postcodes': 'SW1A 1AA, W1A 1AA',
        'price_per_hour': '35.00'
    }
    
    print(f"\nTesting instructor registration at {url}")
    print(f"Data: {json.dumps(data, indent=2)}")
    
    try:
        response = requests.post(url, json=data)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 201:
            print("❌ Registration failed")
        else:
            print("✅ Registration successful")
            
    except Exception as e:
        print(f"❌ Error: {e}")

def test_user_search():
    """Test user search endpoint"""
    url = f'{BASE_URL}/api/users/search/?postcode=SW1A1AA'
    
    print(f"\nTesting user search at {url}")
    
    try:
        response = requests.get(url)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 200:
            print("❌ Search failed")
        else:
            print("✅ Search successful")
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == '__main__':
    print("🧪 Testing DriveEver API Endpoints")
    print("=" * 50)
    
    test_user_registration()
    test_instructor_registration()
    test_user_search()
    
    print("\n" + "=" * 50)
    print("Testing complete!")



