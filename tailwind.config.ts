import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand accent. Sourced from a single CSS var (--brand-rgb) so the
        // exact hex can be swapped in one place. Keys kept as `gold*` so the
        // ~15 components using text-gold/bg-gold need no edits.
        gold: 'rgb(var(--brand-rgb) / <alpha-value>)',
        'gold-dim': 'rgb(var(--brand-rgb) / 0.2)',
        'gold-border': 'rgb(var(--brand-rgb) / 0.3)',
        'gold-bright': 'rgb(var(--brand-bright-rgb) / <alpha-value>)',
        // Theme tokens — light by default, dark via html.dark
        base: 'rgb(var(--base-rgb) / <alpha-value>)',
        base2: 'rgb(var(--base2-rgb) / <alpha-value>)',
        base3: 'rgb(var(--base3-rgb) / <alpha-value>)',
        surface: 'rgb(var(--surface-rgb) / <alpha-value>)',
        'surface-2': 'rgb(var(--surface2-rgb) / <alpha-value>)',
        ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
        muted: 'rgb(var(--muted-rgb) / <alpha-value>)',
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
