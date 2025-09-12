import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

// Types for our dashboard system
export interface DashboardData {
  // User-specific data
  userStats: {
    totalBookings: number;
    completedLessons: number;
    upcomingLessons: number;
    totalEarnings: number;
    rating: number;
    experience: number;
    passRate: number;
  };
  
  // Cross-dashboard data
  recentActivity: ActivityItem[];
  notifications: NotificationItem[];
  systemStats: SystemStats;
  
  // Role-specific data
  instructorData?: InstructorData;
  academyData?: AcademyData;
  learnerData?: LearnerData;
}

export interface ActivityItem {
  id: string;
  type: 'booking' | 'lesson' | 'payment' | 'review' | 'system';
  title: string;
  description: string;
  timestamp: Date;
  userId: string;
  userType: 'learner' | 'instructor' | 'academy';
  status: 'pending' | 'completed' | 'cancelled' | 'error';
  metadata?: Record<string, any>;
}

export interface NotificationItem {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface SystemStats {
  totalUsers: number;
  activeBookings: number;
  totalRevenue: number;
  systemHealth: 'excellent' | 'good' | 'fair' | 'poor';
  lastUpdate: Date;
}

export interface InstructorData {
  students?: Student[];
  availability?: AvailabilitySlot[];
  earnings?: EarningsData;
  performance?: PerformanceMetrics;
}

export interface AcademyData {
  instructors?: Instructor[];
  locations?: Location[];
  financials?: FinancialData;
  performance?: AcademyPerformance;
}

export interface LearnerData {
  progress?: ProgressData;
  bookings?: Booking[];
  payments?: Payment[];
  resources?: LearningResource[];
}

export interface Student {
  id: string;
  name: string;
  email: string;
  progress: number;
  lessons: number;
  nextTest: string;
  status: 'active' | 'test-ready' | 'passed' | 'inactive';
  instructor: string;
  location: string;
}

export interface Instructor {
  id: string;
  name: string;
  email: string;
  location: string;
  students: number;
  rating: number;
  status: 'active' | 'inactive';
  lessons: number;
  passRate: number;
}

export interface Location {
  id: string;
  name: string;
  instructors: number;
  students: number;
  revenue: number;
  status: 'active' | 'inactive';
}

export interface AvailabilitySlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'available' | 'booked' | 'blocked';
  studentId?: string;
}

export interface EarningsData {
  thisWeek: number;
  thisMonth: number;
  thisYear: number;
  trend: string;
  expenses: number;
  profit: number;
  profitMargin: number;
}

export interface PerformanceMetrics {
  totalLessons: number;
  completedLessons: number;
  cancelledLessons: number;
  averageRating: number;
  passRate: number;
}

export interface FinancialData {
  monthlyRevenue: number;
  monthlyExpenses: number;
  monthlyProfit: number;
  totalRevenue: number;
  profitMargin: number;
}

export interface AcademyPerformance {
  totalInstructors: number;
  totalStudents: number;
  averagePassRate: number;
  topPerformingLocation: string;
  topPerformingInstructor: string;
}

export interface ProgressData {
  overall: number;
  theory: number;
  practical: number;
  hazard: number;
  nextMilestone: string;
}

export interface Booking {
  id: string;
  student: string;
  instructor: string;
  date: string;
  time: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  type: string;
  value: number;
}

export interface Payment {
  id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: string;
  date: Date;
  description: string;
}

export interface LearningResource {
  id: string;
  title: string;
  type: 'video' | 'document' | 'quiz' | 'practice';
  description: string;
  url: string;
  completed: boolean;
}

// Action types for our reducer
type DashboardAction =
  | { type: 'SET_DASHBOARD_DATA'; payload: Partial<DashboardData> }
  | { type: 'ADD_ACTIVITY'; payload: ActivityItem }
  | { type: 'ADD_NOTIFICATION'; payload: NotificationItem }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'UPDATE_USER_STATS'; payload: Partial<DashboardData['userStats']> }
  | { type: 'UPDATE_INSTRUCTOR_DATA'; payload: Partial<InstructorData> }
  | { type: 'UPDATE_ACADEMY_DATA'; payload: Partial<AcademyData> }
  | { type: 'UPDATE_LEARNER_DATA'; payload: Partial<LearnerData> }
  | { type: 'CLEAR_DASHBOARD_DATA' }
  | { type: 'SET_LOADING'; payload: boolean };

