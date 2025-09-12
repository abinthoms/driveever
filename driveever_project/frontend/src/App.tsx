import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './contexts/AuthContext';
import { DashboardProvider } from './contexts/DashboardContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import InstructorSearch from './pages/InstructorSearch';
import InstructorProfile from './pages/InstructorProfile';
import MyBookings from './pages/MyBookings';
import Dashboard from './pages/Dashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import AcademyDashboard from './pages/AcademyDashboard';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import ThemeEditor from './pages/ThemeEditor';
import GoogleAnalytics from './pages/GoogleAnalytics';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DashboardProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/search" element={<InstructorSearch />} />
                  <Route path="/instructor/:id" element={<InstructorProfile />} />
                  <Route path="/bookings" element={<MyBookings />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
                  <Route path="/academy-dashboard" element={<AcademyDashboard />} />
                  <Route path="/analytics" element={<AnalyticsDashboard />} />
                  <Route path="/theme-editor" element={<ThemeEditor />} />
                  <Route path="/google-analytics" element={<GoogleAnalytics />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </DashboardProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

