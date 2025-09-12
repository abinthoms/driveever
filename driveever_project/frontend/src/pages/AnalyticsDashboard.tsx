import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Car, 
  Users, 
  Calendar, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Activity,
  MapPin,
  Clock,
  Star,
  DollarSign,
  Target
} from 'lucide-react';

const AnalyticsDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-green-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.full_name}</span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-semibold text-gray-900">1,247</p>
                <p className="text-sm text-green-600">+12% from last month</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Car className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Instructors</p>
                <p className="text-2xl font-semibold text-gray-900">34</p>
                <p className="text-sm text-blue-600">+3 this month</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Lessons This Month</p>
                <p className="text-2xl font-semibold text-gray-900">2,891</p>
                <p className="text-sm text-purple-600">+8% from last month</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-semibold text-gray-900">94.2%</p>
                <p className="text-sm text-yellow-600">+2.1% from last month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Monthly Revenue</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Last 6 months</span>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">January</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-sm font-medium">£12,450</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">February</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                  <span className="text-sm font-medium">£13,680</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">March</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  <span className="text-sm font-medium">£11,890</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">April</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '91%' }}></div>
                  </div>
                  <span className="text-sm font-medium">£15,230</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">May</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                  <span className="text-sm font-medium">£14,750</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">June</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  <span className="text-sm font-medium">£16,420</span>
                </div>
              </div>
            </div>
          </div>

          {/* Student Demographics */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Student Demographics</h3>
              <PieChart className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Age 17-25</span>
                </div>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Age 26-35</span>
                </div>
                <span className="text-sm font-medium">32%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Age 36-45</span>
                </div>
                <span className="text-sm font-medium">18%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Age 45+</span>
                </div>
                <span className="text-sm font-medium">5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Instructor Performance */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Instructors</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Car className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">John Smith</p>
                    <p className="text-xs text-gray-500">Manual & Automatic</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">4.9</span>
                  </div>
                  <p className="text-xs text-gray-500">98% pass rate</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <Car className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Lisa Brown</p>
                    <p className="text-xs text-gray-500">Automatic Specialist</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">4.8</span>
                  </div>
                  <p className="text-xs text-gray-500">96% pass rate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Statistics */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Lesson Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Manual Lessons</span>
                <span className="text-sm font-medium">1,847</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Automatic Lessons</span>
                <span className="text-sm font-medium">1,044</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Theory Sessions</span>
                <span className="text-sm font-medium">892</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Mock Tests</span>
                <span className="text-sm font-medium">456</span>
              </div>
            </div>
          </div>

          {/* Geographic Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Geographic Distribution</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">Central London</span>
                </div>
                <span className="text-sm font-medium">42%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">North London</span>
                </div>
                <span className="text-sm font-medium">28%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">South London</span>
                </div>
                <span className="text-sm font-medium">18%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">East London</span>
                </div>
                <span className="text-sm font-medium">12%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity and Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">New Student Registration</p>
                    <p className="text-sm text-gray-500">Emma Wilson joined the academy</p>
                  </div>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
              </div>
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Test Passed</p>
                    <p className="text-sm text-gray-500">Sarah Johnson passed her driving test</p>
                  </div>
                  <span className="text-sm text-gray-500">4 hours ago</span>
                </div>
              </div>
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">New Instructor</p>
                    <p className="text-sm text-gray-500">Mike Chen joined the team</p>
                  </div>
                  <span className="text-sm text-gray-500">1 day ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Growth Trends */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Growth Trends</h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Student Growth</span>
                  <span className="text-sm font-medium text-green-600">+15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Revenue Growth</span>
                  <span className="text-sm font-medium text-blue-600">+22%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Pass Rate</span>
                  <span className="text-sm font-medium text-purple-600">+5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
