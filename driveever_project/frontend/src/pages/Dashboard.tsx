import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Calendar, 
  Clock, 
  Star, 
  Car, 
  MapPin, 
  TrendingUp, 
  BookOpen, 
  CheckCircle, 
  AlertCircle,
  Target,
  DollarSign,
  BookOpenCheck,
  FileText,
  Award,
  Lightbulb,
  ChevronRight,
  Play,
  Download,
  Eye,
  MessageCircle,
  CalendarDays,
  GraduationCap,
  Search,
  Bell,
  Settings,
  BarChart3,
  Zap,
  Shield,
  Trophy,
  BookMarked,
  Video,
  FileVideo,
  Users,
  Phone,
  Mail,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface DashboardStats {
  totalLessons: number;
  completedLessons: number;
  upcomingLessons: number;
  averageRating: number;
  totalSpent: number;
  nextLesson: {
    date: string;
    time: string;
    instructor: string;
    type: string;
  } | null;
}

interface RecentActivity {
  id: number;
  type: 'lesson_completed' | 'lesson_booked' | 'lesson_cancelled' | 'payment_made';
  title: string;
  description: string;
  date: string;
  icon: React.ReactNode;
  color: string;
}

interface LearningProgress {
  basicControl: number;
  roadSigns: number;
  highwayDriving: number;
  parking: number;
  emergencyProcedures: number;
  overallProgress: number;
}

interface TestPreparation {
  theoryTest: {
    completed: boolean;
    score?: number;
    date?: string;
  };
  practicalTest: {
    booked: boolean;
    date?: string;
    instructor: string;
    readiness: number;
  };
}

interface FinancialOverview {
  totalSpent: number;
  upcomingPayments: number;
  paymentHistory: Array<{
    date: string;
    amount: number;
    description: string;
    status: 'completed' | 'pending' | 'failed';
  }>;
}

interface LearningResource {
  id: number;
  title: string;
  type: 'video' | 'document' | 'quiz' | 'practice';
  description: string;
  duration?: string;
  completed: boolean;
}

interface InstructorFeedback {
  instructor: string;
  rating: number;
  comment: string;
  date: string;
  lessonType: string;
}

interface Milestone {
  id: number;
  title: string;
  description: string;
  targetDate: string;
  completed: boolean;
  type: 'lesson' | 'test' | 'skill' | 'payment';
}

