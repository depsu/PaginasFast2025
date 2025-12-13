/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        dark: {
          900: '#0B0F19', // Fondo principal muy oscuro
          800: '#151B2B', // Fondo secundario
          700: '#1E293B', // Bordes
        },
        brand: {
          500: '#3B82F6', // Azul vibrante
          400: '#60A5FA',
          glow: 'rgba(59, 130, 246, 0.5)'
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}