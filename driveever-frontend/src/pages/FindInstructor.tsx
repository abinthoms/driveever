import { useState, useEffect } from 'react';
import { Search, MapPin, Star, Clock, Filter, Users, Car, Phone, Mail, Calendar } from 'lucide-react';

interface Instructor {
  id: number;
  name: string;
  profileImage: string;
  rating: number;
  reviewCount: number;
  pricePerHour: number;
  location: string;
  specialties: string[];
  experience: number;
  passRate: number;
  isAvailable: boolean;
  nextAvailable: string;
  bio: string;
  vehicle: {
    make: string;
    model: string;
    year: number;
    transmission: string;
  };
  availability: {
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
    sunday: string[];
  };
}

const FindInstructor = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [filteredInstructors, setFilteredInstructors] = useState<Instructor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockInstructors: Instructor[] = [
      {
        id: 1,
        name: "Sarah Johnson",
        profileImage: "/api/placeholder/150/150",
        rating: 4.9,
        reviewCount: 127,
        pricePerHour: 35,
        location: "Central London",
        specialties: ["Beginner", "Test Preparation", "Highway Practice"],
        experience: 8,
        passRate: 94,
        isAvailable: true,
        nextAvailable: "Today, 2:00 PM",
        bio: "Experienced instructor with 8 years of teaching. Specializes in helping nervous learners build confidence behind the wheel.",
        vehicle: {
          make: "Ford",
          model: "Focus",
          year: 2022,
          transmission: "Manual"
        },
        availability: {
          monday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
          tuesday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
          wednesday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
          thursday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
          friday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
          saturday: ["10:00", "11:00", "12:00"],
          sunday: []
        }
      },
      {
        id: 2,
        name: "Mike Thompson",
        profileImage: "/api/placeholder/150/150",
        rating: 4.8,
        reviewCount: 89,
        pricePerHour: 32,
        location: "North London",
        specialties: ["Intensive Courses", "Refresher Lessons", "Elderly Drivers"],
        experience: 12,
        passRate: 96,
        isAvailable: true,
        nextAvailable: "Tomorrow, 9:00 AM",
        bio: "Patient and experienced instructor with over 12 years of teaching. Great with all age groups and skill levels.",
        vehicle: {
          make: "Vauxhall",
          model: "Corsa",
          year: 2021,
          transmission: "Manual"
        },
        availability: {
          monday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
          tuesday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
          wednesday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
          thursday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
          friday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
          saturday: ["09:00", "10:00", "11:00", "12:00"],
          sunday: ["10:00", "11:00", "12:00"]
        }
      },
      {
        id: 3,
        name: "Emma Davis",
        profileImage: "/api/placeholder/150/150",
        rating: 4.7,
        reviewCount: 156,
        pricePerHour: 38,
        location: "South London",
        specialties: ["Automatic", "Test Preparation", "Motorway Lessons"],
        experience: 6,
        passRate: 92,
        isAvailable: false,
        nextAvailable: "Monday, 10:00 AM",
        bio: "Friendly and encouraging instructor specializing in automatic transmission. Great for nervous learners.",
        vehicle: {
          make: "Toyota",
          model: "Yaris",
          year: 2023,
          transmission: "Automatic"
        },
        availability: {
          monday: ["10:00", "11:00", "14:00", "15:00"],
          tuesday: ["10:00", "11:00", "14:00", "15:00"],
          wednesday: ["10:00", "11:00", "14:00", "15:00"],
          thursday: ["10:00", "11:00", "14:00", "15:00"],
          friday: ["10:00", "11:00", "14:00", "15:00"],
          saturday: ["10:00", "11:00", "12:00", "13:00"],
          sunday: []
        }
      },
      {
        id: 4,
        name: "James Wilson",
        profileImage: "/api/placeholder/150/150",
        rating: 4.9,
        reviewCount: 203,
        pricePerHour: 40,
        location: "East London",
        specialties: ["Advanced", "Fleet Training", "Corporate"],
        experience: 15,
        passRate: 98,
        isAvailable: true,
        nextAvailable: "Today, 3:00 PM",
        bio: "Highly experienced instructor with 15 years of teaching. Specializes in advanced driving and corporate training.",
        vehicle: {
          make: "BMW",
          model: "3 Series",
          year: 2022,
          transmission: "Manual"
        },
        availability: {
          monday: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
          tuesday: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
          wednesday: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
          thursday: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
          friday: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
          saturday: ["09:00", "10:00", "11:00", "12:00", "13:00"],
          sunday: ["10:00", "11:00", "12:00"]
        }
      }
    ];

    setInstructors(mockInstructors);
    setFilteredInstructors(mockInstructors);
    setLoading(false);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = instructors;

    // Search by name or location
    if (searchTerm) {
      filtered = filtered.filter(instructor =>
        instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instructor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instructor.specialties.some(specialty =>
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by location
    if (selectedLocation) {
      filtered = filtered.filter(instructor =>
        instructor.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(instructor =>
      instructor.pricePerHour >= priceRange[0] && instructor.pricePerHour <= priceRange[1]
    );

    // Filter by minimum rating
    filtered = filtered.filter(instructor => instructor.rating >= minRating);

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price_low':
          return a.pricePerHour - b.pricePerHour;
        case 'price_high':
          return b.pricePerHour - a.pricePerHour;
        case 'experience':
          return b.experience - a.experience;
        case 'availability':
          return a.isAvailable === b.isAvailable ? 0 : a.isAvailable ? -1 : 1;
        default:
          return 0;
      }
    });

    setFilteredInstructors(filtered);
  }, [instructors, searchTerm, selectedLocation, priceRange, minRating, sortBy]);

  const handleBookLesson = (instructorId: number) => {
    // Navigate to booking page with instructor pre-selected
    window.location.href = `/book-lesson?instructor=${instructorId}`;
  };

  const handleViewProfile = (instructorId: number) => {
    // Navigate to instructor profile page
    window.location.href = `/instructor/${instructorId}`;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading instructors...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Find Your Instructor</h1>
              <p className="text-gray-600 mt-2">Discover qualified driving instructors in your area</p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, location, or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Locations</option>
                    <option value="central">Central London</option>
                    <option value="north">North London</option>
                    <option value="south">South London</option>
                    <option value="east">East London</option>
                    <option value="west">West London</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 100])}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(parseFloat(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={0}>Any Rating</option>
                    <option value={4.0}>4.0+ Stars</option>
                    <option value={4.5}>4.5+ Stars</option>
                    <option value={4.8}>4.8+ Stars</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="rating">Highest Rating</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="experience">Most Experienced</option>
                    <option value="availability">Available Now</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {filteredInstructors.length} instructor{filteredInstructors.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Instructor Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredInstructors.map((instructor) => (
            <div key={instructor.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              {/* Instructor Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-gray-600" />
                </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{instructor.name}</h3>
                      <div className="flex items-center space-x-1 mb-1">
                        {renderStars(instructor.rating)}
                        <span className="text-sm text-gray-600 ml-1">
                          {instructor.rating} ({instructor.reviewCount} reviews)
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        {instructor.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">£{instructor.pricePerHour}</div>
                    <div className="text-sm text-gray-500">per hour</div>
                  </div>
                </div>

                {/* Availability Status */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                  instructor.isAvailable 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  <Clock className="h-4 w-4 mr-1" />
                  {instructor.isAvailable ? 'Available Now' : `Next: ${instructor.nextAvailable}`}
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {instructor.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-700">{instructor.experience}</div>
                    <div className="text-xs text-gray-500">Years</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-700">{instructor.passRate}%</div>
                    <div className="text-xs text-gray-500">Pass Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-700">{instructor.vehicle.transmission}</div>
                    <div className="text-xs text-gray-500">Transmission</div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{instructor.bio}</p>

                {/* Vehicle Info */}
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Car className="h-4 w-4 mr-2" />
                  {instructor.vehicle.year} {instructor.vehicle.make} {instructor.vehicle.model}
                </div>

                {/* View Profile Button */}
                <button
                  onClick={() => handleViewProfile(instructor.id)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4"
                >
                  View Full Profile →
                </button>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-4 bg-gray-50 border-t">
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleBookLesson(instructor.id)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Lesson
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <Phone className="h-4 w-4" />
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <Mail className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredInstructors.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No instructors found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindInstructor;
