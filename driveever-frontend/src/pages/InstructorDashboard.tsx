import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  Clock, 
  Star, 
  DollarSign, 
  TrendingUp, 
  MessageCircle, 
  Settings,
  Plus,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  Car,
  MapPin,
  Phone,
  Mail,
  Eye,
  Edit,
  MoreVertical,
  ArrowRight,
  Trash2,
  UserPlus,
  Save,
  X,
  Receipt,
  Calculator,
  FileText,
  CreditCard,
  PieChart,
  TrendingDown,
  AlertTriangle,
  CheckSquare,
  Download,
  Upload,
  Building2,
  Shield
} from 'lucide-react';

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  lessonsCompleted: number;
  nextLesson: string;
  progress: number;
  status: 'Active' | 'Paused' | 'Completed';
}

interface Booking {
  id: number;
  student: Student;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  location: string;
  notes: string;
  price: number;
}

interface Availability {
  day: string;
  slots: {
    time: string;
    available: boolean;
  }[];
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
  businessStructure: 'sole_trader' | 'limited_company' | 'franchise';
  accountingMethod: 'cash' | 'accrual';
  taxYear: string;
  lastSubmission?: string;
  nextDeadline?: string;
  class2NI: boolean;
  class4NI: boolean;
  registrationDate: string;
  recordKeepingPeriod: number; // years
}

interface Earnings {
  id: number;
  date: string;
  student: string;
  lessonType: string;
  amount: number;
  vatAmount?: number;
  category: 'lesson' | 'test' | 'theory' | 'other';
  status: 'paid' | 'pending' | 'overdue';
  invoiceNumber?: string;
}

interface Expense {
  id: number;
  date: string;
  description: string;
  amount: number;
  category: 'vehicle_purchase' | 'vehicle_lease' | 'fuel' | 'insurance' | 'road_tax' | 'mot' | 'repairs' | 'servicing' | 'valeting' | 'franchise_fees' | 'accountancy' | 'professional_membership' | 'adi_registration' | 'advertising' | 'phone' | 'internet' | 'stationery' | 'bank_account' | 'cpd_training' | 'teaching_aids' | 'home_office' | 'other';
  vatAmount?: number;
  receipt?: string;
  status: 'pending' | 'approved' | 'rejected';
  businessUse?: number; // percentage for dual-use items
}

interface TaxCalculation {
  grossEarnings: number;
  totalExpenses: number;
  netProfit: number;
  vatOwed: number;
  incomeTax: number;
  class2NI: number;
  class4NI: number;
  totalNationalInsurance: number;
  totalTax: number;
  takeHome: number;
  vatThresholdStatus: 'below' | 'approaching' | 'exceeded';
  vatThresholdRemaining: number;
}

