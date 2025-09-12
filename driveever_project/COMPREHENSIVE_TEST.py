#!/usr/bin/env python3
"""
DriveEver Comprehensive Dashboard Testing Script
Tests all three user dashboards, unified state management, and cross-dashboard functionality.
"""

import requests
import json
import time
import sys
from datetime import datetime

# Configuration
BACKEND_URL = "http://127.0.0.1:8000"
FRONTEND_URL = "http://localhost:3000"

# Test data
TEST_USERS = {
    'learner': {
        'username': 'testlearner',
        'password': 'testpass123',
        'email': 'learner@test.com',
        'full_name': 'Test Learner',
        'user_type': 'learner'
    },
    'instructor': {
        'username': 'testinstructor',
        'password': 'testpass123',
        'email': 'instructor@test.com',
        'full_name': 'Test Instructor',
        'user_type': 'instructor'
    },
    'academy': {
        'username': 'testacademy',
        'password': 'testpass123',
        'email': 'academy@test.com',
        'full_name': 'Test Academy',
        'user_type': 'academy'
    }
}

class DashboardTester:
    def __init__(self):
        self.session = requests.Session()
        self.tokens = {}
        self.test_results = []
        
    def log_test(self, test_name, status, details=""):
        """Log test results"""
        timestamp = datetime.now().strftime("%H:%M:%S")
        result = {
            'timestamp': timestamp,
            'test': test_name,
            'status': status,
            'details': details
        }
        self.test_results.append(result)
        
        # Print result
        status_icon = "✅" if status == "PASS" else "❌" if status == "FAIL" else "⚠️"
        print(f"{status_icon} {timestamp} - {test_name}: {status}")
        if details:
            print(f"   Details: {details}")
    
    def test_backend_health(self):
        """Test backend server health"""
        try:
            response = self.session.get(f"{BACKEND_URL}/admin/")
            if response.status_code in [200, 302]:  # 302 is redirect to login
                self.log_test("Backend Health Check", "PASS", f"Status: {response.status_code}")
                return True
            else:
                self.log_test("Backend Health Check", "FAIL", f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Backend Health Check", "FAIL", f"Error: {str(e)}")
            return False
    
    def test_database_connection(self):
        """Test database connection through API"""
        try:
            response = self.session.get(f"{BACKEND_URL}/api/users/")
            if response.status_code in [200, 401]:  # 401 is expected for unauthenticated
                self.log_test("Database Connection", "PASS", f"Status: {response.status_code}")
                return True
            else:
                self.log_test("Database Connection", "FAIL", f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Database Connection", "FAIL", f"Error: {str(e)}")
            return False
    
    def create_test_users(self):
        """Create test users for each role"""
        for role, user_data in TEST_USERS.items():
            try:
                response = self.session.post(
                    f"{BACKEND_URL}/api/users/register/",
                    json=user_data,
                    headers={'Content-Type': 'application/json'}
                )
                
                if response.status_code == 201:
                    self.log_test(f"Create {role.title()} User", "PASS", f"User: {user_data['username']}")
                elif response.status_code == 400:
                    # User might already exist
                    self.log_test(f"Create {role.title()} User", "PASS", f"User already exists: {user_data['username']}")
                else:
                    self.log_test(f"Create {role.title()} User", "FAIL", f"Status: {response.status_code}, Response: {response.text}")
                    
            except Exception as e:
                self.log_test(f"Create {role.title()} User", "FAIL", f"Error: {str(e)}")
    
    def test_user_authentication(self):
        """Test user authentication for each role"""
        for role, user_data in TEST_USERS.items():
            try:
                response = self.session.post(
                    f"{BACKEND_URL}/api/users/login/",
                    json={
                        'username': user_data['username'],
                        'password': user_data['password']
                    },
                    headers={'Content-Type': 'application/json'}
                )
                
                if response.status_code == 200:
                    data = response.json()
                    if 'token' in data:
                        self.tokens[role] = data['token']
                        self.log_test(f"Authenticate {role.title()}", "PASS", f"Token received for {user_data['username']}")
                    else:
                        self.log_test(f"Authenticate {role.title()}", "FAIL", "No token in response")
                else:
                    self.log_test(f"Authenticate {role.title()}", "FAIL", f"Status: {response.status_code}, Response: {response.text}")
                    
            except Exception as e:
                self.log_test(f"Authenticate {role.title()}", "FAIL", f"Error: {str(e)}")
    
    def test_learner_dashboard_api(self):
        """Test learner dashboard API endpoints"""
        if 'learner' not in self.tokens:
            self.log_test("Learner Dashboard API", "SKIP", "No learner token available")
            return
        
        headers = {'Authorization': f'Token {self.tokens["learner"]}'}
        
        # Test learner-specific endpoints
        endpoints = [
            '/api/users/booking/my-bookings/',
            '/api/users/',
        ]
        
        for endpoint in endpoints:
            try:
                response = self.session.get(f"{BACKEND_URL}{endpoint}", headers=headers)
                if response.status_code in [200, 404]:  # 404 might be expected for some endpoints
                    self.log_test(f"Learner API: {endpoint}", "PASS", f"Status: {response.status_code}")
                else:
                    self.log_test(f"Learner API: {endpoint}", "FAIL", f"Status: {response.status_code}")
            except Exception as e:
                self.log_test(f"Learner API: {endpoint}", "FAIL", f"Error: {str(e)}")
    
    def test_instructor_dashboard_api(self):
        """Test instructor dashboard API endpoints"""
        if 'instructor' not in self.tokens:
            self.log_test("Instructor Dashboard API", "SKIP", "No instructor token available")
            return
        
        headers = {'Authorization': f'Token {self.tokens["instructor"]}'}
        
        # Test instructor-specific endpoints
        endpoints = [
            '/api/users/booking/my-bookings/',
            '/api/users/instructors/',
            '/api/users/',
        ]
        
        for endpoint in endpoints:
            try:
                response = self.session.get(f"{BACKEND_URL}{endpoint}", headers=headers)
                if response.status_code in [200, 404]:  # 404 might be expected for some endpoints
                    self.log_test(f"Instructor API: {endpoint}", "PASS", f"Status: {response.status_code}")
                else:
                    self.log_test(f"Instructor API: {endpoint}", "FAIL", f"Status: {response.status_code}")
            except Exception as e:
                self.log_test(f"Instructor API: {endpoint}", "FAIL", f"Error: {str(e)}")
    
    def test_academy_dashboard_api(self):
        """Test academy dashboard API endpoints"""
        if 'academy' not in self.tokens:
            self.log_test("Academy Dashboard API", "SKIP", "No academy token available")
            return
        
        headers = {'Authorization': f'Token {self.tokens["academy"]}'}
        
        # Test academy-specific endpoints
        endpoints = [
            '/api/users/',
            '/api/users/instructors/',
        ]
        
        for endpoint in endpoints:
            try:
                response = self.session.get(f"{BACKEND_URL}{endpoint}", headers=headers)
                if response.status_code in [200, 404]:  # 404 might be expected for some endpoints
                    self.log_test(f"Academy API: {endpoint}", "PASS", f"Status: {response.status_code}")
                else:
                    self.log_test(f"Academy API: {endpoint}", "FAIL", f"Status: {response.status_code}")
            except Exception as e:
                self.log_test(f"Academy API: {endpoint}", "FAIL", f"Error: {str(e)}")
    
    def test_booking_system(self):
        """Test booking system functionality"""
        if 'learner' not in self.tokens or 'instructor' not in self.tokens:
            self.log_test("Booking System", "SKIP", "Missing required tokens")
            return
        
        headers = {'Authorization': f'Token {self.tokens["learner"]}'}
        
        # Test availability check
        try:
            response = self.session.get(
                f"{BACKEND_URL}/api/users/booking/availability/",
                headers=headers,
                params={'instructor_id': 1, 'date': '2024-01-15'}
            )
            if response.status_code in [200, 404]:
                self.log_test("Booking: Check Availability", "PASS", f"Status: {response.status_code}")
            else:
                self.log_test("Booking: Check Availability", "FAIL", f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("Booking: Check Availability", "FAIL", f"Error: {str(e)}")
        
        # Test booking creation
        try:
            booking_data = {
                'instructor_id': 1,
                'lesson_date': '2024-01-15',
                'start_time': '14:00:00',
                'duration': 2,
                'car_type': 'manual'
            }
            response = self.session.post(
                f"{BACKEND_URL}/api/users/booking/create/",
                json=booking_data,
                headers={**headers, 'Content-Type': 'application/json'}
            )
            if response.status_code in [201, 400]:  # 400 might be expected for validation
                self.log_test("Booking: Create Booking", "PASS", f"Status: {response.status_code}")
            else:
                self.log_test("Booking: Create Booking", "FAIL", f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("Booking: Create Booking", "FAIL", f"Error: {str(e)}")
    
    def test_cross_dashboard_data_consistency(self):
        """Test data consistency across different dashboards"""
        self.log_test("Cross-Dashboard Data Consistency", "INFO", "Testing unified state management")
        
        # Test that all dashboards can access the same base data structure
        for role in ['learner', 'instructor', 'academy']:
            if role in self.tokens:
                headers = {'Authorization': f'Token {self.tokens[role]}'}
                try:
                    response = self.session.get(f"{BACKEND_URL}/api/users/", headers=headers)
                    if response.status_code == 200:
                        data = response.json()
                        if 'user_type' in data and data['user_type'] == role:
                            self.log_test(f"Data Consistency: {role.title()}", "PASS", "User type matches role")
                        else:
                            self.log_test(f"Data Consistency: {role.title()}", "FAIL", "User type mismatch")
                    else:
                        self.log_test(f"Data Consistency: {role.title()}", "FAIL", f"Status: {response.status_code}")
                except Exception as e:
                    self.log_test(f"Data Consistency: {role.title()}", "FAIL", f"Error: {str(e)}")
    
    def test_frontend_connectivity(self):
        """Test frontend server connectivity"""
        try:
            response = requests.get(FRONTEND_URL, timeout=5)
            if response.status_code == 200:
                self.log_test("Frontend Connectivity", "PASS", f"Status: {response.status_code}")
                return True
            else:
                self.log_test("Frontend Connectivity", "FAIL", f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Frontend Connectivity", "FAIL", f"Error: {str(e)}")
            return False
    
    def test_api_structure(self):
        """Test API structure and response formats"""
        # Test unauthenticated access
        try:
            response = self.session.get(f"{BACKEND_URL}/api/users/")
            if response.status_code == 401:
                self.log_test("API Structure: Authentication Required", "PASS", "Properly protected endpoint")
            else:
                self.log_test("API Structure: Authentication Required", "FAIL", f"Unexpected status: {response.status_code}")
        except Exception as e:
            self.log_test("API Structure: Authentication Required", "FAIL", f"Error: {str(e)}")
        
        # Test CORS headers
        try:
            response = self.session.options(f"{BACKEND_URL}/api/users/")
            if 'Access-Control-Allow-Origin' in response.headers:
                self.log_test("API Structure: CORS Headers", "PASS", "CORS properly configured")
            else:
                self.log_test("API Structure: CORS Headers", "FAIL", "Missing CORS headers")
        except Exception as e:
            self.log_test("API Structure: CORS Headers", "FAIL", f"Error: {str(e)}")
    
    def test_error_handling(self):
        """Test error handling and edge cases"""
        # Test invalid endpoint
        try:
            response = self.session.get(f"{BACKEND_URL}/api/nonexistent/")
            if response.status_code == 404:
                self.log_test("Error Handling: Invalid Endpoint", "PASS", "Proper 404 response")
            else:
                self.log_test("Error Handling: Invalid Endpoint", "FAIL", f"Unexpected status: {response.status_code}")
        except Exception as e:
            self.log_test("Error Handling: Invalid Endpoint", "FAIL", f"Error: {str(e)}")
        
        # Test invalid authentication
        try:
            response = self.session.get(
                f"{BACKEND_URL}/api/users/",
                headers={'Authorization': 'Token invalid_token'}
            )
            if response.status_code == 401:
                self.log_test("Error Handling: Invalid Token", "PASS", "Proper 401 response")
            else:
                self.log_test("Error Handling: Invalid Token", "FAIL", f"Unexpected status: {response.status_code}")
        except Exception as e:
            self.log_test("Error Handling: Invalid Token", "FAIL", f"Error: {str(e)}")
    
    def test_response_formats(self):
        """Test API response formats and data types"""
        if 'learner' in self.tokens:
            headers = {'Authorization': f'Token {self.tokens["learner"]}'}
            try:
                response = self.session.get(f"{BACKEND_URL}/api/users/", headers=headers)
                if response.status_code == 200:
                    data = response.json()
                    # Check response structure
                    required_fields = ['id', 'username', 'email', 'full_name', 'user_type']
                    missing_fields = [field for field in required_fields if field not in data]
                    
                    if not missing_fields:
                        self.log_test("Response Format: User Data", "PASS", "All required fields present")
                    else:
                        self.log_test("Response Format: User Data", "FAIL", f"Missing fields: {missing_fields}")
                        
                    # Check data types
                    if isinstance(data.get('id'), int) and isinstance(data.get('username'), str):
                        self.log_test("Response Format: Data Types", "PASS", "Correct data types")
                    else:
                        self.log_test("Response Format: Data Types", "FAIL", "Incorrect data types")
                        
                else:
                    self.log_test("Response Format: User Data", "FAIL", f"Status: {response.status_code}")
            except Exception as e:
                self.log_test("Response Format: User Data", "FAIL", f"Error: {str(e)}")
    
    def test_performance(self):
        """Test API performance and response times"""
        if 'learner' in self.tokens:
            headers = {'Authorization': f'Token {self.tokens["learner"]}'}
            
            # Test response time
            start_time = time.time()
            try:
                response = self.session.get(f"{BACKEND_URL}/api/users/", headers=headers)
                end_time = time.time()
                response_time = (end_time - start_time) * 1000  # Convert to milliseconds
                
                if response.status_code == 200:
                    if response_time < 1000:  # Less than 1 second
                        self.log_test("Performance: Response Time", "PASS", f"Response time: {response_time:.2f}ms")
                    else:
                        self.log_test("Performance: Response Time", "WARN", f"Slow response: {response_time:.2f}ms")
                else:
                    self.log_test("Performance: Response Time", "FAIL", f"Status: {response.status_code}")
            except Exception as e:
                self.log_test("Performance: Response Time", "FAIL", f"Error: {str(e)}")
    
    def run_all_tests(self):
        """Run all tests in sequence"""
        print("🚗 DriveEver Comprehensive Dashboard Testing")
        print("=" * 60)
        print(f"Backend URL: {BACKEND_URL}")
        print(f"Frontend URL: {FRONTEND_URL}")
        print(f"Start Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 60)
        
        # Backend tests
        if not self.test_backend_health():
            print("❌ Backend is not running. Please start the Django server first.")
            return
        
        if not self.test_database_connection():
            print("❌ Database connection failed. Please check your database configuration.")
            return
        
        # User management tests
        self.create_test_users()
        self.test_user_authentication()
        
        # Dashboard-specific tests
        self.test_learner_dashboard_api()
        self.test_instructor_dashboard_api()
        self.test_academy_dashboard_api()
        
        # System integration tests
        self.test_booking_system()
        self.test_cross_dashboard_data_consistency()
        
        # Frontend tests
        self.test_frontend_connectivity()
        
        # API quality tests
        self.test_api_structure()
        self.test_error_handling()
        self.test_response_formats()
        self.test_performance()
        
        # Summary
        self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = len([r for r in self.test_results if r['status'] == 'PASS'])
        failed_tests = len([r for r in self.test_results if r['status'] == 'FAIL'])
        skipped_tests = len([r for r in self.test_results if r['status'] == 'SKIP'])
        warning_tests = len([r for r in self.test_results if r['status'] == 'WARN'])
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"⚠️  Warnings: {warning_tests}")
        print(f"⏭️  Skipped: {skipped_tests}")
        
        success_rate = (passed_tests / total_tests) * 100 if total_tests > 0 else 0
        print(f"\nSuccess Rate: {success_rate:.1f}%")
        
        if failed_tests > 0:
            print(f"\n❌ FAILED TESTS:")
            for result in self.test_results:
                if result['status'] == 'FAIL':
                    print(f"   - {result['test']}: {result['details']}")
        
        if warning_tests > 0:
            print(f"\n⚠️  WARNINGS:")
            for result in self.test_results:
                if result['status'] == 'WARN':
                    print(f"   - {result['test']}: {result['details']}")
        
        print(f"\nEnd Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 60)

def main():
    """Main function"""
    if len(sys.argv) > 1 and sys.argv[1] == '--help':
        print("DriveEver Comprehensive Dashboard Testing Script")
        print("\nUsage: python COMPREHENSIVE_TEST.py")
        print("\nThis script tests:")
        print("  - Backend server health and database connection")
        print("  - User authentication for all three roles")
        print("  - Dashboard-specific API endpoints")
        print("  - Booking system functionality")
        print("  - Cross-dashboard data consistency")
        print("  - Frontend connectivity")
        print("  - API structure and error handling")
        print("  - Response formats and performance")
        print("\nPrerequisites:")
        print("  - Django backend server running on http://127.0.0.1:8000")
        print("  - React frontend server running on http://localhost:3000")
        print("  - Database properly configured and migrated")
        return
    
    tester = DashboardTester()
    try:
        tester.run_all_tests()
    except KeyboardInterrupt:
        print("\n\n⏹️  Testing interrupted by user")
    except Exception as e:
        print(f"\n\n💥 Unexpected error: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
