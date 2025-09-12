import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Calendar, 
  Clock, 
  User, 
  Star, 
  BookOpen, 
  Play, 
  Download, 
  MessageCircle, 
  Bell, 
  Settings, 
  CreditCard, 
  TrendingUp, 
  Target, 
  Award, 
  Car, 
  Shield, 
  FileText, 
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Trophy,
  Gift,
  Users,
  BarChart3,
  Zap,
  MapPin,
  Phone,
  Mail,
  Edit,
  Eye,
  EyeOff
} from 'lucide-react'

const LearnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  // Mock data
  const learnerData = {
    name: "Alex Johnson",
    progress: 65,
    lessonsCompleted: 26,
    totalLessons: 40,
    nextLesson: {
      date: "Tomorrow",
      time: "2:00 PM",
      instructor: "Sarah Wilson",
      location: "Manchester City Center"
    },
    testDate: "March 15, 2024",
    hoursCompleted: 32,
    balance: 0,
    testReadiness: 78
  }

  const recentLessons = [
    { id: 1, date: "2024-01-15", instructor: "Sarah Wilson", rating: 5, skill: "Parallel Parking", status: "completed" },
    { id: 2, date: "2024-01-12", instructor: "Mike Brown", rating: 4, skill: "Roundabouts", status: "completed" },
    { id: 3, date: "2024-01-10", instructor: "Sarah Wilson", rating: 5, skill: "Highway Driving", status: "completed" },
    { id: 4, date: "2024-01-18", instructor: "Sarah Wilson", rating: null, skill: "Test Preparation", status: "upcoming" }
  ]

  const achievements = [
    { id: 1, title: "First Lesson Complete", icon: "🎉", earned: true, date: "2024-01-02" },
    { id: 2, title: "10 Hours Done", icon: "⏰", earned: true, date: "2024-01-08" },
    { id: 3, title: "Perfect Score", icon: "⭐", earned: true, date: "2024-01-15" },
    { id: 4, title: "Theory Test Passed", icon: "📚", earned: false, progress: 85 },
    { id: 5, title: "Ready for Test", icon: "🚗", earned: false, progress: 78 }
  ]

  const skills = [
    { name: "Parallel Parking", progress: 90, status: "excellent" },
    { name: "Roundabouts", progress: 75, status: "good" },
    { name: "Highway Driving", progress: 85, status: "excellent" },
    { name: "City Driving", progress: 60, status: "needs-work" },
    { name: "Emergency Stops", progress: 70, status: "good" },
    { name: "Reversing", progress: 45, status: "needs-work" }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100'
      case 'good': return 'text-blue-600 bg-blue-100'
      case 'needs-work': return 'text-orange-600 bg-orange-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'lessons', label: 'Lessons', icon: Calendar },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'test-prep', label: 'Test Prep', icon: Target },
    { id: 'payments', label: 'Payments', icon: CreditCard }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-driveever-blue">DriveEver</h1>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">Learner Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-driveever-blue hover:bg-gray-100 rounded-full">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-driveever-blue hover:bg-gray-100 rounded-full">
                <MessageCircle className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-driveever-blue rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AJ</span>
                </div>
                <span className="text-sm font-medium text-gray-700">{learnerData.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {learnerData.name}!</h2>
          <p className="text-gray-600">You're making great progress on your driving journey.</p>
          
          {/* Quick Navigation */}
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/" className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>
            <Link to="/vehicle-check" className="inline-flex items-center px-4 py-2 bg-driveever-blue text-white rounded-lg hover:bg-blue-700 transition-colors">
              <FileText className="w-4 h-4 mr-2" />
              Vehicle Check
            </Link>
            <Link to="/top-gear" className="inline-flex items-center px-4 py-2 bg-driveever-green text-white rounded-lg hover:bg-green-700 transition-colors">
              <BookOpen className="w-4 h-4 mr-2" />
              Top Gear Blog
            </Link>
            <Link to="/dashboard" className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <BarChart3 className="w-4 h-4 mr-2" />
              Main Dashboard
            </Link>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Progress</p>
                <p className="text-2xl font-bold text-gray-900">{learnerData.progress}%</p>
              </div>
              <div className="w-12 h-12 bg-driveever-blue bg-opacity-10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-driveever-blue" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-driveever-blue h-2 rounded-full transition-all duration-300"
                  style={{ width: `${learnerData.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{learnerData.lessonsCompleted} of {learnerData.totalLessons} lessons completed</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hours Completed</p>
                <p className="text-2xl font-bold text-gray-900">{learnerData.hoursCompleted}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Average 1.2 hours per lesson</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Test Readiness</p>
                <p className="text-2xl font-bold text-gray-900">{learnerData.testReadiness}%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Almost ready for test!</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Test Date</p>
                <p className="text-lg font-bold text-gray-900">{learnerData.testDate}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">14 days remaining</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-driveever-blue text-driveever-blue'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Next Lesson */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Lesson</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-driveever-blue bg-opacity-10 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-driveever-blue" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{learnerData.nextLesson.date} at {learnerData.nextLesson.time}</p>
                    <p className="text-sm text-gray-600">Instructor: {learnerData.nextLesson.instructor}</p>
                    <p className="text-sm text-gray-600">Location: {learnerData.nextLesson.location}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-driveever-blue text-white rounded-lg hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Reschedule
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Lessons */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Lessons</h3>
              <div className="space-y-4">
                {recentLessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        lesson.status === 'completed' ? 'bg-green-100' : 'bg-orange-100'
                      }`}>
                        {lesson.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Clock className="w-5 h-5 text-orange-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{lesson.skill}</p>
                        <p className="text-sm text-gray-600">{lesson.date} with {lesson.instructor}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {lesson.rating && (
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < lesson.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className={`p-4 rounded-lg border-2 ${
                    achievement.earned ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <p className={`font-medium ${
                          achievement.earned ? 'text-green-900' : 'text-gray-700'
                        }`}>
                          {achievement.title}
                        </p>
                        {achievement.earned ? (
                          <p className="text-sm text-green-600">Earned on {achievement.date}</p>
                        ) : (
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-driveever-blue h-2 rounded-full"
                                style={{ width: `${achievement.progress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{achievement.progress}% complete</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lessons' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Lesson Schedule</h3>
                <button className="bg-driveever-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Book New Lesson
                </button>
              </div>
              <div className="space-y-4">
                {recentLessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">{new Date(lesson.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        <p className="text-xs text-gray-500">{new Date(lesson.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{lesson.skill}</p>
                        <p className="text-sm text-gray-600">Instructor: {lesson.instructor}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {lesson.rating && (
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < lesson.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        lesson.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {lesson.status === 'completed' ? 'Completed' : 'Upcoming'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Skill Progress</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{skill.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(skill.status)}`}>
                        {skill.status.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          skill.progress >= 80 ? 'bg-green-500' :
                          skill.progress >= 60 ? 'bg-blue-500' : 'bg-orange-500'
                        }`}
                        style={{ width: `${skill.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500">{skill.progress}% complete</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Theory Test Prep</h3>
                </div>
                <p className="text-gray-600 mb-4">Practice questions and mock tests to prepare for your theory test.</p>
                <button className="w-full bg-driveever-blue text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Start Practice
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Play className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Video Lessons</h3>
                </div>
                <p className="text-gray-600 mb-4">Watch instructional videos for different driving skills.</p>
                <button className="w-full bg-driveever-blue text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Watch Videos
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Download className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Study Materials</h3>
                </div>
                <p className="text-gray-600 mb-4">Download guides, checklists, and study materials.</p>
                <button className="w-full bg-driveever-blue text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Download
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'test-prep' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Test Preparation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Test Readiness Score</h4>
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl font-bold text-green-600">{learnerData.testReadiness}%</div>
                      <div className="flex-1">
                        <div className="w-full bg-green-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${learnerData.testReadiness}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-green-700 mt-1">Almost ready for your test!</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Test Date</h4>
                    <p className="text-2xl font-bold text-blue-600">{learnerData.testDate}</p>
                    <p className="text-sm text-blue-700">14 days remaining</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <button className="w-full bg-driveever-blue text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Book Test</span>
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>Mock Test</span>
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Test Tips</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Payment Overview</h3>
                <button 
                  onClick={() => setShowPaymentModal(true)}
                  className="bg-driveever-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Make Payment
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Current Balance</p>
                  <p className="text-2xl font-bold text-green-600">£{learnerData.balance}</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Paid</p>
                  <p className="text-2xl font-bold text-blue-600">£1,200</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">Next Payment</p>
                  <p className="text-2xl font-bold text-purple-600">£0</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Recent Payments</h4>
                {[
                  { date: "2024-01-15", amount: "£150", method: "Card ending in 1234", status: "completed" },
                  { date: "2024-01-01", amount: "£150", method: "Card ending in 1234", status: "completed" },
                  { date: "2023-12-15", amount: "£150", method: "Card ending in 1234", status: "completed" }
                ].map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">£{payment.amount}</p>
                      <p className="text-sm text-gray-600">{payment.method}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{payment.date}</p>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {payment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Make Payment</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <input 
                  type="number" 
                  placeholder="Enter amount"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-driveever-blue focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-driveever-blue focus:border-transparent">
                  <option>Card ending in 1234</option>
                  <option>Add new card</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-driveever-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LearnerDashboard
