"""
Postcode API Views for DriveEver
Provides postcode validation, lookup, and geolocation services
"""

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .postcode_service import postcode_service
import logging

logger = logging.getLogger(__name__)

class PostcodeValidationView(APIView):
    """
    Validate UK postcodes using Postcodes.io API
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        """Validate a single postcode"""
        postcode = request.data.get('postcode', '').strip()
        
        if not postcode:
            return Response(
                {'error': 'Postcode is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            result = postcode_service.validate_postcode(postcode)
            return Response(result, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Postcode validation error: {e}")
            return Response(
                {'error': 'Postcode validation failed'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class PostcodeLookupView(APIView):
    """
    Get detailed information about a UK postcode
    """
    permission_classes = [AllowAny]
    
    def get(self, request):
        """Get postcode information"""
        postcode = request.query_params.get('postcode', '').strip()
        
        if not postcode:
            return Response(
                {'error': 'Postcode parameter is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            result = postcode_service.get_postcode_info(postcode)
            return Response(result, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Postcode lookup error: {e}")
            return Response(
                {'error': 'Postcode lookup failed'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class PostcodeAutocompleteView(APIView):
    """
    Autocomplete partial postcode input
    """
    permission_classes = [AllowAny]
    
    def get(self, request):
        """Get postcode autocomplete suggestions"""
        partial = request.query_params.get('partial', '').strip()
        limit = request.query_params.get('limit', 10)
        
        if not partial:
            return Response(
                {'error': 'Partial postcode parameter is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            result = postcode_service.autocomplete_postcode(partial, int(limit))
            return Response(result, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Postcode autocomplete error: {e}")
            return Response(
                {'error': 'Postcode autocomplete failed'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class NearestPostcodesView(APIView):
    """
    Find nearest postcodes to a given postcode
    """
    permission_classes = [AllowAny]
    
    def get(self, request):
        """Find nearest postcodes"""
        postcode = request.query_params.get('postcode', '').strip()
        limit = request.query_params.get('limit', 10)
        
        if not postcode:
            return Response(
                {'error': 'Postcode parameter is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            result = postcode_service.find_nearest_postcodes(postcode, int(limit))
            return Response(result, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Nearest postcodes lookup error: {e}")
            return Response(
                {'error': 'Nearest postcodes lookup failed'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class DistanceCalculationView(APIView):
    """
    Calculate distance between two postcodes
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        """Calculate distance between two postcodes"""
        postcode1 = request.data.get('postcode1', '').strip()
        postcode2 = request.data.get('postcode2', '').strip()
        
        if not postcode1 or not postcode2:
            return Response(
                {'error': 'Both postcode1 and postcode2 are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            result = postcode_service.calculate_distance(postcode1, postcode2)
            return Response(result, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Distance calculation error: {e}")
            return Response(
                {'error': 'Distance calculation failed'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class BulkPostcodeLookupView(APIView):
    """
    Lookup multiple postcodes in a single request
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        """Bulk lookup postcodes"""
        postcodes = request.data.get('postcodes', [])
        
        if not postcodes or not isinstance(postcodes, list):
            return Response(
                {'error': 'Postcodes must be a non-empty list'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            result = postcode_service.bulk_postcode_lookup(postcodes)
            return Response(result, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Bulk postcode lookup error: {e}")
            return Response(
                {'error': 'Bulk postcode lookup failed'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class PostcodeSearchView(APIView):
    """
    Enhanced postcode search with multiple options
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        """Search postcodes with various criteria"""
        search_type = request.data.get('type', 'lookup')
        postcode = request.data.get('postcode', '').strip()
        
        if not postcode:
            return Response(
                {'error': 'Postcode is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            if search_type == 'validate':
                result = postcode_service.validate_postcode(postcode)
            elif search_type == 'lookup':
                result = postcode_service.get_postcode_info(postcode)
            elif search_type == 'nearest':
                limit = request.data.get('limit', 10)
                result = postcode_service.find_nearest_postcodes(postcode, int(limit))
            elif search_type == 'autocomplete':
                limit = request.data.get('limit', 10)
                result = postcode_service.autocomplete_postcode(postcode, int(limit))
            else:
                return Response(
                    {'error': 'Invalid search type. Use: validate, lookup, nearest, or autocomplete'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            return Response(result, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"Postcode search error: {e}")
            return Response(
                {'error': 'Postcode search failed'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )



