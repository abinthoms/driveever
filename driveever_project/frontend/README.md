# DriveEver Frontend

A modern React frontend for the DriveEver driving lesson booking system.

## Features

- 🚗 Modern, responsive design with Tailwind CSS
- 🔐 User authentication and authorization
- 📱 Mobile-first responsive design
- 🎨 Beautiful UI components with Lucide React icons
- 🚀 Built with React 18, TypeScript, and modern tooling

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Backend Django server running on localhost:8000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Auth, etc.)
├── pages/              # Page components
├── App.tsx            # Main app component
├── index.tsx          # App entry point
└── App.css            # Global styles
```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **Lucide React** - Beautiful icons
- **React Hook Form** - Form handling

## Backend Integration

The frontend is configured to proxy API requests to the Django backend running on `localhost:8000`. Make sure your backend server is running before testing the frontend.

## Development

The app uses Tailwind CSS for styling. Custom styles can be added in `App.css` using Tailwind's `@apply` directive.

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

