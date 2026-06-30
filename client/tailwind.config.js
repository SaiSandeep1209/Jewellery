/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Minimal luxury · warm neutral palette
        ivory: '#FBF8F2', // page background
        sand: '#F1EADD', // panels
        champagne: '#E9DCC3',
        gold: {
          DEFAULT: '#B08D57', // primary accent (antique gold)
          deep: '#937443',
        },
        ink: '#1E1B17', // near-black warm text
        stone: '#6B6358', // muted text
        line: 'rgba(30,27,23,0.12)',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.22em',
      },
      maxWidth: {
        container: '1240px',
      },
      boxShadow: {
        soft: '0 18px 50px -24px rgba(30,27,23,0.35)',
        lift: '0 28px 70px -28px rgba(30,27,23,0.45)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
}
