import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Car, User, LogOut, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (isLoading) {
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
                  <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">DriveEver</span>
          </div>
        </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">DriveEver</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/search" className="text-gray-600 hover:text-green-600 transition-colors">
              Find Instructors
            </Link>
            {user ? (
              <>
                <Link to="/bookings" className="text-gray-600 hover:text-green-600 transition-colors">
                  My Bookings
                </Link>
                <Link to="/dashboard" className="text-gray-600 hover:text-green-600 transition-colors">
                  Dashboard
                </Link>
                <Link to="/analytics" className="text-gray-600 hover:text-green-600 transition-colors">
                  Analytics
                </Link>
                <Link to="/google-analytics" className="text-gray-600 hover:text-green-600 transition-colors">
                  Website Analytics
                </Link>
                <Link to="/theme-editor" className="text-gray-600 hover:text-green-600 transition-colors">
                  Theme Editor
                </Link>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Welcome, {user.full_name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-green-600 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                to="/search"
                className="text-gray-600 hover:text-green-600 transition-colors px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Find Instructors
              </Link>
              {user ? (
                <>
                  <Link
                    to="/bookings"
                    className="text-gray-600 hover:text-green-600 transition-colors px-4 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Bookings
                  </Link>
                  <Link
                    to="/dashboard"
                    className="text-gray-600 hover:text-green-600 transition-colors px-4 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/analytics"
                    className="text-gray-600 hover:text-green-600 transition-colors px-4 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Analytics
                  </Link>
                  <Link
                    to="/google-analytics"
                    className="text-gray-600 hover:text-green-600 transition-colors px-4 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Website Analytics
                  </Link>
                  <Link
                    to="/theme-editor"
                    className="text-gray-600 hover:text-green-600 transition-colors px-4 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Theme Editor
                  </Link>
                  <div className="px-4 py-2">
                    <span className="text-sm text-gray-600">
                      Welcome, {user.full_name}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors px-4 py-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 px-4">
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-green-600 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

