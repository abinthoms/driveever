import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
import VehicleCheck from './pages/VehicleCheck';
import TopGearBlog from './pages/TopGearBlog';
import LearnerDashboard from './pages/LearnerDashboard';
import FindInstructor from './pages/FindInstructor';
import InstructorProfile from './pages/InstructorProfile';
import BookLesson from './pages/BookLesson';
import BookingConfirmation from './pages/BookingConfirmation';
import InstructorDashboard from './pages/InstructorDashboard';
import DrivingSchoolDashboard from './pages/DrivingSchoolDashboard';
import DrivingSchoolMarketplace from './pages/DrivingSchoolMarketplace';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vehicle-check" element={<VehicleCheck />} />
            <Route path="/top-gear" element={<TopGearBlog />} />
            <Route path="/learner-dashboard" element={<LearnerDashboard />} />
            <Route path="/find-instructor" element={<FindInstructor />} />
            <Route path="/instructor/:id" element={<InstructorProfile />} />
            <Route path="/book-lesson" element={<BookLesson />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
            <Route path="/driving-school-dashboard" element={<DrivingSchoolDashboard />} />
            <Route path="/driving-schools" element={<DrivingSchoolMarketplace />} />
            {/* Add more routes here as needed */}
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
