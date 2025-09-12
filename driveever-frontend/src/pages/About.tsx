import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Award, 
  Shield, 
  Clock, 
  Star,
  CheckCircle,
  Target,
  Heart
} from 'lucide-react';

const About = () => {
  const stats = [
    { number: '10,000+', label: 'Students Taught', icon: Users },
    { number: '98%', label: 'Pass Rate', icon: Award },
    { number: '500+', label: 'Instructors', icon: Shield },
    { number: '5 Years', label: 'Experience', icon: Clock }
  ];

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To make driving education accessible, safe, and effective for everyone through innovative technology and expert instruction. One person, one million company - that\'s the dream!'
    },
    {
      icon: Heart,
      title: 'Our Vision',
      description: 'Creating a world where every driver is confident, skilled, and safe on the road through comprehensive education. Building the future of driving education, one student at a time.'
    },
    {
      icon: Star,
      title: 'Our Values',
      description: 'Excellence, safety, innovation, and student success are at the core of everything we do. Plus, a healthy dose of ambition and the belief that one person can change the world.'
    }
  ];

  const team = [
    {
      name: 'Billigot Techgenies',
      role: 'Development Company',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=face',
      bio: 'The development team behind DriveEver. Based in Lincoln, we specialize in creating innovative technology solutions that revolutionize industries through cutting-edge development.',
      quote: '"Innovation through technology, excellence through development."'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-primary-600">DriveEver</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              One person, one million company. Developed by Billigot Techgenies, we're revolutionizing driving education through technology, 
              connecting students with expert instructors for a safer, smarter learning experience.
            </p>
            <div className="bg-primary-100 rounded-lg p-4 max-w-2xl mx-auto mb-8">
              <p className="text-primary-800 font-semibold text-lg">
                "Building the future of driving education, one student at a time."
              </p>
              <p className="text-primary-600 text-sm mt-1">- Developed by Billigot Techgenies, Lincoln</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Drives Us</h2>
            <p className="text-xl text-gray-600">Our commitment to excellence in driving education</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="card text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The experts behind DriveEver's success</p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="card text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-primary-100"
                />
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-primary-600 font-semibold text-lg mb-4">{member.role}</p>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">{member.bio}</p>
                <div className="bg-primary-50 rounded-lg p-4 border-l-4 border-primary-500">
                  <p className="text-primary-800 font-medium italic text-lg">{member.quote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-primary-100 mb-8">Join thousands of successful drivers who learned with DriveEver</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
              Find an Instructor
            </Link>
            <Link to="/signin" className="btn-secondary border-2 border-white text-white hover:bg-white hover:text-primary-600">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
