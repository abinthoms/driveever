import { useState } from 'react';
import { Car, Users, GraduationCap, ArrowRight, User, Settings, CreditCard, BookOpen, Star, Clock, Shield, Award, Building2, Globe, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelection = (role: string) => {
    setSelectedRole(role);
  };

  const handleBackToSelection = () => {
    setSelectedRole(null);
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to DriveEver</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose your role to access your personalized dashboard and start your driving journey.
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Learner Card */}
            <div 
              onClick={() => handleRoleSelection('learner')}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-500 group"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Car className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">I'm a Learner</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Book driving lessons, track your progress, and find the perfect instructor to help you pass your test.
                </p>
                <div className="flex items-center justify-center text-blue-600 font-semibold group-hover:text-blue-700">
                  <span>Start Learning</span>
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Instructor Card */}
            <div 
              onClick={() => handleRoleSelection('instructor')}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-green-500 group"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">I'm an Instructor</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Manage your students, set your availability, and grow your teaching business with our platform.
                </p>
                <div className="flex items-center justify-center text-green-600 font-semibold group-hover:text-green-700">
                  <span>Start Teaching</span>
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Driving School Card */}
            <div 
              onClick={() => handleRoleSelection('school')}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-purple-500 group"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">I'm a Driving School</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Manage your instructors, showcase your school, and grow your business with our comprehensive platform.
                </p>
                <div className="flex items-center justify-center text-purple-600 font-semibold group-hover:text-purple-700">
                  <span>Manage School</span>
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // Dashboard content based on selected role
  const renderDashboard = () => {
    if (selectedRole === 'learner') {
      return (
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Your Learning Journey</h1>
              <p className="text-gray-600 mt-2">Track your progress and manage your driving lessons</p>
            </div>
            <button 
              onClick={handleBackToSelection}
              className="text-gray-500 hover:text-gray-700 flex items-center"
            >
              <ArrowRight className="h-5 w-5 mr-2 rotate-180" />
              Change Role
            </button>
          </div>

          {/* Learning Progress */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Lessons Completed</h3>
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
              <div className="text-sm text-gray-500">of 20 planned lessons</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Theory Test</h3>
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">Passed</div>
              <div className="text-sm text-gray-500">Score: 48/50</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Next Lesson</h3>
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">Tomorrow</div>
              <div className="text-sm text-gray-500">2:00 PM with Sarah</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="bg-blue-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Book Lesson</span>
              </button>
              <button className="bg-green-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                <Star className="h-5 w-5" />
                <span>Theory Test</span>
              </button>
              <button 
                onClick={() => window.location.href = '/find-instructor'}
                className="bg-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Users className="h-5 w-5" />
                <span>Find Instructor</span>
              </button>
              <button className="bg-orange-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2">
                <Car className="h-5 w-5" />
                <span>Book Test</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (selectedRole === 'instructor') {
      return (
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Instructor Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage your students and grow your teaching business</p>
            </div>
            <button 
              onClick={handleBackToSelection}
              className="text-gray-500 hover:text-gray-700 flex items-center"
            >
              <ArrowRight className="h-5 w-5 mr-2 rotate-180" />
              Change Role
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Active Students</h3>
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">8</div>
              <div className="text-sm text-gray-500">Currently teaching</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">This Week</h3>
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">24</div>
              <div className="text-sm text-gray-500">Lessons scheduled</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Pass Rate</h3>
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">94%</div>
              <div className="text-sm text-gray-500">First-time passes</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Rating</h3>
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">4.9</div>
              <div className="text-sm text-gray-500">Average rating</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button 
                onClick={() => window.location.href = '/instructor-dashboard'}
                className="bg-blue-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Users className="h-5 w-5" />
                <span>Manage Students</span>
              </button>
              <button 
                onClick={() => window.location.href = '/instructor-dashboard?tab=availability'}
                className="bg-green-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Clock className="h-5 w-5" />
                <span>Set Availability</span>
              </button>
              <button 
                onClick={() => window.location.href = '/instructor-dashboard?tab=bookings'}
                className="bg-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Car className="h-5 w-5" />
                <span>Manage Bookings</span>
              </button>
              <button 
                onClick={() => window.location.href = '/instructor-dashboard?tab=overview'}
                className="bg-orange-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Award className="h-5 w-5" />
                <span>View Reports</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (selectedRole === 'school') {
      return (
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Driving School Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage your instructors, students, and grow your business</p>
            </div>
            <button 
              onClick={handleBackToSelection}
              className="text-gray-500 hover:text-gray-700 flex items-center"
            >
              <ArrowRight className="h-5 w-5 mr-2 rotate-180" />
              Back to Role Selection
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Students</h3>
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">450</div>
              <div className="text-sm text-gray-500">Active learners</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Instructors</h3>
                <GraduationCap className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">12</div>
              <div className="text-sm text-gray-500">Qualified instructors</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Pass Rate</h3>
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">87%</div>
              <div className="text-sm text-gray-500">First-time passes</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Monthly Revenue</h3>
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">£24,500</div>
              <div className="text-sm text-gray-500">This month</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button 
                onClick={() => window.location.href = '/driving-school-dashboard'}
                className="bg-blue-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Building2 className="h-5 w-5" />
                <span>School Dashboard</span>
              </button>
              <button 
                onClick={() => window.location.href = '/driving-schools'}
                className="bg-green-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Globe className="h-5 w-5" />
                <span>Marketplace</span>
              </button>
              <button 
                onClick={() => window.location.href = '/driving-school-dashboard?tab=commissions'}
                className="bg-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
              >
                <DollarSign className="h-5 w-5" />
                <span>Commissions</span>
              </button>
              <button 
                onClick={() => window.location.href = '/driving-school-dashboard?tab=hmrc'}
                className="bg-orange-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Shield className="h-5 w-5" />
                <span>HMRC Compliance</span>
              </button>
            </div>
          </div>

          {/* Commission Information */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">DriveEver Commission Structure</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">10%</div>
                <div className="text-sm text-gray-600">Platform Commission</div>
                <div className="text-xs text-gray-500 mt-1">On all bookings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">90%</div>
                <div className="text-sm text-gray-600">School Earnings</div>
                <div className="text-xs text-gray-500 mt-1">Your revenue</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">Monthly</div>
                <div className="text-sm text-gray-600">Payout Schedule</div>
                <div className="text-xs text-gray-500 mt-1">Regular payments</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderDashboard()}
      </div>
    </div>
  );
};

export default Dashboard;


