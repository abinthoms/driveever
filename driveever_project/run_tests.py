#!/usr/bin/env python
"""
Test runner script for DriveEver project
Run this script to execute all tests with pytest
"""

import os
import sys
import subprocess
import django
from django.conf import settings

def setup_django():
    """Setup Django environment for testing"""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'driveever_project.settings')
    django.setup()

def run_tests():
    """Run pytest with configured options"""
    print("🚀 Starting DriveEver Test Suite...")
    print("=" * 50)
    
    # Create reports directory if it doesn't exist
    os.makedirs('reports', exist_ok=True)
    
    # Run pytest with our configuration
    cmd = [
        'python', '-m', 'pytest',
        '--html=reports/test_report.html',
        '--self-contained-html',
        '--cov=user_management',
        '--cov-report=html:reports/coverage',
        '--cov-report=term-missing',
        '--cov-fail-under=80',
        '-v'
    ]
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        # Print output
        if result.stdout:
            print(result.stdout)
        if result.stderr:
            print("Errors/Warnings:", result.stderr)
        
        print("=" * 50)
        print(f"✅ Tests completed with exit code: {result.returncode}")
        
        if result.returncode == 0:
            print("🎉 All tests passed!")
            print("📊 Check the reports:")
            print("   - HTML Test Report: reports/test_report.html")
            print("   - Coverage Report: reports/coverage/index.html")
        else:
            print("❌ Some tests failed. Check the output above.")
            
        return result.returncode
        
    except Exception as e:
        print(f"❌ Error running tests: {e}")
        return 1

if __name__ == '__main__':
    setup_django()
    exit_code = run_tests()
    sys.exit(exit_code)
