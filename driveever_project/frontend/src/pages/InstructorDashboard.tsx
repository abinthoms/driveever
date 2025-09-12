import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useDashboard } from '../contexts/DashboardContext';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatsCard from '../components/dashboard/StatsCard';
import { 
  Car, Calendar, Users, Clock, Star, MapPin, Phone, Mail, 
  TrendingUp, DollarSign, Award, Target, CheckCircle, 
  AlertCircle, BarChart3, Settings, Plus, Search, Filter,
  ChevronRight, ChevronLeft, Eye, Edit, Trash2, Download,
  Upload, RefreshCw, Zap, Shield, BookOpen, GraduationCap
} from 'lucide-react';

const InstructorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { 
    state, 
    getUserStats, 
    getInstructorData, 
    getRecentActivity,
    addActivity,
    addNotification,
    refreshDashboard 
  } = useDashboard();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (state.loading || !state.data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const userStats = getUserStats();
  const instructorData = getInstructorData();
  const recentActivity = getRecentActivity();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
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
      <DashboardHeader 
        title="Instructor Dashboard"
        subtitle="Professional Driving Instruction"
      />

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'students', name: 'Students', icon: Users },
              { id: 'schedule', name: 'Schedule', icon: Calendar },
              { id: 'earnings', name: 'Earnings', icon: DollarSign },
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
            {/* Period Selector */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
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
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Students"
                value={instructorData?.students?.length || 0}
                subtitle="+3 this month"
                icon={Users}
                iconBgColor="from-green-100 to-green-200"
                iconColor="text-green-600"
                trend={{ value: "+3", isPositive: true }}
              />
              
              <StatsCard
                title="Active Students"
                value={instructorData?.students?.filter(s => s.status === 'active').length || 0}
                subtitle="75% retention"
                icon={Target}
                iconBgColor="from-blue-100 to-blue-200"
                iconColor="text-blue-600"
                trend={{ value: "75%", isPositive: true }}
              />
              
              <StatsCard
                title="Completed Lessons"
                value={instructorData?.performance?.totalLessons || 0}
                subtitle="+12 this week"
                icon={CheckCircle}
                iconBgColor="from-purple-100 to-purple-200"
                iconColor="text-purple-600"
                trend={{ value: "+12", isPositive: true }}
              />
              
              <StatsCard
                title="Total Earnings"
                value={`£${instructorData?.earnings?.thisMonth || 0}`}
                subtitle={instructorData?.earnings?.trend || "+0%"}
                icon={DollarSign}
                iconBgColor="from-yellow-100 to-yellow-200"
                iconColor="text-yellow-600"
                trend={{ value: instructorData?.earnings?.trend || "+0%", isPositive: true }}
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile & Quick Stats */}
              <div className="lg:col-span-1 space-y-6">
                {/* Enhanced Profile Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Car className="h-12 w-12 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">{user.full_name}</h2>
                    <p className="text-green-600 font-medium">Professional Driving Instructor</p>
                    <p className="text-gray-500 text-sm mt-1">{user.email}</p>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>London, UK</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>+44 123 456 789</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>{user.email}</span>
                    </div>
                  </div>

                                     <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                     <div className="flex items-center justify-between">
                       <span className="text-gray-600">Rating</span>
                       <div className="flex items-center">
                             <Star className="h-4 w-4 text-yellow-400 fill-current" />
                             <span className="ml-1 text-gray-900 font-medium">{userStats?.rating || 0}</span>
                           </div>
                     </div>
                     <div className="flex items-center justify-between">
                       <span className="text-gray-600">Experience</span>
                       <span className="text-gray-900 font-medium">{userStats?.experience || 0}+ years</span>
                     </div>
                     <div className="flex items-center justify-between">
                       <span className="text-gray-600">ADI Number</span>
                       <span className="text-gray-900 font-medium">123456</span>
                     </div>
                   </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      <Calendar className="h-5 w-5 mr-2" />
                      Update Availability
                    </button>
                    <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      <Plus className="h-5 w-5 mr-2" />
                      Add New Student
                    </button>
                    <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      <BookOpen className="h-5 w-5 mr-2" />
                      View Reports
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Dashboard Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Upcoming Lessons */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Upcoming Lessons</h3>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">View All</button>
                    </div>
                  </div>
                                     <div className="divide-y divide-gray-100">
                     {instructorData?.availability?.filter(slot => slot.status === 'booked').slice(0, 3).map((slot) => (
                       <div key={slot.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                         <div className="flex items-center justify-between">
                           <div className="flex items-center space-x-4">
                             <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                               <Calendar className="h-5 w-5 text-green-600" />
                             </div>
                             <div>
                               <p className="text-sm font-medium text-gray-900">Student {slot.studentId || 'Unknown'}</p>
                               <p className="text-sm text-gray-500">{slot.date}, {slot.startTime} • {slot.endTime}</p>
                               <p className="text-xs text-green-600 font-medium">Scheduled Lesson</p>
                             </div>
                           </div>
                           <div className="flex items-center space-x-2">
                             <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                               <Eye className="h-4 w-4" />
                             </button>
                             <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                               <Edit className="h-4 w-4" />
                             </button>
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                </div>

                {/* Student Progress Overview */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Student Progress</h3>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">View All Students</button>
                    </div>
                  </div>
                  <div className="p-6">
                                         <div className="space-y-4">
                       {instructorData?.students?.slice(0, 4).map((student) => (
                         <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                           <div className="flex items-center space-x-4">
                             <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                               <GraduationCap className="h-6 w-6 text-green-600" />
                             </div>
                             <div>
                               <p className="text-sm font-medium text-gray-900">{student.name}</p>
                               <p className="text-xs text-gray-500">{student.lessons} lessons • Next test: {student.nextTest}</p>
                             </div>
                           </div>
                           <div className="flex items-center space-x-4">
                             <div className="text-right">
                               <p className="text-sm font-medium text-gray-900">{student.progress}%</p>
                               <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                 <div 
                                   className={`h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-300`}
                                   style={{ width: `${student.progress}%` }}
                                 ></div>
                               </div>
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
                         </div>
                       ))}
                     </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">Lesson completed with Emma Wilson</p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">New student registration: Alex Thompson</p>
                          <p className="text-xs text-gray-500">4 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <Star className="h-4 w-4 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">Received 5-star review from Sarah Johnson</p>
                          <p className="text-xs text-gray-500">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                               {instructorData?.students?.map((student) => (
                 <div key={student.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
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

        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Schedule Management</h2>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <p className="text-gray-600">Advanced scheduling features coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Earnings & Finance</h2>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <p className="text-gray-600">Financial analytics and reporting coming soon...</p>
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
            <h2 className="text-2xl font-bold text-gray-900">Settings & Preferences</h2>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <p className="text-gray-600">Settings and configuration options coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;
