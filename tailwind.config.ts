import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gold: '#c9a84c',
        'gold-dim': 'rgba(201,168,76,0.2)',
        'gold-border': 'rgba(201,168,76,0.3)',
        surface: '#141414',
        'surface-2': '#1a1a1a',
        muted: '#888888',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        'display': '-0.02em',
      },
    },
  },
  plugins: [],
}

export default config
