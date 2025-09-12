import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Eye, EyeOff } from 'lucide-react';

const SignInPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic here
    // For demo purposes, redirect to dashboard
    navigate('/dashboard');
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email login:', { email, password, rememberMe });
    // Implement email login logic here
    // For demo purposes, redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Close Button */}
        <div className="flex justify-end">
          <button className="p-2 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Sign in</h2>
          <p className="mt-2 text-sm text-gray-600">
            New here?{' '}
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              Create an account
            </a>
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          {/* Facebook */}
          <button
            onClick={() => handleSocialLogin('facebook')}
            className="w-full flex items-center justify-center px-4 py-3 border border-blue-500 rounded-lg bg-white hover:bg-gray-50 transition-colors"
          >
            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-xs font-bold">f</span>
            </div>
            <span className="text-gray-700 font-medium">Continue with Facebook</span>
          </button>

          {/* Google */}
          <button
            onClick={() => handleSocialLogin('google')}
            className="w-full flex items-center justify-center px-4 py-3 border border-blue-500 rounded-lg bg-white hover:bg-gray-50 transition-colors"
          >
            <div className="w-5 h-5 mr-3">
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <span className="text-gray-700 font-medium">Continue with Google</span>
          </button>

          {/* Apple */}
          <button
            onClick={() => handleSocialLogin('apple')}
            className="w-full flex items-center justify-center px-4 py-3 border border-blue-500 rounded-lg bg-white hover:bg-gray-50 transition-colors"
          >
            <div className="w-5 h-5 mr-3">
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path fill="#000000" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </div>
            <span className="text-gray-700 font-medium">Continue with Apple</span>
          </button>

          {/* Email */}
          <button
            onClick={() => handleSocialLogin('email')}
            className="w-full flex items-center justify-center px-4 py-3 border border-blue-500 rounded-lg bg-white hover:bg-gray-50 transition-colors"
          >
            <Mail className="w-5 h-5 text-gray-600 mr-3" />
            <span className="text-gray-700 font-medium">Continue with Email</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 text-gray-500">Or continue with email</span>
          </div>
        </div>

        {/* Email Form */}
        <form className="space-y-4" onSubmit={handleEmailLogin}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me on this device
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600">
          By continuing, you agree to the{' '}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
            Terms and Conditions
          </a>{' '}
          and confirm you have read our{' '}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
            Privacy Notice
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
