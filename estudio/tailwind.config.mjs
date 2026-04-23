/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Área legal — azul corporativo intermedio (entre navy y royal)
        // Referencia: el azul que se ve bien contra fondo navy oscuro.
        legal: {
          50:  '#eef2fb',
          100: '#d9e1f3',
          200: '#b4c2e6',
          300: '#8aa0d3',
          400: '#6480bf',
          500: '#4a6bb3',    // accent principal
          600: '#3a57a0',
          700: '#2e4688',
          800: '#263973',
          900: '#1c2a56',
          950: '#0e1628',    // fondo dark navy
        },
        // Área contable — naranja pimentón, no marrón
        ledger: {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        // Papel editorial — crema tibia, con textura cálida
        paper:     '#f4efe5',
        paperDark: '#e6dfd0',
        ink: {
          50:  '#f7f5f0',
          100: '#ede9df',
          200: '#d6cfbe',
          300: '#aea490',
          400: '#867c68',
          500: '#5d5545',
          600: '#3f3929',
          700: '#2b2619',
          800: '#1a160d',
          900: '#0d0a04',
        },
      },
      fontFamily: {
        // Sans-serif corporativo, tipo Arial pero más limpio (Inter).
        // Fallback a Arial/Helvetica para sistemas sin Inter.
        sans: ['Inter', 'Arial', 'Helvetica', 'sans-serif'],
        // Mismo stack — usamos display = sans pero con más weight.
        serif: ['Inter', 'Arial', 'Helvetica', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'tick': ['0.72rem', { lineHeight: '1', letterSpacing: '0.18em' }],
        'monument': ['clamp(2.6rem, 8vw, 6.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'cover':    ['clamp(2rem, 5vw, 4rem)',    { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'editorial':['clamp(1.6rem, 2.6vw, 2.4rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
      },
      letterSpacing: {
        tick: '0.22em',
        ribbon: '0.32em',
      },
      maxWidth: {
        column: '62ch',
        shell: '1280px',
        reader: '780px',
      },
      spacing: {
        'chapter': '9rem',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.2, 0.6, 0.2, 1)',
      },
      animation: {
        'scroll-hint': 'scrollHint 2.2s ease-in-out infinite',
        'ribbon':      'ribbon 45s linear infinite',
        'reveal-line': 'revealLine 1s cubic-bezier(0.2, 0.6, 0.2, 1) both',
      },
      keyframes: {
        scrollHint: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.6' },
          '50%':      { transform: 'translateY(6px)', opacity: '1' },
        },
        ribbon: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        revealLine: {
          '0%':   { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
    },
  },
  plugins: [],
};
