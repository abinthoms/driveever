import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Clock, MapPin, Star, Car, Phone, Mail, Award, Clock as ClockIcon } from 'lucide-react';

interface Instructor {
  id: number;
  username: string;
  full_name: string;
  email: string;
  phone: string;
  bio: string;
  experience_years: number;
  rating: number;
  total_lessons: number;
  specialties: string[];
  vehicle_type: string;
  price_per_hour: number;
  location: string;
}

interface AvailabilitySlot {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

const InstructorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInstructorData();
    fetchAvailability();
  }, [id]);

  const fetchInstructorData = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockInstructor: Instructor = {
        id: parseInt(id || '1'),
        username: 'testinstructor',
        full_name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '+44 7911 123456',
        bio: 'Experienced driving instructor with over 10 years of teaching experience. Specialized in nervous drivers and automatic transmission.',
        experience_years: 10,
        rating: 4.8,
        total_lessons: 2500,
        specialties: ['Nervous Drivers', 'Automatic Transmission', 'Highway Driving', 'Parallel Parking'],
        vehicle_type: 'Automatic - Ford Focus',
        price_per_hour: 35.00,
        location: 'London, UK'
      };
      setInstructor(mockInstructor);
    } catch (error) {
      setError('Failed to load instructor information');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAvailability = async () => {
    try {
      // Mock availability data - replace with actual API call
      const mockAvailability: AvailabilitySlot[] = [
        { id: 1, date: '2025-08-27', start_time: '09:00', end_time: '10:00', is_available: true },
        { id: 2, date: '2025-08-27', start_time: '10:00', end_time: '11:00', is_available: true },
        { id: 3, date: '2025-08-27', start_time: '14:00', end_time: '15:00', is_available: true },
        { id: 4, date: '2025-08-28', start_time: '09:00', end_time: '10:00', is_available: true },
        { id: 5, date: '2025-08-28', start_time: '15:00', end_time: '16:00', is_available: true },
      ];
      setAvailability(mockAvailability);
    } catch (error) {
      console.error('Failed to fetch availability:', error);
    }
  };

  const handleBooking = async () => {
    if (!user || !token) {
      navigate('/login');
      return;
    }

    if (!selectedDate || !selectedTime) {
      setError('Please select a date and time');
      return;
    }

    try {
      // Mock booking creation - replace with actual API call
      console.log('Creating booking:', {
        instructor_id: id,
        date: selectedDate,
        time: selectedTime,
        user_id: user.id
      });
      
      // Navigate to booking confirmation
      navigate('/bookings');
    } catch (error) {
      setError('Failed to create booking');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
                 <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error || !instructor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error || 'Instructor not found'}</p>
          <button
            onClick={() => navigate('/search')}
            className="btn-primary"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4">
                              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <Car className="w-10 h-10 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{instructor.full_name}</h1>
                <p className="text-gray-600">{instructor.location}</p>
                <div className="flex items-center mt-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-gray-700 font-medium">{instructor.rating}</span>
                  <span className="ml-2 text-gray-500">({instructor.total_lessons} lessons)</span>
                </div>
              </div>
            </div>
            <div className="mt-4 lg:mt-0 text-right">
                              <div className="text-3xl font-bold text-green-600">£{instructor.price_per_hour}/hr</div>
              <p className="text-gray-600">per lesson</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Instructor Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">{instructor.bio}</p>
            </div>

            {/* Experience & Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Experience & Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                                  <div className="text-center p-4 bg-green-50 rounded-lg">
                  <ClockIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{instructor.experience_years}</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{instructor.total_lessons}</div>
                  <div className="text-gray-600">Lessons Taught</div>
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {instructor.specialties.map((specialty, index) => (
                                              <span
                              key={index}
                              className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full"
                            >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Vehicle */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Vehicle</h2>
              <div className="flex items-center space-x-3">
                <Car className="w-6 h-6 text-gray-600" />
                <span className="text-gray-700">{instructor.vehicle_type}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">{instructor.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">{instructor.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">{instructor.location}</span>
                </div>
              </div>
            </div>

            {/* Book a Lesson */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Book a Lesson</h2>
              
              {!user ? (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Please log in to book a lesson</p>
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full btn-primary"
                  >
                    Log In
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full input-field"
                    >
                      <option value="">Choose a date</option>
                      {availability.map((slot) => (
                        <option key={slot.id} value={slot.date}>
                          {new Date(slot.date).toLocaleDateString('en-GB', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Time
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full input-field"
                      disabled={!selectedDate}
                    >
                      <option value="">Choose a time</option>
                      {selectedDate && availability
                        .filter(slot => slot.date === selectedDate)
                        .map((slot) => (
                          <option key={slot.id} value={slot.start_time}>
                            {slot.start_time} - {slot.end_time}
                          </option>
                        ))}
                    </select>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleBooking}
                    disabled={!selectedDate || !selectedTime}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Book Lesson - £{instructor.price_per_hour}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;
