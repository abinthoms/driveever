// Google OAuth Configuration
// You'll need to replace this with your actual Google OAuth Client ID
export const GOOGLE_CLIENT_ID = "123456789-abcdefghijklmnop.apps.googleusercontent.com";

// Google OAuth scopes
export const GOOGLE_SCOPES = [
  'openid',
  'profile',
  'email'
];

// Google OAuth configuration object
export const googleConfig = {
  clientId: GOOGLE_CLIENT_ID,
  scope: GOOGLE_SCOPES.join(' '),
  prompt: 'select_account'
};
