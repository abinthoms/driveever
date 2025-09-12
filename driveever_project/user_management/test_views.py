import pytest
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from django.contrib.auth import get_user_model

# Lazy imports to avoid Django configuration issues
def get_api_client():
    from rest_framework.test import APIClient
    return APIClient()

def get_user_model_instance():
    return get_user_model()

@pytest.mark.django_db
class TestUserRegistrationView:
    """
    Test cases for UserRegistrationView using pytest
    """
    
    @pytest.fixture
    def api_client(self):
        """Fixture to provide APIClient instance"""
        return get_api_client()
    
    @pytest.fixture
    def valid_user_data(self):
        """Fixture to provide valid user registration data"""
        return {
            'username': 'testuser123',
            'email': 'test@example.com',
            'password': 'testpass123',
            'user_type': 'learner',
            'full_name': 'Test User'
        }
    
    @pytest.fixture
    def invalid_user_data(self):
        """Fixture to provide invalid user registration data"""
        return {
            'username': '',  # Empty username
            'email': 'invalid-email',  # Invalid email format
            'password': '123',  # Too short password
            'user_type': 'invalid_type',  # Invalid user type
            'full_name': ''  # Empty full name
        }
    
    def test_user_registration_success(self, api_client, valid_user_data):
        """
        Test successful user registration
        
        This test:
        1. Sends a POST request to the registration endpoint with valid data
        2. Asserts that the HTTP response status code is 201 Created
        3. Asserts that the new user was actually created in the database
        """
        # Get the URL for user registration
        url = reverse('user-register')
        
        # Send POST request with valid user data
        response = api_client.post(url, valid_user_data, format='json')
        
        # Assert response status is 201 Created
        assert response.status_code == status.HTTP_201_CREATED, \
            f"Expected status 201, but got {response.status_code}. Response: {response.data}"
        
        # Assert user was created in database
        User = get_user_model_instance()
        user = User.objects.filter(username=valid_user_data['username']).first()
        assert user is not None, "User should be created in database"
        assert user.email == valid_user_data['email'], "User email should match"
        assert user.user_type == valid_user_data['user_type'], "User type should match"
        assert user.full_name == valid_user_data['full_name'], "User full name should match"
        
        # Assert password was hashed (not stored as plain text)
        assert user.password != valid_user_data['password'], "Password should be hashed"
        
        # Assert response data contains expected fields
        assert 'id' in response.data, "Response should contain user ID"
        assert 'username' in response.data, "Response should contain username"
        assert 'email' in response.data, "Response should contain email"
        assert 'user_type' in response.data, "Response should contain user type"
        assert 'full_name' in response.data, "Response should contain full name"
        
        # Assert password is not in response (should be write-only)
        assert 'password' not in response.data, "Password should not be in response"
    
    def test_user_registration_without_user_type(self, api_client):
        """
        Test user registration without specifying user_type (should default to 'learner')
        """
        user_data = {
            'username': 'defaultuser',
            'email': 'default@example.com',
            'password': 'testpass123',
            'full_name': 'Default User'
        }
        
        url = reverse('user-register')
        response = api_client.post(url, user_data, format='json')
        
        # Should still succeed
        assert response.status_code == status.HTTP_201_CREATED
        
        # Check that user_type defaults to 'learner'
        User = get_user_model_instance()
        user = User.objects.get(username='defaultuser')
        assert user.user_type == 'learner'
    
    def test_user_registration_without_full_name(self, api_client):
        """
        Test user registration without full_name (should be optional)
        """
        user_data = {
            'username': 'nonameuser',
            'email': 'noname@example.com',
            'password': 'testpass123',
            'user_type': 'learner'
        }
        
        url = reverse('user-register')
        response = api_client.post(url, user_data, format='json')
        
        # Should succeed
        assert response.status_code == status.HTTP_201_CREATED
        
        # Check that user was created
        User = get_user_model_instance()
        user = User.objects.get(username='nonameuser')
        assert user.full_name == '' or user.full_name is None
    
    def test_user_registration_duplicate_username(self, api_client, valid_user_data):
        """
        Test user registration with duplicate username (should fail)
        """
        url = reverse('user-register')
        
        # Create first user
        response1 = api_client.post(url, valid_user_data, format='json')
        assert response1.status_code == status.HTTP_201_CREATED
        
        # Try to create second user with same username
        duplicate_data = valid_user_data.copy()
        duplicate_data['email'] = 'different@example.com'
        
        response2 = api_client.post(url, duplicate_data, format='json')
        assert response2.status_code == status.HTTP_400_BAD_REQUEST
        
        # Check that only one user exists
        User = get_user_model_instance()
        user_count = User.objects.filter(username=valid_user_data['username']).count()
        assert user_count == 1, "Only one user should exist with this username"
    
    def test_user_registration_duplicate_email(self, api_client, valid_user_data):
        """
        Test user registration with duplicate email (should fail)
        """
        url = reverse('user-register')
        
        # Create first user
        response1 = api_client.post(url, valid_user_data, format='json')
        assert response1.status_code == status.HTTP_201_CREATED
        
        # Try to create second user with same email
        duplicate_data = valid_user_data.copy()
        duplicate_data['username'] = 'differentuser'
        
        response2 = api_client.post(url, duplicate_data, format='json')
        assert response2.status_code == status.HTTP_400_BAD_REQUEST
        
        # Check that only one user exists with this email
        User = get_user_model_instance()
        user_count = User.objects.filter(email=valid_user_data['email']).count()
        assert user_count == 1, "Only one user should exist with this email"
    
    def test_user_registration_invalid_data(self, api_client, invalid_user_data):
        """
        Test user registration with invalid data (should fail)
        """
        url = reverse('user-register')
        response = api_client.post(url, invalid_user_data, format='json')
        
        # Should fail with 400 Bad Request
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        
        # Should contain error messages
        assert 'username' in response.data or 'email' in response.data or 'password' in response.data
        
        # No user should be created
        User = get_user_model_instance()
        user_count = User.objects.count()
        assert user_count == 0, "No user should be created with invalid data"
    
    def test_user_registration_missing_required_fields(self, api_client):
        """
        Test user registration with missing required fields
        """
        url = reverse('user-register')
        
        # Test missing username
        data_without_username = {
            'email': 'test@example.com',
            'password': 'testpass123',
            'user_type': 'learner'
        }
        response = api_client.post(url, data_without_username, format='json')
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        
        # Test missing email
        data_without_email = {
            'username': 'testuser',
            'password': 'testpass123',
            'user_type': 'learner'
        }
        response = api_client.post(url, data_without_email, format='json')
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        
        # Test missing password
        data_without_password = {
            'username': 'testuser',
            'email': 'test@example.com',
            'user_type': 'learner'
        }
        response = api_client.post(url, data_without_password, format='json')
        assert response.status_code == status.HTTP_400_BAD_REQUEST
    
    def test_user_registration_invalid_user_type(self, api_client):
        """
        Test user registration with invalid user_type
        """
        user_data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'testpass123',
            'user_type': 'invalid_type',
            'full_name': 'Test User'
        }
        
        url = reverse('user-register')
        response = api_client.post(url, user_data, format='json')
        
        # Should fail
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        
        # No user should be created
        User = get_user_model_instance()
        user_count = User.objects.count()
        assert user_count == 0, "No user should be created with invalid user type"
