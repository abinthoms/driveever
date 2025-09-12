import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Palette, 
  Type, 
  Layout, 
  Eye, 
  Save, 
  RotateCcw,
  Download,
  Upload,
  Settings,
  Check,
  X
} from 'lucide-react';

interface ThemeConfig {
  primary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  secondary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  accent: string;
  background: string;
  text: string;
  fontFamily: string;
  borderRadius: string;
  shadow: string;
  name?: string;
}

const ThemeEditor: React.FC = () => {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState<ThemeConfig>({
    primary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    accent: '#f59e0b',
    background: '#f9fafb',
    text: '#111827',
    fontFamily: 'Inter',
    borderRadius: '0.5rem',
    shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [savedThemes, setSavedThemes] = useState<ThemeConfig[]>([]);
  const [currentThemeName, setCurrentThemeName] = useState('DriveEver Green');

  const fontOptions = [
    'Inter',
    'Roboto',
    'Open Sans',
    'Lato',
    'Poppins',
    'Montserrat',
    'Source Sans Pro',
    'Ubuntu',
    'Nunito',
    'Playfair Display'
  ];

  const borderRadiusOptions = [
    { value: '0', label: 'None' },
    { value: '0.25rem', label: 'Small' },
    { value: '0.5rem', label: 'Medium' },
    { value: '0.75rem', label: 'Large' },
    { value: '1rem', label: 'Extra Large' },
    { value: '9999px', label: 'Full' }
  ];

  const shadowOptions = [
    { value: 'none', label: 'None' },
    { value: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', label: 'Small' },
    { value: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', label: 'Medium' },
    { value: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', label: 'Large' },
    { value: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', label: 'Extra Large' }
  ];

  const presetThemes = [
    {
      name: 'DriveEver Green',
      config: theme
    },
    {
      name: 'Ocean Blue',
      config: {
        ...theme,
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        }
      }
    },
    {
      name: 'Sunset Orange',
      config: {
        ...theme,
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        }
      }
    },
    {
      name: 'Royal Purple',
      config: {
        ...theme,
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        }
      }
    }
  ];

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    Object.entries(theme.primary).forEach(([key, value]) => {
      root.style.setProperty(`--color-primary-${key}`, value);
    });
    Object.entries(theme.secondary).forEach(([key, value]) => {
      root.style.setProperty(`--color-secondary-${key}`, value);
    });
    root.style.setProperty('--color-accent', theme.accent);
    root.style.setProperty('--color-background', theme.background);
    root.style.setProperty('--color-text', theme.text);
    root.style.setProperty('--font-family', theme.fontFamily);
    root.style.setProperty('--border-radius', theme.borderRadius);
    root.style.setProperty('--shadow', theme.shadow);
  }, [theme]);

  const handleColorChange = (category: string, shade: string, value: string) => {
    setTheme(prev => ({
      ...prev,
      [category]: {
        ...(prev[category as keyof ThemeConfig] as any),
        [shade]: value
      }
    }));
  };

  const handleSaveTheme = () => {
    const newTheme = { ...theme, name: currentThemeName };
    setSavedThemes(prev => [...prev, newTheme]);
    localStorage.setItem('savedThemes', JSON.stringify([...savedThemes, newTheme]));
  };

  const handleLoadTheme = (savedTheme: ThemeConfig) => {
    setTheme(savedTheme);
  };

  const handleResetTheme = () => {
    setTheme(presetThemes[0].config);
  };

  const handleExportTheme = () => {
    const dataStr = JSON.stringify(theme, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `${currentThemeName.replace(/\s+/g, '-')}-theme.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Palette className="h-8 w-8 text-green-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Theme Editor</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.full_name}</span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Theme Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Preset Themes */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Preset Themes</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {presetThemes.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => setTheme(preset.config)}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 transition-colors text-center"
                  >
                    <div className="w-full h-16 rounded mb-2" style={{ backgroundColor: preset.config.primary[500] }}></div>
                    <span className="text-sm font-medium text-gray-900">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Primary Color Palette</h3>
              <div className="grid grid-cols-5 gap-4">
                {Object.entries(theme.primary).map(([shade, color]) => (
                  <div key={shade} className="text-center">
                    <div className="w-full h-16 rounded mb-2 border border-gray-200" style={{ backgroundColor: color }}></div>
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => handleColorChange('primary', shade, e.target.value)}
                      className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                    />
                    <p className="text-xs text-gray-600 mt-1">{shade}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Colors */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Secondary Color Palette</h3>
              <div className="grid grid-cols-5 gap-4">
                {Object.entries(theme.secondary).map(([shade, color]) => (
                  <div key={shade} className="text-center">
                    <div className="w-full h-16 rounded mb-2 border border-gray-200" style={{ backgroundColor: color }}></div>
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => handleColorChange('secondary', shade, e.target.value)}
                      className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                    />
                    <p className="text-xs text-gray-600 mt-1">{shade}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Accent & Background Colors */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Accent & Background</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={theme.accent}
                      onChange={(e) => setTheme(prev => ({ ...prev, accent: e.target.value }))}
                      className="w-16 h-12 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.accent}
                      onChange={(e) => setTheme(prev => ({ ...prev, accent: e.target.value }))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={theme.background}
                      onChange={(e) => setTheme(prev => ({ ...prev, background: e.target.value }))}
                      className="w-16 h-12 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.background}
                      onChange={(e) => setTheme(prev => ({ ...prev, background: e.target.value }))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={theme.text}
                      onChange={(e) => setTheme(prev => ({ ...prev, text: e.target.value }))}
                      className="w-16 h-12 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.text}
                      onChange={(e) => setTheme(prev => ({ ...prev, text: e.target.value }))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Typography & Layout */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Typography & Layout</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
                  <select
                    value={theme.fontFamily}
                    onChange={(e) => setTheme(prev => ({ ...prev, fontFamily: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {fontOptions.map(font => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Border Radius</label>
                  <select
                    value={theme.borderRadius}
                    onChange={(e) => setTheme(prev => ({ ...prev, borderRadius: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {borderRadiusOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Shadow</label>
                  <select
                    value={theme.shadow}
                    onChange={(e) => setTheme(prev => ({ ...prev, shadow: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {shadowOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Preview & Actions */}
          <div className="space-y-6">
            {/* Theme Preview */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Theme Preview</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: theme.primary[100] }}>
                  <h4 className="font-medium mb-2" style={{ color: theme.primary[900] }}>Primary Background</h4>
                  <p className="text-sm" style={{ color: theme.primary[700] }}>This is how your primary colors will look</p>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: theme.secondary[100] }}>
                  <h4 className="font-medium mb-2" style={{ color: theme.secondary[900] }}>Secondary Background</h4>
                  <p className="text-sm" style={{ color: theme.secondary[700] }}>This is how your secondary colors will look</p>
                </div>
                <button 
                  className="w-full py-2 px-4 rounded-lg font-medium transition-colors"
                  style={{ 
                    backgroundColor: theme.primary[500], 
                    color: 'white',
                    borderRadius: theme.borderRadius,
                    boxShadow: theme.shadow
                  }}
                >
                  Sample Button
                </button>
              </div>
            </div>

            {/* Theme Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Theme Actions</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={currentThemeName}
                  onChange={(e) => setCurrentThemeName(e.target.value)}
                  placeholder="Theme name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <button
                  onClick={handleSaveTheme}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Theme
                </button>
                <button
                  onClick={handleResetTheme}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset to Default
                </button>
                <button
                  onClick={handleExportTheme}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Theme
                </button>
              </div>
            </div>

            {/* Saved Themes */}
            {savedThemes.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Saved Themes</h3>
                <div className="space-y-2">
                  {savedThemes.map((savedTheme, index) => (
                    <button
                      key={index}
                      onClick={() => handleLoadTheme(savedTheme)}
                      className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-green-500 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">{savedTheme.name || `Theme ${index + 1}`}</span>
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: savedTheme.primary[500] }}></div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeEditor;
