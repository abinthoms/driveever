import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Car, 
  CreditCard, 
  CheckCircle,
  User,
  Phone,
  Mail,
  Star
} from 'lucide-react';

interface Instructor {
  id: number;
  name: string;
  rating: number;
  pricePerHour: number;
  location: string;
  specialties: string[];
  vehicle: {
    make: string;
    model: string;
    year: number;
    transmission: string;
  };
}

interface BookingData {
  instructor: Instructor | null;
  selectedDate: string;
  selectedTime: string;
  duration: number;
  lessonType: string;
  pickupLocation: string;
  dropoffLocation: string;
  notes: string;
  totalPrice: number;
}

const BookLesson = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    instructor: null,
    selectedDate: searchParams.get('date') || '',
    selectedTime: searchParams.get('time') || '',
    duration: 1,
    lessonType: 'Standard',
    pickupLocation: '',
    dropoffLocation: '',
    notes: '',
    totalPrice: 0
  });

  // Mock instructor data - in real app, this would come from API
  useEffect(() => {
    const instructorId = searchParams.get('instructor');
    if (instructorId) {
      // Mock instructor data based on ID
      const mockInstructor: Instructor = {
        id: parseInt(instructorId),
        name: "Sarah Johnson",
        rating: 4.9,
        pricePerHour: 35,
        location: "Central London",
        specialties: ["Beginner", "Test Preparation", "Highway Practice"],
        vehicle: {
          make: "Ford",
          model: "Focus",
          year: 2022,
          transmission: "Manual"
        }
      };
      setBookingData(prev => ({ ...prev, instructor: mockInstructor }));
    }
  }, [searchParams]);

  useEffect(() => {
    if (bookingData.instructor && bookingData.duration) {
      const totalPrice = bookingData.instructor.pricePerHour * bookingData.duration;
      setBookingData(prev => ({ ...prev, totalPrice }));
    }
  }, [bookingData.instructor, bookingData.duration]);

  const lessonTypes = [
    { value: 'Standard', label: 'Standard Lesson', description: 'Regular driving lesson' },
    { value: 'Intensive', label: 'Intensive Course', description: 'Multiple lessons in one day' },
    { value: 'Test Prep', label: 'Test Preparation', description: 'Focused on passing the test' },
    { value: 'Highway', label: 'Highway Practice', description: 'Motorway and dual carriageway' },
    { value: 'Refresher', label: 'Refresher Lesson', description: 'For experienced drivers' }
  ];

  const durationOptions = [
    { value: 1, label: '1 hour' },
    { value: 1.5, label: '1.5 hours' },
    { value: 2, label: '2 hours' },
    { value: 3, label: '3 hours' }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    // Navigate to confirmation page
    navigate('/booking-confirmation');
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

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
            step <= currentStep 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-500'
          }`}>
            {step}
          </div>
          {step < 4 && (
            <div className={`w-16 h-1 mx-2 ${
              step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Date & Time</h2>
        <p className="text-gray-600">Choose when you'd like to have your lesson</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
          <input
            type="date"
            value={bookingData.selectedDate}
            onChange={(e) => setBookingData(prev => ({ ...prev, selectedDate: e.target.value }))}
            min={new Date().toISOString().split('T')[0]}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
          <select
            value={bookingData.selectedTime}
            onChange={(e) => setBookingData(prev => ({ ...prev, selectedTime: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Choose time</option>
            <option value="09:00">9:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="14:00">2:00 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="16:00">4:00 PM</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Duration</label>
          <select
            value={bookingData.duration}
            onChange={(e) => setBookingData(prev => ({ ...prev, duration: parseFloat(e.target.value) }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {durationOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Type</label>
          <select
            value={bookingData.lessonType}
            onChange={(e) => setBookingData(prev => ({ ...prev, lessonType: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {lessonTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Lesson Details</h2>
        <p className="text-gray-600">Provide additional information for your lesson</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
          <input
            type="text"
            value={bookingData.pickupLocation}
            onChange={(e) => setBookingData(prev => ({ ...prev, pickupLocation: e.target.value }))}
            placeholder="Enter pickup address"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Drop-off Location</label>
          <input
            type="text"
            value={bookingData.dropoffLocation}
            onChange={(e) => setBookingData(prev => ({ ...prev, dropoffLocation: e.target.value }))}
            placeholder="Enter drop-off address (optional)"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
          <textarea
            value={bookingData.notes}
            onChange={(e) => setBookingData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Any specific requirements or notes for your instructor"
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Confirm</h2>
        <p className="text-gray-600">Please review your booking details before proceeding</p>
      </div>

      {/* Instructor Info */}
      {bookingData.instructor && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Instructor Details</h3>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{bookingData.instructor.name}</h4>
              <div className="flex items-center space-x-1">
                {renderStars(bookingData.instructor.rating)}
                <span className="text-sm text-gray-600 ml-1">{bookingData.instructor.rating}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                {bookingData.instructor.location}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lesson Details */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700">{bookingData.selectedDate}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700">{bookingData.selectedTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700">{bookingData.duration} hour{bookingData.duration > 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Car className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700">{bookingData.lessonType}</span>
          </div>
        </div>
        
        {bookingData.pickupLocation && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">Pickup: {bookingData.pickupLocation}</span>
            </div>
            {bookingData.dropoffLocation && (
              <div className="flex items-center space-x-2 mt-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">Drop-off: {bookingData.dropoffLocation}</span>
              </div>
            )}
          </div>
        )}

        {bookingData.notes && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-gray-700"><strong>Notes:</strong> {bookingData.notes}</p>
          </div>
        )}
      </div>

      {/* Pricing */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h3>
        <div className="flex justify-between items-center">
          <span className="text-gray-700">
            {bookingData.duration} hour{bookingData.duration > 1 ? 's' : ''} @ £{bookingData.instructor?.pricePerHour}/hour
          </span>
          <span className="text-2xl font-bold text-blue-600">£{bookingData.totalPrice}</span>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment</h2>
        <p className="text-gray-600">Complete your booking with secure payment</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Lesson Fee</span>
            <span className="text-gray-900">£{bookingData.totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Platform Fee</span>
            <span className="text-gray-900">£0.00</span>
          </div>
          <div className="border-t border-gray-200 pt-2">
            <div className="flex justify-between">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-lg font-bold text-blue-600">£{bookingData.totalPrice}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input type="radio" name="payment" value="card" defaultChecked className="text-blue-600" />
            <CreditCard className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700">Credit/Debit Card</span>
          </label>
          <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input type="radio" name="payment" value="paypal" className="text-blue-600" />
            <span className="text-gray-700">PayPal</span>
          </label>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <CheckCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-800">Cancellation Policy</h4>
            <p className="text-sm text-yellow-700 mt-1">
              You can cancel or reschedule your lesson up to 24 hours before the scheduled time. 
              Cancellations within 24 hours may incur a fee.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return bookingData.selectedDate && bookingData.selectedTime;
      case 2: return bookingData.pickupLocation;
      case 3: return true;
      case 4: return true;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/find-instructor')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Search
            </button>
            <div className="text-sm text-gray-500">
              Step {currentStep} of 4
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderStepIndicator()}
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {renderCurrentStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          
          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                'Complete Booking'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookLesson;
