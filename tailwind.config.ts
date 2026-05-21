import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#EEF2FF',
          100: '#E0E7FF',
          500: '#0054FD',   // primary CTA blue
          600: '#0044CC',   // hover state
          700: '#0033AA',   // active/press state
        },
        surface: '#F6F7F9', // left panel + card bg
        muted:   '#6B7280', // helper text
        error:   '#EF4444',
        success: '#22C55E',
      },
      fontFamily: {
        sans: ['"Rubik"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        card: '0 2px 16px 0 rgba(59,110,247,0.08)',
        input: '0 0 0 3px rgba(59,110,247,0.15)',
      },
      animation: {
        'shake': 'shake 0.4s ease-in-out',
        'scale-in': 'scale-in 0.15s ease-out',
        'fade-up': 'fade-up 0.2s ease-out',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%':       { transform: 'translateX(-6px)' },
          '75%':       { transform: 'translateX(6px)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
