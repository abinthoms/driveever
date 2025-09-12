#!/usr/bin/env python3
"""
DVSA API Test Script
Tests the DVSA API integration for vehicle checks
"""

import requests
import json
import time

def test_dvsa_api():
    """Test the DVSA API directly"""
    print("🔍 Testing DVSA API Integration...")
    print("=" * 50)
    
    # DVSA API configuration
    dvsa_api_url = 'https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles'
    api_key = 'TMBjcNLUZS4rW2sJsOzkd1lgkQj89G8G8xmNcdYo'
    
    headers = {
        'Content-Type': 'application/json',
        'x-api-key': api_key
    }
    
    # Test cases
    test_cases = [
        {
            'name': 'Valid UK Plate (Test)',
            'registration': 'AB12CDE',
            'expected_status': 200
        },
        {
            'name': 'Invalid Format',
            'registration': 'INVALID123',
            'expected_status': 400
        },
        {
            'name': 'Empty Registration',
            'registration': '',
            'expected_status': 400
        }
    ]
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\n📋 Test {i}: {test_case['name']}")
        print(f"Registration: {test_case['registration']}")
        print(f"Expected Status: {test_case['expected_status']}")
        
        try:
            payload = {
                'registrationNumber': test_case['registration']
            }
            
            print("🔄 Making API request...")
            response = requests.post(
                dvsa_api_url,
                headers=headers,
                json=payload,
                timeout=30
            )
            
            print(f"📊 Response Status: {response.status_code}")
            
            if response.status_code == 200:
                vehicle_data = response.json()
                print("✅ SUCCESS - Vehicle data received:")
                print(json.dumps(vehicle_data, indent=2))
            elif response.status_code == 400:
                error_data = response.json()
                print("⚠️  EXPECTED ERROR - Invalid format:")
                print(json.dumps(error_data, indent=2))
            else:
                print(f"❌ UNEXPECTED STATUS: {response.status_code}")
                print(f"Response: {response.text}")
                
        except requests.exceptions.Timeout:
            print("⏰ TIMEOUT - Request took too long")
        except requests.exceptions.ConnectionError:
            print("🔌 CONNECTION ERROR - Could not connect to API")
        except Exception as e:
            print(f"💥 ERROR: {str(e)}")
        
        print("-" * 30)
        time.sleep(1)  # Rate limiting
    
    print("\n🎯 Testing Backend Proxy...")
    print("=" * 50)
    
    # Test backend proxy
    backend_url = 'http://127.0.0.1:8001/api/users/vehicle/check/'
    
    try:
        print("🔄 Testing backend proxy...")
        response = requests.post(
            backend_url,
            headers={'Content-Type': 'application/json'},
            json={'registrationNumber': 'AB12CDE'},
            timeout=30
        )
        
        print(f"📊 Backend Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Backend SUCCESS:")
            print(json.dumps(data, indent=2))
        else:
            print(f"❌ Backend ERROR: {response.status_code}")
            print(f"Response: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("🔌 Backend not running - Start Django server first")
        print("Run: cd driveever_project && python manage.py runserver")
    except Exception as e:
        print(f"💥 Backend ERROR: {str(e)}")

if __name__ == "__main__":
    test_dvsa_api()
