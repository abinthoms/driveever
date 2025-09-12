import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer, 
  Clock, 
  MapPin,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Target,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Download,
  Filter,
  Search,
  Settings
} from 'lucide-react';

interface AnalyticsData {
  realTime: {
    activeUsers: number;
    pageViews: number;
    sessions: number;
    bounceRate: number;
  };
  overview: {
    totalUsers: number;
    newUsers: number;
    sessions: number;
    pageViews: number;
    avgSessionDuration: number;
    bounceRate: number;
    conversionRate: number;
    revenue: number;
  };
  traffic: {
    sources: Array<{ name: string; users: number; percentage: number; trend: 'up' | 'down' }>;
    devices: Array<{ name: string; users: number; percentage: number }>;
    locations: Array<{ name: string; users: number; percentage: number }>;
  };
  behavior: {
    topPages: Array<{ page: string; views: number; uniqueViews: number; avgTime: number; bounceRate: number }>;
    userFlow: Array<{ step: string; users: number; dropoff: number; conversion: number }>;
    events: Array<{ name: string; count: number; uniqueUsers: number; conversion: number }>;
  };
  conversions: {
    funnels: Array<{ name: string; steps: Array<{ step: string; users: number; conversion: number }> }>;
    goals: Array<{ name: string; target: number; current: number; completion: number }>;
  };
}

