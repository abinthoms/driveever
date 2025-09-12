import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Clock, 
  Car, 
  Phone, 
  Mail, 
  Calendar, 
  Users, 
  CheckCircle,
  MessageCircle,
  Share2,
  Heart
} from 'lucide-react';

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
    features: string[];
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
  reviews: {
    id: number;
    studentName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  qualifications: string[];
  languages: string[];
}

const InstructorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isFavorited, setIsFavorited] = useState(false);

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockInstructor: Instructor = {
      id: parseInt(id || '1'),
      name: "Sarah Johnson",
      profileImage: "/api/placeholder/300/300",
      rating: 4.9,
      reviewCount: 127,
      pricePerHour: 35,
      location: "Central London",
      specialties: ["Beginner", "Test Preparation", "Highway Practice", "Nervous Learners"],
      experience: 8,
      passRate: 94,
      isAvailable: true,
      nextAvailable: "Today, 2:00 PM",
      bio: "I'm a passionate driving instructor with 8 years of experience helping learners of all ages and skill levels pass their driving test. I specialize in working with nervous learners and have a proven track record of building confidence behind the wheel. My approach is patient, encouraging, and tailored to each student's individual needs. I believe that learning to drive should be an enjoyable and empowering experience, and I'm committed to helping you achieve your goals safely and confidently.",
      vehicle: {
        make: "Ford",
        model: "Focus",
        year: 2022,
        transmission: "Manual",
        features: ["Dual Controls", "Air Conditioning", "Bluetooth", "Reversing Camera", "Parking Sensors"]
      },
      availability: {
        monday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
        tuesday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
        wednesday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
        thursday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
        friday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
        saturday: ["10:00", "11:00", "12:00"],
        sunday: []
      },
      reviews: [
        {
          id: 1,
          studentName: "Emma Wilson",
          rating: 5,
          comment: "Sarah is an amazing instructor! She was so patient with me when I was nervous about driving. I passed my test first time thanks to her excellent teaching.",
          date: "2024-01-15"
        },
        {
          id: 2,
          studentName: "James Smith",
          rating: 5,
          comment: "Highly recommend Sarah! Her teaching methods are clear and effective. She made learning to drive enjoyable and stress-free.",
          date: "2024-01-10"
        },
        {
          id: 3,
          studentName: "Lisa Brown",
          rating: 4,
          comment: "Great instructor with lots of experience. She helped me overcome my fear of motorways and I'm now a confident driver.",
          date: "2024-01-05"
        }
      ],
      qualifications: [
        "DVSA Approved Driving Instructor (ADI)",
        "First Aid Certified",
        "Child Protection Training",
        "Advanced Driving Instructor"
      ],
      languages: ["English", "Spanish", "French"]
    };

    setInstructor(mockInstructor);
    setLoading(false);
  }, [id]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getAvailableTimes = (date: string) => {
    if (!instructor || !date) return [];
    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'lowercase' });
    return instructor.availability[dayOfWeek as keyof typeof instructor.availability] || [];
  };

  const handleBookLesson = () => {
    if (selectedDate && selectedTime) {
      // Navigate to booking page with pre-filled data
      navigate(`/book-lesson?instructor=${id}&date=${selectedDate}&time=${selectedTime}`);
    } else {
      // Navigate to booking page with just instructor selected
      navigate(`/book-lesson?instructor=${id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading instructor profile...</p>
        </div>
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructor not found</h2>
          <button
            onClick={() => navigate('/find-instructor')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/find-instructor')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Search
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className={`p-2 rounded-lg transition-colors ${
                  isFavorited ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500'
                }`}
              >
                <Heart className={`h-6 w-6 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
                <Share2 className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Instructor Header */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-32 h-32 bg-gray-200 rounded-2xl flex items-center justify-center">
                  <Users className="h-16 w-16 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{instructor.name}</h1>
                  <div className="flex items-center space-x-1 mb-2">
                    {renderStars(instructor.rating)}
                    <span className="text-lg text-gray-600 ml-2">
                      {instructor.rating} ({instructor.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-5 w-5 mr-2" />
                    {instructor.location}
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl font-bold text-green-600">£{instructor.pricePerHour}</div>
                    <div className="text-gray-500">per hour</div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center">
                    <Phone className="h-5 w-5 mr-2" />
                    Call
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Message
                  </button>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {instructor.name}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{instructor.bio}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-semibold text-gray-700 mb-1">{instructor.experience}</div>
                  <div className="text-sm text-gray-500">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold text-gray-700 mb-1">{instructor.passRate}%</div>
                  <div className="text-sm text-gray-500">Pass Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold text-gray-700 mb-1">{instructor.reviewCount}</div>
                  <div className="text-sm text-gray-500">Students Taught</div>
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Specialties</h2>
              <div className="flex flex-wrap gap-3">
                {instructor.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Teaching Vehicle</h2>
              <div className="flex items-center space-x-4 mb-4">
                <Car className="h-8 w-8 text-gray-600" />
                <div>
                  <div className="text-xl font-semibold text-gray-900">
                    {instructor.vehicle.year} {instructor.vehicle.make} {instructor.vehicle.model}
                  </div>
                  <div className="text-gray-600">{instructor.vehicle.transmission} Transmission</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {instructor.vehicle.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Reviews</h2>
              <div className="space-y-6">
                {instructor.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{review.studentName}</h3>
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">{review.comment}</p>
                    <div className="text-sm text-gray-500">{review.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Availability Status */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Availability</h3>
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${
                instructor.isAvailable 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                <Clock className="h-4 w-4 mr-2" />
                {instructor.isAvailable ? 'Available Now' : `Next: ${instructor.nextAvailable}`}
              </div>
            </div>

            {/* Book Lesson */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Book a Lesson</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {selectedDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                    <div className="grid grid-cols-2 gap-2">
                      {getAvailableTimes(selectedDate).map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedTime === time
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleBookLesson}
                  disabled={!selectedDate || !selectedTime}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Lesson
                </button>
              </div>
            </div>

            {/* Qualifications */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Qualifications</h3>
              <div className="space-y-2">
                {instructor.qualifications.map((qual, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{qual}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {instructor.languages.map((language, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;
