// DriveEver Authentication Configuration
// Copy this file to config.js and fill in your actual values

export const config = {
  // Firebase Configuration
  firebase: {
    apiKey: "your_firebase_api_key_here",
    authDomain: "your_project.firebaseapp.com",
    projectId: "your_project_id",
    storageBucket: "your_project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your_app_id"
  },

  // Google OAuth Configuration
  google: {
    clientId: "your_google_oauth_client_id.apps.googleusercontent.com"
  },

  // Backend API Configuration
  api: {
    baseUrl: "http://127.0.0.1:8000"
  },

  // Development Settings
  development: {
    debugMode: true,
    enableAnalytics: false
  }
};

// Usage:
// import { config } from './config.js';
// const firebaseConfig = config.firebase;

