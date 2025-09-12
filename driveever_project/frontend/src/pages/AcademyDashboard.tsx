import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Building2, Users, Car, Calendar, TrendingUp, DollarSign, Award, Target, 
  CheckCircle, AlertCircle, BarChart3, Settings, Plus, Search, Filter,
  ChevronRight, ChevronLeft, Eye, Edit, Trash2, Download, Upload, 
  RefreshCw, Zap, Shield, BookOpen, GraduationCap, MapPin, Phone, Mail,
  Star, Clock, UserCheck, FileText, PieChart, Activity
} from 'lucide-react';

const AcademyDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedLocation, setSelectedLocation] = useState('all');

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  // Mock data for demonstration
  const mockData = {
    stats: {
      totalInstructors: 18,
      activeInstructors: 16,
      totalStudents: 247,
      activeStudents: 189,
      totalRevenue: 45680,
      monthlyRevenue: 12450,
      passRate: 94.2,
      averageRating: 4.7
    },
    locations: [
      { id: 1, name: 'Central London', instructors: 8, students: 89, revenue: 18900 },
      { id: 2, name: 'North London', instructors: 5, students: 67, revenue: 14200 },
      { id: 3, name: 'South London', instructors: 5, students: 91, revenue: 12580 }
    ],
    instructors: [
      { id: 1, name: 'Sarah Johnson', location: 'Central London', students: 12, rating: 4.9, status: 'active', lessons: 156, passRate: 96.2 },
      { id: 2, name: 'Mike Chen', location: 'North London', students: 8, rating: 4.7, status: 'active', lessons: 134, passRate: 93.8 },
      { id: 3, name: 'Emma Wilson', location: 'South London', students: 15, rating: 4.8, status: 'active', lessons: 178, passRate: 95.1 },
      { id: 4, name: 'Alex Thompson', location: 'Central London', students: 10, rating: 4.6, status: 'active', lessons: 145, passRate: 92.5 },
      { id: 5, name: 'David Brown', location: 'North London', students: 7, rating: 4.5, status: 'inactive', lessons: 98, passRate: 89.3 },
      { id: 6, name: 'Lisa Davis', location: 'South London', students: 13, rating: 4.9, status: 'active', lessons: 167, passRate: 97.2 }
    ],
    recentBookings: [
      { id: 1, student: 'James Wilson', instructor: 'Sarah Johnson', location: 'Central London', time: 'Today, 2:00 PM', status: 'confirmed', value: 85 },
      { id: 2, student: 'Maria Garcia', instructor: 'Mike Chen', location: 'North London', time: 'Tomorrow, 10:00 AM', status: 'pending', value: 75 },
      { id: 3, student: 'Tom Anderson', instructor: 'Emma Wilson', location: 'South London', time: 'Tomorrow, 4:00 PM', status: 'confirmed', value: 90 },
      { id: 4, student: 'Sophie Lee', instructor: 'Alex Thompson', location: 'Central London', time: 'Wed, 1:00 PM', status: 'completed', value: 85 }
    ],
    studentProgress: [
      { name: 'James Wilson', instructor: 'Sarah Johnson', progress: 75, lessons: 12, nextTest: '2 weeks', status: 'active', location: 'Central London' },
      { name: 'Maria Garcia', instructor: 'Mike Chen', progress: 45, lessons: 8, nextTest: '4 weeks', status: 'active', location: 'North London' },
      { name: 'Tom Anderson', instructor: 'Emma Wilson', progress: 90, lessons: 15, nextTest: '1 week', status: 'test-ready', location: 'South London' },
      { name: 'Sophie Lee', instructor: 'Alex Thompson', progress: 100, lessons: 20, nextTest: 'Completed', status: 'passed', location: 'Central London' }
    ],
    financials: {
      thisMonth: 12450,
      lastMonth: 11890,
      thisYear: 45680,
      trend: '+4.7%',
      expenses: 8230,
      profit: 4220,
      profitMargin: 33.9
    },
    performance: {
      totalLessons: 2340,
      completedLessons: 2210,
      cancelledLessons: 130,
      averageLessonValue: 78.50,
      topPerformingLocation: 'Central London',
      topPerformingInstructor: 'Sarah Johnson'
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-yellow-600';
    if (progress >= 40) return 'text-blue-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-lg border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <Building2 className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Academy Dashboard</h1>
                <p className="text-green-600 font-medium">Multi-Location Driving Academy Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Welcome back,</p>
                <p className="text-lg font-semibold text-gray-900">{user.full_name}</p>
                <p className="text-sm text-green-600">Academy Owner</p>
              </div>
              <button
                onClick={logout}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'instructors', name: 'Instructors', icon: Users },
              { id: 'students', name: 'Students', icon: GraduationCap },
              { id: 'locations', name: 'Locations', icon: MapPin },
              { id: 'finance', name: 'Finance', icon: DollarSign },
              { id: 'performance', name: 'Performance', icon: TrendingUp },
              { id: 'settings', name: 'Settings', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Period & Location Selector */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Academy Overview</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm border border-gray-200 p-1">
                  {['week', 'month', 'year'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedPeriod(period)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        selectedPeriod === period
                          ? 'bg-green-500 text-white shadow-md'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {period.charAt(0).toUpperCase() + period.slice(1)}
                    </button>
                  ))}
                </div>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">All Locations</option>
                  {mockData.locations.map(location => (
                    <option key={location.id} value={location.id}>{location.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Instructors</p>
                    <p className="text-3xl font-bold text-gray-900">{mockData.stats.totalInstructors}</p>
                    <p className="text-sm text-green-600 font-medium">+2 this month</p>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-3xl font-bold text-gray-900">{mockData.stats.totalStudents}</p>
                    <p className="text-sm text-blue-600 font-medium">+23 this month</p>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                    <p className="text-3xl font-bold text-gray-900">£{mockData.stats.monthlyRevenue.toLocaleString()}</p>
                    <p className="text-sm text-purple-600 font-medium">{mockData.financials.trend}</p>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center">
                    <DollarSign className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pass Rate</p>
                    <p className="text-3xl font-bold text-gray-900">{mockData.stats.passRate}%</p>
                    <p className="text-sm text-yellow-600 font-medium">+2.1% vs last month</p>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl flex items-center justify-center">
                    <Award className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Academy Info & Quick Stats */}
              <div className="lg:col-span-1 space-y-6">
                {/* Enhanced Academy Profile Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Building2 className="h-12 w-12 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">DriveEver Academy</h2>
                    <p className="text-green-600 font-medium">Multi-Location Driving School</p>
                    <p className="text-gray-500 text-sm mt-1">{user.email}</p>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>3 Locations across London</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>+44 800 123 4567</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>{user.email}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Average Rating</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-gray-900 font-medium">{mockData.stats.averageRating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Revenue</span>
                      <span className="text-gray-900 font-medium">£{mockData.stats.totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Established</span>
                      <span className="text-gray-900 font-medium">2018</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      <Plus className="h-5 w-5 mr-2" />
                      Add New Instructor
                    </button>
                    <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      <MapPin className="h-5 w-5 mr-2" />
                      Add New Location
                    </button>
                    <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      <FileText className="h-5 w-5 mr-2" />
                      Generate Reports
                    </button>
                  </div>
                </div>

                {/* Performance Highlights */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Highlights</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Award className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Top Location</p>
                          <p className="text-xs text-gray-500">{mockData.performance.topPerformingLocation}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Star className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Top Instructor</p>
                          <p className="text-xs text-gray-500">{mockData.performance.topPerformingInstructor}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Dashboard Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Location Performance */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Location Performance</h3>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">View All Locations</button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {mockData.locations.map((location) => (
                        <div key={location.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                              <MapPin className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{location.name}</p>
                              <p className="text-xs text-gray-500">{location.instructors} instructors • {location.students} students</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-900">£{location.revenue.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">Revenue</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Bookings */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Recent Bookings</h3>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">View All Bookings</button>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {mockData.recentBookings.map((booking) => (
                      <div key={booking.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <Calendar className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{booking.student}</p>
                              <p className="text-sm text-gray-500">{booking.instructor} • {booking.location}</p>
                              <p className="text-xs text-green-600 font-medium">{booking.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                            <span className="text-sm font-medium text-gray-900">£{booking.value}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Financial Overview */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Financial Overview</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-green-50 rounded-xl">
                        <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">£{mockData.financials.thisMonth.toLocaleString()}</p>
                        <p className="text-sm text-green-600 font-medium">{mockData.financials.trend}</p>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-xl">
                        <p className="text-sm font-medium text-gray-600">Monthly Profit</p>
                        <p className="text-2xl font-bold text-gray-900">£{mockData.financials.profit.toLocaleString()}</p>
                        <p className="text-sm text-blue-600 font-medium">{mockData.financials.profitMargin}% margin</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-xl">
                        <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">£{mockData.financials.thisYear.toLocaleString()}</p>
                        <p className="text-sm text-purple-600 font-medium">Year to date</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'instructors' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Instructor Management</h2>
              <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Add New Instructor
              </button>
            </div>
            
            {/* Instructor Search & Filter */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search instructors..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <Filter className="h-5 w-5 text-gray-600" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Instructors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockData.instructors.map((instructor) => (
                <div key={instructor.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(instructor.status)}`}>
                      {instructor.status.charAt(0).toUpperCase() + instructor.status.slice(1)}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{instructor.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{instructor.location}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Students</span>
                      <span className="font-medium text-gray-900">{instructor.students}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rating</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-medium text-gray-900">{instructor.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pass Rate</span>
                      <span className="font-medium text-gray-900">{instructor.passRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Lessons</span>
                      <span className="font-medium text-gray-900">{instructor.lessons}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                      View Details
                    </button>
                    <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Student Management</h2>
              <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Add New Student
              </button>
            </div>
            
            {/* Student Search & Filter */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search students..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <Filter className="h-5 w-5 text-gray-600" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Students Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockData.studentProgress.map((student, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-green-600" />
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      student.status === 'passed' ? 'bg-green-100 text-green-800' :
                      student.status === 'test-ready' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {student.status === 'passed' ? 'PASSED' :
                       student.status === 'test-ready' ? 'TEST READY' : 'ACTIVE'}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{student.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{student.instructor} • {student.location}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className={`font-medium ${getProgressColor(student.progress)}`}>{student.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-300`}
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Lessons: {student.lessons}</p>
                      <p>Next test: {student.nextTest}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                      View Details
                    </button>
                    <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'locations' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Location Management</h2>
              <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Add New Location
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockData.locations.map((location) => (
                <div key={location.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{location.name}</h3>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Instructors</span>
                      <span className="font-semibold text-gray-900">{location.instructors}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Students</span>
                      <span className="font-semibold text-gray-900">{location.students}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Revenue</span>
                      <span className="font-semibold text-gray-900">£{location.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                      View Details
                    </button>
                    <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'finance' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Financial Management</h2>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <p className="text-gray-600">Advanced financial analytics and reporting coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Performance Analytics</h2>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <p className="text-gray-600">Performance metrics and insights coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Academy Settings</h2>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <p className="text-gray-600">Settings and configuration options coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademyDashboard;
