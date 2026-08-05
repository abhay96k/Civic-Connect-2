/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: '#000000',
          dark: '#0A0A0C',
          card: '#121216',
          border: 'rgba(255, 255, 255, 0.12)',
          accent: '#FFFFFF',
          silver: '#E4E4E7',
          gray: '#A1A1AA',
          glow: 'rgba(255, 255, 255, 0.25)',
          red: '#EF4444',
          orange: '#F97316',
          green: '#10B981',
          cyan: '#06B6D4'
        }
      },
      fontFamily: {
        space: ['"Space Grotesk"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif']
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'laser-scan': 'laserScan 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear'
      },
      keyframes: {
        laserScan: {
          '0%, 100%': { top: '0%' },
          '50%': { top: '95%' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(255, 255, 255, 0.15)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 255, 255, 0.35)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      }
    },
  },
  plugins: [],
}
