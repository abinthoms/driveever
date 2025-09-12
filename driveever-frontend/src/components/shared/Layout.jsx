import React from 'react';

const Layout = ({ children, showHeader = true, showFooter = true }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple Header */}
      {showHeader && (
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">D</span>
                </div>
                <span className="text-xl font-bold text-gray-900">DriveEver</span>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Home</a>
                <a href="/find-instructors" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Find Instructors</a>
                <a href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Dashboard</a>
              </nav>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Simple Footer */}
      {showFooter && (
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">D</span>
                </div>
                <span className="text-xl font-bold">DriveEver</span>
              </div>
              <p className="text-gray-400 mb-4">
                The UK's leading driving school platform
              </p>
              <div className="border-t border-gray-800 pt-4 text-gray-400">
                <p>&copy; 2024 DriveEver. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
