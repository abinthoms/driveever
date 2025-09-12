import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Clock, MapPin, Car, User, AlertCircle, CheckCircle, XCircle, Clock as ClockIcon } from 'lucide-react';

interface Booking {
  id: number;
  instructor_name: string;
  lesson_date: string;
  start_time: string;
  end_time: string;
  duration_hours: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  price_per_hour: number;
  total_price: number;
  lesson_type: string;
  pickup_location: string;
  dropoff_location: string;
  notes: string;
  created_at: string;
}

const MyBookings: React.FC = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  useEffect(() => {
    if (!user || !token) {
      navigate('/login');
      return;
    }
    fetchBookings();
  }, [user, token, navigate]);

  const fetchBookings = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockBookings: Booking[] = [
        {
          id: 1,
          instructor_name: 'John Smith',
          lesson_date: '2025-08-27',
          start_time: '09:00',
          end_time: '10:00',
          duration_hours: 1.0,
          status: 'confirmed',
          price_per_hour: 35.00,
          total_price: 35.00,
          lesson_type: 'Standard Lesson',
          pickup_location: 'Home Address',
          dropoff_location: 'Test Centre',
          notes: 'Focus on parallel parking and roundabouts',
          created_at: '2025-08-25T10:30:00Z'
        },
        {
          id: 2,
          instructor_name: 'Sarah Johnson',
          lesson_date: '2025-08-29',
          start_time: '14:00',
          end_time: '15:30',
          duration_hours: 1.5,
          status: 'pending',
          price_per_hour: 40.00,
          total_price: 60.00,
          lesson_type: 'Highway Driving',
          pickup_location: 'City Centre',
          dropoff_location: 'Home Address',
          notes: 'Practice motorway entry and exit',
          created_at: '2025-08-26T15:45:00Z'
        },
        {
          id: 3,
          instructor_name: 'Mike Wilson',
          lesson_date: '2025-08-20',
          start_time: '10:00',
          end_time: '11:00',
          duration_hours: 1.0,
          status: 'completed',
          price_per_hour: 35.00,
          total_price: 35.00,
          lesson_type: 'Test Preparation',
          pickup_location: 'Home Address',
          dropoff_location: 'Test Centre',
          notes: 'Mock driving test practice',
          created_at: '2025-08-18T09:15:00Z'
        }
      ];
      setBookings(mockBookings);
    } catch (error) {
      setError('Failed to load bookings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: number) => {
    try {
      // Mock cancellation - replace with actual API call
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' as const }
          : booking
      ));
    } catch (error) {
      setError('Failed to cancel booking');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-yellow-600" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'no_show':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'no_show':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const today = new Date();
    const lessonDate = new Date(booking.lesson_date);
    
    if (filter === 'upcoming') {
      return lessonDate >= today && booking.status !== 'completed' && booking.status !== 'cancelled';
    } else if (filter === 'past') {
      return lessonDate < today || booking.status === 'completed' || booking.status === 'cancelled';
    }
    return true;
  });

  if (!user || !token) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="mt-2 text-gray-600">Manage your driving lessons and track your progress</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md font-medium ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Bookings ({bookings.length})
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-4 py-2 rounded-md font-medium ${
                filter === 'upcoming'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Upcoming ({bookings.filter(b => new Date(b.lesson_date) >= new Date() && b.status !== 'completed' && b.status !== 'cancelled').length})
            </button>
            <button
              onClick={() => setFilter('past')}
              className={`px-4 py-2 rounded-md font-medium ${
                filter === 'past'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Past ({bookings.filter(b => new Date(b.lesson_date) < new Date() || b.status === 'completed' || b.status === 'cancelled').length})
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-6">
              {filter === 'upcoming' 
                ? "You don't have any upcoming lessons. Start by searching for instructors!"
                : filter === 'past'
                ? "You don't have any past lessons yet."
                : "You don't have any bookings yet. Start by searching for instructors!"
              }
            </p>
            <button
              onClick={() => navigate('/search')}
              className="btn-primary"
            >
              Find Instructors
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  {/* Left side - Booking details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Lesson with {booking.instructor_name}
                        </h3>
                        <p className="text-gray-600">{booking.lesson_type}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(booking.status)}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">
                          {new Date(booking.lesson_date).toLocaleDateString('en-GB', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">
                          {booking.start_time} - {booking.end_time}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ClockIcon className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">
                          {booking.duration_hours} hour{booking.duration_hours !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-700 font-medium">
                          £{booking.total_price}
                        </span>
                      </div>
                    </div>

                    {(booking.pickup_location || booking.dropoff_location) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {booking.pickup_location && (
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">
                              <span className="font-medium">Pickup:</span> {booking.pickup_location}
                            </span>
                          </div>
                        )}
                        {booking.dropoff_location && (
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">
                              <span className="font-medium">Dropoff:</span> {booking.dropoff_location}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {booking.notes && (
                      <div className="mb-4">
                        <p className="text-gray-700">
                          <span className="font-medium">Notes:</span> {booking.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right side - Actions */}
                  <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col space-y-2">
                    {booking.status === 'pending' && (
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors"
                      >
                        Cancel Booking
                      </button>
                    )}
                    
                    {booking.status === 'confirmed' && (
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-2">Lesson confirmed!</div>
                        <button
                          onClick={() => navigate(`/instructor/${booking.id}`)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    )}

                    {booking.status === 'completed' && (
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-2">Lesson completed</div>
                        <button
                          onClick={() => navigate('/search')}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                          Book Another
                        </button>
                      </div>
                    )}
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

export default MyBookings;
