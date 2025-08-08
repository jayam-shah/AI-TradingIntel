import { useState, useEffect, createContext, useContext } from 'react';

export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    gradient: string;
    gradientHover: string;
  };
  cssVariables: Record<string, string>;
}

export const themes: Theme[] = [
  {
    id: 'ocean',
    name: 'Ocean Blue',
    description: 'Deep ocean blues with emerald accents',
    colors: {
      primary: '#10b981',
      secondary: '#3b82f6',
      accent: '#06b6d4',
      background: 'from-gray-900 via-blue-900 to-purple-900',
      surface: 'rgba(59, 130, 246, 0.1)',
      text: '#ffffff',
      textSecondary: '#cbd5e1',
      border: 'rgba(255, 255, 255, 0.1)',
      gradient: 'linear-gradient(to right, #10b981, #3b82f6)',
      gradientHover: 'linear-gradient(to right, #059669, #2563eb)',
    },
    cssVariables: {
      '--primary': '16 185 129',
      '--secondary': '59 130 246',
      '--accent': '6 182 212',
      '--background': '15 23 42',
      '--surface': '30 41 59',
    }
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    description: 'Warm oranges and pinks with golden highlights',
    colors: {
      primary: '#f59e0b',
      secondary: '#ec4899',
      accent: '#f97316',
      background: 'from-orange-900 via-red-900 to-pink-900',
      surface: 'rgba(249, 115, 22, 0.1)',
      text: '#ffffff',
      textSecondary: '#fde68a',
      border: 'rgba(255, 255, 255, 0.1)',
      gradient: 'linear-gradient(to right, #f59e0b, #ec4899)',
      gradientHover: 'linear-gradient(to right, #d97706, #db2777)',
    },
    cssVariables: {
      '--primary': '245 158 11',
      '--secondary': '236 72 153',
      '--accent': '249 115 22',
      '--background': '124 45 18',
      '--surface': '154 52 18',
    }
  },
  {
    id: 'forest',
    name: 'Forest Green',
    description: 'Rich greens with natural earth tones',
    colors: {
      primary: '#22c55e',
      secondary: '#16a34a',
      accent: '#84cc16',
      background: 'from-green-900 via-emerald-900 to-teal-900',
      surface: 'rgba(34, 197, 94, 0.1)',
      text: '#ffffff',
      textSecondary: '#bbf7d0',
      border: 'rgba(255, 255, 255, 0.1)',
      gradient: 'linear-gradient(to right, #22c55e, #16a34a)',
      gradientHover: 'linear-gradient(to right, #16a34a, #15803d)',
    },
    cssVariables: {
      '--primary': '34 197 94',
      '--secondary': '22 163 74',
      '--accent': '132 204 22',
      '--background': '20 83 45',
      '--surface': '22 101 52',
    }
  },
  {
    id: 'aurora',
    name: 'Aurora Nights',
    description: 'Purple and teal aurora with cosmic vibes',
    colors: {
      primary: '#8b5cf6',
      secondary: '#06b6d4',
      accent: '#a855f7',
      background: 'from-purple-900 via-indigo-900 to-cyan-900',
      surface: 'rgba(139, 92, 246, 0.1)',
      text: '#ffffff',
      textSecondary: '#e0e7ff',
      border: 'rgba(255, 255, 255, 0.1)',
      gradient: 'linear-gradient(to right, #8b5cf6, #06b6d4)',
      gradientHover: 'linear-gradient(to right, #7c3aed, #0891b2)',
    },
    cssVariables: {
      '--primary': '139 92 246',
      '--secondary': '6 182 212',
      '--accent': '168 85 247',
      '--background': '67 56 202',
      '--surface': '79 70 229',
    }
  },
  {
    id: 'midnight',
    name: 'Midnight Black',
    description: 'Sleek black with silver and blue accents',
    colors: {
      primary: '#64748b',
      secondary: '#475569',
      accent: '#0ea5e9',
      background: 'from-gray-900 via-slate-900 to-zinc-900',
      surface: 'rgba(100, 116, 139, 0.1)',
      text: '#ffffff',
      textSecondary: '#cbd5e1',
      border: 'rgba(255, 255, 255, 0.1)',
      gradient: 'linear-gradient(to right, #64748b, #0ea5e9)',
      gradientHover: 'linear-gradient(to right, #475569, #0284c7)',
    },
    cssVariables: {
      '--primary': '100 116 139',
      '--secondary': '71 85 105',
      '--accent': '14 165 233',
      '--background': '15 23 42',
      '--surface': '30 41 59',
    }
  },
  {
    id: 'cherry',
    name: 'Cherry Blossom',
    description: 'Soft pinks with rose gold highlights',
    colors: {
      primary: '#f472b6',
      secondary: '#ec4899',
      accent: '#fb7185',
      background: 'from-pink-900 via-rose-900 to-red-900',
      surface: 'rgba(244, 114, 182, 0.1)',
      text: '#ffffff',
      textSecondary: '#fce7f3',
      border: 'rgba(255, 255, 255, 0.1)',
      gradient: 'linear-gradient(to right, #f472b6, #ec4899)',
      gradientHover: 'linear-gradient(to right, #ec4899, #db2777)',
    },
    cssVariables: {
      '--primary': '244 114 182',
      '--secondary': '236 72 153',
      '--accent': '251 113 133',
      '--background': '136 19 55',
      '--surface': '157 23 77',
    }
  }
];

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function useThemeProvider() {
  const [currentThemeId, setCurrentThemeId] = useState(() => {
    return localStorage.getItem('app-theme') || 'ocean';
  });

  const currentTheme = themes.find(theme => theme.id === currentThemeId) || themes[0];

  const setTheme = (themeId: string) => {
    setCurrentThemeId(themeId);
    localStorage.setItem('app-theme', themeId);
    
    // Apply CSS variables
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      Object.entries(theme.cssVariables).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });
    }
  };

  useEffect(() => {
    // Apply initial theme
    Object.entries(currentTheme.cssVariables).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [currentTheme]);

  return {
    currentTheme,
    setTheme,
    themes,
  };
}

export { ThemeContext };