const GoogleAnalytics: React.FC = () => {
  const { user, logout } = useAuth();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    realTime: {
      activeUsers: 127,
      pageViews: 342,
      sessions: 89,
      bounceRate: 23.4
    },
    overview: {
      totalUsers: 15420,
      newUsers: 1247,
      sessions: 23456,
      pageViews: 89234,
      avgSessionDuration: 245,
      bounceRate: 34.2,
      conversionRate: 8.7,
      revenue: 45678
    },
    traffic: {
      sources: [
        { name: 'Organic Search', users: 8234, percentage: 53.4, trend: 'up' },
        { name: 'Direct', users: 4567, percentage: 29.6, trend: 'up' },
        { name: 'Social Media', users: 1890, percentage: 12.3, trend: 'down' },
        { name: 'Referral', users: 729, percentage: 4.7, trend: 'up' }
      ],
      devices: [
        { name: 'Desktop', users: 9252, percentage: 60.0 },
        { name: 'Mobile', users: 5544, percentage: 35.9 },
        { name: 'Tablet', users: 624, percentage: 4.1 }
      ],
      locations: [
        { name: 'London', users: 9252, percentage: 60.0 },
        { name: 'Manchester', users: 3084, percentage: 20.0 },
        { name: 'Birmingham', users: 1542, percentage: 10.0 },
        { name: 'Other', users: 1542, percentage: 10.0 }
      ]
    },
    behavior: {
      topPages: [
        { page: '/', views: 15420, uniqueViews: 12345, avgTime: 180, bounceRate: 25.4 },
        { page: '/search', views: 12345, uniqueViews: 9876, avgTime: 120, bounceRate: 32.1 },
        { page: '/instructor/1', views: 9876, uniqueViews: 7890, avgTime: 300, bounceRate: 18.7 },
        { page: '/login', views: 7890, uniqueViews: 6543, avgTime: 60, bounceRate: 45.2 },
        { page: '/register', views: 6543, uniqueViews: 5432, avgTime: 90, bounceRate: 38.9 }
      ],
      userFlow: [
        { step: 'Homepage', users: 15420, dropoff: 0, conversion: 100 },
        { step: 'Search', users: 12345, dropoff: 20.0, conversion: 80.0 },
        { step: 'Instructor Profile', users: 9876, dropoff: 20.0, conversion: 64.0 },
        { step: 'Booking', users: 7890, dropoff: 20.0, conversion: 51.2 },
        { step: 'Payment', users: 6543, dropoff: 17.0, conversion: 42.5 },
        { step: 'Confirmation', users: 5432, dropoff: 17.0, conversion: 35.2 }
      ],
      events: [
        { name: 'Instructor Search', count: 15420, uniqueUsers: 12345, conversion: 80.0 },
        { name: 'Profile View', count: 12345, uniqueUsers: 9876, conversion: 64.0 },
        { name: 'Booking Started', count: 9876, uniqueUsers: 7890, conversion: 51.2 },
        { name: 'Payment Completed', count: 7890, uniqueUsers: 6543, conversion: 42.5 }
      ]
    },
    conversions: {
      funnels: [
        {
          name: 'Driving Lesson Booking',
          steps: [
            { step: 'Search Page', users: 15420, conversion: 100 },
            { step: 'Instructor Profile', users: 12345, conversion: 80.0 },
            { step: 'Booking Form', users: 9876, conversion: 64.0 },
            { step: 'Payment', users: 7890, conversion: 51.2 },
            { step: 'Confirmation', users: 5432, conversion: 35.2 }
          ]
        }
      ],
      goals: [
        { name: 'Lesson Bookings', target: 1000, current: 5432, completion: 543.2 },
        { name: 'New Registrations', target: 500, current: 1247, completion: 249.4 },
        { name: 'Revenue Target', target: 50000, current: 45678, completion: 91.4 }
      ]
    }
  });

  const [dateRange, setDateRange] = useState('7d');
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [isRealTime, setIsRealTime] = useState(true);

  useEffect(() => {
    if (isRealTime) {
      const interval = setInterval(() => {
        // Simulate real-time data updates
        setAnalyticsData(prev => ({
          ...prev,
          realTime: {
            activeUsers: Math.max(50, prev.realTime.activeUsers + Math.floor(Math.random() * 20) - 10),
            pageViews: prev.realTime.pageViews + Math.floor(Math.random() * 10),
            sessions: prev.realTime.sessions + Math.floor(Math.random() * 5),
            bounceRate: Math.max(10, Math.min(50, prev.realTime.bounceRate + (Math.random() - 0.5) * 2))
          }
        }));
      }, refreshInterval * 1000);

      return () => clearInterval(interval);
    }
  }, [isRealTime, refreshInterval]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTrendIcon = (trend: 'up' | 'down') => {
    return trend === 'up' ? 
      <ArrowUpRight className="h-4 w-4 text-green-500" /> : 
      <ArrowDownRight className="h-4 w-4 text-red-500" />;
  };

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
              <h1 className="text-2xl font-bold text-gray-900">Website Analytics Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="1d">Last 24 hours</option>
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
                <button
                  onClick={() => setIsRealTime(!isRealTime)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isRealTime 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <Activity className="h-4 w-4 inline mr-2" />
                  {isRealTime ? 'Real-time ON' : 'Real-time OFF'}
                </button>
              </div>
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
        {/* Real-time Overview */}
        {isRealTime && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Real-time Overview</h2>
              <div className="flex items-center space-x-2">
                <RefreshCw className="h-4 w-4 text-green-600 animate-spin" />
                <span className="text-sm text-gray-500">Live data</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{analyticsData.realTime.activeUsers}</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{analyticsData.realTime.pageViews}</div>
                <div className="text-sm text-gray-600">Page Views</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{analyticsData.realTime.sessions}</div>
                <div className="text-sm text-gray-600">Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">{analyticsData.realTime.bounceRate}%</div>
                <div className="text-sm text-gray-600">Bounce Rate</div>
              </div>
            </div>
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{formatNumber(analyticsData.overview.totalUsers)}</p>
                <p className="text-sm text-green-600">+12% from last period</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sessions</p>
                <p className="text-2xl font-semibold text-gray-900">{formatNumber(analyticsData.overview.sessions)}</p>
                <p className="text-sm text-green-600">+8% from last period</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-semibold text-gray-900">{analyticsData.overview.conversionRate}%</p>
                <p className="text-sm text-green-600">+2.1% from last period</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">£{formatNumber(analyticsData.overview.revenue)}</p>
                <p className="text-sm text-green-600">+15% from last period</p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Traffic Sources & Behavior */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Traffic Sources */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Traffic Sources</h3>
            <div className="space-y-4">
              {analyticsData.traffic.sources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B'][index] }}></div>
                    <span className="text-sm font-medium text-gray-900">{source.name}</span>
                    {getTrendIcon(source.trend)}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{formatNumber(source.users)}</div>
                    <div className="text-sm text-gray-500">{source.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Device Distribution</h3>
            <div className="space-y-4">
              {analyticsData.traffic.devices.map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{device.name}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          width: `${device.percentage}%`,
                          backgroundColor: ['#10B981', '#3B82F6', '#8B5CF6'][index]
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{device.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Flow & Conversion Funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* User Flow */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">User Flow</h3>
            <div className="space-y-4">
              {analyticsData.behavior.userFlow.map((step, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-green-600">{index + 1}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{step.step}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{formatNumber(step.users)}</div>
                    <div className="text-sm text-gray-500">{step.conversion}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Funnel */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Conversion Funnel</h3>
            <div className="space-y-4">
              {analyticsData.conversions.funnels[0].steps.map((step, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{step.step}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-green-600" 
                        style={{ width: `${step.conversion}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{step.conversion}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Pages & Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Pages */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Top Pages</h3>
            <div className="space-y-4">
              {analyticsData.behavior.topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{page.page}</p>
                    <p className="text-xs text-gray-500">{formatNumber(page.views)} views</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{formatDuration(page.avgTime)}</p>
                    <p className="text-xs text-gray-500">{page.bounceRate}% bounce</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Events */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Key Events</h3>
            <div className="space-y-4">
              {analyticsData.behavior.events.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{event.name}</p>
                    <p className="text-xs text-gray-500">{formatNumber(event.count)} total</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{formatNumber(event.uniqueUsers)} users</p>
                    <p className="text-xs text-gray-500">{event.conversion}% conversion</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Goals & Performance */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Goals & Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {analyticsData.conversions.goals.map((goal, index) => (
              <div key={index} className="text-center">
                <h4 className="text-sm font-medium text-gray-900 mb-2">{goal.name}</h4>
                <div className="text-2xl font-bold text-green-600">{goal.completion}%</div>
                <div className="text-sm text-gray-500">
                  {formatNumber(goal.current)} / {formatNumber(goal.target)}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="h-2 rounded-full bg-green-600" 
                    style={{ width: `${Math.min(goal.completion, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleAnalytics;