// State interface
interface DashboardState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  lastUpdate: Date | null;
}

// Initial state
const initialState: DashboardState = {
  data: null,
  loading: false,
  error: null,
  lastUpdate: null,
};

// Reducer function
function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case 'SET_DASHBOARD_DATA':
      return {
        ...state,
        data: { ...state.data, ...action.payload } as DashboardData,
        lastUpdate: new Date(),
        error: null,
      };
    
    case 'ADD_ACTIVITY':
      return {
        ...state,
        data: state.data ? {
          ...state.data,
          recentActivity: [action.payload, ...(state.data.recentActivity || []).slice(0, 49)]
        } : null,
        lastUpdate: new Date(),
      };
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        data: state.data ? {
          ...state.data,
          notifications: [action.payload, ...(state.data.notifications || []).slice(0, 99)]
        } : null,
        lastUpdate: new Date(),
      };
    
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        data: state.data ? {
          ...state.data,
          notifications: (state.data.notifications || []).map(notification =>
            notification.id === action.payload ? { ...notification, read: true } : notification
          )
        } : null,
      };
    
    case 'UPDATE_USER_STATS':
      return {
        ...state,
        data: state.data ? {
          ...state.data,
          userStats: { ...state.data.userStats, ...action.payload }
        } : null,
        lastUpdate: new Date(),
      };
    
    case 'UPDATE_INSTRUCTOR_DATA':
      return {
        ...state,
        data: state.data ? {
          ...state.data,
          instructorData: { ...state.data.instructorData, ...action.payload }
        } : null,
        lastUpdate: new Date(),
      };
    
    case 'UPDATE_ACADEMY_DATA':
      return {
        ...state,
        data: state.data ? {
          ...state.data,
          academyData: { ...state.data.academyData, ...action.payload }
        } : null,
        lastUpdate: new Date(),
      };
    
    case 'UPDATE_LEARNER_DATA':
      return {
        ...state,
        data: state.data ? {
          ...state.data,
          learnerData: { ...state.data.learnerData, ...action.payload }
        } : null,
        lastUpdate: new Date(),
      };
    
    case 'CLEAR_DASHBOARD_DATA':
      return {
        ...state,
        data: null,
        lastUpdate: null,
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    
    default:
      return state;
  }
}

// Context interface
interface DashboardContextType {
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
  
  // Data getters
  getUserStats: () => DashboardData['userStats'] | null;
  getRecentActivity: () => ActivityItem[];
  getNotifications: () => NotificationItem[];
  getUnreadNotifications: () => NotificationItem[];
  getSystemStats: () => SystemStats | null;
  
  // Role-specific data getters
  getInstructorData: () => InstructorData | null;
  getAcademyData: () => AcademyData | null;
  getLearnerData: () => LearnerData | null;
  
