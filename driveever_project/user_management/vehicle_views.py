"""
Vehicle Check Views - DVLA API Proxy
Handles vehicle check requests through backend to avoid CORS issues
"""

import requests
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.throttling import AnonRateThrottle
from django.conf import settings
from django.http import JsonResponse
from django.core.cache import cache
import logging
import time

logger = logging.getLogger(__name__)

class VehicleCheckView(APIView):
    """
    DVLA Vehicle Check API Proxy
    Handles vehicle check requests to avoid CORS issues
    """
    permission_classes = [AllowAny]  # Allow public access for vehicle checks
    throttle_classes = [AnonRateThrottle]  # Rate limiting for anonymous users
    
    def post(self, request):
        """
        Check vehicle using DVLA API
        """
        try:
            # Get registration number from request
            registration_number = request.data.get('registrationNumber', '').strip()
            
            if not registration_number:
                return Response({
                    'error': 'Registration number is required'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Input validation and sanitization
            if len(registration_number) > 20:  # Prevent excessively long inputs
                return Response({
                    'error': 'Registration number too long'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Clean the registration number
            clean_registration = registration_number.replace(' ', '').replace('-', '').upper()
            
            # Validate UK number plate format
            import re
            if not re.match(r'^[A-Z]{2}\d{2}[A-Z]{3}$', clean_registration):
                return Response({
                    'error': 'Invalid UK number plate format',
                    'details': 'Please enter a valid UK number plate (e.g., AB12 CDE)'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Rate limiting per IP
            client_ip = self.get_client_ip(request)
            cache_key = f'vehicle_check_{client_ip}'
            recent_checks = cache.get(cache_key, 0)
            
            if recent_checks >= 10:  # Max 10 checks per minute per IP
                return Response({
                    'error': 'Rate limit exceeded',
                    'details': 'Too many requests. Please try again later.'
                }, status=status.HTTP_429_TOO_MANY_REQUESTS)
            
            # Update rate limit counter
            cache.set(cache_key, recent_checks + 1, 60)  # 1 minute expiry
            
            # DVLA API configuration
            dvla_api_url = 'https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles'
            api_key = 'TMBjcNLUZS4rW2sJsOzkd1lgkQj89G8G8xmNcdYo'
            
            # Prepare headers
            headers = {
                'Content-Type': 'application/json',
                'x-api-key': api_key
            }
            
            # Prepare payload
            payload = {
                'registrationNumber': clean_registration
            }
            
            # Make request to DVLA API
            logger.info(f"Making DVLA API request for registration: {clean_registration}")
            
            response = requests.post(
                dvla_api_url,
                headers=headers,
                json=payload,
                timeout=30
            )
            
            # Handle response
            if response.status_code == 200:
                vehicle_data = response.json()
                logger.info(f"DVLA API success for {clean_registration}")
                
                # Return the vehicle data
                return Response({
                    'success': True,
                    'data': vehicle_data
                }, status=status.HTTP_200_OK)
                
            elif response.status_code == 400:
                logger.warning(f"DVLA API 400 error for {clean_registration}: Invalid format")
                return Response({
                    'error': 'Invalid number plate format',
                    'details': 'Please enter a valid UK number plate (e.g., AB12 CDE)'
                }, status=status.HTTP_400_BAD_REQUEST)
                
            elif response.status_code == 401:
                logger.error(f"DVLA API 401 error: Invalid API key")
                return Response({
                    'error': 'API authentication failed',
                    'details': 'Invalid API key configuration'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
            elif response.status_code == 404:
                logger.warning(f"DVLA API 404 error for {clean_registration}: Vehicle not found")
                return Response({
                    'error': 'Vehicle not found',
                    'details': 'The number plate was not found in the DVLA database'
                }, status=status.HTTP_404_NOT_FOUND)
                
            elif response.status_code == 429:
                logger.warning(f"DVLA API 429 error: Rate limit exceeded")
                return Response({
                    'error': 'Too many requests',
                    'details': 'Rate limit exceeded. Please try again later.'
                }, status=status.HTTP_429_TOO_MANY_REQUESTS)
                
            elif response.status_code in [500, 503]:
                logger.error(f"DVLA API {response.status_code} error: Service unavailable")
                return Response({
                    'error': 'Service temporarily unavailable',
                    'details': 'DVLA service is currently experiencing issues. Please try again later.'
                }, status=status.HTTP_503_SERVICE_UNAVAILABLE)
                
            else:
                logger.error(f"DVLA API unexpected error {response.status_code}: {response.text}")
                return Response({
                    'error': 'API request failed',
                    'details': f'Unexpected error: {response.status_code} {response.reason}'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
        except requests.exceptions.Timeout:
            logger.error(f"DVLA API timeout for {clean_registration}")
            return Response({
                'error': 'Request timeout',
                'details': 'The request took too long to complete. Please try again.'
            }, status=status.HTTP_408_REQUEST_TIMEOUT)
            
        except requests.exceptions.ConnectionError:
            logger.error(f"DVLA API connection error for {clean_registration}")
            return Response({
                'error': 'Connection failed',
                'details': 'Unable to connect to DVLA service. Please check your internet connection.'
            }, status=status.HTTP_503_SERVICE_UNAVAILABLE)
            
        except requests.exceptions.RequestException as e:
            logger.error(f"DVLA API request error for {clean_registration}: {str(e)}")
            return Response({
                'error': 'Request failed',
                'details': 'An error occurred while processing your request. Please try again.'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        except Exception as e:
            logger.error(f"Unexpected error in vehicle check for {clean_registration}: {str(e)}")
            return Response({
                'error': 'Internal server error',
                'details': 'An unexpected error occurred. Please try again later.'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def get_client_ip(self, request):
        """
        Get client IP address for rate limiting
        """
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

    def get(self, request):
        """
        Health check for vehicle check service
        """
        return Response({
            'service': 'Vehicle Check API',
            'status': 'operational',
            'version': '1.0.0'
        }, status=status.HTTP_200_OK)


class VehicleCheckHealthView(APIView):
    """
    Health check endpoint for vehicle check service
    """
    permission_classes = [AllowAny]  # Allow public access for health checks
    
    def get(self, request):
        """
        Check if vehicle check service is operational
        """
        try:
            # Test DVLA API connectivity
            dvla_api_url = 'https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles'
            api_key = 'TMBjcNLUZS4rW2sJsOzkd1lgkQj89G8G8xmNcdYo'
            
            headers = {
                'Content-Type': 'application/json',
                'x-api-key': api_key
            }
            
            # Test with a known valid registration
            test_payload = {
                'registrationNumber': 'AB12CDE'
            }
            
            response = requests.post(
                dvla_api_url,
                headers=headers,
                json=test_payload,
                timeout=10
            )
            
            if response.status_code == 200:
                return Response({
                    'service': 'Vehicle Check API',
                    'status': 'healthy',
                    'dvla_api': 'operational',
                    'timestamp': '2025-01-06T10:00:00Z'
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'service': 'Vehicle Check API',
                    'status': 'degraded',
                    'dvla_api': f'error_{response.status_code}',
                    'timestamp': '2025-01-06T10:00:00Z'
                }, status=status.HTTP_503_SERVICE_UNAVAILABLE)
                
        except Exception as e:
            return Response({
                'service': 'Vehicle Check API',
                'status': 'unhealthy',
                'error': str(e),
                'timestamp': '2025-01-06T10:00:00Z'
            }, status=status.HTTP_503_SERVICE_UNAVAILABLE)
