import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Car, Search, User, Bell, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Car className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DriveEver
              </span>
              <p className="text-xs text-gray-500 -mt-1">Learn. Drive. Succeed.</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search instructors, locations..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors font-medium">
                <span>Find Instructors</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link to="/instructors" className="block px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">Browse All</Link>
                <Link to="/instructors?nearby=true" className="block px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">Near Me</Link>
                <Link to="/instructors?available=true" className="block px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">Available Now</Link>
              </div>
            </div>
            
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors font-medium">
                <span>Services</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link to="/vehicle-check" className="block px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">Vehicle History Check</Link>
                <Link to="/top-gear" className="block px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">Top Gear Blog</Link>
                <Link to="/learner-dashboard" className="block px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">Learner Dashboard</Link>
                <Link to="/dashboard" className="block px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">Main Dashboard</Link>
              </div>
            </div>
            
            <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Contact</Link>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>

            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <User className="h-6 w-6" />
                <span className="font-medium">Account</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link to="/signin" className="block px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">Sign In</Link>
                <Link to="/signup" className="block px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">Create Account</Link>
                <Link to="/dashboard" className="block px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">Main Dashboard</Link>
                <Link to="/learner-dashboard" className="block px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">Learner Dashboard</Link>
              </div>
            </div>

            {/* CTA Button */}
            <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            {/* Mobile Search */}
            <div className="px-4 py-4 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search instructors, locations..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                />
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="px-4 py-4 space-y-4">
              <Link to="/" className="block text-gray-600 hover:text-gray-900 font-medium py-2">Home</Link>
              
              <div className="space-y-2">
                <div className="text-sm font-semibold text-gray-900 mb-2">Find Instructors</div>
                <Link to="/instructors" className="block text-gray-600 hover:text-gray-900 font-medium py-2 pl-4">Browse All</Link>
                <Link to="/instructors?nearby=true" className="block text-gray-600 hover:text-gray-900 font-medium py-2 pl-4">Near Me</Link>
                <Link to="/instructors?available=true" className="block text-gray-600 hover:text-gray-900 font-medium py-2 pl-4">Available Now</Link>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-semibold text-gray-900 mb-2">Services</div>
                <Link to="/vehicle-check" className="block text-gray-600 hover:text-gray-900 font-medium py-2 pl-4">Vehicle History Check</Link>
                <Link to="/top-gear" className="block text-gray-600 hover:text-gray-900 font-medium py-2 pl-4">Top Gear Blog</Link>
                <Link to="/learner-dashboard" className="block text-gray-600 hover:text-gray-900 font-medium py-2 pl-4">Learner Dashboard</Link>
                <Link to="/dashboard" className="block text-gray-600 hover:text-gray-900 font-medium py-2 pl-4">Main Dashboard</Link>
              </div>

              <Link to="/about" className="block text-gray-600 hover:text-gray-900 font-medium py-2">About</Link>
              <Link to="/contact" className="block text-gray-600 hover:text-gray-900 font-medium py-2">Contact</Link>
            </div>

            {/* Mobile Actions */}
            <div className="px-4 py-4 border-t border-gray-100 space-y-3">
              <Link to="/signin" className="block w-full text-center text-gray-600 hover:text-gray-900 font-medium py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                Sign In
              </Link>
              <Link to="/signup" className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold text-center shadow-lg">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
