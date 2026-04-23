/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Área legal — azul océano profundo, editorial, denso
        legal: {
          50:  '#eef1f7',
          100: '#d6dee9',
          200: '#a9b8d0',
          300: '#7690b3',
          400: '#4a6a91',
          500: '#2f4d72',
          600: '#1f3a5c',
          700: '#142a46',
          800: '#0b1c33',
          900: '#07142a',
          950: '#040b1a',
        },
        // Área contable — cobre / terracota / cuero viejo, cálido y denso
        ledger: {
          50:  '#fbf2ea',
          100: '#f3dcc6',
          200: '#e6b68b',
          300: '#d38a57',
          400: '#bc6930',
          500: '#a1521f',
          600: '#824015',
          700: '#63300f',
          800: '#44210a',
          900: '#2a1407',
          950: '#180b03',
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
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter Tight"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'tick': ['0.68rem', { lineHeight: '1', letterSpacing: '0.2em' }],
        'monument': ['clamp(3rem, 10vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
        'cover':    ['clamp(2.4rem, 6vw, 5.2rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        'editorial':['clamp(1.8rem, 3vw, 2.8rem)', { lineHeight: '1.12', letterSpacing: '-0.018em' }],
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
