/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        porcelain: {
          50: '#FFFFFF',
          100: '#F6F7F9',
          200: '#E5E7EB',
          300: '#D1D5DB',
        },
        charcoal: {
          900: '#111111',
          800: '#1F2937',
          700: '#374151',
          600: '#4B5563',
          500: '#6B7280',
        },
        violetAcc: {
          400: '#8B7EFF',
          500: '#6D5EF6',
          600: '#5847E4',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.3', filter: 'blur(30px)' },
          '50%': { opacity: '0.6', filter: 'blur(50px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s infinite ease-in-out',
        'shimmer': 'shimmer 2.5s infinite',
      },
    },
  },
  plugins: [],
}
