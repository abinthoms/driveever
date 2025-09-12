import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration
// You'll need to replace these with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz",
  authDomain: "driveever-dev.firebaseapp.com",
  projectId: "driveever-dev",
  storageBucket: "driveever-dev.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnopqrstuv"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app;
