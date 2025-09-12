#!/usr/bin/env python
"""
Test script for Postcodes.io API integration
"""

import requests
import json
import time

BASE_URL = 'http://localhost:8000'

def test_postcode_validation():
    """Test postcode validation endpoint"""
    url = f'{BASE_URL}/api/users/postcode/validate/'
    
    # Test valid postcode
    data = {'postcode': 'SW1A 1AA'}
    print(f"Testing postcode validation: {data['postcode']}")
    
    try:
        response = requests.post(url, json=data)
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            result = response.json()
            if result.get('valid'):
                print("✅ Valid postcode correctly identified")
            else:
                print("❌ Valid postcode incorrectly rejected")
        else:
            print("❌ Validation request failed")
            
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # Test invalid postcode
    data = {'postcode': 'INVALID123'}
    print(f"\nTesting invalid postcode: {data['postcode']}")
    
    try:
        response = requests.post(url, json=data)
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            result = response.json()
            if not result.get('valid'):
                print("✅ Invalid postcode correctly identified")
            else:
                print("❌ Invalid postcode incorrectly accepted")
        else:
            print("❌ Validation request failed")
            
    except Exception as e:
        print(f"❌ Error: {e}")

def test_postcode_lookup():
    """Test postcode lookup endpoint"""
    url = f'{BASE_URL}/api/users/postcode/lookup/'
    postcode = 'SW1A 1AA'
    
    print(f"\nTesting postcode lookup: {postcode}")
    
    try:
        response = requests.get(f"{url}?postcode={postcode}")
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Postcode lookup successful")
            print(f"Region: {result.get('data', {}).get('region', 'N/A')}")
            print(f"Admin District: {result.get('data', {}).get('admin_district', 'N/A')}")
            print(f"Coordinates: {result.get('data', {}).get('latitude', 'N/A')}, {result.get('data', {}).get('longitude', 'N/A')}")
        else:
            print("❌ Postcode lookup failed")
            print(f"Response: {response.text}")
            
    except Exception as e:
        print(f"❌ Error: {e}")

def test_postcode_autocomplete():
    """Test postcode autocomplete endpoint"""
    url = f'{BASE_URL}/api/users/postcode/autocomplete/'
    partial = 'SW1A'
    
    print(f"\nTesting postcode autocomplete: {partial}")
    
    try:
        response = requests.get(f"{url}?partial={partial}&limit=5")
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            suggestions = result.get('suggestions', [])
            print(f"✅ Autocomplete successful - {len(suggestions)} suggestions")
            for suggestion in suggestions[:3]:
                print(f"  - {suggestion}")
        else:
            print("❌ Autocomplete failed")
            print(f"Response: {response.text}")
            
    except Exception as e:
        print(f"❌ Error: {e}")

def test_nearest_postcodes():
    """Test nearest postcodes endpoint"""
    url = f'{BASE_URL}/api/users/postcode/nearest/'
    postcode = 'SW1A 1AA'
    
    print(f"\nTesting nearest postcodes: {postcode}")
    
    try:
        response = requests.get(f"{url}?postcode={postcode}&limit=3")
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            nearest = result.get('nearest_postcodes', [])
            print(f"✅ Nearest postcodes successful - {len(nearest)} found")
            for postcode_info in nearest:
                print(f"  - {postcode_info.get('postcode')} ({postcode_info.get('distance', 'N/A')} km)")
        else:
            print("❌ Nearest postcodes failed")
            print(f"Response: {response.text}")
            
    except Exception as e:
        print(f"❌ Error: {e}")

def test_distance_calculation():
    """Test distance calculation endpoint"""
    url = f'{BASE_URL}/api/users/postcode/distance/'
    data = {
        'postcode1': 'SW1A 1AA',
        'postcode2': 'W1A 1AA'
    }
    
    print(f"\nTesting distance calculation: {data['postcode1']} to {data['postcode2']}")
    
    try:
        response = requests.post(url, json=data)
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            distance = result.get('distance', {})
            print(f"✅ Distance calculation successful")
            print(f"Distance: {distance.get('kilometers', 'N/A')} km / {distance.get('miles', 'N/A')} miles")
        else:
            print("❌ Distance calculation failed")
            print(f"Response: {response.text}")
            
    except Exception as e:
        print(f"❌ Error: {e}")

def test_bulk_postcode_lookup():
    """Test bulk postcode lookup endpoint"""
    url = f'{BASE_URL}/api/users/postcode/bulk/'
    data = {
        'postcodes': ['SW1A 1AA', 'W1A 1AA', 'M1 1AA']
    }
    
    print(f"\nTesting bulk postcode lookup: {len(data['postcodes'])} postcodes")
    
    try:
        response = requests.post(url, json=data)
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            results = result.get('results', [])
            print(f"✅ Bulk lookup successful - {len(results)} results")
            for item in results:
                status = "✅ Valid" if item.get('valid') else "❌ Invalid"
                print(f"  - {item.get('query')}: {status}")
        else:
            print("❌ Bulk lookup failed")
            print(f"Response: {response.text}")
            
    except Exception as e:
        print(f"❌ Error: {e}")

def test_enhanced_user_search():
    """Test enhanced user search with postcode validation"""
    url = f'{BASE_URL}/api/users/search/'
    postcode = 'SW1A 1AA'
    
    print(f"\nTesting enhanced user search: {postcode}")
    
    try:
        response = requests.get(f"{url}?postcode={postcode}")
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Enhanced search successful")
            
            # Check for new postcode info
            postcode_info = result.get('postcode_info', {})
            if postcode_info:
                print(f"✅ Postcode info included")
                print(f"  Region: {postcode_info.get('region', 'N/A')}")
                print(f"  Admin District: {postcode_info.get('admin_district', 'N/A')}")
            else:
                print("❌ Postcode info missing")
            
            # Check for search metadata
            metadata = result.get('search_metadata', {})
            if metadata:
                print(f"✅ Search metadata included")
                coords = metadata.get('coordinates', {})
                print(f"  Coordinates: {coords.get('latitude', 'N/A')}, {coords.get('longitude', 'N/A')}")
            else:
                print("❌ Search metadata missing")
                
        else:
            print("❌ Enhanced search failed")
            print(f"Response: {response.text}")
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == '__main__':
    print("🧪 Testing DriveEver Postcodes.io API Integration")
    print("=" * 70)
    
    test_postcode_validation()
    test_postcode_lookup()
    test_postcode_autocomplete()
    test_nearest_postcodes()
    test_distance_calculation()
    test_bulk_postcode_lookup()
    test_enhanced_user_search()
    
    print("\n" + "=" * 70)
    print("Postcode API testing complete!")



