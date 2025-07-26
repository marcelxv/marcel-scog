import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary colors - Deep petrol blue with improved contrast
        primary: {
          50: '#f8fbfd',   // Very light petrol
          100: '#ecf5f9',  // Light petrol
          200: '#cfe2ed',  // Soft petrol
          300: '#a4c8dc',  // Medium petrol
          400: '#6ca6c6',  // Darker petrol
          500: '#40617f',  // Deep petrol blue (main)
          600: '#304960',  // Darker petrol
          700: '#243749',  // Very dark petrol
          800: '#182531',  // Almost black petrol
          900: '#0f171f'   // Deep petrol black
        },
        
        // Secondary colors - Olive green accent with improved contrast
        secondary: {
          50: '#f8faf8',   // Very light olive
          100: '#f0f4f0',  // Light olive
          200: '#e0e8e0',  // Soft olive
          300: '#c8d8c8',  // Medium olive
          400: '#a8c0a8',  // Darker olive
          500: '#6a8468',  // Olive green accent (main)
          600: '#556953',  // Darker olive
          700: '#404f3e',  // Very dark olive
          800: '#2b3529',  // Almost black olive
          900: '#1a2019'   // Deep olive
        },
        
        // Accent colors - Warm beige variations with better contrast
        accent: {
          50: '#fffdf a',  // Very light beige
          100: '#fefaf4',  // Light beige
          200: '#faf2e4',  // Soft beige
          300: '#f4e8ce',  // Medium beige
          400: '#ecdab2',  // Darker beige
          500: '#fff8eb',  // Warm beige background (main)
          600: '#e4cc96',  // Darker beige
          700: '#c8b076',  // Very dark beige
          800: '#ac9456',  // Almost brown beige
          900: '#907836'   // Deep beige brown
        },
        
        // Text colors - High contrast charcoal variations
        text: {
          50: '#ffffff',   // Pure white
          100: '#fafafa',  // Very light charcoal
          200: '#e5e5e5',  // Light charcoal
          300: '#d4d4d4',  // Soft charcoal
          400: '#a3a3a3',  // Medium charcoal
          500: '#737373',  // Medium dark charcoal
          600: '#525252',  // Dark charcoal
          700: '#404040',  // Very dark charcoal
          800: '#262626',  // Almost black charcoal
          900: '#171717'   // Deep black
        },
        
        // Neutral colors with improved contrast
        neutral: {
          50: '#fffdf a',  // Very light warm neutral
          100: '#faf8f4',  // Light warm neutral
          200: '#f5f0e8',  // Soft warm neutral
          300: '#ebe4d8',  // Medium warm neutral
          400: '#d4c8b4',  // Medium neutral
          500: '#b4a488',  // Medium dark neutral
          600: '#94805c',  // Dark neutral
          700: '#74603c',  // Very dark neutral
          800: '#544424',  // Almost black neutral
          900: '#342c18'   // Deep neutral
        },
        
        // Semantic colors with proper contrast ratios
        success: '#228b22',  // Forest green
        warning: '#ff8c00',  // Dark orange
        error: '#dc267f',    // Magenta
        info: '#1e90ff'      // Dodger blue
      },
      fontFamily: {
        sans: ['"Inter"', '"SF Pro Display"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', '"SF Pro Text"', 'system-ui', 'sans-serif'],
        mono: ['"SF Mono"', '"Monaco"', '"Cascadia Code"', 'monospace']
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],    // 12px
        sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        base: ['1rem', { lineHeight: '1.5rem' }],    // 16px
        lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        xl: ['1.25rem', { lineHeight: '1.75rem' }],  // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],   // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }] // 30px
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translate3d(0,0,0)' },
          '40%, 43%': { transform: 'translate3d(0, -8px, 0)' },
          '70%': { transform: 'translate3d(0, -4px, 0)' },
          '90%': { transform: 'translate3d(0, -2px, 0)' },
        },
      },
      transitionDuration: {
        '150': '150ms',
        '300': '300ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [],
};

export default config;