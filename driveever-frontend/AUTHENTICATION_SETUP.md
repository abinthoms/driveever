# DriveEver Modern Authentication Setup Guide

## 🚀 Overview

This guide will help you set up modern enterprise-grade authentication for DriveEver using:
- **Google OAuth 2.0** - Social login with Google accounts
- **Phone Number Verification** - SMS OTP authentication
- **Traditional Email/Password** - Classic authentication
- **Firebase Authentication** - Backend authentication service

## 📋 Prerequisites

- Node.js 18+ and npm
- Google Cloud Console account
- Firebase project
- Twilio account (for SMS verification - optional)

## 🔧 Step 1: Firebase Setup

### 1.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `driveever-auth`
4. Enable Google Analytics (recommended)
5. Click "Create project"

### 1.2 Enable Authentication
1. In Firebase Console, go to "Authentication" → "Sign-in method"
2. Enable the following providers:
   - **Google** (for OAuth)
   - **Phone** (for SMS verification)
   - **Email/Password** (for traditional auth)

### 1.3 Get Firebase Config
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" → "Web"
4. Register app with name: `DriveEver Web App`
5. Copy the config object

### 1.4 Update Firebase Config
Replace the placeholder values in `src/config/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## 🔑 Step 2: Google OAuth Setup

### 2.1 Create OAuth 2.0 Client
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Go to "APIs & Services" → "Credentials"
4. Click "Create Credentials" → "OAuth 2.0 Client IDs"
5. Choose "Web application"
6. Add authorized origins:
   - `http://localhost:5173` (development)
   - `http://localhost:5174` (development)
   - Your production domain
7. Add authorized redirect URIs:
   - `http://localhost:5173`
   - `http://localhost:5174`
   - Your production domain
8. Click "Create"

### 2.2 Update Google Config
Replace the placeholder in `src/config/google.ts`:

```typescript
export const GOOGLE_CLIENT_ID = "your-actual-oauth-client-id.apps.googleusercontent.com";
```

## 📱 Step 3: Phone Verification (Optional)

### 3.1 Twilio Setup (Recommended)
1. Sign up at [Twilio](https://www.twilio.com/)
2. Get your Account SID and Auth Token
3. Purchase a phone number for SMS
4. Update Firebase Phone Auth settings

### 3.2 Firebase Phone Auth
1. In Firebase Console, go to "Authentication" → "Sign-in method"
2. Click "Phone" provider
3. Enable "Phone numbers for testing" (for development)
4. Add test phone numbers if needed

## 🚀 Step 4: Backend Integration

### 4.1 Django Backend Updates
Install required packages:

```bash
pip install django-allauth
pip install django-phonenumber-field
pip install django-otp
```

### 4.2 Update Django Settings
Add to `settings.py`:

```python
INSTALLED_APPS = [
    # ... existing apps
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'phonenumber_field',
    'django_otp',
    'django_otp.plugins.otp_totp',
]

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]

SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': [
            'profile',
            'email',
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
        }
    }
}
```

## 🧪 Step 5: Testing

### 5.1 Start Development Server
```bash
npm run dev
```

### 5.2 Test Authentication Methods
1. **Google OAuth**: Click "Continue with Google"
2. **Phone Verification**: Enter phone number and verify OTP
3. **Email/Password**: Use traditional form

## 🔒 Security Features

### Implemented Security Measures:
- ✅ **Multi-Factor Authentication** support
- ✅ **OAuth 2.0** with secure scopes
- ✅ **Phone verification** with reCAPTCHA
- ✅ **JWT tokens** for session management
- ✅ **Secure logout** across all providers
- ✅ **Input validation** and sanitization

### Enterprise Security Standards:
- ✅ **SOC 2** compliance ready
- ✅ **GDPR** compliant data handling
- ✅ **ISO 27001** security framework
- ✅ **OAuth 2.0** industry standard
- ✅ **OpenID Connect** support

## 📱 Mobile Responsiveness

The authentication system is fully responsive and works on:
- ✅ Desktop browsers
- ✅ Mobile devices
- ✅ Tablets
- ✅ Progressive Web Apps (PWA)

## 🚀 Production Deployment

### Environment Variables
Set these in production:

```bash
FIREBASE_API_KEY=your_production_key
GOOGLE_OAUTH_CLIENT_ID=your_production_client_id
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
```

### Security Headers
Add to your web server:

```nginx
# Security headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

## 🔧 Troubleshooting

### Common Issues:

1. **Google OAuth Error**: Check client ID and authorized origins
2. **Firebase Config Error**: Verify API key and project settings
3. **Phone Verification Fails**: Check Twilio credentials and Firebase settings
4. **CORS Issues**: Update Firebase Auth domain settings

### Debug Mode:
Enable debug logging in development:

```typescript
// In firebase.ts
if (process.env.NODE_ENV === 'development') {
  console.log('Firebase config:', firebaseConfig);
}
```

## 📚 Additional Resources

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [Django Allauth Documentation](https://django-allauth.readthedocs.io/)
- [Twilio SMS API](https://www.twilio.com/docs/sms)

## 🎯 Next Steps

After setup, consider implementing:
1. **Advanced MFA** (hardware tokens, biometric)
2. **SAML SSO** for enterprise clients
3. **Risk-based authentication**
4. **Compliance reporting**
5. **Audit logging**

---

**Need Help?** Check the troubleshooting section or create an issue in the project repository.

