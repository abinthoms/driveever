import React, { useState } from 'react';
import { X } from 'lucide-react';
import SignInPage from '../../pages/SignInPage';
import SignUpPage from '../../pages/SignUpPage';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  initialMode = 'signin' 
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal Content */}
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Content */}
          <div className="p-6">
            {mode === 'signin' ? (
              <SignInPage />
            ) : (
              <SignUpPage />
            )}
          </div>

          {/* Mode Toggle */}
          <div className="px-6 pb-6">
            <div className="text-center">
              {mode === 'signin' ? (
                <p className="text-sm text-gray-600">
                  New here?{' '}
                  <button
                    onClick={() => setMode('signup')}
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Create an account
                  </button>
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    onClick={() => setMode('signin')}
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;


