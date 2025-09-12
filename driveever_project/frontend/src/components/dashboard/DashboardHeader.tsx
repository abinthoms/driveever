import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useDashboard } from '../../contexts/DashboardContext';
import { 
  Bell, RefreshCw, Settings, User, LogOut, 
  Building2, Car, GraduationCap, TrendingUp
} from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  showRefresh?: boolean;
  showNotifications?: boolean;
  showUserMenu?: boolean;
  onRefresh?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  showRefresh = true,
  showNotifications = true,
  showUserMenu = true,
  onRefresh,
}) => {
  const { user, logout } = useAuth();
  const { 
    getUnreadNotifications, 
    markNotificationRead, 
    refreshDashboard,
    isDataStale 
  } = useDashboard();

  const unreadNotifications = getUnreadNotifications();
  const dataStale = isDataStale();

  const handleRefresh = async () => {
    if (onRefresh) {
      onRefresh();
    } else {
      await refreshDashboard();
    }
  };

  const handleNotificationClick = (notificationId: string) => {
    markNotificationRead(notificationId);
  };

  const getUserTypeIcon = () => {
    switch (user?.user_type) {
      case 'instructor':
        return <Car className="h-6 w-6 text-green-600" />;
      case 'academy':
        return <Building2 className="h-6 w-6 text-green-600" />;
      default:
        return <GraduationCap className="h-6 w-6 text-green-600" />;
    }
  };

  const getUserTypeLabel = () => {
    switch (user?.user_type) {
      case 'instructor':
        return 'Driving Instructor';
      case 'academy':
        return 'Academy Owner';
      default:
        return 'Learner';
    }
  };

  return (
    <div className="bg-white shadow-lg border-b border-green-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Left side - Title and Icon */}
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              {getUserTypeIcon()}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              {subtitle && (
                <p className="text-green-600 font-medium">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Right side - Actions and User Menu */}
          <div className="flex items-center space-x-4">
            {/* Data Freshness Indicator */}
            {dataStale && (
              <div className="flex items-center space-x-2 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-yellow-700">Data may be stale</span>
              </div>
            )}

            {/* Refresh Button */}
            {showRefresh && (
              <button
                onClick={handleRefresh}
                className="p-2 text-gray-400 hover:text-green-600 transition-colors rounded-lg hover:bg-green-50"
                title="Refresh dashboard data"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
            )}

            {/* Notifications */}
            {showNotifications && (
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-green-600 transition-colors rounded-lg hover:bg-green-50 relative">
                  <Bell className="h-5 w-5" />
                  {unreadNotifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadNotifications.length > 9 ? '9+' : unreadNotifications.length}
                    </span>
                  )}
                </button>
                
                {/* Notifications Dropdown */}
                {unreadNotifications.length > 0 && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {unreadNotifications.slice(0, 5).map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification.id)}
                          className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notification.type === 'success' ? 'bg-green-500' :
                              notification.type === 'warning' ? 'bg-yellow-500' :
                              notification.type === 'error' ? 'bg-red-500' :
                              'bg-blue-500'
                            }`}></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-2">
                                {new Date(notification.timestamp).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-gray-200">
                      <button className="w-full text-sm text-green-600 hover:text-green-700 font-medium">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Menu */}
            {showUserMenu && user && (
              <div className="relative group">
                <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">{user.full_name}</p>
                    <p className="text-xs text-green-600">{getUserTypeLabel()}</p>
                  </div>
                </button>

                {/* User Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-4 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{user.full_name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-xs text-green-600 mt-1">{getUserTypeLabel()}</p>
                  </div>
                  
                  <div className="p-2">
                    <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                      <TrendingUp className="h-4 w-4" />
                      <span>Analytics</span>
                    </button>
                  </div>
                  
                  <div className="p-2 border-t border-gray-200">
                    <button
                      onClick={logout}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