const InstructorDashboard = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');
  const [students, setStudents] = useState<Student[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
    level: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced'
  });
  const [lessonDurations] = useState(['30 minutes', '45 minutes', '1 hour', '1.5 hours', '2 hours']);
  const [conflictResolution, setConflictResolution] = useState('suggest_alternatives');
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [conflictDetails, setConflictDetails] = useState<any>(null);
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<any>(null);
  const [showTimeEditor, setShowTimeEditor] = useState(false);
  const [timeGranularity, setTimeGranularity] = useState<'minutes' | 'seconds'>('minutes');
  const [learnerPreferences, setLearnerPreferences] = useState({
    earlyMorning: true,
    evening: true,
    weekend: true,
    flexible: true
  });
  const [showTimePresets, setShowTimePresets] = useState(false);
  const [showProfessionalView, setShowProfessionalView] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [regularSchedule, setRegularSchedule] = useState({
    monday: { enabled: true, times: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
    tuesday: { enabled: true, times: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
    wednesday: { enabled: true, times: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
    thursday: { enabled: true, times: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
    friday: { enabled: true, times: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
    saturday: { enabled: false, times: ['09:00', '10:00', '11:00'] },
    sunday: { enabled: false, times: [] }
  });
  
  // HMRC Compliance State
  const [hmrcCompliance, setHmrcCompliance] = useState<HMRCCompliance>({
    vatRegistered: false,
    vatThreshold: 85000, // Current UK VAT threshold
    currentTurnover: 0,
    utrNumber: '1234567890',
    nationalInsurance: 'AB123456C',
    businessName: 'John Smith Driving School',
    businessAddress: '123 Main Street, London, SW1A 1AA',
    businessStructure: 'sole_trader',
    accountingMethod: 'cash',
    taxYear: '2024-25',
    lastSubmission: '2024-01-31',
    nextDeadline: '2025-01-31',
    class2NI: true,
    class4NI: true,
    registrationDate: '2023-04-06',
    recordKeepingPeriod: 5
  });
  const [earnings, setEarnings] = useState<Earnings[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [taxCalculation, setTaxCalculation] = useState<TaxCalculation | null>(null);
  const [showAddEarning, setShowAddEarning] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newEarning, setNewEarning] = useState({
    date: '',
    student: '',
    lessonType: '',
    amount: 0,
    category: 'lesson' as 'lesson' | 'test' | 'theory' | 'other'
  });
  const [newExpense, setNewExpense] = useState({
    date: '',
    description: '',
    amount: 0,
    category: 'fuel' as 'vehicle_purchase' | 'vehicle_lease' | 'fuel' | 'insurance' | 'road_tax' | 'mot' | 'repairs' | 'servicing' | 'valeting' | 'franchise_fees' | 'accountancy' | 'professional_membership' | 'adi_registration' | 'advertising' | 'phone' | 'internet' | 'stationery' | 'bank_account' | 'cpd_training' | 'teaching_aids' | 'home_office' | 'other',
    businessUse: 100
  });

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockStudents: Student[] = [
      {
        id: 1,
        name: 'Emma Wilson',
        email: 'emma.wilson@email.com',
        phone: '+44 7700 900123',
        avatar: '/api/placeholder/40/40',
        level: 'Beginner',
        lessonsCompleted: 8,
        nextLesson: '2024-02-15 14:00',
        progress: 40,
        status: 'Active'
      },
      {
        id: 2,
        name: 'James Smith',
        email: 'james.smith@email.com',
        phone: '+44 7700 900124',
        avatar: '/api/placeholder/40/40',
        level: 'Intermediate',
        lessonsCompleted: 15,
        nextLesson: '2024-02-16 10:00',
        progress: 75,
        status: 'Active'
      },
      {
        id: 3,
        name: 'Lisa Brown',
        email: 'lisa.brown@email.com',
        phone: '+44 7700 900125',
        avatar: '/api/placeholder/40/40',
        level: 'Advanced',
        lessonsCompleted: 20,
        nextLesson: '2024-02-17 16:00',
        progress: 90,
        status: 'Active'
      }
    ];

    const mockBookings: Booking[] = [
      {
        id: 1,
        student: mockStudents[0],
        date: '2024-02-15',
        time: '14:00',
        duration: 1.5,
        type: 'Standard Lesson',
        status: 'Confirmed',
        location: '123 Main Street, London',
        notes: 'First highway lesson',
        price: 52.50
      },
      {
        id: 2,
        student: mockStudents[1],
        date: '2024-02-16',
        time: '10:00',
        duration: 1,
        type: 'Test Preparation',
        status: 'Pending',
        location: '456 Oak Avenue, London',
        notes: 'Mock test practice',
        price: 35.00
      },
      {
        id: 3,
        student: mockStudents[2],
        date: '2024-02-17',
        time: '16:00',
        duration: 2,
        type: 'Intensive Course',
        status: 'Confirmed',
        location: '789 Pine Road, London',
        notes: 'Final preparation before test',
        price: 70.00
      }
    ];

    const mockAvailability: Availability[] = [
      {
        day: 'Monday',
        slots: [
          { time: '06:00', available: true },
          { time: '06:30', available: true },
          { time: '07:00', available: true },
          { time: '07:30', available: true },
          { time: '08:00', available: true },
          { time: '08:30', available: true },
          { time: '09:00', available: true },
          { time: '09:30', available: true },
          { time: '10:00', available: false },
          { time: '10:30', available: false },
          { time: '11:00', available: true },
          { time: '11:30', available: true },
          { time: '12:00', available: true },
          { time: '12:30', available: true },
          { time: '13:00', available: true },
          { time: '13:30', available: true },
          { time: '14:00', available: false },
          { time: '14:30', available: false },
          { time: '15:00', available: true },
          { time: '15:30', available: true },
          { time: '16:00', available: true },
          { time: '16:30', available: true },
          { time: '17:00', available: true },
          { time: '17:30', available: true },
          { time: '18:00', available: true },
          { time: '18:30', available: true },
          { time: '19:00', available: true },
          { time: '19:30', available: true },
          { time: '20:00', available: true },
          { time: '20:30', available: true },
          { time: '21:00', available: true },
          { time: '21:30', available: true }
        ]
      },
      {
        day: 'Tuesday',
        slots: [
          { time: '06:00', available: false },
          { time: '06:30', available: false },
          { time: '07:00', available: true },
          { time: '07:30', available: true },
          { time: '08:00', available: true },
          { time: '08:30', available: true },
          { time: '09:00', available: true },
          { time: '09:30', available: true },
          { time: '10:00', available: true },
          { time: '10:30', available: true },
          { time: '11:00', available: false },
          { time: '11:30', available: false },
          { time: '12:00', available: true },
          { time: '12:30', available: true },
          { time: '13:00', available: true },
          { time: '13:30', available: true },
          { time: '14:00', available: true },
          { time: '14:30', available: true },
          { time: '15:00', available: true },
          { time: '15:30', available: true },
          { time: '16:00', available: false },
          { time: '16:30', available: false },
          { time: '17:00', available: true },
          { time: '17:30', available: true },
          { time: '18:00', available: true },
          { time: '18:30', available: true },
          { time: '19:00', available: true },
          { time: '19:30', available: true },
          { time: '20:00', available: true },
          { time: '20:30', available: true },
          { time: '21:00', available: true },
          { time: '21:30', available: true }
        ]
      },
      {
        day: 'Wednesday',
        slots: [
          { time: '06:00', available: true },
          { time: '06:30', available: true },
          { time: '07:00', available: true },
          { time: '07:30', available: true },
          { time: '08:00', available: false },
          { time: '08:30', available: false },
          { time: '09:00', available: false },
          { time: '09:30', available: false },
          { time: '10:00', available: true },
          { time: '10:30', available: true },
          { time: '11:00', available: true },
          { time: '11:30', available: true },
          { time: '12:00', available: true },
          { time: '12:30', available: true },
          { time: '13:00', available: true },
          { time: '13:30', available: true },
          { time: '14:00', available: true },
          { time: '14:30', available: true },
          { time: '15:00', available: false },
          { time: '15:30', available: false },
          { time: '16:00', available: true },
          { time: '16:30', available: true },
          { time: '17:00', available: true },
          { time: '17:30', available: true },
          { time: '18:00', available: true },
          { time: '18:30', available: true },
          { time: '19:00', available: true },
          { time: '19:30', available: true },
          { time: '20:00', available: true },
          { time: '20:30', available: true },
          { time: '21:00', available: true },
          { time: '21:30', available: true }
        ]
      },
      {
        day: 'Thursday',
        slots: [
          { time: '06:00', available: true },
          { time: '06:30', available: true },
          { time: '07:00', available: true },
          { time: '07:30', available: true },
          { time: '08:00', available: true },
          { time: '08:30', available: true },
          { time: '09:00', available: true },
          { time: '09:30', available: true },
          { time: '10:00', available: true },
          { time: '10:30', available: true },
          { time: '11:00', available: true },
          { time: '11:30', available: true },
          { time: '12:00', available: true },
          { time: '12:30', available: true },
          { time: '13:00', available: true },
          { time: '13:30', available: true },
          { time: '14:00', available: false },
          { time: '14:30', available: false },
          { time: '15:00', available: true },
          { time: '15:30', available: true },
          { time: '16:00', available: true },
          { time: '16:30', available: true },
          { time: '17:00', available: true },
          { time: '17:30', available: true },
          { time: '18:00', available: true },
          { time: '18:30', available: true },
          { time: '19:00', available: true },
          { time: '19:30', available: true },
          { time: '20:00', available: true },
          { time: '20:30', available: true },
          { time: '21:00', available: true },
          { time: '21:30', available: true }
        ]
      },
      {
        day: 'Friday',
        slots: [
          { time: '06:00', available: false },
          { time: '06:30', available: false },
          { time: '07:00', available: true },
          { time: '07:30', available: true },
          { time: '08:00', available: true },
          { time: '08:30', available: true },
          { time: '09:00', available: true },
          { time: '09:30', available: true },
          { time: '10:00', available: false },
          { time: '10:30', available: false },
          { time: '11:00', available: true },
          { time: '11:30', available: true },
          { time: '12:00', available: true },
          { time: '12:30', available: true },
          { time: '13:00', available: true },
          { time: '13:30', available: true },
          { time: '14:00', available: true },
          { time: '14:30', available: true },
          { time: '15:00', available: true },
          { time: '15:30', available: true },
          { time: '16:00', available: false },
          { time: '16:30', available: false },
          { time: '17:00', available: true },
          { time: '17:30', available: true },
          { time: '18:00', available: true },
          { time: '18:30', available: true },
          { time: '19:00', available: true },
          { time: '19:30', available: true },
          { time: '20:00', available: true },
          { time: '20:30', available: true },
          { time: '21:00', available: true },
          { time: '21:30', available: true }
        ]
      },
      {
        day: 'Saturday',
        slots: [
          { time: '06:00', available: true },
          { time: '06:30', available: true },
          { time: '07:00', available: true },
          { time: '07:30', available: true },
          { time: '08:00', available: true },
          { time: '08:30', available: true },
          { time: '09:00', available: true },
          { time: '09:30', available: true },
          { time: '10:00', available: true },
          { time: '10:30', available: true },
          { time: '11:00', available: false },
          { time: '11:30', available: false },
          { time: '12:00', available: true },
          { time: '12:30', available: true },
          { time: '13:00', available: true },
          { time: '13:30', available: true },
          { time: '14:00', available: true },
          { time: '14:30', available: true },
          { time: '15:00', available: true },
          { time: '15:30', available: true },
          { time: '16:00', available: true },
          { time: '16:30', available: true },
          { time: '17:00', available: true },
          { time: '17:30', available: true },
          { time: '18:00', available: true },
          { time: '18:30', available: true },
          { time: '19:00', available: true },
          { time: '19:30', available: true },
          { time: '20:00', available: true },
          { time: '20:30', available: true },
          { time: '21:00', available: true },
          { time: '21:30', available: true }
        ]
      },
      {
        day: 'Sunday',
        slots: [
          { time: '06:00', available: true },
          { time: '06:30', available: true },
          { time: '07:00', available: true },
          { time: '07:30', available: true },
          { time: '08:00', available: true },
          { time: '08:30', available: true },
          { time: '09:00', available: true },
          { time: '09:30', available: true },
          { time: '10:00', available: true },
          { time: '10:30', available: true },
          { time: '11:00', available: true },
          { time: '11:30', available: true },
          { time: '12:00', available: true },
          { time: '12:30', available: true },
          { time: '13:00', available: true },
          { time: '13:30', available: true },
          { time: '14:00', available: true },
          { time: '14:30', available: true },
          { time: '15:00', available: true },
          { time: '15:30', available: true },
          { time: '16:00', available: true },
          { time: '16:30', available: true },
          { time: '17:00', available: true },
          { time: '17:30', available: true },
          { time: '18:00', available: true },
          { time: '18:30', available: true },
          { time: '19:00', available: true },
          { time: '19:30', available: true },
          { time: '20:00', available: true },
          { time: '20:30', available: true },
          { time: '21:00', available: true },
          { time: '21:30', available: true }
        ]
      }
    ];

    // Mock HMRC data
    const mockEarnings: Earnings[] = [
      {
        id: 1,
        date: '2024-01-15',
        student: 'Emma Wilson',
        lessonType: 'Driving Lesson',
        amount: 35.00,
        vatAmount: hmrcCompliance.vatRegistered ? 7.00 : 0,
        category: 'lesson',
        status: 'paid',
        invoiceNumber: 'INV-001'
      },
      {
        id: 2,
        date: '2024-01-16',
        student: 'James Smith',
        lessonType: 'Theory Test',
        amount: 25.00,
        vatAmount: hmrcCompliance.vatRegistered ? 5.00 : 0,
        category: 'theory',
        status: 'paid',
        invoiceNumber: 'INV-002'
      },
      {
        id: 3,
        date: '2024-01-17',
        student: 'Lisa Brown',
        lessonType: 'Practical Test',
        amount: 50.00,
        vatAmount: hmrcCompliance.vatRegistered ? 10.00 : 0,
        category: 'test',
        status: 'pending',
        invoiceNumber: 'INV-003'
      }
    ];

    const mockExpenses: Expense[] = [
      {
        id: 1,
        date: '2024-01-10',
        description: 'Fuel for lessons',
        amount: 45.00,
        vatAmount: hmrcCompliance.vatRegistered ? 9.00 : 0,
        category: 'fuel',
        status: 'approved'
      },
      {
        id: 2,
        date: '2024-01-12',
        description: 'Car maintenance',
        amount: 120.00,
        vatAmount: hmrcCompliance.vatRegistered ? 24.00 : 0,
        category: 'maintenance',
        status: 'approved'
      },
      {
        id: 3,
        date: '2024-01-14',
        description: 'Insurance renewal',
        amount: 300.00,
        vatAmount: hmrcCompliance.vatRegistered ? 60.00 : 0,
        category: 'insurance',
        status: 'pending'
      }
    ];

    // Calculate tax
    const grossEarnings = mockEarnings.reduce((sum, earning) => sum + earning.amount, 0);
    const totalExpenses = mockExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const netProfit = grossEarnings - totalExpenses;
    const vatOwed = hmrcCompliance.vatRegistered ? 
      mockEarnings.reduce((sum, earning) => sum + (earning.vatAmount || 0), 0) - 
      mockExpenses.reduce((sum, expense) => sum + (expense.vatAmount || 0), 0) : 0;
    
    // Income Tax (20% basic rate)
    const incomeTax = Math.max(0, netProfit * 0.20);
    
    // National Insurance
    const class2NI = hmrcCompliance.class2NI ? 3.45 * 52 : 0; // £3.45 per week for 2024-25
    const class4NI = hmrcCompliance.class4NI ? Math.max(0, netProfit * 0.09) : 0; // 9% on profits over £12,570
    const totalNationalInsurance = class2NI + class4NI;
    
    // VAT threshold monitoring
    const vatThresholdRemaining = hmrcCompliance.vatThreshold - grossEarnings;
    const vatThresholdStatus = vatThresholdRemaining <= 0 ? 'exceeded' : 
                              vatThresholdRemaining <= 10000 ? 'approaching' : 'below';
    
    const totalTax = incomeTax + totalNationalInsurance + vatOwed;
    const takeHome = netProfit - totalTax;

    const mockTaxCalculation: TaxCalculation = {
      grossEarnings,
      totalExpenses,
      netProfit,
      vatOwed,
      incomeTax,
      class2NI,
      class4NI,
      totalNationalInsurance,
      totalTax,
      takeHome,
      vatThresholdStatus,
      vatThresholdRemaining
    };

    setStudents(mockStudents);
    setBookings(mockBookings);
    setAvailability(mockAvailability);
    setEarnings(mockEarnings);
    setExpenses(mockExpenses);
    setTaxCalculation(mockTaxCalculation);
    setLoading(false);
  }, [hmrcCompliance.vatRegistered]);

  // Student management functions
  const handleAddStudent = () => {
    if (newStudent.name && newStudent.email) {
      const student: Student = {
        id: Date.now(),
        name: newStudent.name,
        email: newStudent.email,
        phone: newStudent.phone,
        avatar: '/api/placeholder/40/40',
        level: newStudent.level,
        lessonsCompleted: 0,
        nextLesson: 'Not scheduled',
        progress: 0,
        status: 'Active'
      };
      setStudents([...students, student]);
      setNewStudent({ name: '', email: '', phone: '', level: 'Beginner' });
      setShowAddStudent(false);
    }
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
  };

  const handleUpdateStudent = (updatedStudent: Student) => {
    setStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    setEditingStudent(null);
  };

  const handleDeleteStudent = (studentId: number) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(s => s.id !== studentId));
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || student.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalStudents: students.length,
    activeBookings: bookings.filter(b => b.status === 'Confirmed').length,
    pendingBookings: bookings.filter(b => b.status === 'Pending').length,
    monthlyEarnings: 1250.50,
    averageRating: 4.9,
    totalLessons: 156
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setActiveTab('students')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
              <p className="text-xs text-green-600 mt-1">+2 this month</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setActiveTab('bookings')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Bookings</p>
              <p className="text-3xl font-bold text-gray-900">{stats.activeBookings}</p>
              <p className="text-xs text-blue-600 mt-1">3 pending approval</p>
            </div>
            <Calendar className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Earnings</p>
              <p className="text-3xl font-bold text-gray-900">£{stats.monthlyEarnings}</p>
              <p className="text-xs text-green-600 mt-1">+15% from last month</p>
            </div>
            <DollarSign className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-3xl font-bold text-gray-900">{stats.averageRating}</p>
              <p className="text-xs text-gray-500 mt-1">Based on 127 reviews</p>
            </div>
            <Star className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Today's Schedule</h3>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-600">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
        <div className="space-y-4">
          {bookings.filter(b => b.date === new Date().toISOString().split('T')[0]).map((booking) => (
            <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{booking.student.name}</h4>
                  <p className="text-sm text-gray-600">{booking.time} - {booking.duration}h • {booking.type}</p>
                  <p className="text-xs text-gray-500">{booking.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                  booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {booking.status}
                </span>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">£{booking.price}</p>
                  <p className="text-xs text-gray-500">per lesson</p>
                </div>
              </div>
            </div>
          ))}
          {bookings.filter(b => b.date === new Date().toISOString().split('T')[0]).length === 0 && (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No lessons scheduled for today</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Recent Bookings</h3>
          <button 
            onClick={() => setActiveTab('bookings')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
          >
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        <div className="space-y-4">
          {bookings.slice(0, 3).map((booking) => (
            <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{booking.student.name}</h4>
                  <p className="text-sm text-gray-600">{booking.date} at {booking.time}</p>
                  <p className="text-xs text-gray-500">{booking.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                  booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {booking.status}
                </span>
                <span className="text-lg font-semibold text-gray-900">£{booking.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setActiveTab('students')}
            className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Plus className="h-6 w-6 text-blue-600" />
            <span className="font-medium text-blue-900">Add Student</span>
          </button>
          <button 
            onClick={() => setActiveTab('availability')}
            className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Calendar className="h-6 w-6 text-green-600" />
            <span className="font-medium text-green-900">Set Availability</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <Settings className="h-6 w-6 text-purple-600" />
            <span className="font-medium text-purple-900">Profile Settings</span>
          </button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">This Week's Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Lessons Completed</span>
              <span className="font-semibold text-gray-900">12/15</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Earnings</span>
              <span className="font-semibold text-gray-900">£420.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Student Satisfaction</span>
              <span className="font-semibold text-gray-900">4.9/5.0</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Tasks</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">3 pending bookings to review</p>
                <p className="text-xs text-gray-600">Click to view details</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Update availability for next week</p>
                <p className="text-xs text-gray-600">Recommended action</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">All lessons confirmed for today</p>
                <p className="text-xs text-gray-600">Great job!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Students ({filteredStudents.length})</h2>
        <button 
          onClick={() => setShowAddStudent(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Add Student
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search students by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lessons</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Lesson</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                        <div className="text-xs text-gray-400">{student.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      student.level === 'Beginner' ? 'bg-yellow-100 text-yellow-800' :
                      student.level === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {student.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.lessonsCompleted}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.nextLesson}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      student.status === 'Active' ? 'bg-green-100 text-green-800' :
                      student.status === 'Paused' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleEditStudent(student)}
                        className="text-blue-600 hover:text-blue-700 p-1 rounded"
                        title="Edit Student"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteStudent(student.id)}
                        className="text-red-600 hover:text-red-700 p-1 rounded"
                        title="Delete Student"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-gray-600 hover:text-gray-700 p-1 rounded"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No students found</p>
            <p className="text-sm text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Add Student Modal */}
      {showAddStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Student</h3>
              <button 
                onClick={() => setShowAddStudent(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter student's full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter student's email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={newStudent.phone}
                  onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter student's phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                <select
                  value={newStudent.level}
                  onChange={(e) => setNewStudent({...newStudent, level: e.target.value as 'Beginner' | 'Intermediate' | 'Advanced'})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowAddStudent(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddStudent}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Add Student
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Edit Student</h3>
              <button 
                onClick={() => setEditingStudent(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent({...editingStudent, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editingStudent.email}
                  onChange={(e) => setEditingStudent({...editingStudent, email: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={editingStudent.phone}
                  onChange={(e) => setEditingStudent({...editingStudent, phone: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                <select
                  value={editingStudent.level}
                  onChange={(e) => setEditingStudent({...editingStudent, level: e.target.value as 'Beginner' | 'Intermediate' | 'Advanced'})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editingStudent.status}
                  onChange={(e) => setEditingStudent({...editingStudent, status: e.target.value as 'Active' | 'Paused' | 'Completed'})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Paused">Paused</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setEditingStudent(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleUpdateStudent(editingStudent)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const handleBookingAction = (bookingId: number, action: string) => {
    setBookings(bookings.map(booking => {
      if (booking.id === bookingId) {
        switch (action) {
          case 'confirm':
            return { ...booking, status: 'Confirmed' as const };
          case 'decline':
            return { ...booking, status: 'Cancelled' as const };
          case 'complete':
            return { ...booking, status: 'Completed' as const };
          case 'reschedule':
            // In real app, this would open a reschedule modal
            return booking;
          default:
            return booking;
        }
      }
      return booking;
    }));
  };

  const renderBookings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Bookings Management</h2>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Calendar View
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Add Booking
          </button>
        </div>
      </div>

      {/* Booking Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{bookings.filter(b => b.status === 'Pending').length}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Confirmed</p>
              <p className="text-2xl font-bold text-green-600">{bookings.filter(b => b.status === 'Confirmed').length}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-blue-600">{bookings.filter(b => b.status === 'Completed').length}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-purple-600">£{bookings.reduce((sum, b) => sum + b.price, 0)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Bookings */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Pending Approval</h3>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
              {bookings.filter(b => b.status === 'Pending').length}
            </span>
          </div>
          <div className="space-y-3">
            {bookings.filter(b => b.status === 'Pending').map((booking) => (
              <div key={booking.id} className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{booking.student.name}</h4>
                  <span className="text-sm text-gray-600">{new Date(booking.date).toLocaleDateString()}</span>
                </div>
                <div className="space-y-1 mb-3">
                  <p className="text-sm text-gray-600 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {booking.time} - {booking.duration}h
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {booking.location}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Car className="h-4 w-4 mr-1" />
                    {booking.type}
                  </p>
                  <p className="text-sm font-semibold text-gray-900">£{booking.price}</p>
                </div>
                {booking.notes && (
                  <p className="text-xs text-gray-600 mb-3 italic">"{booking.notes}"</p>
                )}
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleBookingAction(booking.id, 'confirm')}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 flex items-center"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Confirm
                  </button>
                  <button 
                    onClick={() => handleBookingAction(booking.id, 'decline')}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 flex items-center"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Decline
                  </button>
                </div>
              </div>
            ))}
            {bookings.filter(b => b.status === 'Pending').length === 0 && (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No pending bookings</p>
              </div>
            )}
          </div>
        </div>

        {/* Confirmed Bookings */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Confirmed</h3>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              {bookings.filter(b => b.status === 'Confirmed').length}
            </span>
          </div>
          <div className="space-y-3">
            {bookings.filter(b => b.status === 'Confirmed').map((booking) => (
              <div key={booking.id} className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{booking.student.name}</h4>
                  <span className="text-sm text-gray-600">{new Date(booking.date).toLocaleDateString()}</span>
                </div>
                <div className="space-y-1 mb-3">
                  <p className="text-sm text-gray-600 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {booking.time} - {booking.duration}h
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {booking.location}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Car className="h-4 w-4 mr-1" />
                    {booking.type}
                  </p>
                  <p className="text-sm font-semibold text-gray-900">£{booking.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleBookingAction(booking.id, 'complete')}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Complete
                  </button>
                  <button 
                    onClick={() => handleBookingAction(booking.id, 'reschedule')}
                    className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 flex items-center"
                  >
                    <Calendar className="h-4 w-4 mr-1" />
                    Reschedule
                  </button>
                </div>
              </div>
            ))}
            {bookings.filter(b => b.status === 'Confirmed').length === 0 && (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No confirmed bookings</p>
              </div>
            )}
          </div>
        </div>

        {/* Completed Bookings */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Completed</h3>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
              {bookings.filter(b => b.status === 'Completed').length}
            </span>
          </div>
          <div className="space-y-3">
            {bookings.filter(b => b.status === 'Completed').map((booking) => (
              <div key={booking.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{booking.student.name}</h4>
                  <span className="text-sm text-gray-600">{new Date(booking.date).toLocaleDateString()}</span>
                </div>
                <div className="space-y-1 mb-3">
                  <p className="text-sm text-gray-600 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {booking.time} - {booking.duration}h
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Car className="h-4 w-4 mr-1" />
                    {booking.type}
                  </p>
                  <p className="text-sm font-semibold text-green-600">£{booking.price} earned</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center">
                    <Edit className="h-4 w-4 mr-1" />
                    Add Notes
                  </button>
                  <button className="text-gray-600 hover:text-gray-700 text-sm flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Rate
                  </button>
                </div>
              </div>
            ))}
            {bookings.filter(b => b.status === 'Completed').length === 0 && (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No completed bookings</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const handleAvailabilityToggle = (day: string, time: string) => {
    setAvailability(availability.map(dayData => {
      if (dayData.day === day) {
        return {
          ...dayData,
          slots: dayData.slots.map(slot => 
            slot.time === time ? { ...slot, available: !slot.available } : slot
          )
        };
      }
      return dayData;
    }));
  };

  const handleBulkAvailability = (action: 'available' | 'unavailable') => {
    setAvailability(availability.map(dayData => ({
      ...dayData,
      slots: dayData.slots.map(slot => ({ ...slot, available: action === 'available' }))
    })));
  };

  // Conflict resolution functions
  const checkTimeSlotConflict = (day: string, startTime: string, duration: number) => {
    const dayData = availability.find(d => d.day === day);
    if (!dayData) return { hasConflict: false, conflicts: [] };

    const startMinutes = timeToMinutes(startTime);
    const endMinutes = startMinutes + (duration * 60);
    const conflicts = [];

    for (let time = startMinutes; time < endMinutes; time += 30) {
      const timeStr = minutesToTime(time);
      const slot = dayData.slots.find(s => s.time === timeStr);
      if (!slot || !slot.available) {
        conflicts.push(timeStr);
      }
    }

    return { hasConflict: conflicts.length > 0, conflicts };
  };

  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const minutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const findAlternativeSlots = (day: string, duration: number) => {
    const dayData = availability.find(d => d.day === day);
    if (!dayData) return [];

    const alternatives = [];
    const slots = dayData.slots.filter(slot => slot.available);
    
    for (let i = 0; i < slots.length; i++) {
      const startTime = slots[i].time;
      const startMinutes = timeToMinutes(startTime);
      const endMinutes = startMinutes + (duration * 60);
      
      // Check if we have enough consecutive slots
      let hasEnoughSlots = true;
      for (let time = startMinutes + 30; time < endMinutes; time += 30) {
        const timeStr = minutesToTime(time);
        const slot = dayData.slots.find(s => s.time === timeStr);
        if (!slot || !slot.available) {
          hasEnoughSlots = false;
          break;
        }
      }
      
      if (hasEnoughSlots) {
        alternatives.push({
          startTime,
          endTime: minutesToTime(endMinutes),
          duration: `${duration} hour${duration > 1 ? 's' : ''}`
        });
      }
    }
    
    return alternatives;
  };

  const handleBookingRequest = (studentName: string, day: string, startTime: string, duration: number) => {
    const conflict = checkTimeSlotConflict(day, startTime, duration);
    
    if (conflict.hasConflict) {
      setConflictDetails({
        studentName,
        day,
        requestedTime: startTime,
        duration,
        conflicts: conflict.conflicts,
        alternatives: findAlternativeSlots(day, duration)
      });
      setShowConflictModal(true);
    } else {
      // Process booking normally
      alert(`Booking confirmed for ${studentName} on ${day} at ${startTime} for ${duration} hour(s)`);
    }
  };

  // Calendar utility functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    
    return days;
  };

  const getDaySlots = (date: Date) => {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dayData = availability.find(d => d.day === dayName);
    return dayData ? dayData.slots : [];
  };

  const formatTime = (time: string, granularity: 'minutes' | 'seconds' = 'minutes') => {
    if (granularity === 'seconds') {
      return time + ':00';
    }
    return time;
  };

  const parseTimeToSeconds = (timeStr: string) => {
    const [hours, minutes, seconds = 0] = timeStr.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const secondsToTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeSlotClick = (date: Date, timeSlot: any) => {
    setSelectedTimeSlot({
      date,
      timeSlot,
      originalTime: timeSlot.time
    });
    setShowTimeEditor(true);
  };

  const handleTimeUpdate = (newTime: string) => {
    if (selectedTimeSlot) {
      const dayName = selectedTimeSlot.date.toLocaleDateString('en-US', { weekday: 'long' });
      setAvailability(prev => prev.map(dayData => {
        if (dayData.day === dayName) {
          return {
            ...dayData,
            slots: dayData.slots.map(slot => 
              slot.time === selectedTimeSlot.originalTime 
                ? { ...slot, time: newTime }
                : slot
            )
          };
        }
        return dayData;
      }));
      setShowTimeEditor(false);
      setSelectedTimeSlot(null);
    }
  };

  // Learner-friendly time presets
  const timePresets = {
    earlyMorning: {
      name: 'Early Morning (6:00 AM - 8:00 AM)',
      times: ['06:00', '06:30', '07:00', '07:30', '08:00', '08:30'],
      description: 'Perfect for early risers and before work'
    },
    morning: {
      name: 'Morning (8:00 AM - 12:00 PM)',
      times: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30'],
      description: 'Standard morning hours'
    },
    afternoon: {
      name: 'Afternoon (12:00 PM - 5:00 PM)',
      times: ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'],
      description: 'Lunch break and afternoon sessions'
    },
    evening: {
      name: 'Evening (5:00 PM - 9:30 PM)',
      times: ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'],
      description: 'After work and dinner time'
    },
    weekend: {
      name: 'Weekend (All Day)',
      times: ['06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'],
      description: 'Full weekend availability'
    }
  };

  const applyTimePreset = (presetKey: string, days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']) => {
    const preset = timePresets[presetKey as keyof typeof timePresets];
    if (!preset) return;

    setAvailability(prev => prev.map(dayData => {
      if (days.includes(dayData.day)) {
        return {
          ...dayData,
          slots: dayData.slots.map(slot => ({
            ...slot,
            available: preset.times.includes(slot.time)
          }))
        };
      }
      return dayData;
    }));
  };

  const getLearnerFriendlySlots = (day: string) => {
    const dayData = availability.find(d => d.day === day);
    if (!dayData) return { earlyMorning: [], evening: [], weekend: [] };

    return {
      earlyMorning: dayData.slots.filter(slot => 
        ['06:00', '06:30', '07:00', '07:30', '08:00', '08:30'].includes(slot.time) && slot.available
      ),
      evening: dayData.slots.filter(slot => 
        ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'].includes(slot.time) && slot.available
      ),
      weekend: dayData.slots.filter(slot => slot.available)
    };
  };

  // Professional time management functions
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 6; hour <= 21; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const getTimeSlotStatus = (day: string, time: string) => {
    const dayData = availability.find(d => d.day === day);
    if (!dayData) return 'unavailable';
    
    const slot = dayData.slots.find(s => s.time === time);
    return slot ? (slot.available ? 'available' : 'unavailable') : 'unavailable';
  };

  const toggleTimeSlot = (day: string, time: string) => {
    setAvailability(prev => prev.map(dayData => {
      if (dayData.day === day) {
        const existingSlot = dayData.slots.find(s => s.time === time);
        if (existingSlot) {
          return {
            ...dayData,
            slots: dayData.slots.map(slot => 
              slot.time === time 
                ? { ...slot, available: !slot.available }
                : slot
            )
          };
        } else {
          return {
            ...dayData,
            slots: [...dayData.slots, { time, available: true }]
          };
        }
      }
      return dayData;
    }));
  };

  const applyRegularSchedule = (day: string) => {
    const dayKey = day.toLowerCase() as keyof typeof regularSchedule;
    const schedule = regularSchedule[dayKey];
    
    if (!schedule.enabled) return;

    setAvailability(prev => prev.map(dayData => {
      if (dayData.day === day) {
        return {
          ...dayData,
          slots: dayData.slots.map(slot => ({
            ...slot,
            available: schedule.times.includes(slot.time)
          }))
        };
      }
      return dayData;
    }));
  };

  const updateRegularSchedule = (day: string, times: string[]) => {
    const dayKey = day.toLowerCase() as keyof typeof regularSchedule;
    setRegularSchedule(prev => ({
      ...prev,
      [dayKey]: { ...prev[dayKey], times }
    }));
  };

  const toggleRegularSchedule = (day: string) => {
    const dayKey = day.toLowerCase() as keyof typeof regularSchedule;
    setRegularSchedule(prev => ({
      ...prev,
      [dayKey]: { ...prev[dayKey], enabled: !prev[dayKey].enabled }
    }));
  };

  // HMRC Compliance functions
  const handleAddEarning = () => {
    if (newEarning.date && newEarning.student && newEarning.amount > 0) {
      const earning: Earnings = {
        id: Date.now(),
        date: newEarning.date,
        student: newEarning.student,
        lessonType: newEarning.lessonType,
        amount: newEarning.amount,
        vatAmount: hmrcCompliance.vatRegistered ? newEarning.amount * 0.20 : 0,
        category: newEarning.category,
        status: 'paid',
        invoiceNumber: `INV-${String(Date.now()).slice(-3)}`
      };
      setEarnings(prev => [...prev, earning]);
      setNewEarning({ date: '', student: '', lessonType: '', amount: 0, category: 'lesson' });
      setShowAddEarning(false);
    }
  };

  const handleAddExpense = () => {
    if (newExpense.date && newExpense.description && newExpense.amount > 0) {
      const businessAmount = newExpense.amount * (newExpense.businessUse / 100);
      const expense: Expense = {
        id: Date.now(),
        date: newExpense.date,
        description: newExpense.description,
        amount: businessAmount,
        vatAmount: hmrcCompliance.vatRegistered ? businessAmount * 0.20 : 0,
        category: newExpense.category,
        status: 'pending',
        businessUse: newExpense.businessUse
      };
      setExpenses(prev => [...prev, expense]);
      setNewExpense({ date: '', description: '', amount: 0, category: 'fuel', businessUse: 100 });
      setShowAddExpense(false);
    }
  };

  const updateHMRCCompliance = (updates: Partial<HMRCCompliance>) => {
    setHmrcCompliance(prev => ({ ...prev, ...updates }));
  };

  const renderAvailability = () => (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-900">Calendar View</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCalendarView('month')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                calendarView === 'month' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setCalendarView('week')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                calendarView === 'week' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setCalendarView('day')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                calendarView === 'day' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Day
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
            </button>
            <h3 className="text-lg font-semibold text-gray-900 min-w-[200px] text-center">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setTimeGranularity(timeGranularity === 'minutes' ? 'seconds' : 'minutes')}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200"
            >
              {timeGranularity === 'minutes' ? 'Minutes' : 'Seconds'}
            </button>
            <button
              onClick={() => setShowTimePresets(!showTimePresets)}
              className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200"
            >
              Time Presets
            </button>
            <button
              onClick={() => setShowProfessionalView(!showProfessionalView)}
              className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-200"
            >
              Professional View
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Today
            </button>
          </div>
        </div>
      </div>

      {/* Time Presets Section */}
      {showTimePresets && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Learner-Friendly Time Presets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(timePresets).map(([key, preset]) => (
              <div key={key} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{preset.name}</h4>
                  <button
                    onClick={() => applyTimePreset(key)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-3">{preset.description}</p>
                <div className="flex flex-wrap gap-1">
                  {preset.times.slice(0, 6).map(time => (
                    <span key={time} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {time}
                    </span>
                  ))}
                  {preset.times.length > 6 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      +{preset.times.length - 6} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Quick Setup for Common Learner Schedules</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Early Birds (6 AM - 8 AM)</p>
                  <p className="text-sm text-gray-600">For learners who prefer morning lessons</p>
                </div>
                <button
                  onClick={() => applyTimePreset('earlyMorning', ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Set Weekdays
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">After Work (5 PM - 9:30 PM)</p>
                  <p className="text-sm text-gray-600">For working professionals</p>
                </div>
                <button
                  onClick={() => applyTimePreset('evening', ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Set Weekdays
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Weekend Warriors</p>
                  <p className="text-sm text-gray-600">Full weekend availability</p>
                </div>
                <button
                  onClick={() => applyTimePreset('weekend', ['Saturday', 'Sunday'])}
                  className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                >
                  Set Weekends
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Flexible Schedule</p>
                  <p className="text-sm text-gray-600">All day, every day</p>
                </div>
                <button
                  onClick={() => applyTimePreset('weekend', ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Set All Days
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Professional Time Management View */}
      {showProfessionalView && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Professional Time Management</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-600">Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-sm text-gray-600">Unavailable</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-300 rounded"></div>
                <span className="text-sm text-gray-600">Not Set</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Day Selector */}
            <div className="lg:col-span-1">
              <h4 className="font-medium text-gray-900 mb-4">Select Day</h4>
              <div className="space-y-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                      selectedDay === day
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{day}</span>
                      <div className="flex items-center space-x-2">
                        {regularSchedule[day.toLowerCase() as keyof typeof regularSchedule]?.enabled && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        <span className="text-xs text-gray-500">
                          {getTimeSlotStatus(day, '09:00') === 'available' ? 'Available' : 'Not Set'}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Management */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">{selectedDay} Schedule</h4>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleRegularSchedule(selectedDay)}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      regularSchedule[selectedDay.toLowerCase() as keyof typeof regularSchedule]?.enabled
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {regularSchedule[selectedDay.toLowerCase() as keyof typeof regularSchedule]?.enabled ? 'Regular Day' : 'Custom Day'}
                  </button>
                  <button
                    onClick={() => applyRegularSchedule(selectedDay)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700"
                  >
                    Apply Regular
                  </button>
                </div>
              </div>

              {/* Time Slots Grid */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-8 gap-2">
                  {generateTimeSlots().map(time => {
                    const status = getTimeSlotStatus(selectedDay, time);
                    const isRegularTime = regularSchedule[selectedDay.toLowerCase() as keyof typeof regularSchedule]?.times.includes(time);
                    
                    return (
                      <button
                        key={time}
                        onClick={() => toggleTimeSlot(selectedDay, time)}
                        className={`p-2 text-xs font-medium rounded border transition-colors ${
                          status === 'available'
                            ? 'bg-green-100 border-green-300 text-green-800 hover:bg-green-200'
                            : status === 'unavailable'
                            ? 'bg-red-100 border-red-300 text-red-800 hover:bg-red-200'
                            : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                        } ${isRegularTime ? 'ring-2 ring-blue-300' : ''}`}
                        title={`${time} - ${status === 'available' ? 'Available' : status === 'unavailable' ? 'Unavailable' : 'Not Set'}${isRegularTime ? ' (Regular Time)' : ''}`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => {
                    const morningTimes = ['06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30'];
                    morningTimes.forEach(time => {
                      if (getTimeSlotStatus(selectedDay, time) !== 'available') {
                        toggleTimeSlot(selectedDay, time);
                      }
                    });
                  }}
                  className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                >
                  Set Morning (6 AM - 12 PM)
                </button>
                <button
                  onClick={() => {
                    const afternoonTimes = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'];
                    afternoonTimes.forEach(time => {
                      if (getTimeSlotStatus(selectedDay, time) !== 'available') {
                        toggleTimeSlot(selectedDay, time);
                      }
                    });
                  }}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  Set Afternoon (12 PM - 6 PM)
                </button>
                <button
                  onClick={() => {
                    const eveningTimes = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];
                    eveningTimes.forEach(time => {
                      if (getTimeSlotStatus(selectedDay, time) !== 'available') {
                        toggleTimeSlot(selectedDay, time);
                      }
                    });
                  }}
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  Set Evening (6 PM - 9:30 PM)
                </button>
              </div>

              {/* Regular Schedule Management */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-blue-900 mb-3">Regular Schedule for {selectedDay}</h5>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={regularSchedule[selectedDay.toLowerCase() as keyof typeof regularSchedule]?.enabled || false}
                      onChange={() => toggleRegularSchedule(selectedDay)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Enable regular schedule</span>
                  </label>
                  <div className="flex-1">
                    <select
                      multiple
                      value={regularSchedule[selectedDay.toLowerCase() as keyof typeof regularSchedule]?.times || []}
                      onChange={(e) => {
                        const selectedTimes = Array.from(e.target.selectedOptions, option => option.value);
                        updateRegularSchedule(selectedDay, selectedTimes);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      size={6}
                    >
                      {generateTimeSlots().map(time => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-600 mt-1">Hold Ctrl/Cmd to select multiple times</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Content */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {calendarView === 'month' && (
          <div className="p-4">
            {/* Month View */}
            <div className="grid grid-cols-7 gap-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 bg-gray-50">
                  {day}
                </div>
              ))}
              {getDaysInMonth(currentDate).map((date, index) => (
                <div
                  key={index}
                  className={`min-h-[120px] p-2 border border-gray-200 ${
                    date ? 'bg-white hover:bg-gray-50' : 'bg-gray-100'
                  }`}
                >
                  {date && (
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${
                          date.toDateString() === new Date().toDateString() 
                            ? 'text-blue-600' 
                            : 'text-gray-900'
                        }`}>
                          {date.getDate()}
                        </span>
                        <div className="flex space-x-1">
                          {(() => {
                            const slots = getDaySlots(date);
                            const friendlySlots = getLearnerFriendlySlots(date.toLocaleDateString('en-US', { weekday: 'long' }));
                            
                            return (
                              <>
                                {friendlySlots.earlyMorning.length > 0 && (
                                  <div className="w-2 h-2 bg-yellow-500 rounded-full" title="Early Morning Available"></div>
                                )}
                                {friendlySlots.evening.length > 0 && (
                                  <div className="w-2 h-2 bg-purple-500 rounded-full" title="Evening Available"></div>
                                )}
                                {slots.filter(slot => slot.available).length > 0 && (
                                  <div className="w-2 h-2 bg-green-500 rounded-full" title="Available"></div>
                                )}
                                {slots.filter(slot => !slot.available).length > 0 && (
                                  <div className="w-2 h-2 bg-red-500 rounded-full" title="Unavailable"></div>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      </div>
                      <div className="space-y-1">
                        {getDaySlots(date).slice(0, 3).map((slot, slotIndex) => (
                          <div
                            key={slotIndex}
                            onClick={() => handleTimeSlotClick(date, slot)}
                            className={`text-xs p-1 rounded cursor-pointer transition-colors ${
                              slot.available 
                                ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                          >
                            {formatTime(slot.time, timeGranularity)}
                          </div>
                        ))}
                        {getDaySlots(date).length > 3 && (
                          <div className="text-xs text-gray-500">
                            +{getDaySlots(date).length - 3} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {calendarView === 'week' && (
          <div className="p-4">
            {/* Week View */}
            <div className="grid grid-cols-8 gap-1">
              <div className="p-2 text-center text-sm font-medium text-gray-500 bg-gray-50">
                Time
              </div>
              {getWeekDays(currentDate).map(date => (
                <div key={date.toDateString()} className="p-2 text-center text-sm font-medium text-gray-500 bg-gray-50">
                  <div>{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                  <div className="text-xs text-gray-400">{date.getDate()}</div>
                </div>
              ))}
              
              {['06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'].map(time => (
                <>
                  <div key={`time-${time}`} className="p-2 text-sm font-medium text-gray-700 bg-gray-50 border-r">
                    {formatTime(time, timeGranularity)}
                  </div>
                  {getWeekDays(currentDate).map(date => {
                    const daySlots = getDaySlots(date);
                    const slot = daySlots.find(s => s.time === time);
                    return (
                      <div
                        key={`${date.toDateString()}-${time}`}
                        onClick={() => slot && handleTimeSlotClick(date, slot)}
                        className={`min-h-[40px] p-2 border border-gray-200 cursor-pointer transition-colors ${
                          slot?.available 
                            ? 'bg-green-50 hover:bg-green-100' 
                            : 'bg-red-50 hover:bg-red-100'
                        }`}
                      >
                        {slot && (
                          <div className={`text-xs p-1 rounded ${
                            slot.available 
                              ? 'bg-green-200 text-green-800' 
                              : 'bg-red-200 text-red-800'
                          }`}>
                            {slot.available ? 'Available' : 'Busy'}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </>
              ))}
            </div>
          </div>
        )}

        {calendarView === 'day' && (
          <div className="p-4">
            {/* Day View */}
            <div className="space-y-2">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {currentDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Available Slots</h4>
                  <div className="space-y-1">
                    {getDaySlots(currentDate)
                      .filter(slot => slot.available)
                      .map((slot, index) => (
                        <div
                          key={index}
                          onClick={() => handleTimeSlotClick(currentDate, slot)}
                          className="p-2 bg-green-100 text-green-800 rounded cursor-pointer hover:bg-green-200 transition-colors"
                        >
                          {formatTime(slot.time, timeGranularity)}
                        </div>
                      ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Unavailable Slots</h4>
                  <div className="space-y-1">
                    {getDaySlots(currentDate)
                      .filter(slot => !slot.available)
                      .map((slot, index) => (
                        <div
                          key={index}
                          onClick={() => handleTimeSlotClick(currentDate, slot)}
                          className="p-2 bg-red-100 text-red-800 rounded cursor-pointer hover:bg-red-200 transition-colors"
                        >
                          {formatTime(slot.time, timeGranularity)}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Time Editor Modal */}
      {showTimeEditor && selectedTimeSlot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Edit Time Slot</h3>
              <button
                onClick={() => setShowTimeEditor(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Time: {selectedTimeSlot.timeSlot.time}
                </label>
                <input
                  type="time"
                  step={timeGranularity === 'seconds' ? '1' : '60'}
                  defaultValue={selectedTimeSlot.timeSlot.time}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={(e) => {
                    const newTime = e.target.value;
                    if (newTime) {
                      handleTimeUpdate(newTime);
                    }
                  }}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="toggleAvailability"
                  checked={selectedTimeSlot.timeSlot.available}
                  onChange={(e) => {
                    const dayName = selectedTimeSlot.date.toLocaleDateString('en-US', { weekday: 'long' });
                    setAvailability(prev => prev.map(dayData => {
                      if (dayData.day === dayName) {
                        return {
                          ...dayData,
                          slots: dayData.slots.map(slot => 
                            slot.time === selectedTimeSlot.originalTime 
                              ? { ...slot, available: e.target.checked }
                              : slot
                          )
                        };
                      }
                      return dayData;
                    }));
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="toggleAvailability" className="text-sm text-gray-700">
                  Available for booking
                </label>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowTimeEditor(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Learner-Friendly Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Learner-Friendly Availability Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Early Morning (6:00 AM - 8:00 AM)</h4>
            <p className="text-2xl font-bold text-yellow-600 mb-1">
              {availability.reduce((total, day) => 
                total + getLearnerFriendlySlots(day.day).earlyMorning.length, 0
              )}
            </p>
            <p className="text-sm text-gray-600">Available slots this week</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Evening (5:00 PM - 9:30 PM)</h4>
            <p className="text-2xl font-bold text-purple-600 mb-1">
              {availability.reduce((total, day) => 
                total + getLearnerFriendlySlots(day.day).evening.length, 0
              )}
            </p>
            <p className="text-sm text-gray-600">Available slots this week</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Total Available</h4>
            <p className="text-2xl font-bold text-green-600 mb-1">
              {availability.reduce((total, day) => 
                total + day.slots.filter(slot => slot.available).length, 0
              )}
            </p>
            <p className="text-sm text-gray-600">All time slots this week</p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Learner-Friendly Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-gray-700">Early morning slots for early risers</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-gray-700">Evening slots for after-work learners</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-gray-700">Flexible scheduling with 30-minute intervals</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-gray-700">Weekend availability for busy schedules</span>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-3">Test Conflict Resolution</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
            <input
              type="text"
              placeholder="Enter student name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="demoStudentName"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Duration</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="demoDuration"
            >
              {lessonDurations.map(duration => (
                <option key={duration} value={duration === '1 hour' ? 1 : duration === '1.5 hours' ? 1.5 : duration === '2 hours' ? 2 : 0.5}>
                  {duration}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={() => {
              const studentName = (document.getElementById('demoStudentName') as HTMLInputElement)?.value || 'Demo Student';
              const duration = parseFloat((document.getElementById('demoDuration') as HTMLSelectElement)?.value || '1');
              handleBookingRequest(studentName, 'Monday', '09:45', duration);
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Test Conflict (9:45 AM - 1 hour lesson)
          </button>
          <p className="text-xs text-gray-600 mt-2">
            This simulates a student requesting a 1-hour lesson starting at 9:45 AM on Monday, 
            which conflicts with your availability ending at 10:15 AM.
          </p>
        </div>
      </div>
    </div>
  );

  const renderHMRCCompliance = () => (
    <div className="space-y-6">
      {/* HMRC Compliance Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">HMRC Compliance</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddEarning(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Earning
          </button>
          <button
            onClick={() => setShowAddExpense(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </button>
        </div>
      </div>

      {/* Compliance Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">VAT Status</p>
              <p className="text-lg font-bold text-gray-900">
                {hmrcCompliance.vatRegistered ? 'Registered' : 'Not Registered'}
              </p>
              {taxCalculation && (
                <p className="text-xs text-gray-500">
                  Threshold: £{hmrcCompliance.vatThreshold.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Tax Year</p>
              <p className="text-lg font-bold text-gray-900">{hmrcCompliance.taxYear}</p>
              <p className="text-xs text-gray-500">
                {hmrcCompliance.businessStructure.replace('_', ' ').toUpperCase()}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-orange-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Next Deadline</p>
              <p className="text-lg font-bold text-gray-900">
                {hmrcCompliance.nextDeadline ? new Date(hmrcCompliance.nextDeadline).toLocaleDateString() : 'N/A'}
              </p>
              <p className="text-xs text-gray-500">Self Assessment</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <Calculator className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tax Owed</p>
              <p className="text-lg font-bold text-gray-900">
                £{taxCalculation?.totalTax.toFixed(2) || '0.00'}
              </p>
              <p className="text-xs text-gray-500">Annual Liability</p>
            </div>
          </div>
        </div>
      </div>

      {/* VAT Threshold Alert */}
      {taxCalculation && taxCalculation.vatThresholdStatus !== 'below' && (
        <div className={`rounded-lg border p-4 ${
          taxCalculation.vatThresholdStatus === 'exceeded' 
            ? 'bg-red-50 border-red-200' 
            : 'bg-yellow-50 border-yellow-200'
        }`}>
          <div className="flex items-center">
            <AlertTriangle className={`h-5 w-5 mr-2 ${
              taxCalculation.vatThresholdStatus === 'exceeded' ? 'text-red-500' : 'text-yellow-500'
            }`} />
            <div>
              <h4 className={`font-semibold ${
                taxCalculation.vatThresholdStatus === 'exceeded' ? 'text-red-800' : 'text-yellow-800'
              }`}>
                VAT Threshold {taxCalculation.vatThresholdStatus === 'exceeded' ? 'Exceeded' : 'Approaching'}
              </h4>
              <p className={`text-sm ${
                taxCalculation.vatThresholdStatus === 'exceeded' ? 'text-red-700' : 'text-yellow-700'
              }`}>
                {taxCalculation.vatThresholdStatus === 'exceeded' 
                  ? `You have exceeded the VAT threshold by £${Math.abs(taxCalculation.vatThresholdRemaining).toFixed(2)}. Registration may be required.`
                  : `You are approaching the VAT threshold. £${taxCalculation.vatThresholdRemaining.toFixed(2)} remaining.`
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tax Calculation Summary */}
      {taxCalculation && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Calculation Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Gross Earnings:</span>
                <span className="font-medium">£{taxCalculation.grossEarnings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Expenses:</span>
                <span className="font-medium">£{taxCalculation.totalExpenses.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-600">Net Profit:</span>
                <span className="font-medium">£{taxCalculation.netProfit.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Income Tax (20%):</span>
                <span className="font-medium">£{taxCalculation.incomeTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Class 2 NI (£3.45/week):</span>
                <span className="font-medium">£{taxCalculation.class2NI.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Class 4 NI (9%):</span>
                <span className="font-medium">£{taxCalculation.class4NI.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-1">
                <span className="text-gray-600 font-medium">Total NI:</span>
                <span className="font-medium">£{taxCalculation.totalNationalInsurance.toFixed(2)}</span>
              </div>
              {hmrcCompliance.vatRegistered && (
                <div className="flex justify-between">
                  <span className="text-gray-600">VAT Owed:</span>
                  <span className="font-medium">£{taxCalculation.vatOwed.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between border-t pt-2 font-bold">
                <span className="text-gray-900">Take Home:</span>
                <span className="text-green-600">£{taxCalculation.takeHome.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Earnings and Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Earnings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {earnings.map(earning => (
                  <tr key={earning.id}>
                    <td className="px-4 py-3 text-sm text-gray-900">{earning.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{earning.student}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">£{earning.amount.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        earning.status === 'paid' 
                          ? 'bg-green-100 text-green-800' 
                          : earning.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {earning.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Expenses Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Expenses</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {expenses.map(expense => (
                  <tr key={expense.id}>
                    <td className="px-4 py-3 text-sm text-gray-900">{expense.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{expense.description}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">£{expense.amount.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        expense.status === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : expense.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {expense.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* HMRC Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">HMRC Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">UTR Number</label>
              <input
                type="text"
                value={hmrcCompliance.utrNumber}
                onChange={(e) => updateHMRCCompliance({ utrNumber: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="10-digit UTR"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">National Insurance</label>
              <input
                type="text"
                value={hmrcCompliance.nationalInsurance}
                onChange={(e) => updateHMRCCompliance({ nationalInsurance: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="AB123456C"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Structure</label>
              <select
                value={hmrcCompliance.businessStructure}
                onChange={(e) => updateHMRCCompliance({ businessStructure: e.target.value as 'sole_trader' | 'limited_company' | 'franchise' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="sole_trader">Sole Trader</option>
                <option value="limited_company">Limited Company</option>
                <option value="franchise">Franchise</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
              <input
                type="text"
                value={hmrcCompliance.businessName}
                onChange={(e) => updateHMRCCompliance({ businessName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Address</label>
              <textarea
                value={hmrcCompliance.businessAddress}
                onChange={(e) => updateHMRCCompliance({ businessAddress: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Accounting Method</label>
              <select
                value={hmrcCompliance.accountingMethod}
                onChange={(e) => updateHMRCCompliance({ accountingMethod: e.target.value as 'cash' | 'accrual' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="cash">Cash Basis</option>
                <option value="accrual">Accrual Basis</option>
              </select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="vatRegistered"
                  checked={hmrcCompliance.vatRegistered}
                  onChange={(e) => updateHMRCCompliance({ vatRegistered: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="vatRegistered" className="ml-2 text-sm text-gray-700">
                  VAT Registered
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="class2NI"
                  checked={hmrcCompliance.class2NI}
                  onChange={(e) => updateHMRCCompliance({ class2NI: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="class2NI" className="ml-2 text-sm text-gray-700">
                  Class 2 National Insurance
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="class4NI"
                  checked={hmrcCompliance.class4NI}
                  onChange={(e) => updateHMRCCompliance({ class4NI: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="class4NI" className="ml-2 text-sm text-gray-700">
                  Class 4 National Insurance
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'availability', label: 'Availability', icon: Clock },
    { id: 'hmrc', label: 'HMRC Compliance', icon: Shield }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Instructor Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage your students, bookings, and schedule</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <MessageCircle className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <Settings className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'students' && renderStudents()}
        {activeTab === 'bookings' && renderBookings()}
        {activeTab === 'availability' && renderAvailability()}
        {activeTab === 'hmrc' && renderHMRCCompliance()}
      </div>

      {/* Conflict Resolution Modal */}
      {showConflictModal && conflictDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Scheduling Conflict Detected</h3>
              <button
                onClick={() => setShowConflictModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <div>
                    <h4 className="font-semibold text-red-800">Conflict Details</h4>
                    <p className="text-red-700">
                      {conflictDetails.studentName} requested a {conflictDetails.duration} hour lesson on {conflictDetails.day} at {conflictDetails.requestedTime}
                    </p>
                    <p className="text-red-600 text-sm mt-1">
                      Unavailable time slots: {conflictDetails.conflicts.join(', ')}
                    </p>
                  </div>
                </div>
              </div>

              {conflictDetails.alternatives.length > 0 ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Alternative Time Slots Available</h4>
                  <div className="space-y-2">
                    {conflictDetails.alternatives.map((alt: any, index: number) => (
                      <div key={index} className="flex items-center justify-between bg-white rounded border p-2">
                        <span className="text-gray-700">
                          {alt.startTime} - {alt.endTime} ({alt.duration})
                        </span>
                        <button
                          onClick={() => {
                            alert(`Booking confirmed for ${conflictDetails.studentName} on ${conflictDetails.day} at ${alt.startTime}`);
                            setShowConflictModal(false);
                          }}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                        >
                          Book This Slot
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                    <div>
                      <h4 className="font-semibold text-yellow-800">No Alternative Slots Available</h4>
                      <p className="text-yellow-700">
                        No suitable time slots found for a {conflictDetails.duration} hour lesson on {conflictDetails.day}.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    // Extend availability for this time slot
                    const dayData = availability.find(d => d.day === conflictDetails.day);
                    if (dayData) {
                      const newSlots = [...dayData.slots];
                      conflictDetails.conflicts.forEach((time: string) => {
                        const slotIndex = newSlots.findIndex(s => s.time === time);
                        if (slotIndex !== -1) {
                          newSlots[slotIndex] = { ...newSlots[slotIndex], available: true };
                        }
                      });
                      setAvailability(availability.map(d => 
                        d.day === conflictDetails.day 
                          ? { ...d, slots: newSlots }
                          : d
                      ));
                    }
                    alert(`Availability extended for ${conflictDetails.day}. Booking confirmed!`);
                    setShowConflictModal(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Extend Availability & Book
                </button>
                <button
                  onClick={() => setShowConflictModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Earning Modal */}
      {showAddEarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add Earning</h3>
              <button
                onClick={() => setShowAddEarning(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={newEarning.date}
                  onChange={(e) => setNewEarning(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
                <input
                  type="text"
                  value={newEarning.student}
                  onChange={(e) => setNewEarning(prev => ({ ...prev, student: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Type</label>
                <input
                  type="text"
                  value={newEarning.lessonType}
                  onChange={(e) => setNewEarning(prev => ({ ...prev, lessonType: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (£)</label>
                <input
                  type="number"
                  step="0.01"
                  value={newEarning.amount}
                  onChange={(e) => setNewEarning(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newEarning.category}
                  onChange={(e) => setNewEarning(prev => ({ ...prev, category: e.target.value as 'lesson' | 'test' | 'theory' | 'other' }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="lesson">Driving Lesson</option>
                  <option value="test">Practical Test</option>
                  <option value="theory">Theory Test</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddEarning(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEarning}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Earning
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Expense Modal */}
      {showAddExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add Expense</h3>
              <button
                onClick={() => setShowAddExpense(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (£)</label>
                <input
                  type="number"
                  step="0.01"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newExpense.category}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, category: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <optgroup label="Vehicle Costs">
                    <option value="vehicle_purchase">Vehicle Purchase</option>
                    <option value="vehicle_lease">Vehicle Lease</option>
                    <option value="fuel">Fuel</option>
                    <option value="insurance">Insurance</option>
                    <option value="road_tax">Road Tax</option>
                    <option value="mot">MOT</option>
                    <option value="repairs">Repairs</option>
                    <option value="servicing">Servicing</option>
                    <option value="valeting">Valeting</option>
                  </optgroup>
                  <optgroup label="Professional Fees">
                    <option value="franchise_fees">Franchise Fees</option>
                    <option value="accountancy">Accountancy</option>
                    <option value="professional_membership">Professional Membership</option>
                    <option value="adi_registration">ADI Registration</option>
                  </optgroup>
                  <optgroup label="Marketing & Office">
                    <option value="advertising">Advertising</option>
                    <option value="phone">Phone</option>
                    <option value="internet">Internet</option>
                    <option value="stationery">Stationery</option>
                    <option value="bank_account">Bank Account</option>
                  </optgroup>
                  <optgroup label="Training & Development">
                    <option value="cpd_training">CPD Training</option>
                    <option value="teaching_aids">Teaching Aids</option>
                  </optgroup>
                  <optgroup label="Other">
                    <option value="home_office">Home Office</option>
                    <option value="other">Other</option>
                  </optgroup>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Use (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newExpense.businessUse}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, businessUse: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="100"
                />
                <p className="text-xs text-gray-500 mt-1">For dual-use items (e.g., car, phone)</p>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddExpense(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddExpense}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorDashboard;
