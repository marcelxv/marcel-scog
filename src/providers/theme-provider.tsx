'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'marcel-portfolio-theme';

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Helper function to safely access localStorage
function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      return stored as Theme;
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error);
  }

  return null;
}

// Helper function to safely set localStorage
function setStoredTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    console.warn('Failed to save theme to localStorage:', error);
  }
}

// Helper function to get system preference
function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';

  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  } catch (error) {
    console.warn('Failed to detect system theme preference:', error);
    return 'light';
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [isLoading, setIsLoading] = useState(true);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const storedTheme = getStoredTheme();
    const initialTheme = storedTheme || 'system';

    setTheme(initialTheme);
    setIsLoading(false);
  }, []);

  // Update resolved theme and apply to DOM
  useEffect(() => {
    if (isLoading) return;

    const root = window.document.documentElement;

    const updateTheme = () => {
      let effectiveTheme: 'light' | 'dark';

      if (theme === 'system') {
        effectiveTheme = getSystemTheme();
      } else {
        effectiveTheme = theme;
      }

      setResolvedTheme(effectiveTheme);

      // Apply theme to DOM with smooth transition
      root.classList.remove('light', 'dark');
      root.classList.add(effectiveTheme);

      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute(
          'content',
          effectiveTheme === 'dark' ? '#262626' : '#fffdf a'
        );
      }
    };

    updateTheme();

    // Listen for system theme changes only if current theme is 'system'
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemThemeChange = () => {
        updateTheme();
      };

      // Use the newer addEventListener if available, fallback to addListener
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleSystemThemeChange);
        return () =>
          mediaQuery.removeEventListener('change', handleSystemThemeChange);
      } else {
        // Fallback for older browsers
        mediaQuery.addListener(handleSystemThemeChange);
        return () => mediaQuery.removeListener(handleSystemThemeChange);
      }
    }

    // Return undefined for cases where no cleanup is needed
    return undefined;
  }, [theme, isLoading]);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    setStoredTheme(newTheme);

    // Dispatch custom event for other components that might need to react
    window.dispatchEvent(
      new CustomEvent('theme-change', {
        detail: { theme: newTheme },
      })
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: handleSetTheme,
        resolvedTheme,
        isLoading,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
