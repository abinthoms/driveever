// ========================================
// BILLIGOT.COM CONFIGURATION FILE
// ========================================
// This file is managed and updated by billigot.com
// Changes here will automatically reflect across the entire application
// ========================================

export const BILLIGOT_CONFIG = {
  // Company Information
  company: {
    name: "DriveEver",
    tagline: "Powered by billigot.com",
    logo: {
      initials: "DE",
      colors: {
        primary: "from-green-500 to-blue-600",
        secondary: "from-green-400 to-blue-500"
      }
    },
    contact: {
      phone: "+44 800 123 4567",
      email: "hello@driveever.com",
      address: "London, United Kingdom",
      hours: "Mon-Fri: 8AM-6PM"
    }
  },

  // Header Configuration
  header: {
    topBar: {
      enabled: true,
      backgroundColor: "bg-gray-900",
      textColor: "text-white",
      accentColor: "text-green-400"
    },
    navigation: {
      mainLinks: [
        { name: 'Home', href: '/', current: true },
        { name: 'Find Instructors', href: '/find-instructors', current: false },
        { name: 'Driving Schools', href: '/driving-schools', current: false },
        { name: 'Courses', href: '/courses', current: false },
        { name: 'About', href: '/about', current: false },
        { name: 'Contact', href: '/contact', current: false }
      ],
      servicesDropdown: {
        enabled: true,
        label: 'Services',
        items: [
          { name: 'Manual Lessons', href: '/services/manual' },
          { name: 'Automatic Lessons', href: '/services/automatic' },
          { name: 'Intensive Courses', href: '/services/intensive' },
          { name: 'Pass Plus', href: '/services/pass-plus' },
          { name: 'Refresher Lessons', href: '/services/refresher' }
        ]
      }
    },
    search: {
      enabled: true,
      placeholder: "Search instructors...",
      buttonText: "Find Instructor"
    },
    actions: {
      instructorLogin: {
        enabled: true,
        text: "Instructor Login",
        href: "/instructor-dashboard"
      },
      findInstructor: {
        enabled: true,
        text: "Find Instructor",
        href: "/find-instructors"
      }
    }
  },

  // Footer Configuration
  footer: {
    mainContent: {
      enabled: true,
      backgroundColor: "bg-gray-900",
      textColor: "text-white"
    },
    sections: {
      companyInfo: {
        enabled: true,
        description: "Connecting learners with qualified driving instructors across the UK. Making driving education accessible, safe, and enjoyable for everyone."
      },
      quickLinks: {
        enabled: true,
        title: "Quick Links",
        links: [
          { name: 'Home', href: '/' },
          { name: 'Find Instructors', href: '/find-instructors' },
          { name: 'Driving Schools', href: '/driving-schools' },
          { name: 'Courses', href: '/courses' },
          { name: 'About Us', href: '/about' },
          { name: 'Contact', href: '/contact' }
        ]
      },
      services: {
        enabled: true,
        title: "Services",
        links: [
          { name: 'Manual Lessons', href: '/services/manual' },
          { name: 'Automatic Lessons', href: '/services/automatic' },
          { name: 'Intensive Courses', href: '/services/intensive' },
          { name: 'Pass Plus', href: '/services/pass-plus' },
          { name: 'Refresher Lessons', href: '/services/refresher' },
          { name: 'Defensive Driving', href: '/services/defensive' }
        ]
      },
      supportLegal: {
        enabled: true,
        title: "Support & Legal",
        links: [
          { name: 'Help Center', href: '/help' },
          { name: 'FAQ', href: '/faq' },
          { name: 'Contact Support', href: '/support' },
          { name: 'Terms of Service', href: '/terms' },
          { name: 'Privacy Policy', href: '/privacy' },
          { name: 'Cookie Policy', href: '/cookies' }
        ]
      }
    },
    trustIndicators: {
      enabled: true,
      items: [
        {
          icon: "Shield",
          title: "DVSA Approved",
          subtitle: "All instructors certified"
        },
        {
          icon: "Award",
          title: "Quality Assured",
          subtitle: "Verified reviews & ratings"
        },
        {
          icon: "Users",
          title: "Community Trusted",
          subtitle: "10,000+ happy students"
        }
      ]
    },
    bottomFooter: {
      enabled: true,
      backgroundColor: "bg-gray-950",
      copyright: {
        company: "DriveEver",
        developer: "billigot.com",
        developerUrl: "https://billigot.com"
      },
      socialLinks: {
        enabled: true,
        platforms: [
          { name: 'Facebook', icon: 'Facebook', href: '#' },
          { name: 'Twitter', icon: 'Twitter', href: '#' },
          { name: 'Instagram', icon: 'Instagram', href: '#' },
          { name: 'LinkedIn', icon: 'Linkedin', href: '#' },
          { name: 'YouTube', icon: 'Youtube', href: '#' }
        ]
      },
      backToTop: {
        enabled: true,
        text: "Back to Top"
      }
    },
    newsletter: {
      enabled: true,
      backgroundColor: "bg-gray-800",
      title: "Stay Updated with DriveEver",
      subtitle: "Get the latest news, tips, and offers delivered to your inbox.",
      placeholder: "Enter your email address",
      buttonText: "Subscribe",
      disclaimer: "By subscribing, you agree to our Privacy Policy and consent to receive updates from our company."
    }
  },

  // Theme Configuration
  theme: {
    colors: {
      primary: {
        main: "#10B981", // green-600
        light: "#34D399", // green-400
        dark: "#059669", // green-700
        hover: "#047857" // green-800
      },
      secondary: {
        main: "#3B82F6", // blue-500
        light: "#60A5FA", // blue-400
        dark: "#2563EB", // blue-600
        hover: "#1D4ED8" // blue-700
      },
      accent: {
        success: "#10B981", // green-600
        warning: "#F59E0B", // amber-500
        error: "#EF4444", // red-500
        info: "#3B82F6" // blue-500
      }
    },
    fonts: {
      primary: "Inter",
      fallback: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }
  },

  // Feature Flags
  features: {
    search: true,
    instructorDashboard: true,
    marketplace: true,
    profileSystem: true,
    hmrcCompliance: true,
    elasticSearch: true,
    responsiveDesign: true,
    darkMode: false,
    multiLanguage: false
  },

  // Analytics & Tracking
  analytics: {
    googleAnalytics: {
      enabled: false,
      trackingId: ""
    },
    facebookPixel: {
      enabled: false,
      pixelId: ""
    },
    hotjar: {
      enabled: false,
      siteId: ""
    }
  },

  // SEO Configuration
  seo: {
    defaultTitle: "DriveEver - Find Your Perfect Driving Instructor",
    defaultDescription: "Connect with qualified, experienced driving instructors across the UK. Learn to drive with confidence using our comprehensive marketplace.",
    defaultKeywords: "driving instructor, driving lessons, learn to drive, UK driving, driving school, intensive course",
    ogImage: "/images/og-image.jpg",
    twitterCard: "summary_large_image"
  },

  // Performance Settings
  performance: {
    lazyLoading: true,
    imageOptimization: true,
    codeSplitting: true,
    caching: true
  }
};

// ========================================
// USAGE INSTRUCTIONS FOR BILLIGOT.COM
// ========================================
// 
// 1. HEADER CUSTOMIZATION:
//    - Modify navigation links in header.navigation.mainLinks
//    - Add/remove services in header.navigation.servicesDropdown.items
//    - Update contact information in company.contact
//    - Change colors in theme.colors
//
// 2. FOOTER CUSTOMIZATION:
//    - Update links in footer.sections
//    - Modify trust indicators in footer.trustIndicators.items
//    - Change social media links in footer.bottomFooter.socialLinks
//    - Update newsletter content in footer.newsletter
//
// 3. COMPANY INFORMATION:
//    - Update company details in company section
//    - Modify logo colors in company.logo.colors
//    - Change contact information
//
// 4. FEATURE TOGGLES:
//    - Enable/disable features in features section
//    - Control analytics in analytics section
//    - Adjust performance settings
//
// 5. THEME CUSTOMIZATION:
//    - Update color scheme in theme.colors
//    - Change fonts in theme.fonts
//    - Modify accent colors
//
// ========================================
// IMPORTANT: After making changes, restart the development server
// ========================================



