import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, Star, Shield, Clock, Users, Award, FileCheck, Calculator, Tag, Wrench, BookOpen, CreditCard, AlertTriangle, Search, MapPin, Play, ArrowRight, ChevronDown, BarChart3 } from 'lucide-react';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Clean & Simple */}
      <section className="relative bg-white">
        {/* Hero Image */}
        <div className="relative h-[500px] bg-cover bg-center bg-no-repeat rounded-lg mx-4 mt-4" style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")`
        }}>
          <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
          
          {/* Search Bar Overlay */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Find Your Perfect Instructor</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postcode*</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter your postcode"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Select level</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Refresher</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Type</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Manual</option>
                    <option>Automatic</option>
                    <option>Both</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2">
                    <Search className="h-5 w-5" />
                    <span>Search Instructors</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Learn to Drive with Confidence
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
              Your Journey to a Full Licence Starts Here
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              DVSA-approved male and female instructors across the UK. 
              Automatic & manual lessons available.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <Car className="h-6 w-6" />
                <span>Book Your First Lesson</span>
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors">
                Find Your Instructor
              </button>
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">DVSA</div>
              <div className="text-sm text-gray-600">Approved Instructor</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
              </div>
              <div className="text-sm text-gray-600">Trustpilot 5-Star Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">92%</div>
              <div className="text-sm text-gray-600">First-Time Pass Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-sm text-gray-600">Happy Students</div>
            </div>
          </div>
          
          {/* Quick Navigation */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link to="/vehicle-check" className="inline-flex items-center px-6 py-3 bg-driveever-blue text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              <FileCheck className="w-5 h-5 mr-2" />
              Vehicle Check
            </Link>
            <Link to="/top-gear" className="inline-flex items-center px-6 py-3 bg-driveever-green text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
              <BookOpen className="w-5 h-5 mr-2" />
              Top Gear Blog
            </Link>
            <Link to="/learner-dashboard" className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
              <BarChart3 className="w-5 h-5 mr-2" />
              Learner Dashboard
            </Link>
            <Link to="/instructor-dashboard" className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
              <Users className="w-5 h-5 mr-2" />
              Instructor Dashboard
            </Link>
            <Link to="/dashboard" className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold">
              <BarChart3 className="w-5 h-5 mr-2" />
              Main Dashboard
            </Link>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Pass Your Test
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with expert instructors to give you the best learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Find Perfect Instructors</h3>
              <p className="text-gray-600">Browse verified instructors near you with real-time availability and instant booking capabilities.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                <Car className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Vehicle Verification</h3>
              <p className="text-gray-600">Check instructor vehicles with our DVLA integration for complete transparency and safety.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Scheduling</h3>
              <p className="text-gray-600">Book lessons instantly with our intelligent calendar system and availability tracking.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Verified & Safe</h3>
              <p className="text-gray-600">All instructors are DBS checked, ADI certified, and fully insured for your safety.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-6">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Top Rated</h3>
              <p className="text-gray-600">Our instructors have an average rating of 4.9/5 stars from thousands of student reviews.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Success Guaranteed</h3>
              <p className="text-gray-600">94% of our students pass their driving test on the first attempt.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - New Design */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
              <Car className="h-4 w-4 mr-2" />
              Complete Car Services
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Everything You Need for Your
              <span className="block text-blue-600">Car Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Beyond driving lessons, we provide comprehensive car-related services to support your entire automotive journey across the UK.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Vehicle History Check */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 hover:-translate-y-2">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FileCheck className="h-7 w-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">£9.99</div>
                  <div className="text-sm text-gray-500">per check</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Vehicle History Check</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Complete peace of mind before buying your next car with comprehensive vehicle history reports including MOT, insurance, and accident data.</p>
              <div className="flex items-center justify-between">
              <a 
                href="/vehicle-check"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <span>Check Now</span>
                <ArrowRight className="h-4 w-4" />
              </a>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span>4.9/5 rating</span>
                </div>
              </div>
            </div>

            {/* Security Advice */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 hover:-translate-y-2">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">Free</div>
                  <div className="text-sm text-gray-500">advice</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Security Advice</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Expert guidance on buying and selling vehicles safely, protecting yourself from fraud, scams, and ensuring secure transactions.</p>
              <div className="flex items-center justify-between">
                <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2">
                  <span>Get Advice</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 text-green-500 mr-1" />
                  <span>10k+ helped</span>
                </div>
              </div>
            </div>

            {/* Car Finance & Loans */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-purple-200 hover:-translate-y-2">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Calculator className="h-7 w-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">£5k-50k</div>
                  <div className="text-sm text-gray-500">loan range</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Car Finance & Loans</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Discover how much you can borrow and find the perfect finance package for your next vehicle purchase with competitive rates.</p>
              <div className="flex items-center justify-between">
                <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center space-x-2">
                  <span>Get Quote</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <div className="flex items-center text-sm text-gray-500">
                  <Award className="h-4 w-4 text-purple-500 mr-1" />
                  <span>Best rates</span>
                </div>
              </div>
            </div>

            {/* Vehicle Valuation */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-yellow-200 hover:-translate-y-2">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Tag className="h-7 w-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-600">Free</div>
                  <div className="text-sm text-gray-500">valuation</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Valuation</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Get an instant free valuation and sell or part-exchange your car at the right price with our expert market assessment.</p>
              <div className="flex items-center justify-between">
                <button className="bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-yellow-700 transition-colors flex items-center space-x-2">
                  <span>Get Value</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                  <span>Instant result</span>
                </div>
              </div>
            </div>

            {/* Vehicle Maintenance */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-red-200 hover:-translate-y-2">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Wrench className="h-7 w-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">500+</div>
                  <div className="text-sm text-gray-500">garages</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Maintenance</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Keep your car in perfect condition with our network of trusted mechanics, maintenance reminders, and service booking.</p>
              <div className="flex items-center justify-between">
                <button className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors flex items-center space-x-2">
                  <span>Book Service</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <div className="flex items-center text-sm text-gray-500">
                  <Shield className="h-4 w-4 text-red-500 mr-1" />
                  <span>Guaranteed</span>
                </div>
              </div>
            </div>

            {/* Theory Test Preparation */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-indigo-200 hover:-translate-y-2">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-7 w-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-indigo-600">98%</div>
                  <div className="text-sm text-gray-500">pass rate</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Theory Test Prep</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Comprehensive theory test preparation with practice questions, mock tests, and expert guidance to ensure you pass first time.</p>
              <div className="flex items-center justify-between">
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center space-x-2">
                  <span>Start Learning</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="h-4 w-4 text-indigo-500 mr-1" />
                  <span>Top rated</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">Need Help Choosing?</h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Our expert team is here to help you find the perfect service for your needs. Get personalized recommendations today.
              </p>
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                Speak to an Expert
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Top Gear Blog Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-semibold mb-6">
              <Car className="h-4 w-4 mr-2" />
              Top Gear
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The Latest from Top Gear
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest driving news, vehicle reviews, and insights from the automotive world across all vehicle types.
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Article 1 */}
            <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative h-48 bg-cover bg-center" style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")`
              }}>
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">NEWS</span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm">Yesterday</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  Electric Revolution: The Future of UK Driving
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  How electric vehicles are transforming the UK automotive landscape and what it means for driving lessons.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">NEWS | Yesterday</span>
                  <ArrowRight className="h-4 w-4 text-red-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>

            {/* Article 2 */}
            <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative h-48 bg-cover bg-center" style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")`
              }}>
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">REVIEW</span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm">2 days ago</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  Best Vehicles for New Drivers in 2024
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Our comprehensive guide to the safest and most reliable cars, vans, and motorcycles for first-time drivers across the UK.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">REVIEW | 2 days ago</span>
                  <ArrowRight className="h-4 w-4 text-red-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>

            {/* Article 3 */}
            <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative h-48 bg-cover bg-center" style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")`
              }}>
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">ADVICE</span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm">3 days ago</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  Motorcycle Theory Test: Complete Guide
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Everything you need to know about motorcycle theory tests, from CBT to full license requirements and practical tips.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">ADVICE | 3 days ago</span>
                  <ArrowRight className="h-4 w-4 text-red-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>

            {/* Article 4 */}
            <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative h-48 bg-cover bg-center" style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")`
              }}>
                <div className="absolute top-4 left-4">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">EXPERT REVIEW</span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm">3 days ago</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  Instructor Spotlight: Meet Sarah
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Get to know one of our top-rated instructors and learn what makes her lessons so successful.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">EXPERT REVIEW | 3 days ago</span>
                  <ArrowRight className="h-4 w-4 text-red-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>

            {/* Article 5 */}
            <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative h-48 bg-cover bg-center" style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")`
              }}>
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">NEWS</span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm">5 days ago</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  Van Driving License: Everything You Need to Know
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Complete guide to getting your van driving license, from C1 to C+E categories and what vehicles you can drive.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">NEWS | 5 days ago</span>
                  <ArrowRight className="h-4 w-4 text-red-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>

            {/* Article 6 */}
            <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative h-48 bg-cover bg-center" style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")`
              }}>
                <div className="absolute top-4 left-4">
                  <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-semibold">GUIDE</span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm">1 week ago</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  HGV Driving: Career Opportunities in 2024
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Explore lucrative career opportunities in HGV driving, from Class 1 to Class 2 licenses and training requirements.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">GUIDE | 1 week ago</span>
                  <ArrowRight className="h-4 w-4 text-red-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button className="bg-red-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              View All Articles
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Driving Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of successful drivers. Find your perfect instructor today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Find Instructors
            </button>
            <Link to="/instructor-dashboard" className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Become an Instructor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