  // Actions
  refreshDashboard: () => Promise<void>;
  addActivity: (activity: Omit<ActivityItem, 'id' | 'timestamp'>) => void;
  addNotification: (notification: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  
  // Utility functions
  isDataStale: (maxAgeMinutes?: number) => boolean;
  getDashboardSummary: () => Record<string, any>;
}

// Create context
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Provider component
interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);
  const { user } = useAuth();

  // Mock data generator based on user type
  const generateMockData = (): DashboardData => {
    const baseStats = {
      totalBookings: Math.floor(Math.random() * 100) + 20,
      completedLessons: Math.floor(Math.random() * 80) + 15,
      upcomingLessons: Math.floor(Math.random() * 10) + 1,
      totalEarnings: Math.floor(Math.random() * 5000) + 1000,
      rating: 4.5 + Math.random() * 0.5,
      experience: Math.floor(Math.random() * 10) + 1,
      passRate: 85 + Math.random() * 15,
    };

    const baseData: DashboardData = {
      userStats: baseStats,
      recentActivity: [],
      notifications: [],
      systemStats: {
        totalUsers: 1247,
        activeBookings: 89,
        totalRevenue: 45680,
        systemHealth: 'excellent',
        lastUpdate: new Date(),
      },
    };

    // Generate role-specific data
    if (user?.user_type === 'instructor') {
      baseData.instructorData = {
        students: generateMockStudents(),
        availability: generateMockAvailability(),
        earnings: generateMockEarnings(),
        performance: generateMockPerformance(),
      };
    } else if (user?.user_type === 'academy') {
      baseData.academyData = {
        instructors: generateMockInstructors(),
        locations: generateMockLocations(),
        financials: generateMockFinancials(),
        performance: generateMockAcademyPerformance(),
      };
    } else {
      baseData.learnerData = {
        progress: generateMockProgress(),
        bookings: generateMockBookings(),
        payments: generateMockPayments(),
        resources: generateMockResources(),
      };
    }

    // Generate recent activity
    baseData.recentActivity = generateMockActivity();
    baseData.notifications = generateMockNotifications();

    return baseData;
  };

  // Mock data generators
  const generateMockStudents = (): Student[] => [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      progress: 75,
      lessons: 12,
      nextTest: '2 weeks',
      status: 'active',
      instructor: 'Mike Chen',
      location: 'Central London',
    },
    {
      id: '2',
      name: 'Emma Wilson',
      email: 'emma@example.com',
      progress: 90,
      lessons: 15,
      nextTest: '1 week',
      status: 'test-ready',
      instructor: 'Mike Chen',
      location: 'Central London',
    },
  ];

  const generateMockInstructors = (): Instructor[] => [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      location: 'Central London',
      students: 12,
      rating: 4.9,
      status: 'active',
      lessons: 156,
      passRate: 96.2,
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike@example.com',
      location: 'North London',
      students: 8,
      rating: 4.7,
      status: 'active',
      lessons: 134,
      passRate: 93.8,
    },
  ];

  const generateMockLocations = (): Location[] => [
    {
      id: '1',
      name: 'Central London',
      instructors: 8,
      students: 89,
      revenue: 18900,
      status: 'active',
    },
    {
      id: '2',
      name: 'North London',
      instructors: 5,
      students: 67,
      revenue: 14200,
      status: 'active',
    },
  ];

  const generateMockAvailability = (): AvailabilitySlot[] => [
    {
      id: '1',
      date: '2024-01-15',
      startTime: '09:00',
      endTime: '11:00',
      status: 'available',
    },
    {
      id: '2',
      date: '2024-01-15',
      startTime: '14:00',
      endTime: '16:00',
      status: 'booked',
      studentId: '1',
    },
  ];

  const generateMockEarnings = (): EarningsData => ({
    thisWeek: 420,
    thisMonth: 1840,
    thisYear: 2840,
    trend: '+12%',
    expenses: 1200,
    profit: 640,
    profitMargin: 34.8,
  });

  const generateMockPerformance = (): PerformanceMetrics => ({
    totalLessons: 234,
    completedLessons: 221,
    cancelledLessons: 13,
    averageRating: 4.8,
    passRate: 94.2,
  });

  const generateMockFinancials = (): FinancialData => ({
    monthlyRevenue: 12450,
    monthlyExpenses: 8230,
    monthlyProfit: 4220,
    totalRevenue: 45680,
    profitMargin: 33.9,
  });

  const generateMockAcademyPerformance = (): AcademyPerformance => ({
    totalInstructors: 18,
    totalStudents: 247,
    averagePassRate: 94.2,
    topPerformingLocation: 'Central London',
    topPerformingInstructor: 'Sarah Johnson',
  });

  const generateMockProgress = (): ProgressData => ({
    overall: 65,
    theory: 80,
    practical: 55,
    hazard: 70,
    nextMilestone: 'Highway Practice',
  });

  const generateMockBookings = (): Booking[] => [
    {
      id: '1',
      student: 'James Wilson',
      instructor: 'Sarah Johnson',
      date: '2024-01-15',
      time: '14:00',
      duration: 2,
      status: 'confirmed',
      type: 'Highway Practice',
      value: 85,
    },
  ];

  const generateMockPayments = (): Payment[] => [
    {
      id: '1',
      amount: 85,
      status: 'completed',
      method: 'Credit Card',
      date: new Date(),
      description: 'Lesson payment',
    },
  ];

  const generateMockResources = (): LearningResource[] => [
    {
      id: '1',
      title: 'Highway Code Basics',
      type: 'document',
      description: 'Essential highway code knowledge',
      url: '/resources/highway-code',
      completed: true,
    },
  ];

  const generateMockActivity = (): ActivityItem[] => [
    {
      id: '1',
      type: 'lesson',
      title: 'Lesson completed',
      description: 'Highway practice lesson completed successfully',
      timestamp: new Date(),
      userId: String(user?.id || '1'),
      userType: (user?.user_type as any) || 'learner',
      status: 'completed',
    },
  ];

  const generateMockNotifications = (): NotificationItem[] => [
    {
      id: '1',
      type: 'success',
      title: 'Booking confirmed',
      message: 'Your lesson has been confirmed for tomorrow',
      timestamp: new Date(),
      read: false,
      priority: 'medium',
    },
  ];

  // Initialize dashboard data
  useEffect(() => {
    if (user && !state.data) {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call
      setTimeout(() => {
        const mockData = generateMockData();
        dispatch({ type: 'SET_DASHBOARD_DATA', payload: mockData });
        dispatch({ type: 'SET_LOADING', payload: false });
      }, 1000);
    }
  }, [user, state.data]);

  // Data getters
  const getUserStats = () => state.data?.userStats || null;
  const getRecentActivity = () => state.data?.recentActivity || [];
  const getNotifications = () => state.data?.notifications || [];
  const getUnreadNotifications = () => (state.data?.notifications || []).filter(n => !n.read);
  const getSystemStats = () => state.data?.systemStats || null;
  const getInstructorData = () => state.data?.instructorData || null;
  const getAcademyData = () => state.data?.academyData || null;
  const getLearnerData = () => state.data?.learnerData || null;

  // Actions
  const refreshDashboard = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate API refresh
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockData = generateMockData();
    dispatch({ type: 'SET_DASHBOARD_DATA', payload: mockData });
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  const addActivity = (activity: Omit<ActivityItem, 'id' | 'timestamp'>) => {
    const newActivity: ActivityItem = {
      ...activity,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };
    dispatch({ type: 'ADD_ACTIVITY', payload: newActivity });
  };

  const addNotification = (notification: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: NotificationItem = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false,
    };
    dispatch({ type: 'ADD_NOTIFICATION', payload: newNotification });
  };

  const markNotificationRead = (id: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
  };

  const clearAllNotifications = () => {
    if (state.data) {
      dispatch({ type: 'SET_DASHBOARD_DATA', payload: { notifications: [] } });
    }
  };

  // Utility functions
  const isDataStale = (maxAgeMinutes: number = 5) => {
    if (!state.lastUpdate) return true;
    const ageInMinutes = (Date.now() - state.lastUpdate.getTime()) / (1000 * 60);
    return ageInMinutes > maxAgeMinutes;
  };

  const getDashboardSummary = () => {
    if (!state.data) return {};
    
    const summary: Record<string, any> = {
      userStats: state.data.userStats,
      systemStats: state.data.systemStats,
      recentActivityCount: state.data.recentActivity.length,
      unreadNotificationsCount: getUnreadNotifications().length,
    };

    if (state.data.instructorData) {
      summary.instructorSummary = {
        studentCount: state.data.instructorData.students?.length || 0,
        totalEarnings: state.data.instructorData.earnings?.thisMonth || 0,
        passRate: state.data.instructorData.performance?.passRate || 0,
      };
    }

    if (state.data.academyData) {
      summary.academySummary = {
        instructorCount: state.data.academyData.instructors?.length || 0,
        locationCount: state.data.academyData.locations?.length || 0,
        totalRevenue: state.data.academyData.financials?.totalRevenue || 0,
      };
    }

    if (state.data.learnerData) {
      summary.learnerSummary = {
        progress: state.data.learnerData.progress?.overall || 0,
        bookingCount: state.data.learnerData.bookings?.length || 0,
        completedResources: state.data.learnerData.resources?.filter(r => r.completed).length || 0,
      };
    }

    return summary;
  };

  const contextValue: DashboardContextType = {
    state,
    dispatch,
    getUserStats,
    getRecentActivity,
    getNotifications,
    getUnreadNotifications,
    getSystemStats,
    getInstructorData,
    getAcademyData,
    getLearnerData,
    refreshDashboard,
    addActivity,
    addNotification,
    markNotificationRead,
    clearAllNotifications,
    isDataStale,
    getDashboardSummary,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook to use the dashboard context
export const useDashboard = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
