"""
pytest configuration for DriveEver project
"""
import os
import sys
import django
from django.conf import settings

# Add the project root to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'driveever_project.settings')

# Configure Django
django.setup()

# pytest-django configuration
pytest_plugins = ['pytest_django']

# Django settings for tests
DJANGO_SETTINGS_MODULE = 'driveever_project.settings'
