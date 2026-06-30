/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0a0d14',
        obsidian2: '#0e131e',
        ink: '#11161f',
        gold: '#e9b949',
        gold2: '#c8a14a',
        goldsoft: '#f4d58a',
        haze: '#9aa4b2',
        line: '#1e2632',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        shimmer: { '0%': { backgroundPosition: '0% 50%' }, '100%': { backgroundPosition: '200% 50%' } },
        pulseglow: { '0%,100%': { opacity: '0.5' }, '50%': { opacity: '1' } },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        pulseglow: 'pulseglow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
