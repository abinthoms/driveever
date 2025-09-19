import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  Users, 
  Award, 
  CheckCircle,
  ArrowRight,
  Car,
  GraduationCap,
  Shield,
  TrendingUp,
  Heart,
  Share2
} from 'lucide-react';

interface DrivingSchool {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  rating: number;
  reviewCount: number;
  passRate: number;
  established: string;
  instructors: number;
  students: number;
  priceRange: string;
  features: string[];
  specialties: string[];
  availability: string;
  image: string;
  verified: boolean;
  distance: number;
}

interface SchoolFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const DrivingSchoolMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock data
  const schools: DrivingSchool[] = [
    {
      id: 1,
      name: "Elite Driving Academy",
      description: "Premier driving school with 15+ years of experience. We specialize in intensive courses and have a 95% pass rate.",
      address: "123 High Street, London, SW1A 1AA",
      phone: "+44 20 7123 4567",
      email: "info@elitedrivingacademy.co.uk",
      website: "www.elitedrivingacademy.co.uk",
      rating: 4.8,
      reviewCount: 234,
      passRate: 95,
      established: "2008",
      instructors: 12,
      students: 450,
      priceRange: "£35-45/hour",
      features: ["Intensive Courses", "Weekend Lessons", "Test Preparation", "Pickup Service"],
      specialties: ["Manual", "Automatic", "Theory Test", "Practical Test"],
      availability: "Mon-Sun 6AM-10PM",
      image: "/api/placeholder/300/200",
      verified: true,
      distance: 2.3
    },
    {
      id: 2,
      name: "City Driving School",
      description: "Modern driving school with state-of-the-art vehicles and experienced instructors. Perfect for busy professionals.",
      address: "456 Oxford Street, London, W1A 1AA",
      phone: "+44 20 7234 5678",
      email: "hello@citydrivingschool.co.uk",
      website: "www.citydrivingschool.co.uk",
      rating: 4.6,
      reviewCount: 189,
      passRate: 89,
      established: "2012",
      instructors: 8,
      students: 320,
      priceRange: "£30-40/hour",
      features: ["Flexible Hours", "Online Booking", "Progress Tracking", "Insurance Included"],
      specialties: ["Manual", "Automatic", "Refresher Lessons"],
      availability: "Mon-Fri 7AM-8PM, Sat-Sun 8AM-6PM",
      image: "/api/placeholder/300/200",
      verified: true,
      distance: 3.1
    },
    {
      id: 3,
      name: "Metro Driving Centre",
      description: "Family-run driving school with a personal touch. We believe in building confidence and making learning enjoyable.",
      address: "789 Regent Street, London, W1B 1AA",
      phone: "+44 20 7345 6789",
      email: "contact@metrodrivingcentre.co.uk",
      website: "www.metrodrivingcentre.co.uk",
      rating: 4.7,
      reviewCount: 156,
      passRate: 92,
      established: "2015",
      instructors: 6,
      students: 280,
      priceRange: "£32-42/hour",
      features: ["Family Discounts", "Student Packages", "Theory Support", "Mock Tests"],
      specialties: ["Manual", "Automatic", "Theory Test", "Practical Test", "Refresher"],
      availability: "Mon-Sat 8AM-7PM",
      image: "/api/placeholder/300/200",
      verified: false,
      distance: 4.2
    }
  ];

  const features: SchoolFeature[] = [
    {
      icon: <Car className="h-6 w-6 text-blue-600" />,
      title: "Modern Fleet",
      description: "Latest model vehicles with dual controls"
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-green-600" />,
      title: "Qualified Instructors",
      description: "DVSA approved driving instructors"
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-600" />,
      title: "Fully Insured",
      description: "Comprehensive insurance coverage"
    },
    {
      icon: <Clock className="h-6 w-6 text-orange-600" />,
      title: "Flexible Hours",
      description: "Lessons available 7 days a week"
    },
    {
      icon: <Award className="h-6 w-6 text-yellow-600" />,
      title: "High Pass Rate",
      description: "Proven track record of success"
    },
    {
      icon: <Users className="h-6 w-6 text-pink-600" />,
      title: "Group Discounts",
      description: "Special rates for multiple lessons"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "Excellent driving school! The instructors are patient and professional. I passed my test first time thanks to their excellent teaching methods.",
      school: "Elite Driving Academy"
    },
    {
      name: "Michael Brown",
      rating: 5,
      text: "Great experience with City Driving School. Flexible scheduling and modern vehicles made learning enjoyable. Highly recommended!",
      school: "City Driving School"
    },
    {
      name: "Emma Wilson",
      rating: 4,
      text: "Metro Driving Centre made me feel comfortable and confident. The family atmosphere really helped me relax during lessons.",
      school: "Metro Driving Centre"
    }
  ];

  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !selectedLocation || school.address.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesPrice = !selectedPriceRange || school.priceRange === selectedPriceRange;
    const matchesFeatures = selectedFeatures.length === 0 || 
                           selectedFeatures.every(feature => school.features.includes(feature));
    
    return matchesSearch && matchesLocation && matchesPrice && matchesFeatures;
  });

  const sortedSchools = [...filteredSchools].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'distance':
        return a.distance - b.distance;
      case 'price':
        return a.priceRange.localeCompare(b.priceRange);
      case 'passRate':
        return b.passRate - a.passRate;
      default:
        return 0;
    }
  });

  const renderSchoolCard = (school: DrivingSchool) => (
    <div key={school.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="relative">
        <img 
          src={school.image} 
          alt={school.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {school.verified && (
          <div className="absolute top-3 right-3">
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified
            </div>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <button className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full transition-colors">
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{school.name}</h3>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{school.distance} miles away</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center mb-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-semibold text-gray-900">{school.rating}</span>
              <span className="ml-1 text-sm text-gray-500">({school.reviewCount})</span>
            </div>
            <div className="text-sm text-gray-600">{school.passRate}% pass rate</div>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{school.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Price Range:</span>
            <span className="font-medium text-gray-900">{school.priceRange}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Instructors:</span>
            <span className="font-medium text-gray-900">{school.instructors}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Established:</span>
            <span className="font-medium text-gray-900">{school.established}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {school.features.slice(0, 3).map((feature, index) => (
              <span 
                key={index}
                className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
              >
                {feature}
              </span>
            ))}
            {school.features.length > 3 && (
              <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                +{school.features.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            View Details
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderSchoolList = (school: DrivingSchool) => (
    <div key={school.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
      <div className="flex items-start space-x-4">
        <img 
          src={school.image} 
          alt={school.name}
          className="w-24 h-24 object-cover rounded-lg"
        />
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{school.name}</h3>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{school.address}</span>
                <span className="mx-2">•</span>
                <span>{school.distance} miles away</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center mb-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm font-semibold text-gray-900">{school.rating}</span>
                <span className="ml-1 text-sm text-gray-500">({school.reviewCount})</span>
              </div>
              <div className="text-sm text-gray-600">{school.passRate}% pass rate</div>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-3">{school.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{school.priceRange}</div>
              <div className="text-xs text-gray-500">Price Range</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{school.instructors}</div>
              <div className="text-xs text-gray-500">Instructors</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{school.students}</div>
              <div className="text-xs text-gray-500">Students</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{school.established}</div>
              <div className="text-xs text-gray-500">Established</div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {school.features.slice(0, 4).map((feature, index) => (
              <span 
                key={index}
                className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
              >
                {feature}
              </span>
            ))}
            {school.features.length > 4 && (
              <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                +{school.features.length - 4} more
              </span>
            )}
          </div>
          
          <div className="flex space-x-2">
            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              View Details
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Driving Schools</h1>
            <p className="text-gray-600">Discover the best driving schools in your area</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search driving schools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                placeholder="Enter postcode or city"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Prices</option>
                <option value="£25-35/hour">£25-35/hour</option>
                <option value="£30-40/hour">£30-40/hour</option>
                <option value="£35-45/hour">£35-45/hour</option>
                <option value="£40-50/hour">£40-50/hour</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="rating">Rating</option>
                <option value="distance">Distance</option>
                <option value="price">Price</option>
                <option value="passRate">Pass Rate</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700">Features:</span>
              {['Intensive Courses', 'Weekend Lessons', 'Pickup Service', 'Online Booking'].map((feature) => (
                <button
                  key={feature}
                  onClick={() => {
                    if (selectedFeatures.includes(feature)) {
                      setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
                    } else {
                      setSelectedFeatures([...selectedFeatures, feature]);
                    }
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                    selectedFeatures.includes(feature)
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {feature}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <div className="w-4 h-4 space-y-1">
                  <div className="bg-current rounded-sm h-1"></div>
                  <div className="bg-current rounded-sm h-1"></div>
                  <div className="bg-current rounded-sm h-1"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {sortedSchools.length} Driving Schools Found
            </h2>
            <div className="text-sm text-gray-600">
              Showing {sortedSchools.length} of {schools.length} schools
            </div>
          </div>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedSchools.map(renderSchoolCard)}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedSchools.map(renderSchoolList)}
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Choose Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.school}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrivingSchoolMarketplace;
