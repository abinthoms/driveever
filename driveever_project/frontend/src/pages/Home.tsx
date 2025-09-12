import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, 
  Clock, 
  MapPin, 
  Star, 
  Users, 
  Shield, 
  CheckCircle, 
  Award, 
  BookOpen, 
  Target, 
  MessageCircle, 
  Calendar,
  Phone,
  Mail,
  ArrowRight,
  Play,
  GraduationCap,
  TrendingUp,
  TrendingDown,
  Heart,
  Zap,
  Search,
  AlertCircle,
  DollarSign,
  Wrench
} from 'lucide-react';

const Home: React.FC = () => {
  const featuredInstructors = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 4.9,
      reviews: 127,
      experience: '8 years',
      specialties: ['Highway Driving', 'Test Preparation'],
      price: '£35',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      location: 'Central London'
    },
    {
      id: 2,
      name: 'Mike Wilson',
      rating: 4.8,
      reviews: 89,
      experience: '12 years',
      specialties: ['Parking', 'Nervous Drivers'],
      price: '£32',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      location: 'North London'
    },
    {
      id: 3,
      name: 'Emma Davis',
      rating: 5.0,
      reviews: 156,
      experience: '6 years',
      specialties: ['Automatic Cars', 'Refresher Lessons'],
      price: '£38',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      location: 'South London'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Alex Thompson',
      age: 19,
      location: 'London',
      text: 'DriveEver made finding an instructor so easy! Sarah was amazing and I passed my test first time. Highly recommend!',
      rating: 5,
      lessonType: 'Manual Car'
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      age: 28,
      location: 'Manchester',
      text: 'As a nervous driver, I was worried about learning. Mike was incredibly patient and helped me build confidence.',
      rating: 5,
      lessonType: 'Automatic Car'
    },
    {
      id: 3,
      name: 'James Chen',
      age: 22,
      location: 'Birmingham',
      text: 'Great platform! Emma helped me refresh my skills after not driving for years. Very professional and friendly.',
      rating: 5,
      lessonType: 'Refresher Course'
    }
  ];

  const learningBenefits = [
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Personalized Learning',
      description: 'Each lesson is tailored to your skill level and learning pace'
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Progress Tracking',
      description: 'Monitor your improvement with detailed progress reports'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Safety First',
      description: 'Learn defensive driving techniques and safety protocols'
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: 'Test Preparation',
      description: 'Comprehensive preparation for both theory and practical tests'
    }
  ];

  const faqs = [
    {
      question: 'How many lessons do I need before taking my test?',
      answer: 'Most learners need 20-40 hours of professional instruction, but this varies based on individual learning pace and previous experience.'
    },
    {
      question: 'Can I choose between manual and automatic cars?',
      answer: 'Yes! You can select instructors who teach either manual or automatic transmission based on your preference.'
    },
    {
      question: 'What happens if I need to cancel a lesson?',
      answer: 'You can cancel lessons up to 24 hours before the scheduled time without any cancellation fees.'
    },
    {
      question: 'Do you offer intensive driving courses?',
      answer: 'Yes, many of our instructors offer intensive courses for learners who want to progress quickly.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Learn to Drive with Confidence
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
            Connect with qualified driving instructors in your area. Book lessons, track progress, and get your license with DriveEver.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/search" className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center">
              <Car className="mr-2 h-5 w-5" />
              Find Instructors
            </Link>
            <Link to="/register" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-600 transition-colors flex items-center justify-center">
              <ArrowRight className="mr-2 h-5 w-5" />
              Get Started
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-green-100">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>DBS Checked Instructors</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>DVSA Approved</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5" />
              <span>98% Pass Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            The Driving Lesson Problem & Our Solution
          </h2>
          
          {/* Problem Side */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-red-600 mb-8">❌ What People Are Struggling With:</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Long Waiting Times</h4>
                    <p className="text-gray-600">Waiting 3-6 months for driving lessons due to instructor shortages and high demand.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Hidden Costs & Poor Value</h4>
                    <p className="text-gray-600">Expensive lessons with no progress tracking, leading to more lessons than necessary.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-3 rounded-full">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Inconsistent Quality</h4>
                    <p className="text-gray-600">No way to verify instructor qualifications or read genuine reviews from other learners.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Poor Scheduling</h4>
                    <p className="text-gray-600">Rigid lesson times that don't fit around work, school, or family commitments.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-3 rounded-full">
                    <TrendingDown className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">No Progress Tracking</h4>
                    <p className="text-gray-600">Learners can't see their improvement or know when they're ready for their test.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Solution Side */}
            <div>
              <h3 className="text-3xl font-bold text-green-600 mb-8">✅ How DriveEver Solves It:</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Zap className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Instant Availability</h4>
                    <p className="text-gray-600">Book lessons within 24-48 hours from 500+ qualified instructors across the UK.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Transparent Pricing & Progress</h4>
                    <p className="text-gray-600">Clear lesson costs with progress tracking to ensure you only pay for what you need.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Verified Quality</h4>
                    <p className="text-gray-600">All instructors are DBS checked, DVSA approved, with genuine reviews and ratings.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Flexible Scheduling</h4>
                    <p className="text-gray-600">Choose from early mornings, evenings, weekends, and even same-day bookings.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Smart Progress Tracking</h4>
                    <p className="text-gray-600">AI-powered progress analysis tells you exactly when you're ready for your test.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Impact Statistics */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">The DriveEver Impact</h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">10x Faster</div>
                <div className="text-gray-600">Lesson booking speed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">30% Less</div>
                <div className="text-gray-600">Total lesson cost</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">98% Pass Rate</div>
                <div className="text-gray-600">First-time success</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
                <div className="text-gray-600">Booking availability</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - New Modern Style */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">DriveEver</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're not just another driving school. We're your complete driving journey partner.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Card 1 - Modern Card Design */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Car className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Qualified Instructors</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  All our instructors are fully qualified, DBS checked, and experienced in teaching learners of all levels.
                </p>
                <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700 transition-colors">
                  <span>Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Card 2 - Modern Card Design */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Flexible Scheduling</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Book lessons at times that suit you. Early mornings, evenings, and weekends available.
                </p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                  <span>Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Card 3 - Modern Card Design */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-purple-200">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Local Pickup</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Instructors will pick you up from your home, work, or any convenient location.
                </p>
                <div className="flex items-center text-purple-600 font-semibold group-hover:text-purple-700 transition-colors">
                  <span>Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats Row */}
          <div className="mt-16 grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Expert Instructors</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600 font-medium">Pass Rate</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Support Available</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-pink-600 mb-2">10k+</div>
              <div className="text-gray-600 font-medium">Happy Learners</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section - NEW */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700">Complete Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beyond driving lessons - we're your complete automotive partner for life
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1: Know Your Vehicle */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 group-hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Wrench className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Know Your Vehicle</h3>
                <p className="text-gray-600 text-center leading-relaxed mb-6">
                  Comprehensive vehicle diagnostics, maintenance schedules, and expert advice to keep your car running perfectly.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Vehicle Health Check</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Maintenance Reminders</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Expert Consultation</span>
                  </div>
                </div>
                <div className="flex items-center justify-center text-green-600 font-semibold group-hover:text-green-700 transition-colors">
                  <span>Explore Service</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Service 2: TopGear */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 group-hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Zap className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">TopGear</h3>
                <p className="text-gray-600 text-center leading-relaxed mb-6">
                  Premium driving experiences, track days, and advanced driving courses for enthusiasts and professionals.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span>Track Day Experiences</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span>Advanced Techniques</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span>Performance Driving</span>
                  </div>
                </div>
                <div className="flex items-center justify-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                  <span>Book Experience</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Service 3: Insurance */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-purple-200 group-hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Smart Insurance</h3>
                <p className="text-gray-600 text-center leading-relaxed mb-6">
                  AI-powered insurance quotes with Safe Driver Score technology and exclusive partner discounts.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span>Safe Driver Score</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span>Partner Discounts</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span>Instant Quotes</span>
                  </div>
                </div>
                <div className="flex items-center justify-center text-purple-600 font-semibold group-hover:text-purple-700 transition-colors">
                  <span>Get Quote</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Service 4: Safe Driver Score */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-pink-200 group-hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <TrendingUp className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Safe Driver Score</h3>
                <p className="text-gray-600 text-center leading-relaxed mb-6">
                  Track your driving performance and unlock exclusive insurance discounts with our AI-powered scoring system.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-pink-500" />
                    <span>AI Performance Tracking</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-pink-500" />
                    <span>Insurance Discounts</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-pink-500" />
                    <span>Progress Analytics</span>
                  </div>
                </div>
                <div className="flex items-center justify-center text-pink-600 font-semibold group-hover:text-pink-700 transition-colors">
                  <span>Track Score</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Partnership Section */}
          <div className="mt-20 bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8 border border-green-200">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Strategic Partnerships</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're building partnerships with leading insurance aggregators and automotive service providers to bring you the best deals and services.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Insurance Partners</h4>
                <p className="text-sm text-gray-600">Leading providers offering exclusive DriveEver member discounts</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Wrench className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Service Network</h4>
                <p className="text-sm text-gray-600">Certified garages and mechanics across the UK</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Technology Partners</h4>
                <p className="text-sm text-gray-600">AI and analytics providers for Safe Driver Score</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Instructors Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Featured Instructors
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredInstructors.map((instructor) => (
              <div key={instructor.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border">
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img 
                      src={instructor.image} 
                      alt={instructor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{instructor.name}</h3>
                      <p className="text-gray-600 text-sm">{instructor.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(instructor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({instructor.reviews} reviews)</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Experience:</span> {instructor.experience}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Price:</span> {instructor.price}/lesson
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-2">
                      {instructor.specialties.map((specialty, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Link 
                    to={`/instructor/${instructor.id}`}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-center block"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/search"
              className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold text-lg"
            >
              View All Instructors
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Qualified Instructors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">10,000+</div>
              <div className="text-gray-600">Successful Learners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600">Pass Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">4.9</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Benefits Section - Redesigned */}
      <section className="py-24 bg-gradient-to-br from-green-50 via-white to-green-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-72 h-72 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700">Learning Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every step of your driving journey is carefully designed to ensure success and confidence behind the wheel.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {learningBenefits.map((benefit, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 group-hover:-translate-y-2">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <div className="text-white">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{benefit.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{benefit.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-1000 ease-out" style={{width: `${(index + 1) * 25}%`}}></div>
                    </div>
                    <p className="text-sm text-green-600 font-medium mt-2 text-center">Step {index + 1} of 4</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - Redesigned */}
      <section className="py-24 bg-white relative">
        {/* Connection Lines */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-300 to-transparent transform -translate-y-1/2"></div>
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              How <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700">It Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your journey to becoming a confident driver in just three simple steps
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="group relative">
              <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl group-hover:scale-110 transition-transform duration-300 z-10">
                1
              </div>
              <div className="mt-16 bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 group-hover:-translate-y-2">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Search className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Search & Compare</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Enter your postcode to find qualified instructors in your area. Compare ratings, prices, and availability with our smart matching system.
                </p>
                <div className="mt-6 flex items-center justify-center text-green-600 font-semibold group-hover:text-green-700 transition-colors">
                  <span>Start Searching</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative">
              <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl group-hover:scale-110 transition-transform duration-300 z-10">
                2
              </div>
              <div className="mt-16 bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 group-hover:-translate-y-2">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Book Your Lesson</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Choose your preferred time slot and book instantly. Receive confirmation and lesson details via email and SMS.
                </p>
                <div className="mt-6 flex items-center justify-center text-green-600 font-semibold group-hover:text-green-700 transition-colors">
                  <span>Book Now</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative">
              <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl group-hover:scale-110 transition-transform duration-300 z-10">
                3
              </div>
              <div className="mt-16 bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 group-hover:-translate-y-2">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Learn & Progress</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Take your lesson, track your progress with our AI-powered system, and book follow-up sessions. Get ready for your driving test!
                </p>
                <div className="mt-6 flex items-center justify-center text-green-600 font-semibold group-hover:text-green-700 transition-colors">
                  <span>Track Progress</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Play className="h-6 w-6" />
              <span className="text-xl font-semibold">Start Your Journey Today</span>
              <ArrowRight className="h-6 w-6" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Redesigned */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-green-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-64 h-64 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-green-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700">Learners Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real learners who transformed their driving experience with DriveEver
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 group-hover:-translate-y-3">
                  {/* Quote Icon */}
                  <div className="absolute -top-4 left-8 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg font-bold">"</span>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center space-x-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  
                  {/* Testimonial Text */}
                  <p className="text-gray-700 mb-6 italic text-lg leading-relaxed text-center">"{testimonial.text}"</p>
                  
                  {/* Learner Info */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{testimonial.name}</h4>
                    <p className="text-gray-600 mb-3">{testimonial.age} years • {testimonial.location}</p>
                    <span className="px-4 py-2 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                      {testimonial.lessonType}
                    </span>
                  </div>
                  
                  {/* Success Badge */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3" />
                      <span>PASSED</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom Stats */}
          <div className="mt-16 grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600 font-medium">Pass Rate</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-green-600 mb-2">4.9/5</div>
              <div className="text-gray-600 font-medium">Average Rating</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-green-600 mb-2">10k+</div>
              <div className="text-gray-600 font-medium">Happy Learners</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 bg-white">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Driving Journey?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join thousands of learners who have already passed their test with DriveEver.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center">
              <Zap className="mr-2 h-5 w-5" />
              Get Started Today
            </Link>
            <Link to="/search" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-600 transition-colors flex items-center justify-center">
              <Search className="mr-2 h-5 w-5" />
              Browse Instructors
            </Link>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Need Help Getting Started?</h3>
              <p className="text-gray-300 mb-6">
                Our team is here to help you find the perfect instructor and start your driving journey.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-green-400" />
                  <span>Call us: 020 1234 5678</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-green-400" />
                  <span>Email: hello@driveever.com</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Live Chat Support</h4>
              <p className="text-gray-300 mb-4">Get instant help from our support team</p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors">
                Start Chat
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
