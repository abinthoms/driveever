"""
Postcodes.io API Service for DriveEver
Provides UK postcode validation, geolocation, and administrative data
"""

import requests
import logging
from typing import Dict, Optional, List, Tuple
from django.conf import settings

logger = logging.getLogger(__name__)

class PostcodesIOService:
    """
    Service class for interacting with Postcodes.io API
    https://api.postcodes.io
    """
    
    BASE_URL = "https://api.postcodes.io"
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'DriveEver/1.0 (https://driveever.com)'
        })
    
    def validate_postcode(self, postcode: str) -> Dict:
        """
        Validate a UK postcode and return detailed information
        
        Args:
            postcode (str): UK postcode to validate
            
        Returns:
            Dict: Postcode validation response
        """
        try:
            # Clean postcode (remove spaces, convert to uppercase)
            clean_postcode = postcode.replace(' ', '').upper()
            
            url = f"{self.BASE_URL}/postcodes/{clean_postcode}/validate"
            response = self.session.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                return {
                    'valid': data.get('result', False),
                    'postcode': clean_postcode,
                    'status': 'success'
                }
            else:
                return {
                    'valid': False,
                    'postcode': postcode,
                    'status': 'error',
                    'message': f'API request failed: {response.status_code}'
                }
                
        except requests.RequestException as e:
            logger.error(f"Postcodes.io API request failed: {e}")
            return {
                'valid': False,
                'postcode': postcode,
                'status': 'error',
                'message': f'Network error: {str(e)}'
            }
        except Exception as e:
            logger.error(f"Postcode validation error: {e}")
            return {
                'valid': False,
                'postcode': postcode,
                'status': 'error',
                'message': f'Validation error: {str(e)}'
            }
    
    def get_postcode_info(self, postcode: str) -> Dict:
        """
        Get detailed information about a UK postcode
        
        Args:
            postcode (str): UK postcode to lookup
            
        Returns:
            Dict: Detailed postcode information
        """
        try:
            clean_postcode = postcode.replace(' ', '').upper()
            url = f"{self.BASE_URL}/postcodes/{clean_postcode}"
            response = self.session.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                result = data.get('result', {})
                
                return {
                    'status': 'success',
                    'postcode': clean_postcode,
                    'data': {
                        'postcode': result.get('postcode'),
                        'quality': result.get('quality'),
                        'eastings': result.get('eastings'),
                        'northings': result.get('northings'),
                        'country': result.get('country'),
                        'nhs_ha': result.get('nhs_ha'),
                        'longitude': result.get('longitude'),
                        'latitude': result.get('latitude'),
                        'european_electoral_region': result.get('european_electoral_region'),
                        'primary_care_trust': result.get('primary_care_trust'),
                        'region': result.get('region'),
                        'lsoa': result.get('lsoa'),
                        'msoa': result.get('msoa'),
                        'incode': result.get('incode'),
                        'outcode': result.get('outcode'),
                        'parliamentary_constituency': result.get('parliamentary_constituency'),
                        'admin_district': result.get('admin_district'),
                        'parish': result.get('parish'),
                        'admin_county': result.get('admin_county'),
                        'admin_ward': result.get('admin_ward'),
                        'ced': result.get('ced'),
                        'ccg': result.get('ccg'),
                        'nuts': result.get('nuts'),
                        'codes': result.get('codes', {})
                    }
                }
            else:
                return {
                    'status': 'error',
                    'postcode': postcode,
                    'message': f'Postcode not found: {response.status_code}'
                }
                
        except requests.RequestException as e:
            logger.error(f"Postcodes.io API request failed: {e}")
            return {
                'status': 'error',
                'postcode': postcode,
                'message': f'Network error: {str(e)}'
            }
        except Exception as e:
            logger.error(f"Postcode lookup error: {e}")
            return {
                'status': 'error',
                'postcode': postcode,
                'message': f'Lookup error: {str(e)}'
            }
    
    def find_nearest_postcodes(self, postcode: str, limit: int = 10) -> Dict:
        """
        Find nearest postcodes to a given postcode
        
        Args:
            postcode (str): Reference postcode
            limit (int): Maximum number of results
            
        Returns:
            Dict: Nearest postcodes information
        """
        try:
            clean_postcode = postcode.replace(' ', '').upper()
            url = f"{self.BASE_URL}/postcodes/{clean_postcode}/nearest"
            params = {'limit': limit}
            
            response = self.session.get(url, params=params, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                results = data.get('result', [])
                
                return {
                    'status': 'success',
                    'reference_postcode': clean_postcode,
                    'nearest_postcodes': [
                        {
                            'postcode': p.get('postcode'),
                            'distance': p.get('distance'),
                            'longitude': p.get('longitude'),
                            'latitude': p.get('latitude')
                        }
                        for p in results
                    ]
                }
            else:
                return {
                    'status': 'error',
                    'reference_postcode': postcode,
                    'message': f'Nearest postcodes lookup failed: {response.status_code}'
                }
                
        except Exception as e:
            logger.error(f"Nearest postcodes lookup error: {e}")
            return {
                'status': 'error',
                'reference_postcode': postcode,
                'message': f'Lookup error: {str(e)}'
            }
    
    def bulk_postcode_lookup(self, postcodes: List[str]) -> Dict:
        """
        Lookup multiple postcodes in a single request
        
        Args:
            postcodes (List[str]): List of postcodes to lookup
            
        Returns:
            Dict: Bulk lookup results
        """
        try:
            # Clean and validate postcodes
            clean_postcodes = [p.replace(' ', '').upper() for p in postcodes if p.strip()]
            
            if not clean_postcodes:
                return {
                    'status': 'error',
                    'message': 'No valid postcodes provided'
                }
            
            url = f"{self.BASE_URL}/postcodes"
            payload = {'postcodes': clean_postcodes}
            
            response = self.session.post(url, json=payload, timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                results = data.get('result', [])
                
                return {
                    'status': 'success',
                    'results': [
                        {
                            'query': r.get('query'),
                            'result': r.get('result', {}),
                            'valid': r.get('result') is not None
                        }
                        for r in results
                    ]
                }
            else:
                return {
                    'status': 'error',
                    'message': f'Bulk lookup failed: {response.status_code}'
                }
                
        except Exception as e:
            logger.error(f"Bulk postcode lookup error: {e}")
            return {
                'status': 'error',
                'message': f'Bulk lookup error: {str(e)}'
            }
    
    def autocomplete_postcode(self, partial_postcode: str, limit: int = 10) -> Dict:
        """
        Autocomplete partial postcode input
        
        Args:
            partial_postcode (str): Partial postcode (e.g., 'SW1A')
            limit (int): Maximum number of suggestions
            
        Returns:
            Dict: Autocomplete suggestions
        """
        try:
            clean_partial = partial_postcode.replace(' ', '').upper()
            url = f"{self.BASE_URL}/postcodes/{clean_partial}/autocomplete"
            params = {'limit': limit}
            
            response = self.session.get(url, params=params, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                suggestions = data.get('result', [])
                
                return {
                    'status': 'success',
                    'partial': clean_partial,
                    'suggestions': suggestions
                }
            else:
                return {
                    'status': 'error',
                    'partial': partial_postcode,
                    'message': f'Autocomplete failed: {response.status_code}'
                }
                
        except Exception as e:
            logger.error(f"Postcode autocomplete error: {e}")
            return {
                'status': 'error',
                'partial': partial_postcode,
                'message': f'Autocomplete error: {str(e)}'
            }
    
    def calculate_distance(self, postcode1: str, postcode2: str) -> Dict:
        """
        Calculate distance between two postcodes
        
        Args:
            postcode1 (str): First postcode
            postcode2 (str): Second postcode
            
        Returns:
            Dict: Distance calculation result
        """
        try:
            # Get coordinates for both postcodes
            info1 = self.get_postcode_info(postcode1)
            info2 = self.get_postcode_info(postcode2)
            
            if info1['status'] != 'success' or info2['status'] != 'success':
                return {
                    'status': 'error',
                    'message': 'Could not get coordinates for one or both postcodes'
                }
            
            # Extract coordinates
            lat1 = info1['data']['latitude']
            lon1 = info1['data']['longitude']
            lat2 = info2['data']['latitude']
            lon2 = info2['data']['longitude']
            
            # Calculate distance using Haversine formula
            distance_km = self._haversine_distance(lat1, lon1, lat2, lon2)
            distance_miles = distance_km * 0.621371
            
            return {
                'status': 'success',
                'postcode1': postcode1,
                'postcode2': postcode2,
                'distance': {
                    'kilometers': round(distance_km, 2),
                    'miles': round(distance_miles, 2)
                },
                'coordinates': {
                    'postcode1': {'lat': lat1, 'lon': lon1},
                    'postcode2': {'lat': lat2, 'lon': lon2}
                }
            }
            
        except Exception as e:
            logger.error(f"Distance calculation error: {e}")
            return {
                'status': 'error',
                'message': f'Distance calculation error: {str(e)}'
            }
    
    def _haversine_distance(self, lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        """
        Calculate distance between two points using Haversine formula
        
        Args:
            lat1, lon1: Coordinates of first point
            lat2, lon2: Coordinates of second point
            
        Returns:
            float: Distance in kilometers
        """
        import math
        
        # Convert to radians
        lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
        
        # Haversine formula
        dlat = lat2 - lat1
        dlon = lon2 - lon1
        a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
        c = 2 * math.asin(math.sqrt(a))
        
        # Earth's radius in kilometers
        r = 6371
        
        return c * r

# Global instance for easy access
postcode_service = PostcodesIOService()



