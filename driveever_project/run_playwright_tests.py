#!/usr/bin/env python
"""
Playwright Test Runner Script for DriveEver Project
This script manages Django server startup and Playwright test execution
"""

import os
import sys
import subprocess
import time
import signal
import threading
from pathlib import Path

def setup_django():
    """Setup Django environment"""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'driveever_project.settings')
    
    try:
        import django
        django.setup()
        print("✅ Django environment configured successfully")
    except Exception as e:
        print(f"❌ Django setup failed: {e}")
        return False
    return True

def start_django_server():
    """Start Django development server in background"""
    print("🚀 Starting Django development server...")
    
    # Start Django server
    server_process = subprocess.Popen(
        ['python', 'manage.py', 'runserver', '8000'],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    
    # Wait for server to be ready
    print("⏳ Waiting for Django server to start...")
    time.sleep(5)  # Give server time to start
    
    return server_process

def wait_for_server(url, timeout=30):
    """Wait for server to be responsive"""
    import requests
    
    start_time = time.time()
    while time.time() - start_time < timeout:
        try:
            response = requests.get(url, timeout=5)
            if response.status_code == 200:
                print(f"✅ Server is responding at {url}")
                return True
        except:
            time.sleep(1)
    
    print(f"❌ Server not responding at {url} after {timeout} seconds")
    return False

def run_playwright_tests():
    """Run Playwright tests"""
    print("🧪 Running Playwright E2E tests...")
    
    # Run Playwright tests
    result = subprocess.run([
        'npx', 'playwright', 'test',
        '--reporter=html',
        '--project=chromium'  # Start with one browser for simplicity
    ], capture_output=True, text=True)
    
    return result

def cleanup(server_process):
    """Cleanup resources"""
    if server_process:
        print("🛑 Stopping Django server...")
        server_process.terminate()
        server_process.wait()
        print("✅ Django server stopped")

def main():
    """Main test execution function"""
    print("🎭 DriveEver Playwright E2E Test Suite")
    print("=" * 50)
    
    # Setup Django
    if not setup_django():
        return 1
    
    server_process = None
    
    try:
        # Start Django server
        server_process = start_django_server()
        
        # Wait for server to be ready
        if not wait_for_server('http://localhost:8000'):
            print("❌ Django server failed to start")
            return 1
        
        # Run Playwright tests
        test_result = run_playwright_tests()
        
        # Print test output
        if test_result.stdout:
            print("\n📊 Test Output:")
            print(test_result.stdout)
        
        if test_result.stderr:
            print("\n⚠️ Test Warnings/Errors:")
            print(test_result.stderr)
        
        print("=" * 50)
        print(f"✅ Playwright tests completed with exit code: {test_result.returncode}")
        
        if test_result.returncode == 0:
            print("🎉 All E2E tests passed!")
            print("📊 Check the Playwright report:")
            print("   - HTML Report: playwright-report/index.html")
            print("   - Or run: npm run test:e2e:report")
        else:
            print("❌ Some E2E tests failed. Check the output above.")
        
        return test_result.returncode
        
    except KeyboardInterrupt:
        print("\n⚠️ Test execution interrupted by user")
        return 1
    except Exception as e:
        print(f"❌ Error running tests: {e}")
        return 1
    finally:
        cleanup(server_process)

if __name__ == '__main__':
    exit_code = main()
    sys.exit(exit_code)



