import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Clock, Car, Filter, X } from 'lucide-react';

interface Instructor {
  id: number;
  full_name: string;
  rating: number;
  total_reviews: number;
  price_per_hour: number;
  location: string;
  specialties: string[];
  experience_years: number;
  vehicle_type: string;
  image_url?: string;
}

const InstructorSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [filteredInstructors, setFilteredInstructors] = useState<Instructor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    maxPrice: 100,
    minRating: 0,
    vehicleType: 'all',
    experience: 'all'
  });

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockInstructors: Instructor[] = [
      {
        id: 1,
        full_name: "Sarah Johnson",
        rating: 4.9,
        total_reviews: 127,
        price_per_hour: 35,
        location: "Lincoln, LN1",
        specialties: ["Beginners", "Test Preparation", "Highway Driving"],
        experience_years: 8,
        vehicle_type: "Manual"
      },
      {
        id: 2,
        full_name: "Michael Chen",
        rating: 4.8,
        total_reviews: 89,
        price_per_hour: 32,
        location: "Lincoln, LN2",
        specialties: ["Advanced Driving", "Motorway Lessons", "Refresher Courses"],
        experience_years: 12,
        vehicle_type: "Both"
      },
      {
        id: 3,
        full_name: "Emma Thompson",
        rating: 5.0,
        total_reviews: 156,
        price_per_hour: 38,
        location: "Lincoln, LN3",
        specialties: ["Nervous Drivers", "Elderly Drivers", "Confidence Building"],
        experience_years: 15,
        vehicle_type: "Automatic"
      },
      {
        id: 4,
        full_name: "David Wilson",
        rating: 4.7,
        total_reviews: 73,
        price_per_hour: 30,
        location: "Lincoln, LN4",
        specialties: ["Intensive Courses", "Weekend Lessons", "Evening Sessions"],
        experience_years: 6,
        vehicle_type: "Manual"
      }
    ];
    setInstructors(mockInstructors);
    setFilteredInstructors(mockInstructors);
  }, []);

  const handleSearch = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      let results = instructors;
      
      if (searchTerm) {
        results = results.filter(instructor => 
          instructor.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          instructor.specialties.some(specialty => 
            specialty.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
      
      if (location) {
        results = results.filter(instructor => 
          instructor.location.toLowerCase().includes(location.toLowerCase())
        );
      }
      
      // Apply filters
      results = results.filter(instructor => 
        instructor.price_per_hour <= filters.maxPrice &&
        instructor.rating >= filters.minRating &&
        (filters.vehicleType === 'all' || instructor.vehicle_type === filters.vehicleType) &&
        (filters.experience === 'all' || 
          (filters.experience === 'new' && instructor.experience_years < 5) ||
          (filters.experience === 'experienced' && instructor.experience_years >= 5 && instructor.experience_years < 10) ||
          (filters.experience === 'expert' && instructor.experience_years >= 10))
      );
      
      setFilteredInstructors(results);
      setIsLoading(false);
    }, 1000);
  };

  const clearFilters = () => {
    setFilters({
      maxPrice: 100,
      minRating: 0,
      vehicleType: 'all',
      experience: 'all'
    });
    setFilteredInstructors(instructors);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Find Your Perfect Driving Instructor
          </h1>
          
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                 <input
                   type="text"
                   placeholder="Search by name or specialty..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                 />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                 <input
                   type="text"
                   placeholder="Enter postcode or location..."
                   value={location}
                   onChange={(e) => setLocation(e.target.value)}
                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                 />
              </div>
            </div>
            
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="btn-primary px-8 py-3 disabled:opacity-50"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
          
          {/* Filter Toggle */}
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
                              className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
            
            {Object.values(filters).some(v => v !== 'all' && v !== 0 && v !== 100) && (
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Price per Hour
                </label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: parseInt(e.target.value)})}
                  className="w-full"
                />
                <span className="text-sm text-gray-600">£{filters.maxPrice}</span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={filters.minRating}
                  onChange={(e) => setFilters({...filters, minRating: parseInt(e.target.value)})}
                  className="input-field"
                >
                  <option value={0}>Any rating</option>
                  <option value={4}>4+ stars</option>
                  <option value={4.5}>4.5+ stars</option>
                  <option value={4.8}>4.8+ stars</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Type
                </label>
                <select
                  value={filters.vehicleType}
                  onChange={(e) => setFilters({...filters, vehicleType: e.target.value})}
                  className="input-field"
                >
                  <option value="all">All types</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Both">Both</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <select
                  value={filters.experience}
                  onChange={(e) => setFilters({...filters, experience: e.target.value})}
                  className="input-field"
                >
                  <option value="all">Any experience</option>
                  <option value="new">New (0-5 years)</option>
                  <option value="experienced">Experienced (5-10 years)</option>
                  <option value="expert">Expert (10+ years)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {filteredInstructors.length} instructor{filteredInstructors.length !== 1 ? 's' : ''} found
          </h2>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching for instructors...</p>
          </div>
        ) : filteredInstructors.length === 0 ? (
          <div className="text-center py-12">
            <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No instructors found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or location.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredInstructors.map((instructor) => (
              <div key={instructor.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Instructor Image */}
                  <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    {instructor.image_url ? (
                      <img
                        src={instructor.image_url}
                        alt={instructor.full_name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <Car className="h-16 w-16 text-gray-400" />
                    )}
                  </div>
                  
                  {/* Instructor Info */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {instructor.full_name}
                        </h3>
                        
                        <div className="flex items-center space-x-4 mb-3">
                          {renderStars(instructor.rating)}
                          <span className="text-gray-600">•</span>
                          <span className="text-gray-600">{instructor.total_reviews} reviews</span>
                          <span className="text-gray-600">•</span>
                          <span className="text-gray-600">{instructor.experience_years} years experience</span>
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-3">
                          <span className="text-gray-600">{instructor.location}</span>
                          <span className="text-gray-600">•</span>
                          <span className="text-gray-600">{instructor.vehicle_type} vehicle</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {instructor.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-3">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            £{instructor.price_per_hour}
                          </div>
                          <div className="text-sm text-gray-600">per hour</div>
                        </div>
                        
                        <Link
                          to={`/instructor/${instructor.id}`}
                          className="btn-primary"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorSearch;

