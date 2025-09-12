#!/usr/bin/env python3
"""
Script to create authentication tokens for existing test users
"""

import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'driveever_project.settings')
django.setup()

from rest_framework.authtoken.models import Token
from user_management.models import User

def create_tokens():
    """Create tokens for all existing users"""
    print("Creating authentication tokens for test users...")
    
    users = User.objects.all()
    
    for user in users:
        token, created = Token.objects.get_or_create(user=user)
        if created:
            print(f"✅ Created token for {user.username}: {token.key}")
        else:
            print(f"📝 Token already exists for {user.username}: {token.key}")
    
    print("\n" + "="*50)
    print("🔑 **AUTHENTICATION TOKENS READY!**")
    print("="*50)
    
    print("\n📋 **Test User Tokens:**")
    print("-" * 40)
    
    for user in users:
        token = Token.objects.get(user=user)
        print(f"🔹 {user.username.upper()}:")
        print(f"   Username: {user.username}")
        print(f"   Password: testpass123")
        print(f"   Token: {token.key}")
        print(f"   User Type: {user.user_type}")
        print()
    
    print("="*50)
    print("🚀 **Now you can test the API with tokens!**")
    print("="*50)
    print("Example usage:")
    print("1. Login: POST /api/users/login/")
    print("2. Use token in Authorization header: Token YOUR_TOKEN")
    print("3. Test all booking endpoints!")

if __name__ == "__main__":
    create_tokens()
