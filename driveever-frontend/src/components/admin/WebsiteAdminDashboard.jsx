import React, { useState } from 'react';
import { 
  Settings, 
  Palette, 
  Menu, 
  Layout, 
  Users, 
  FileText, 
  Image, 
  Globe,
  BarChart3,
  TrendingUp,
  Eye,
  Users as UsersIcon,
  MapPin,
  Clock,
  MousePointer,
  Target,
  DollarSign,
  Activity,
  Save,
  Edit,
  Trash2,
  Plus,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Download,
  Filter,
  Calendar,
  Search,
  Smartphone,
  Monitor,
  Globe as GlobeIcon
} from 'lucide-react';

const WebsiteAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const tabs = [
    { id: 'analytics', name: 'Analytics & Insights', icon: BarChart3 },
    { id: 'themes', name: 'Themes & Colors', icon: Palette },
    { id: 'menus', name: 'Navigation Menus', icon: Menu },
    { id: 'headers', name: 'Header Settings', icon: Layout },
    { id: 'footers', name: 'Footer Settings', icon: Layout },
    { id: 'content', name: 'Content Management', icon: FileText },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'media', name: 'Media Library', icon: Image },
    { id: 'seo', name: 'SEO Settings', icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings className="h-6 w-6" />
              <span className="text-xl font-bold">DriveEver Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">Admin User</span>
              <button className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-sm transition-all duration-300`}>
          <div className="p-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-full p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {isSidebarOpen ? '←' : '→'}
            </button>
          </div>
          
          <nav className="space-y-2 px-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-green-100 text-green-700 border-l-4 border-green-500'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {isSidebarOpen && <span className="text-sm font-medium">{tab.name}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {tabs.find(tab => tab.id === activeTab)?.name}
            </h1>
            <p className="text-gray-600 mt-1">
              {activeTab === 'analytics' 
                ? 'Real-time insights and comprehensive analytics for your website'
                : 'Manage your website settings and configurations'
              }
            </p>
          </div>

          {/* Content Based on Active Tab */}
          {activeTab === 'analytics' && <AnalyticsTab />}
          {activeTab === 'themes' && <ThemesTab />}
          {activeTab === 'menus' && <MenusTab />}
          {activeTab === 'headers' && <HeadersTab />}
          {activeTab === 'footers' && <FootersTab />}
          {activeTab === 'content' && <ContentTab />}
          {activeTab === 'users' && <UsersTab />}
          {activeTab === 'media' && <MediaTab />}
          {activeTab === 'seo' && <SEOTab />}
        </div>
      </div>
    </div>
  );
};

// Analytics Tab - Comprehensive Analytics Dashboard
const AnalyticsTab = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [refreshInterval, setRefreshInterval] = useState(30);

  // Mock real-time data
  const realTimeData = {
    currentUsers: 47,
    pageViews: 156,
    sessions: 89,
    bounceRate: 23.4,
    avgSessionDuration: '4m 32s'
  };

  const trafficData = {
    totalVisitors: 12450,
    uniqueVisitors: 8920,
    pageViews: 45670,
    sessions: 15680,
    newUsers: 7890,
    returningUsers: 4560
  };

  const topPages = [
    { page: '/', views: 12540, uniqueViews: 8920, bounceRate: 18.2 },
    { page: '/find-instructors', views: 8900, uniqueViews: 6540, bounceRate: 25.1 },
    { page: '/instructor-dashboard', views: 5670, uniqueViews: 2340, bounceRate: 12.5 },
    { page: '/courses', views: 3450, uniqueViews: 2890, bounceRate: 31.8 },
    { page: '/about', views: 2340, uniqueViews: 1980, bounceRate: 28.9 }
  ];

  const deviceData = [
    { device: 'Desktop', users: 65, sessions: 10200, avgDuration: '5m 12s' },
    { device: 'Mobile', users: 28, sessions: 4390, avgDuration: '3m 45s' },
    { device: 'Tablet', users: 7, sessions: 1090, avgDuration: '4m 18s' }
  ];

  const locationData = [
    { country: 'United Kingdom', users: 45, sessions: 7050, avgDuration: '4m 52s' },
    { country: 'United States', users: 18, sessions: 2820, avgDuration: '3m 58s' },
    { country: 'Canada', users: 12, sessions: 1880, avgDuration: '4m 15s' },
    { country: 'Australia', users: 8, sessions: 1250, avgDuration: '3m 42s' },
    { country: 'Germany', users: 6, sessions: 940, avgDuration: '4m 8s' }
  ];

  const conversionData = {
    totalInquiries: 234,
    instructorRegistrations: 89,
    studentRegistrations: 567,
    courseBookings: 123,
    conversionRate: 3.2
  };

  const userBehavior = {
    avgPagesPerSession: 4.2,
    mostPopularPath: '/ → /find-instructors → /instructor-profile',
    exitPages: [
      { page: '/contact', exits: 234, exitRate: 15.2 },
      { page: '/courses', exits: 189, exitRate: 12.3 },
      { page: '/about', exits: 156, exitRate: 10.1 }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Real-Time Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Live Users</p>
              <p className="text-2xl font-bold text-gray-900">{realTimeData.currentUsers}</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Right now</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Page Views</p>
              <p className="text-2xl font-bold text-gray-900">{realTimeData.pageViews}</p>
            </div>
            <Eye className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-xs text-gray-500 mt-1">Last hour</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sessions</p>
              <p className="text-2xl font-bold text-gray-900">{realTimeData.sessions}</p>
            </div>
            <UsersIcon className="h-6 w-6 text-purple-500" />
          </div>
          <p className="text-xs text-gray-500 mt-1">Active</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Bounce Rate</p>
              <p className="text-2xl font-bold text-gray-900">{realTimeData.bounceRate}%</p>
            </div>
            <Target className="h-6 w-6 text-yellow-500" />
          </div>
          <p className="text-xs text-gray-500 mt-1">Current</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Duration</p>
              <p className="text-2xl font-bold text-gray-900">{realTimeData.avgSessionDuration}</p>
            </div>
            <Clock className="h-6 w-6 text-red-500" />
          </div>
          <p className="text-xs text-gray-500 mt-1">Per session</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <select 
              value={refreshInterval} 
              onChange={(e) => setRefreshInterval(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            >
              <option value={15}>15s refresh</option>
              <option value={30}>30s refresh</option>
              <option value={60}>1m refresh</option>
              <option value={300}>5m refresh</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Traffic Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Traffic Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Visitors</span>
              <span className="font-semibold">{trafficData.totalVisitors.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Unique Visitors</span>
              <span className="font-semibold">{trafficData.uniqueVisitors.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Page Views</span>
              <span className="font-semibold">{trafficData.pageViews.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Sessions</span>
              <span className="font-semibold">{trafficData.sessions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">New Users</span>
              <span className="font-semibold">{trafficData.newUsers.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Returning Users</span>
              <span className="font-semibold">{trafficData.returningUsers.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Conversion Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Inquiries</span>
              <span className="font-semibold">{conversionData.totalInquiries}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Instructor Registrations</span>
              <span className="font-semibold">{conversionData.instructorRegistrations}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Student Registrations</span>
              <span className="font-semibold">{conversionData.studentRegistrations}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Course Bookings</span>
              <span className="font-semibold">{conversionData.courseBookings}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Conversion Rate</span>
              <span className="font-semibold text-green-600">{conversionData.conversionRate}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Pages & User Behavior */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
          <div className="space-y-3">
            {topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-sm">{page.page}</p>
                  <p className="text-xs text-gray-500">{page.views.toLocaleString()} views</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{page.uniqueViews.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{page.bounceRate}% bounce</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">User Behavior</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg Pages/Session</span>
              <span className="font-semibold">{userBehavior.avgPagesPerSession}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Most Popular Path</span>
              <span className="font-semibold text-xs">{userBehavior.mostPopularPath}</span>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Top Exit Pages</p>
              {userBehavior.exitPages.map((exit, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{exit.page}</span>
                  <span className="font-medium">{exit.exits} ({exit.exitRate}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Device & Location Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Device Analytics</h3>
          <div className="space-y-4">
            {deviceData.map((device, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {device.device === 'Desktop' && <Monitor className="h-5 w-5 text-blue-500" />}
                  {device.device === 'Mobile' && <Smartphone className="h-5 w-5 text-green-500" />}
                  {device.device === 'Tablet' && <Monitor className="h-5 w-5 text-purple-500" />}
                  <span className="font-medium">{device.device}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{device.users}%</p>
                  <p className="text-xs text-gray-500">{device.sessions.toLocaleString()} sessions</p>
                  <p className="text-xs text-gray-500">{device.avgDuration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Geographic Distribution</h3>
          <div className="space-y-4">
            {locationData.map((location, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <GlobeIcon className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">{location.country}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{location.users}%</p>
                  <p className="text-xs text-gray-500">{location.sessions.toLocaleString()} sessions</p>
                  <p className="text-xs text-gray-500">{location.avgDuration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-Time Activity Feed */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Real-Time Activity Feed</h3>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {[
            { user: 'John D.', action: 'viewed instructor profile', time: '2 seconds ago', page: '/instructor/123' },
            { user: 'Sarah M.', action: 'submitted inquiry form', time: '15 seconds ago', page: '/contact' },
            { user: 'Mike R.', action: 'booked driving lesson', time: '1 minute ago', page: '/booking/456' },
            { user: 'Emma L.', action: 'registered as student', time: '3 minutes ago', page: '/register' },
            { user: 'David K.', action: 'viewed course details', time: '5 minutes ago', page: '/courses/intensive' },
            { user: 'Lisa P.', action: 'searched for instructors', time: '7 minutes ago', page: '/find-instructors' },
            { user: 'Tom W.', action: 'completed payment', time: '10 minutes ago', page: '/payment/success' },
            { user: 'Anna B.', action: 'left review', time: '12 minutes ago', page: '/review/789' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span> {activity.action}
                </p>
                <p className="text-xs text-gray-500">{activity.page}</p>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Theme Management Tab
const ThemesTab = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Color Scheme</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
          <input type="color" className="w-full h-12 rounded-lg border" defaultValue="#10B981" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
          <input type="color" className="w-full h-12 rounded-lg border" defaultValue="#3B82F6" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
          <input type="color" className="w-full h-12 rounded-lg border" defaultValue="#F59E0B" />
        </div>
      </div>
    </div>

    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Typography</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Primary Font</label>
          <select className="w-full p-2 border rounded-lg">
            <option>Inter</option>
            <option>Roboto</option>
            <option>Open Sans</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Font Size Base</label>
          <input type="range" min="12" max="20" className="w-full" defaultValue="16" />
        </div>
      </div>
    </div>

    <div className="flex justify-end space-x-3">
      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
        Reset to Default
      </button>
      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
        <Save className="h-4 w-4" />
        <span>Save Changes</span>
      </button>
    </div>
  </div>
);

// Menu Management Tab
const MenusTab = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Navigation Menus</h3>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Menu Item</span>
        </button>
      </div>
      
      <div className="space-y-3">
        {['Home', 'Find Instructors', 'Driving Schools', 'Courses', 'About', 'Contact'].map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-gray-900 font-medium">{item}</span>
              <span className="text-sm text-gray-500">/{item.toLowerCase().replace(' ', '-')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                <Edit className="h-4 w-4" />
              </button>
              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Header Settings Tab
const HeadersTab = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Header Configuration</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input type="checkbox" id="showRibbon" defaultChecked className="rounded" />
          <label htmlFor="showRibbon" className="text-sm font-medium">Show Top Ribbon</label>
        </div>
        <div className="flex items-center space-x-3">
          <input type="checkbox" id="showLogo" defaultChecked className="rounded" />
          <label htmlFor="showLogo" className="text-sm font-medium">Show Logo</label>
        </div>
        <div className="flex items-center space-x-3">
          <input type="checkbox" id="showNavigation" defaultChecked className="rounded" />
          <label htmlFor="showNavigation" className="text-sm font-medium">Show Navigation</label>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Ribbon Content</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input type="email" className="w-full p-2 border rounded-lg" defaultValue="hello@driveever.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input type="tel" className="w-full p-2 border rounded-lg" defaultValue="+44 800 123 4567" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Special Offer Text</label>
          <input type="text" className="w-full p-2 border rounded-lg" defaultValue="New Students Get 10% Off" />
        </div>
      </div>
    </div>
  </div>
);

// Footer Settings Tab
const FootersTab = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Footer Sections</h3>
      <div className="space-y-4">
        {['Company Info', 'Quick Links', 'Services', 'Support & Legal'].map((section, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
            <span className="font-medium">{section}</span>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                <Edit className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <Eye className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Content Management Tab
const ContentTab = () => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h3 className="text-lg font-semibold mb-4">Content Management</h3>
    <p className="text-gray-600">Manage website content, pages, and blog posts.</p>
  </div>
);

// User Management Tab
const UsersTab = () => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h3 className="text-lg font-semibold mb-4">User Management</h3>
    <p className="text-gray-600">Manage user accounts, permissions, and roles.</p>
  </div>
);

// Media Library Tab
const MediaTab = () => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h3 className="text-lg font-semibold mb-4">Media Library</h3>
    <p className="text-gray-600">Upload and manage images, videos, and documents.</p>
  </div>
);

// SEO Settings Tab
const SEOTab = () => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h3 className="text-lg font-semibold mb-4">SEO Settings</h3>
    <p className="text-gray-600">Configure search engine optimization settings.</p>
  </div>
);

export default WebsiteAdminDashboard;
