import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1B4F72',
          dark: '#143C57',
          deep: '#0E2A3E',
        },
        teal: {
          DEFAULT: '#2DB389',
          light: '#E6F5F0',
        },
        accent: {
          DEFAULT: '#1A9E6E',
          hover: '#157E58',
        },
        surface: '#F4F6F4',
        ink: {
          DEFAULT: '#1A1A1A',
          muted: '#4B5563',
        },
      },
      fontFamily: {
        heading: ['var(--font-barlow)', 'var(--font-noto-jp)', 'sans-serif'],
        body: ['var(--font-inter)', 'var(--font-noto-jp)', 'sans-serif'],
      },
      maxWidth: {
        '7xl': '80rem',
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(135deg, #0E2A3E 0%, #1B4F72 55%, #15725C 100%)',
        'dark-gradient':
          'linear-gradient(120deg, #0E2A3E 0%, #1B4F72 100%)',
      },
      keyframes: {
        'grid-pan': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '48px 48px' },
        },
      },
      animation: {
        'grid-pan': 'grid-pan 14s linear infinite',
      },
      boxShadow: {
        card: '0 4px 16px -4px rgb(27 79 114 / 0.12)',
        'card-hover': '0 12px 32px -8px rgb(27 79 114 / 0.22)',
      },
    },
  },
  plugins: [],
};

export default config;
