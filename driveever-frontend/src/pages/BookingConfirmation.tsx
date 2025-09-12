import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin, Car, User, ArrowRight } from 'lucide-react';

const BookingConfirmation = () => {
  const navigate = useNavigate();

  // Mock booking data - in real app, this would come from the booking state or API
  const bookingData = {
    id: 'BK-2024-001',
    instructor: {
      name: 'Sarah Johnson',
      phone: '+44 7700 900123',
      email: 'sarah.johnson@driveever.com'
    },
    lesson: {
      date: '2024-02-15',
      time: '14:00',
      duration: 1.5,
      type: 'Standard Lesson',
      pickupLocation: '123 Main Street, London',
      dropoffLocation: '456 Oak Avenue, London',
      notes: 'First lesson - nervous beginner'
    },
    pricing: {
      hourlyRate: 35,
      totalPrice: 52.50
    }
  };

  const handleViewInstructor = () => {
    navigate('/instructor/1');
  };

  const handleBookAnother = () => {
    navigate('/find-instructor');
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your driving lesson has been successfully booked. You'll receive a confirmation email shortly.
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
              Booking #{bookingData.id}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Instructor Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Instructor</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{bookingData.instructor.name}</h4>
                  <p className="text-sm text-gray-600">{bookingData.instructor.phone}</p>
                  <p className="text-sm text-gray-600">{bookingData.instructor.email}</p>
                </div>
              </div>
              <button
                onClick={handleViewInstructor}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
              >
                View Instructor Profile
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>

            {/* Lesson Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">{new Date(bookingData.lesson.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">{bookingData.lesson.time} ({bookingData.lesson.duration} hour{bookingData.lesson.duration > 1 ? 's' : ''})</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Car className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">{bookingData.lesson.type}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-gray-700"><strong>Pickup:</strong> {bookingData.lesson.pickupLocation}</p>
                    {bookingData.lesson.dropoffLocation && (
                      <p className="text-gray-700"><strong>Drop-off:</strong> {bookingData.lesson.dropoffLocation}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {bookingData.lesson.notes && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">Notes</h4>
              <p className="text-gray-700">{bookingData.lesson.notes}</p>
            </div>
          )}

          {/* Pricing */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total Paid</span>
              <span className="text-2xl font-bold text-green-600">£{bookingData.pricing.totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 rounded-2xl p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">What's Next?</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">1</div>
              <div>
                <h4 className="font-semibold text-gray-900">Confirmation Email</h4>
                <p className="text-gray-700">Check your email for booking confirmation and instructor contact details.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">2</div>
              <div>
                <h4 className="font-semibold text-gray-900">Instructor Contact</h4>
                <p className="text-gray-700">Your instructor will contact you 24 hours before your lesson to confirm details.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">3</div>
              <div>
                <h4 className="font-semibold text-gray-900">Lesson Day</h4>
                <p className="text-gray-700">Arrive at the pickup location 5 minutes early. Bring your provisional driving license.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleBookAnother}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            Book Another Lesson
          </button>
          <button
            onClick={handleGoToDashboard}
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            Go to Dashboard
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Need help or want to make changes?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <a href="tel:+441234567890" className="text-blue-600 hover:text-blue-700">
              Call Support: +44 123 456 7890
            </a>
            <a href="mailto:support@driveever.com" className="text-blue-600 hover:text-blue-700">
              Email: support@driveever.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