interface VehicleCheckData {
  registrationNumber: string;
  make: string;
  yearOfManufacture: number;
  fuelType: string;
  colour: string;
  motStatus: string;
  taxStatus: string;
  lastChecked: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [learningProgress, setLearningProgress] = useState<LearningProgress | null>(null);
  const [testPreparation, setTestPreparation] = useState<TestPreparation | null>(null);
  const [financialOverview, setFinancialOverview] = useState<FinancialOverview | null>(null);
  const [learningResources, setLearningResources] = useState<LearningResource[]>([]);
  const [instructorFeedback, setInstructorFeedback] = useState<InstructorFeedback[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [vehicleCheckData, setVehicleCheckData] = useState<VehicleCheckData | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || !token) {
      navigate('/login');
      return;
    }
    fetchDashboardData();
  }, [user, token, navigate]);

  const fetchDashboardData = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockStats: DashboardStats = {
        totalLessons: 12,
        completedLessons: 8,
        upcomingLessons: 2,
        averageRating: 4.7,
        totalSpent: 420.00,
        nextLesson: {
          date: '2025-08-27',
          time: '09:00 - 10:00',
          instructor: 'John Smith',
          type: 'Standard Lesson'
        }
      };

      const mockActivity: RecentActivity[] = [
        {
          id: 1,
          type: 'lesson_completed',
          title: 'Lesson Completed',
          description: 'Highway driving lesson with Sarah Johnson',
          date: '2025-08-20',
          icon: <CheckCircle className="w-5 h-5" />,
          color: 'text-green-600'
        },
        {
          id: 2,
          type: 'lesson_booked',
          title: 'New Booking',
          description: 'Booked lesson with Mike Wilson for test preparation',
          date: '2025-08-26',
          icon: <Calendar className="w-5 h-5" />,
          color: 'text-blue-600'
        },
        {
          id: 3,
          type: 'payment_made',
          title: 'Payment Processed',
          description: 'Payment of £35.00 for upcoming lesson',
          date: '2025-08-25',
          icon: <TrendingUp className="w-5 h-5" />,
          color: 'text-purple-600'
        },
        {
          id: 4,
          type: 'lesson_cancelled',
          title: 'Lesson Cancelled',
          description: 'Cancelled lesson with John Smith due to weather',
          date: '2025-08-22',
          icon: <AlertCircle className="w-5 h-5" />,
          color: 'text-orange-600'
        }
      ];

      const mockLearningProgress: LearningProgress = {
        basicControl: 85,
        roadSigns: 90,
        highwayDriving: 70,
        parking: 75,
        emergencyProcedures: 60,
        overallProgress: 76
      };

      const mockTestPreparation: TestPreparation = {
        theoryTest: {
          completed: true,
          score: 48,
          date: '2025-07-15'
        },
        practicalTest: {
          booked: true,
          date: '2025-09-15',
          instructor: 'Sarah Johnson',
          readiness: 75
        }
      };

      const mockFinancialOverview: FinancialOverview = {
        totalSpent: 420.00,
        upcomingPayments: 70.00,
        paymentHistory: [
          { date: '2025-08-25', amount: 35.00, description: 'Standard Lesson', status: 'completed' },
          { date: '2025-08-18', amount: 35.00, description: 'Highway Lesson', status: 'completed' },
          { date: '2025-08-11', amount: 35.00, description: 'Parking Practice', status: 'completed' }
        ]
      };

      const mockLearningResources: LearningResource[] = [
        { id: 1, title: 'Highway Code Review', type: 'document', description: 'Essential road signs and rules', completed: true },
        { id: 2, title: 'Parallel Parking Guide', type: 'video', description: 'Step-by-step parking tutorial', duration: '15 min', completed: false },
        { id: 3, title: 'Theory Test Practice', type: 'quiz', description: '50 questions to test your knowledge', completed: false },
        { id: 4, title: 'Emergency Procedures', type: 'practice', description: 'Handling breakdowns and emergencies', completed: false }
      ];

      const mockInstructorFeedback: InstructorFeedback[] = [
        {
          instructor: 'Sarah Johnson',
          rating: 5,
          comment: 'Excellent progress with highway driving. Ready for more challenging scenarios.',
          date: '2025-08-20',
          lessonType: 'Highway Driving'
        },
        {
          instructor: 'Mike Wilson',
          rating: 4,
          comment: 'Good improvement in parking. Need more practice with parallel parking.',
          date: '2025-08-15',
          lessonType: 'Parking Practice'
        }
      ];

      const mockMilestones: Milestone[] = [
        {
          id: 1,
          title: 'Complete 10 Lessons',
          description: 'Milestone for basic driving skills',
          targetDate: '2025-09-01',
          completed: false,
          type: 'lesson'
        },
        {
          id: 2,
          title: 'Theory Test Passed',
          description: 'Successfully completed theory test',
          targetDate: '2025-07-15',
          completed: true,
          type: 'test'
        },
        {
          id: 3,
          title: 'Practical Test',
          description: 'Final driving test',
          targetDate: '2025-09-15',
          completed: false,
          type: 'test'
        }
      ];

      const mockVehicleCheckData: VehicleCheckData = {
        registrationNumber: 'AB12CDE',
        make: 'VAUXHALL',
        yearOfManufacture: 2017,
        fuelType: 'PETROL',
        colour: 'WHITE',
        motStatus: 'Valid',
        taxStatus: 'Taxed',
        lastChecked: '2025-09-06'
      };

      const mockNotifications = [
        {
          id: 1,
          type: 'info',
          title: 'Lesson Reminder',
          message: 'Your lesson with Sarah Johnson is tomorrow at 2:00 PM',
          timestamp: new Date(),
          read: false,
          priority: 'high'
        },
        {
          id: 2,
          type: 'success',
          title: 'Payment Received',
          message: 'Payment of £35.00 has been processed successfully',
          timestamp: new Date(),
          read: true,
          priority: 'medium'
        },
        {
          id: 3,
          type: 'warning',
          title: 'Theory Test Booking',
          message: 'Your theory test is scheduled for next week. Don\'t forget to prepare!',
          timestamp: new Date(),
          read: false,
          priority: 'high'
        }
      ];

      setStats(mockStats);
      setRecentActivity(mockActivity);
      setLearningProgress(mockLearningProgress);
      setTestPreparation(mockTestPreparation);
      setFinancialOverview(mockFinancialOverview);
      setLearningResources(mockLearningResources);
      setInstructorFeedback(mockInstructorFeedback);
      setMilestones(mockMilestones);
      setVehicleCheckData(mockVehicleCheckData);
      setNotifications(mockNotifications);
    } catch (error) {
      setError('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressBarColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-600';
    if (progress >= 60) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  if (!user || !token) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.full_name}!</h1>
              <p className="mt-2 text-gray-600">Here's your complete driving journey overview</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-4">
              <button
                onClick={() => navigate('/vehicle-check')}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Search className="h-4 w-4 mr-2" />
                Check Vehicle
              </button>
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="h-6 w-6" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Dashboard Tabs */}
          <div className="mt-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Overview', icon: BarChart3 },
                { id: 'progress', name: 'Learning Progress', icon: TrendingUp },
                { id: 'bookings', name: 'Bookings', icon: Calendar },
                { id: 'resources', name: 'Resources', icon: BookOpen },
                { id: 'vehicle', name: 'Vehicle Check', icon: Car },
                { id: 'settings', name: 'Settings', icon: Settings }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Lessons</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalLessons}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completedLessons}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Upcoming</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.upcomingLessons}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Next Lesson */}
            {stats?.nextLesson && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Next Lesson</h2>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {stats.nextLesson.type}
                      </h3>
                      <p className="text-gray-600">with {stats.nextLesson.instructor}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">
                            {new Date(stats.nextLesson.date).toLocaleDateString('en-GB', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">{stats.nextLesson.time}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/bookings')}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Learning Progress */}
            {learningProgress && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Learning Progress</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Basic Control</span>
                        <span className={getProgressColor(learningProgress.basicControl)}>{learningProgress.basicControl}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(learningProgress.basicControl)}`}
                          style={{ width: `${learningProgress.basicControl}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Road Signs</span>
                        <span className={getProgressColor(learningProgress.roadSigns)}>{learningProgress.roadSigns}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(learningProgress.roadSigns)}`}
                          style={{ width: `${learningProgress.roadSigns}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Highway Driving</span>
                        <span className={getProgressColor(learningProgress.highwayDriving)}>{learningProgress.highwayDriving}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(learningProgress.highwayDriving)}`}
                          style={{ width: `${learningProgress.highwayDriving}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Parking</span>
                        <span className={getProgressColor(learningProgress.parking)}>{learningProgress.parking}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(learningProgress.parking)}`}
                          style={{ width: `${learningProgress.parking}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span className="font-medium">Overall Progress</span>
                      <span className={`font-bold ${getProgressColor(learningProgress.overallProgress)}`}>{learningProgress.overallProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-300 ${getProgressBarColor(learningProgress.overallProgress)}`}
                        style={{ width: `${learningProgress.overallProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Test Preparation */}
            {testPreparation && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Preparation</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Theory Test */}
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">Theory Test</h3>
                      {testPreparation.theoryTest.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-yellow-600" />
                      )}
                    </div>
                    {testPreparation.theoryTest.completed ? (
                      <div>
                        <p className="text-sm text-gray-600">Score: <span className="font-medium text-green-600">{testPreparation.theoryTest.score}/50</span></p>
                        <p className="text-sm text-gray-600">Date: {new Date(testPreparation.theoryTest.date!).toLocaleDateString('en-GB')}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">Not yet completed</p>
                    )}
                  </div>

                  {/* Practical Test */}
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">Practical Test</h3>
                      {testPreparation.practicalTest.booked ? (
                        <Calendar className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-yellow-600" />
                      )}
                    </div>
                    {testPreparation.practicalTest.booked ? (
                      <div>
                        <p className="text-sm text-gray-600">Date: {new Date(testPreparation.practicalTest.date!).toLocaleDateString('en-GB')}</p>
                        <p className="text-sm text-gray-600">Instructor: {testPreparation.practicalTest.instructor}</p>
                        <div className="mt-2">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Readiness</span>
                            <span>{testPreparation.practicalTest.readiness}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(testPreparation.practicalTest.readiness)}`}
                              style={{ width: `${testPreparation.practicalTest.readiness}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">Not yet booked</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Learning Resources */}
            {learningResources.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Learning Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {learningResources.map((resource) => (
                    <div key={resource.id} className="p-4 border rounded-lg hover:border-green-300 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {resource.type === 'video' && <Play className="w-4 h-4 text-red-500" />}
                            {resource.type === 'document' && <FileText className="w-4 h-4 text-blue-500" />}
                            {resource.type === 'quiz' && <BookOpenCheck className="w-4 h-4 text-purple-500" />}
                            {resource.type === 'practice' && <Target className="w-4 h-4 text-green-500" />}
                            <h4 className="font-medium text-gray-900">{resource.title}</h4>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                          {resource.duration && (
                            <p className="text-xs text-gray-500">{resource.duration}</p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {resource.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => navigate('/search')}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors text-center"
                >
                  <Car className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="font-medium text-gray-900">Find Instructor</p>
                  <p className="text-sm text-gray-600">Book a new lesson</p>
                </button>
                
                <button
                  onClick={() => navigate('/bookings')}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors text-center"
                >
                  <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="font-medium text-gray-900">View Bookings</p>
                  <p className="text-sm text-gray-600">Manage your lessons</p>
                </button>

                <button
                  onClick={() => navigate('/analytics')}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors text-center"
                >
                  <TrendingUp className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="font-medium text-gray-900">View Progress</p>
                  <p className="text-sm text-gray-600">Track your learning</p>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(activity.date).toLocaleDateString('en-GB', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => navigate('/bookings')}
                className="w-full mt-4 px-4 py-2 text-sm text-green-600 hover:text-green-700 font-medium"
              >
                View All Activity →
              </button>
            </div>

            {/* Financial Overview */}
            {financialOverview && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Financial Overview</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Spent</span>
                    <span className="font-medium text-gray-900">£{financialOverview.totalSpent}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Upcoming Payments</span>
                    <span className="font-medium text-green-600">£{financialOverview.upcomingPayments}</span>
                  </div>
                  <div className="pt-3 border-t">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Payments</h4>
                    <div className="space-y-2">
                      {financialOverview.paymentHistory.slice(0, 3).map((payment, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">{payment.description}</span>
                          <span className={`font-medium ${
                            payment.status === 'completed' ? 'text-green-600' : 
                            payment.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            £{payment.amount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Upcoming Milestones */}
            {milestones.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Milestones</h2>
                <div className="space-y-3">
                  {milestones.map((milestone) => (
                    <div key={milestone.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            {milestone.type === 'lesson' && <BookOpen className="w-4 h-4 text-blue-500" />}
                            {milestone.type === 'test' && <GraduationCap className="w-4 h-4 text-purple-500" />}
                            {milestone.type === 'skill' && <Target className="w-4 h-4 text-green-500" />}
                            {milestone.type === 'payment' && <DollarSign className="w-4 h-4 text-yellow-500" />}
                            <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                          </div>
                          <p className="text-sm text-gray-600">{milestone.description}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(milestone.targetDate).toLocaleDateString('en-GB', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        {milestone.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips & Resources */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tips & Resources</h2>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Lightbulb className="w-4 h-4 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900 mb-1">Practice Makes Perfect</h4>
                      <p className="text-sm text-green-800">
                        Regular practice between lessons helps build confidence and muscle memory.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Target className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">Test Preparation</h4>
                      <p className="text-sm text-blue-800">
                        Focus on weak areas identified by your instructor for better test results.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <MessageCircle className="w-4 h-4 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-purple-900 mb-1">Ask Questions</h4>
                      <p className="text-sm text-purple-800">
                        Don't hesitate to ask your instructor about anything you're unsure about.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          </>
        )}

        {/* Learning Progress Tab */}
        {activeTab === 'progress' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Learning Progress</h2>
              {learningProgress && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                    <span className="text-sm font-medium text-gray-900">{learningProgress.overallProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressBarColor(learningProgress.overallProgress)}`}
                      style={{ width: `${learningProgress.overallProgress}%` }}
                    ></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { skill: 'Basic Control', progress: learningProgress.basicControl },
                      { skill: 'Road Signs', progress: learningProgress.roadSigns },
                      { skill: 'Highway Driving', progress: learningProgress.highwayDriving },
                      { skill: 'Parking', progress: learningProgress.parking },
                      { skill: 'Emergency Procedures', progress: learningProgress.emergencyProcedures }
                    ].map((item) => (
                      <div key={item.skill} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">{item.skill}</span>
                          <span className={`text-sm font-medium ${getProgressColor(item.progress)}`}>
                            {item.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getProgressBarColor(item.progress)}`}
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Test Preparation */}
            {testPreparation && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Test Preparation</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Theory Test</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      {testPreparation.theoryTest.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                      )}
                      <span className="text-sm text-gray-700">
                        {testPreparation.theoryTest.completed ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                    {testPreparation.theoryTest.completed && (
                      <p className="text-sm text-gray-600">
                        Score: {testPreparation.theoryTest.score}/50
                      </p>
                    )}
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Practical Test</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      {testPreparation.practicalTest.booked ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                      )}
                      <span className="text-sm text-gray-700">
                        {testPreparation.practicalTest.booked ? 'Booked' : 'Not Booked'}
                      </span>
                    </div>
                    {testPreparation.practicalTest.booked && (
                      <p className="text-sm text-gray-600">
                        Date: {testPreparation.practicalTest.date}
                      </p>
                    )}
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Readiness</span>
                        <span className="text-xs text-gray-600">{testPreparation.practicalTest.readiness}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div 
                          className={`h-1 rounded-full ${getProgressBarColor(testPreparation.practicalTest.readiness)}`}
                          style={{ width: `${testPreparation.practicalTest.readiness}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Vehicle Check Tab */}
        {activeTab === 'vehicle' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Vehicle Check</h2>
                <button
                  onClick={() => navigate('/vehicle-check')}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Check New Vehicle
                </button>
              </div>
              
              {vehicleCheckData ? (
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-4">Vehicle Details</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Registration:</span>
                          <span className="text-sm font-medium text-gray-900">{vehicleCheckData.registrationNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Make:</span>
                          <span className="text-sm font-medium text-gray-900">{vehicleCheckData.make}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Year:</span>
                          <span className="text-sm font-medium text-gray-900">{vehicleCheckData.yearOfManufacture}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Fuel Type:</span>
                          <span className="text-sm font-medium text-gray-900">{vehicleCheckData.fuelType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Colour:</span>
                          <span className="text-sm font-medium text-gray-900">{vehicleCheckData.colour}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-4">Status</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">MOT Status:</span>
                          <span className={`text-sm font-medium ${vehicleCheckData.motStatus === 'Valid' ? 'text-green-600' : 'text-red-600'}`}>
                            {vehicleCheckData.motStatus}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Tax Status:</span>
                          <span className={`text-sm font-medium ${vehicleCheckData.taxStatus === 'Taxed' ? 'text-green-600' : 'text-red-600'}`}>
                            {vehicleCheckData.taxStatus}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Last Checked:</span>
                          <span className="text-sm font-medium text-gray-900">{vehicleCheckData.lastChecked}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Vehicle Checked</h3>
                  <p className="text-gray-600 mb-4">Check any UK vehicle to see its DVLA data</p>
                  <button
                    onClick={() => navigate('/vehicle-check')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Check Vehicle Now
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">My Bookings</h2>
                <button
                  onClick={() => navigate('/search')}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Book New Lesson
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Upcoming Bookings */}
                <div className="border rounded-lg p-4 bg-green-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Highway Driving Lesson</h3>
                      <p className="text-sm text-gray-600">with Sarah Johnson</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">Tomorrow, 2:00 PM</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">Manchester City Centre</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Confirmed</span>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Past Bookings */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Parking Practice</h3>
                      <p className="text-sm text-gray-600">with Mike Wilson</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">Last Monday, 10:00 AM</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-gray-700">Rated 4/5</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Completed</span>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Basic Control Lesson</h3>
                      <p className="text-sm text-gray-600">with Sarah Johnson</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">2 weeks ago, 3:00 PM</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-gray-700">Rated 5/5</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Completed</span>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => navigate('/search')}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Calendar className="h-6 w-6 text-green-600 mr-3" />
                  <div className="text-left">
                    <h4 className="font-medium text-gray-900">Book Lesson</h4>
                    <p className="text-sm text-gray-600">Find available instructors</p>
                  </div>
                </button>
                
                <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <RefreshCw className="h-6 w-6 text-blue-600 mr-3" />
                  <div className="text-left">
                    <h4 className="font-medium text-gray-900">Reschedule</h4>
                    <p className="text-sm text-gray-600">Change existing booking</p>
                  </div>
                </button>
                
                <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <MessageCircle className="h-6 w-6 text-purple-600 mr-3" />
                  <div className="text-left">
                    <h4 className="font-medium text-gray-900">Contact Instructor</h4>
                    <p className="text-sm text-gray-600">Send message or call</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Learning Resources</h2>
              
              {learningResources && learningResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {learningResources.map((resource) => (
                    <div key={resource.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {resource.type === 'video' && <Video className="h-5 w-5 text-red-600" />}
                          {resource.type === 'document' && <FileText className="h-5 w-5 text-blue-600" />}
                          {resource.type === 'quiz' && <BookOpenCheck className="h-5 w-5 text-green-600" />}
                          {resource.type === 'practice' && <Target className="h-5 w-5 text-purple-600" />}
                          <h3 className="font-medium text-gray-900">{resource.title}</h3>
                        </div>
                        {resource.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                      
                      {resource.duration && (
                        <p className="text-xs text-gray-500 mb-3">Duration: {resource.duration}</p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <button
                          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                            resource.completed
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                          }`}
                        >
                          {resource.completed ? 'Completed' : 'Start'}
                        </button>
                        
                        {resource.type === 'video' && (
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Play className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Resources Available</h3>
                  <p className="text-gray-600">Learning resources will appear here as they become available.</p>
                </div>
              )}
            </div>

            {/* Quick Study Tools */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Study Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <BookOpenCheck className="h-6 w-6 text-green-600 mr-3" />
                  <div className="text-left">
                    <h4 className="font-medium text-gray-900">Practice Test</h4>
                    <p className="text-sm text-gray-600">Take a mock theory test</p>
                  </div>
                </button>
                
                <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <FileVideo className="h-6 w-6 text-red-600 mr-3" />
                  <div className="text-left">
                    <h4 className="font-medium text-gray-900">Video Lessons</h4>
                    <p className="text-sm text-gray-600">Watch driving tutorials</p>
                  </div>
                </button>
                
                <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <BookMarked className="h-6 w-6 text-blue-600 mr-3" />
                  <div className="text-left">
                    <h4 className="font-medium text-gray-900">Highway Code</h4>
                    <p className="text-sm text-gray-600">Study road rules and signs</p>
                  </div>
                </button>
                
                <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Target className="h-6 w-6 text-purple-600 mr-3" />
                  <div className="text-left">
                    <h4 className="font-medium text-gray-900">Skill Practice</h4>
                    <p className="text-sm text-gray-600">Practice specific skills</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Profile Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue={user?.full_name || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={user?.email || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+44 7xxx xxx xxx"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      placeholder="Manchester, UK"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Lesson Reminders</h4>
                    <p className="text-sm text-gray-600">Get notified about upcoming lessons</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Payment Notifications</h4>
                    <p className="text-sm text-gray-600">Receive payment confirmations and receipts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Marketing Updates</h4>
                    <p className="text-sm text-gray-600">Receive updates about new features and offers</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy & Security</h3>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <div className="text-left">
                      <h4 className="font-medium text-gray-900">Change Password</h4>
                      <p className="text-sm text-gray-600">Update your account password</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </button>
                
                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-green-600" />
                    <div className="text-left">
                      <h4 className="font-medium text-gray-900">Data Export</h4>
                      <p className="text-sm text-gray-600">Download your personal data</p>
                    </div>
                  </div>
                  <Download className="h-5 w-5 text-gray-400" />
                </button>
                
                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Trash2 className="h-5 w-5 text-red-600" />
                    <div className="text-left">
                      <h4 className="font-medium text-gray-900">Delete Account</h4>
                      <p className="text-sm text-gray-600">Permanently delete your account</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
