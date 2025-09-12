import React, { createContext, useContext, useState, useEffect } from 'react';

const InstructorProfileContext = createContext();

export const useInstructorProfile = () => {
  const context = useContext(InstructorProfileContext);
  if (!context) {
    throw new Error('useInstructorProfile must be used within an InstructorProfileProvider');
  }
  return context;
};

export const InstructorProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    // Basic Info
    fullName: 'Sarah Johnson',
    title: 'Professional Driving Instructor',
    company: 'DriveEver Academy',
    location: 'London, UK',
    connections: 127,
    verified: false,
    
    // Profile Media
    coverPhoto: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=300&fit=crop',
    profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
    
    // About Section
    about: 'Passionate driving instructor with 8+ years of experience helping learners become confident, safe drivers. Specialized in nervous drivers and test preparation. 95% first-time pass rate.',
    
    // Experience
    experience: [
      {
        id: 1,
        title: 'Senior Driving Instructor',
        company: 'DriveEver Academy',
        duration: '2020 - Present',
        description: 'Lead instructor managing 15+ students weekly. Specialized in advanced driving techniques and test preparation.',
        logo: '🚗'
      },
      {
        id: 2,
        title: 'Driving Instructor',
        company: 'SafeDrive UK',
        duration: '2018 - 2020',
        description: 'Taught 200+ students with focus on defensive driving and hazard perception.',
        logo: '🛡️'
      }
    ],
    
    // Education
    education: [
      {
        id: 1,
        degree: 'Advanced Driving Instructor Certification',
        school: 'Driving Standards Agency',
        year: '2018',
        logo: '🎓'
      }
    ],
    
    // Skills & Endorsements
    skills: [
      { name: 'Test Preparation', endorsements: 45, level: 'Expert' },
      { name: 'Nervous Driver Training', endorsements: 38, level: 'Expert' },
      { name: 'Defensive Driving', endorsements: 32, level: 'Advanced' },
      { name: 'Hazard Perception', endorsements: 28, level: 'Advanced' },
      { name: 'Parallel Parking', endorsements: 25, level: 'Expert' }
    ],
    
    // Stats & Analytics
    stats: {
      profileViews: 156,
      postImpressions: 23,
      searchAppearances: 89,
      studentsTaught: 450,
      passRate: 95,
      yearsExperience: 8
    },
    
    // Privacy Settings
    privacy: {
      profileVisibility: 'public',
      showStats: true,
      showConnections: true,
      showExperience: true,
      showSkills: true
    },

    // Dashboard Stats (synced with profile)
    dashboardStats: {
      total_lessons: 156,
      pass_rate: 95,
      rating: 4.8,
      price_per_hour: 45,
      active_students: 8,
      lessons_this_week: 12,
      next_lesson: '2024-01-15 14:00'
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  // Sync editForm with profileData
  useEffect(() => {
    setEditForm(profileData);
  }, [profileData]);

  const updateProfile = (newData) => {
    setProfileData(prevData => ({
      ...prevData,
      ...newData,
      // Update dashboard stats based on profile changes
      dashboardStats: {
        ...prevData.dashboardStats,
        // Sync relevant fields
        pass_rate: newData.stats?.passRate || prevData.dashboardStats.pass_rate,
        rating: newData.stats?.rating || prevData.dashboardStats.rating,
        price_per_hour: newData.price_per_hour || prevData.dashboardStats.price_per_hour
      }
    }));
  };

  const saveProfile = () => {
    setProfileData(editForm);
    setIsEditing(false);
    // Here you would save to backend
    console.log('Profile saved:', editForm);
  };

  const cancelEdit = () => {
    setEditForm(profileData);
    setIsEditing(false);
  };

  const handleImageUpload = (type, file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (type === 'cover') {
        setEditForm(prev => ({ ...prev, coverPhoto: e.target.result }));
      } else {
        setEditForm(prev => ({ ...prev, profilePicture: e.target.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const togglePrivacy = (field) => {
    setEditForm(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [field]: !prev.privacy[field]
      }
    }));
  };

  const value = {
    profileData,
    editForm,
    isEditing,
    setIsEditing,
    setEditForm,
    updateProfile,
    saveProfile,
    cancelEdit,
    handleImageUpload,
    togglePrivacy
  };

  return (
    <InstructorProfileContext.Provider value={value}>
      {children}
    </InstructorProfileContext.Provider>
  );
};



