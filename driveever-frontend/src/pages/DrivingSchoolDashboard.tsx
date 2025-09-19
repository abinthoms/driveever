import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  BookOpen, 
  TrendingUp, 
  Settings, 
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  FileText,
  BarChart3,
  Building2,
  Shield,
  Star,
  Phone,
  Mail,
  MapPin,
  Car,
  GraduationCap,
  Award,
  Target,
  PieChart,
  Activity
} from 'lucide-react';

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  lessonsCompleted: number;
  nextLesson: string;
  status: 'Active' | 'Inactive' | 'Completed';
  instructor: string;
  progress: number;
}

interface Course {
  id: number;
  name: string;
  description: string;
  duration: number;
  price: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  instructor: string;
  students: number;
  status: 'Active' | 'Inactive';
}

interface Booking {
  id: number;
  student: string;
  instructor: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  price: number;
}

interface Commission {
  id: number;
  month: string;
  totalBookings: number;
  totalRevenue: number;
  platformCommission: number;
  schoolEarnings: number;
  commissionRate: number;
  status: 'Paid' | 'Pending' | 'Processing';
}

interface HMRCEarnings {
  id: number;
  date: string;
  source: string;
  amount: number;
  description: string;
  category: 'Lesson Fees' | 'Test Fees' | 'Other';
}

interface HMRCExpense {
  id: number;
  date: string;
  category: string;
  amount: number;
  description: string;
  businessUse: number;
  claimableAmount: number;
}

interface HMRCCompliance {
  vatRegistered: boolean;
  vatNumber?: string;
  vatThreshold: number;
  currentTurnover: number;
  utrNumber: string;
  nationalInsurance: string;
  businessName: string;
  businessAddress: string;
  businessStructure: 'sole_trader' | 'limited_company' | 'partnership';
  accountingMethod: 'cash' | 'accrual';
  taxYear: string;
  lastSubmission?: string;
  nextDeadline?: string;
  class2NI: boolean;
  class4NI: boolean;
  registrationDate: string;
  recordKeepingPeriod: number;
}

const DrivingSchoolDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showAddEarnings, setShowAddEarnings] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);

  // Mock data
  const school = {
    name: "Elite Driving Academy",
    address: "123 High Street, London, SW1A 1AA",
    phone: "+44 20 7123 4567",
    email: "info@elitedrivingacademy.co.uk",
    website: "www.elitedrivingacademy.co.uk",
    established: "2015",
    instructors: 12,
    students: 450,
    passRate: 87,
    rating: 4.8
  };

  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+44 7700 900123",
      level: "Intermediate",
      lessonsCompleted: 15,
      nextLesson: "2024-01-15",
      status: "Active",
      instructor: "Mike Smith",
      progress: 75
    },
    {
      id: 2,
      name: "James Wilson",
      email: "james.wilson@email.com",
      phone: "+44 7700 900124",
      level: "Beginner",
      lessonsCompleted: 3,
      nextLesson: "2024-01-16",
      status: "Active",
      instructor: "Emma Brown",
      progress: 25
    },
    {
      id: 3,
      name: "Lisa Davis",
      email: "lisa.davis@email.com",
      phone: "+44 7700 900125",
      level: "Advanced",
      lessonsCompleted: 28,
      nextLesson: "2024-01-17",
      status: "Active",
      instructor: "Tom Wilson",
      progress: 90
    }
  ]);

  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      name: "Intensive Driving Course",
      description: "Complete your driving test in 1 week",
      duration: 40,
      price: 1200,
      level: "Beginner",
      instructor: "Mike Smith",
      students: 25,
      status: "Active"
    },
    {
      id: 2,
      name: "Highway Code Mastery",
      description: "Master the highway code and theory test",
      duration: 20,
      price: 300,
      level: "Beginner",
      instructor: "Emma Brown",
      students: 45,
      status: "Active"
    },
    {
      id: 3,
      name: "Test Preparation",
      description: "Final preparation for practical test",
      duration: 10,
      price: 400,
      level: "Advanced",
      instructor: "Tom Wilson",
      students: 30,
      status: "Active"
    }
  ]);

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      student: "Sarah Johnson",
      instructor: "Mike Smith",
      date: "2024-01-15",
      time: "10:00",
      duration: 2,
      type: "Intensive Course",
      status: "Confirmed",
      price: 80
    },
    {
      id: 2,
      student: "James Wilson",
      instructor: "Emma Brown",
      date: "2024-01-16",
      time: "14:00",
      duration: 1,
      type: "Standard Lesson",
      status: "Pending",
      price: 40
    }
  ]);

  const [commissions, setCommissions] = useState<Commission[]>([
    {
      id: 1,
      month: "December 2023",
      totalBookings: 156,
      totalRevenue: 12480,
      platformCommission: 1248,
      schoolEarnings: 11232,
      commissionRate: 10,
      status: "Paid"
    },
    {
      id: 2,
      month: "January 2024",
      totalBookings: 142,
      totalRevenue: 11360,
      platformCommission: 1136,
      schoolEarnings: 10224,
      commissionRate: 10,
      status: "Processing"
    }
  ]);

  const [hmrcEarnings, setHmrEarnings] = useState<HMRCEarnings[]>([
    {
      id: 1,
      date: "2024-01-10",
      source: "Lesson Fees",
      amount: 2400,
      description: "Weekly lesson income",
      category: "Lesson Fees"
    },
    {
      id: 2,
      date: "2024-01-08",
      source: "Test Fees",
      amount: 150,
      description: "Theory test preparation",
      category: "Test Fees"
    }
  ]);

  const [hmrcExpenses, setHmrExpenses] = useState<HMRCExpense[]>([
    {
      id: 1,
      date: "2024-01-05",
      category: "Vehicle Maintenance",
      amount: 300,
      description: "Car service and MOT",
      businessUse: 100,
      claimableAmount: 300
    },
    {
      id: 2,
      date: "2024-01-03",
      category: "Fuel",
      amount: 120,
      description: "Petrol for lessons",
      businessUse: 100,
      claimableAmount: 120
    }
  ]);

  const [hmrcCompliance, setHmrCompliance] = useState<HMRCCompliance>({
    vatRegistered: false,
    vatThreshold: 85000,
    currentTurnover: 45000,
    utrNumber: "1234567890",
    nationalInsurance: "AB123456C",
    businessName: "Elite Driving Academy Ltd",
    businessAddress: "123 High Street, London, SW1A 1AA",
    businessStructure: "limited_company",
    accountingMethod: "accrual",
    taxYear: "2023-24",
    lastSubmission: "2023-01-31",
    nextDeadline: "2024-01-31",
    class2NI: true,
    class4NI: true,
    registrationDate: "2015-03-15",
    recordKeepingPeriod: 5
  });

  const renderOverview = () => (
    <div className="space-y-6">
      {/* School Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{school.students}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <GraduationCap className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pass Rate</p>
              <p className="text-2xl font-bold text-gray-900">{school.passRate}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Instructors</p>
              <p className="text-2xl font-bold text-gray-900">{school.instructors}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rating</p>
              <p className="text-2xl font-bold text-gray-900">{school.rating}/5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-600">New student registration: Sarah Johnson</span>
            </div>
            <span className="text-xs text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-600">Lesson completed: James Wilson</span>
            </div>
            <span className="text-xs text-gray-500">4 hours ago</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-600">New booking: Lisa Davis</span>
            </div>
            <span className="text-xs text-gray-500">6 hours ago</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setShowAddStudent(true)}
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Plus className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-600">Add Student</span>
          </button>
          <button 
            onClick={() => setShowAddCourse(true)}
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
          >
            <Plus className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-600">Add Course</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-600">Schedule Lesson</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Students</h2>
        <button 
          onClick={() => setShowAddStudent(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Lesson</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      student.level === 'Beginner' ? 'bg-yellow-100 text-yellow-800' :
                      student.level === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {student.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.instructor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.nextLesson}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      student.status === 'Active' ? 'bg-green-100 text-green-800' :
                      student.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
        <button 
          onClick={() => setShowAddCourse(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                course.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {course.status}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{course.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Duration:</span>
                <span className="text-sm font-medium">{course.duration} hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Price:</span>
                <span className="text-sm font-medium">£{course.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Students:</span>
                <span className="text-sm font-medium">{course.students}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Instructor:</span>
                <span className="text-sm font-medium">{course.instructor}</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm">
                Edit
              </button>
              <button className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 text-sm">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Bookings</h2>
      
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.student}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.instructor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.date} at {booking.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.duration}h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    £{booking.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCommissions = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Commission Tracking</h2>
      
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform Commission</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School Earnings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {commissions.map((commission) => (
                <tr key={commission.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {commission.month}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {commission.totalBookings}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    £{commission.totalRevenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    £{commission.platformCommission.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    £{commission.schoolEarnings.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {commission.commissionRate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      commission.status === 'Paid' ? 'bg-green-100 text-green-800' :
                      commission.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {commission.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderHMRCCompliance = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">HMRC Compliance</h2>
      
      {/* Business Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
            <input
              type="text"
              value={hmrcCompliance.businessName}
              onChange={(e) => setHmrCompliance({...hmrcCompliance, businessName: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">UTR Number</label>
            <input
              type="text"
              value={hmrcCompliance.utrNumber}
              onChange={(e) => setHmrCompliance({...hmrcCompliance, utrNumber: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">National Insurance</label>
            <input
              type="text"
              value={hmrcCompliance.nationalInsurance}
              onChange={(e) => setHmrCompliance({...hmrcCompliance, nationalInsurance: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Structure</label>
            <select
              value={hmrcCompliance.businessStructure}
              onChange={(e) => setHmrCompliance({...hmrcCompliance, businessStructure: e.target.value as any})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="sole_trader">Sole Trader</option>
              <option value="limited_company">Limited Company</option>
              <option value="partnership">Partnership</option>
            </select>
          </div>
        </div>
      </div>

      {/* VAT Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">VAT Information</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="vatRegistered"
              checked={hmrcCompliance.vatRegistered}
              onChange={(e) => setHmrCompliance({...hmrcCompliance, vatRegistered: e.target.checked})}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="vatRegistered" className="ml-2 text-sm text-gray-700">
              VAT Registered
            </label>
          </div>
          {hmrcCompliance.vatRegistered && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">VAT Number</label>
              <input
                type="text"
                value={hmrcCompliance.vatNumber || ''}
                onChange={(e) => setHmrCompliance({...hmrcCompliance, vatNumber: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">VAT Threshold</label>
              <input
                type="number"
                value={hmrcCompliance.vatThreshold}
                onChange={(e) => setHmrCompliance({...hmrcCompliance, vatThreshold: Number(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Turnover</label>
              <input
                type="number"
                value={hmrcCompliance.currentTurnover}
                onChange={(e) => setHmrCompliance({...hmrcCompliance, currentTurnover: Number(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Earnings and Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Earnings</h3>
            <button 
              onClick={() => setShowAddEarnings(true)}
              className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 text-sm"
            >
              Add
            </button>
          </div>
          <div className="space-y-3">
            {hmrcEarnings.map((earning) => (
              <div key={earning.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-900">{earning.source}</p>
                  <p className="text-xs text-gray-500">{earning.date}</p>
                </div>
                <span className="text-sm font-semibold text-green-600">£{earning.amount}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Expenses</h3>
            <button 
              onClick={() => setShowAddExpense(true)}
              className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 text-sm"
            >
              Add
            </button>
          </div>
          <div className="space-y-3">
            {hmrcExpenses.map((expense) => (
              <div key={expense.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-900">{expense.category}</p>
                  <p className="text-xs text-gray-500">{expense.date}</p>
                </div>
                <span className="text-sm font-semibold text-red-600">£{expense.claimableAmount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'instructors', label: 'Instructors', icon: GraduationCap },
    { id: 'marketplace', label: 'Marketplace', icon: Building2 },
    { id: 'commissions', label: 'Commissions', icon: DollarSign },
    { id: 'hmrc', label: 'HMRC Compliance', icon: Shield },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{school.name}</h1>
              <p className="text-gray-600">Driving School Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Established {school.established}</p>
                <p className="text-sm text-gray-500">{school.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'students' && renderStudents()}
            {activeTab === 'courses' && renderCourses()}
            {activeTab === 'bookings' && renderBookings()}
            {activeTab === 'commissions' && renderCommissions()}
            {activeTab === 'hmrc' && renderHMRCCompliance()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrivingSchoolDashboard;
