/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#08090c',
        obsidian2: '#0d0f15',
        ink: '#111520',
        bone: '#ece7dd',
        gold: '#ff5a1f',      // ember accent (kept name so admin/cv inherit)
        gold2: '#ff7a45',
        goldsoft: '#ffb38a',
        haze: '#8b8d97',
        line: '#1b1e26',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        drift: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(3%, -4%) scale(1.08)' } },
        drift2: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(-4%, 3%) scale(1.12)' } },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        drift: 'drift 18s ease-in-out infinite',
        drift2: 'drift2 22s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
