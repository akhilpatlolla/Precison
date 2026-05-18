# Precision Detail Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Design polish:** Before marking any visual task complete, invoke `impeccable` and `emil-design-eng` skills for polish review.

**Goal:** Build a one-page dark luxury parallax landing page for Precision Detail that deploys to GitHub Pages as a static Next.js site.

**Architecture:** Next.js 14 App Router with `output: 'export'` for static generation. Single `page.tsx` composes 8 section components in order. Framer Motion handles all scroll animations. `#booking` anchor is the destination for every CTA on the page.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, GitHub Actions (deploy)

---

## File Map

```
src/
  app/
    layout.tsx          — root layout, fonts, metadata
    page.tsx            — composes all sections
    globals.css         — Tailwind base + custom scrollbar
  components/
    Nav.tsx             — sticky nav, scroll-aware bg, Book Now CTA
    Hero.tsx            — video bg, headline, dual CTAs, parallax
    Services.tsx        — 3 package cards with Book↓ buttons
    OurWork.tsx         — photo card grid with hover glow
    BeforeAfter.tsx     — drag-to-reveal slider
    Testimonials.tsx    — auto-scroll carousel
    About.tsx           — brand story + trust badges
    FAQ.tsx             — accordion
    Booking.tsx         — fieldd.co iframe + contact info
    Footer.tsx          — logo, links, copyright
  lib/
    scrollTo.ts         — reusable smooth-scroll helper
    tokens.ts           — design tokens (colors, spacing)
public/
  video/
    hero.mp4            — user's hero video (add manually)
  images/
    work/               — user's standalone photos (add manually)
    before/             — before photos (add manually)
    after/              — after photos (add manually)
    about.jpg           — about section photo (add manually)
next.config.js          — static export + basePath
tailwind.config.ts      — custom theme tokens
.github/
  workflows/
    deploy.yml          — GitHub Actions: build + deploy to gh-pages
```

---

## Task 1: Project Setup

**Files:**
- Create: `next.config.js`
- Create: `tailwind.config.ts`
- Create: `src/app/globals.css`
- Create: `src/lib/tokens.ts`
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Initialize Next.js project**

```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --no-import-alias
```

When prompted, accept all defaults.

- [ ] **Step 2: Install dependencies**

```bash
npm install framer-motion
npm install -D @types/node
```

- [ ] **Step 3: Configure static export**

Write `next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Precison',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

- [ ] **Step 4: Configure Tailwind with dark luxury tokens**

Write `tailwind.config.ts`:

```ts
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
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 5: Write global CSS**

Write `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
  background-color: #0a0a0a;
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #0a0a0a;
}
::-webkit-scrollbar-thumb {
  background: #c9a84c44;
  border-radius: 3px;
}

@layer utilities {
  .gold-glow {
    box-shadow: 0 0 20px rgba(201, 168, 76, 0.3);
  }
}
```

- [ ] **Step 6: Write design tokens**

Write `src/lib/tokens.ts`:

```ts
export const GOLD = '#c9a84c'

export const PACKAGES = [
  {
    id: 'interior',
    name: 'Interior',
    tagline: 'Deep clean from the inside out',
    features: [
      'Deep carpet & upholstery cleaning',
      'Leather conditioning',
      'Dashboard & console detailing',
      'Window cleaning (interior)',
    ],
    highlight: false,
  },
  {
    id: 'full',
    name: 'Full Detail',
    tagline: 'The complete experience',
    features: [
      'Everything in Interior',
      'Hand wash & clay bar treatment',
      'Paint decontamination & waxing',
      'Tire & wheel restoration',
    ],
    highlight: true,
  },
  {
    id: 'wash',
    name: 'Wash & Wax',
    tagline: 'Showroom shine, outside',
    features: [
      'Hand wash',
      'Clay bar treatment',
      'Paint decontamination',
      'Waxing & tire/wheel restoration',
    ],
    highlight: false,
  },
]

export const TESTIMONIALS = [
  {
    quote: "Absolutely incredible work — my car looks brand new. Best detailing I've ever had.",
    name: 'Sarah M.',
    stars: 5,
  },
  {
    quote: "Best mobile detailing service in Kannapolis, hands down. They came to my office and I came back to a showroom car.",
    name: 'James T.',
    stars: 5,
  },
  {
    quote: "Worth every penny. My leather seats look better than when I bought the car.",
    name: 'Marcus R.',
    stars: 5,
  },
]

export const FAQ_ITEMS = [
  {
    q: 'How long does a full detail take?',
    a: 'A full detail typically takes 3–5 hours depending on the vehicle size and condition. We\'ll give you a more accurate estimate when you book.',
  },
  {
    q: 'Do you need water or electricity access?',
    a: 'No — we are fully self-contained. We bring our own water, power, and all supplies. All we need is access to your vehicle.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We serve Kannapolis and the surrounding areas including Concord, Salisbury, and Charlotte. Contact us if you\'re unsure whether we cover your location.',
  },
  {
    q: 'Do you bring your own supplies?',
    a: 'Yes, we bring all professional-grade cleaning products, tools, and equipment. You don\'t need to provide anything.',
  },
  {
    q: 'How far in advance should I book?',
    a: 'We recommend booking 2–3 days in advance, though we often have same-week availability. Use the booking widget below to check current availability.',
  },
]
```

- [ ] **Step 7: Write GitHub Actions deploy workflow**

Write `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

- [ ] **Step 8: Create public asset directories**

```bash
mkdir -p public/video public/images/work public/images/before public/images/after
touch public/video/.gitkeep public/images/work/.gitkeep public/images/before/.gitkeep public/images/after/.gitkeep
```

- [ ] **Step 9: Verify dev server starts**

```bash
npm run dev
```

Expected: Server running at `http://localhost:3000/Precison`. No errors.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "chore: Next.js project setup with static export config"
```

---

## Task 2: Root Layout & Scroll Helper

**Files:**
- Create: `src/lib/scrollTo.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write scroll helper**

Write `src/lib/scrollTo.ts`:

```ts
export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
```

- [ ] **Step 2: Write root layout**

Write `src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Precision Detail — Premium Mobile Auto Detailing in Kannapolis, NC',
  description: 'Premium mobile auto detailing that comes to you. Interior, exterior, and full detail packages. Book online today.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a0a0a] text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Write page shell**

Write `src/app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main>
      {/* sections will be imported here task by task */}
    </main>
  )
}
```

- [ ] **Step 4: Verify**

```bash
npm run dev
```

Expected: Black page, no console errors.

- [ ] **Step 5: Commit**

```bash
git add src/
git commit -m "feat: root layout, globals, scroll helper"
```

---

## Task 3: Nav Component

**Files:**
- Create: `src/components/Nav.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write Nav**

Write `src/components/Nav.tsx`:

```tsx
'use client'

import { useEffect, useState } from 'react'
import { scrollToSection } from '@/lib/scrollTo'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-gold font-black tracking-widest text-sm uppercase">
          Precision Detail
        </span>
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('services')}
            className="text-muted hover:text-white text-sm transition-colors"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('gallery')}
            className="text-muted hover:text-white text-sm transition-colors"
          >
            Gallery
          </button>
          <button
            onClick={() => scrollToSection('booking')}
            className="bg-gold text-black text-xs font-bold px-5 py-2 rounded tracking-widest uppercase hover:bg-yellow-400 transition-colors"
          >
            Book Now
          </button>
        </div>
        {/* Mobile book now */}
        <button
          onClick={() => scrollToSection('booking')}
          className="md:hidden bg-gold text-black text-xs font-bold px-4 py-2 rounded tracking-widest uppercase"
        >
          Book
        </button>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Add Nav to page**

Edit `src/app/page.tsx`:

```tsx
import Nav from '@/components/Nav'

export default function Home() {
  return (
    <main>
      <Nav />
    </main>
  )
}
```

- [ ] **Step 3: Verify**

```bash
npm run dev
```

Expected: Gold "PRECISION DETAIL" in top-left, "Book Now" gold button top-right. Nav goes dark after scrolling 80px.

- [ ] **Step 4: Commit**

```bash
git add src/components/Nav.tsx src/app/page.tsx
git commit -m "feat: sticky nav with scroll-aware backdrop"
```

---

## Task 4: Hero Section

**Files:**
- Create: `src/components/Hero.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write Hero**

Write `src/components/Hero.tsx`:

```tsx
'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { scrollToSection } from '@/lib/scrollTo'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Video background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/hero-poster.jpg"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/65" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 pt-16"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gold text-xs tracking-widest uppercase mb-4"
        >
          Premium Mobile Detailing &nbsp;·&nbsp; Kannapolis, NC
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-5xl md:text-7xl font-black leading-tight mb-6 max-w-2xl"
        >
          Your Car Deserves{' '}
          <span className="text-gold">the Best</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-muted text-lg mb-10 max-w-md"
        >
          We come to you. Showroom shine, every time.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex gap-4 flex-wrap"
        >
          <button
            onClick={() => scrollToSection('booking')}
            className="bg-gold text-black font-bold px-8 py-3 rounded tracking-widest text-sm uppercase hover:bg-yellow-400 transition-colors gold-glow"
          >
            Book Now
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="border border-white/30 text-white/80 font-medium px-8 py-3 rounded text-sm hover:border-gold hover:text-gold transition-colors"
          >
            View Services
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/40 text-2xl"
      >
        ↓
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Add Hero to page**

Edit `src/app/page.tsx`:

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
    </main>
  )
}
```

- [ ] **Step 3: Verify**

```bash
npm run dev
```

Expected: Full-screen black section (video plays if `public/video/hero.mp4` exists), gold headline, two buttons. Content fades out on scroll.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx src/app/page.tsx
git commit -m "feat: hero section with video background and parallax"
```

---

## Task 5: Services Section

**Files:**
- Create: `src/components/Services.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write Services**

Write `src/components/Services.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'
import { PACKAGES } from '@/lib/tokens'
import { scrollToSection } from '@/lib/scrollTo'

const CHECK = '✓'

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-xs tracking-widest uppercase mb-3">What We Offer</p>
          <h2 className="text-4xl md:text-5xl font-black">Our Packages</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative flex flex-col rounded-lg p-8 ${
                pkg.highlight
                  ? 'bg-[#1a1208] border border-gold/40'
                  : 'bg-surface border border-white/5'
              }`}
            >
              {pkg.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-black text-xs font-bold px-4 py-1 rounded-full tracking-wider uppercase">
                  Most Popular
                </span>
              )}
              <p className="text-gold text-xs tracking-widest uppercase mb-2">{pkg.tagline}</p>
              <h3 className="text-2xl font-black mb-6">{pkg.name}</h3>
              <ul className="flex-1 space-y-3 mb-8">
                {pkg.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-muted">
                    <span className="text-gold mt-0.5">{CHECK}</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => scrollToSection('booking')}
                className={`w-full py-3 rounded text-sm font-bold tracking-widest uppercase transition-colors ${
                  pkg.highlight
                    ? 'bg-gold text-black hover:bg-yellow-400'
                    : 'border border-gold/40 text-gold hover:bg-gold/10'
                }`}
              >
                Book This Package ↓
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page**

Edit `src/app/page.tsx`:

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
    </main>
  )
}
```

- [ ] **Step 3: Verify**

Expected: 3 cards with gold accents. Full Detail card has gold border and "Most Popular" badge. Each card has a booking button.

- [ ] **Step 4: Commit**

```bash
git add src/components/Services.tsx src/app/page.tsx
git commit -m "feat: services section with package cards"
```

---

## Task 6: Our Work (Photo Cards)

**Files:**
- Create: `src/components/OurWork.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write OurWork**

Write `src/components/OurWork.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const PHOTOS = [
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', caption: 'Interior Detail' },
  { src: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&q=80', caption: 'Exterior Polish' },
  { src: 'https://images.unsplash.com/photo-1600705722908-bca4a8c1ad67?w=600&q=80', caption: 'Wheel Restoration' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', caption: 'Paint Correction' },
  { src: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=600&q=80', caption: 'Leather Conditioning' },
  { src: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=600&q=80', caption: 'Full Detail' },
]

export default function OurWork() {
  return (
    <section id="gallery" className="py-24 px-6 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-xs tracking-widest uppercase mb-3">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-black">Our Work</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative group aspect-square overflow-hidden rounded-lg cursor-pointer"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300" />
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-bold text-sm">{photo.caption}</p>
              </div>
              {/* Gold border glow on hover */}
              <div className="absolute inset-0 rounded-lg ring-0 group-hover:ring-2 group-hover:ring-gold/60 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
        <p className="text-center text-muted/40 text-xs mt-6">
          {/* Replace PHOTOS array with your real photos in /public/images/work/ */}
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page**

Edit `src/app/page.tsx`:

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import OurWork from '@/components/OurWork'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <OurWork />
    </main>
  )
}
```

- [ ] **Step 3: Verify**

Expected: 6-photo grid. Hover any photo → image zooms slightly, dark overlay fades in, caption slides up from bottom, gold ring appears.

- [ ] **Step 4: Commit**

```bash
git add src/components/OurWork.tsx src/app/page.tsx
git commit -m "feat: our work photo grid with hover effects"
```

---

## Task 7: Before & After Slider

**Files:**
- Create: `src/components/BeforeAfter.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write BeforeAfter slider**

Write `src/components/BeforeAfter.tsx`:

```tsx
'use client'

import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

interface SliderProps {
  before: string
  after: string
  label?: string
}

function Slider({ before, after, label }: SliderProps) {
  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const updatePos = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
    setPos(pct)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative aspect-video rounded-lg overflow-hidden cursor-ew-resize select-none"
      onMouseMove={(e) => updatePos(e.clientX)}
      onTouchMove={(e) => updatePos(e.touches[0].clientX)}
    >
      {/* After (base layer) */}
      <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" />

      {/* Before (clipped layer) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover" style={{ width: `${10000 / pos}%`, maxWidth: 'none' }} />
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-gold"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gold flex items-center justify-center shadow-lg">
          <span className="text-black text-xs font-bold">⇔</span>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded">Before</span>
      <span className="absolute top-3 right-3 bg-gold/90 text-black text-xs font-bold px-2 py-1 rounded">After</span>

      {label && (
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/60 text-xs">
          {label}
        </span>
      )}
    </div>
  )
}

const PAIRS = [
  {
    before: 'https://images.unsplash.com/photo-1549194388-b6fc5a2de40e?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    label: 'Interior Detail',
  },
  {
    before: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&q=80',
    label: 'Exterior Polish',
  },
]

export default function BeforeAfter() {
  return (
    <section className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-xs tracking-widest uppercase mb-3">Transformations</p>
          <h2 className="text-4xl md:text-5xl font-black">Before & After</h2>
          <p className="text-muted mt-3 text-sm">Drag the gold handle to reveal</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PAIRS.map((pair, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Slider {...pair} />
            </motion.div>
          ))}
        </div>
        {/* TODO: Replace PAIRS with your real before/after photos in /public/images/before/ and /public/images/after/ */}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page**

Edit `src/app/page.tsx`:

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import OurWork from '@/components/OurWork'
import BeforeAfter from '@/components/BeforeAfter'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <OurWork />
      <BeforeAfter />
    </main>
  )
}
```

- [ ] **Step 3: Verify**

Expected: Two side-by-side sliders. Drag the gold circle handle left/right to reveal before/after. Works on mobile touch.

- [ ] **Step 4: Commit**

```bash
git add src/components/BeforeAfter.tsx src/app/page.tsx
git commit -m "feat: before/after drag-to-reveal slider"
```

---

## Task 8: Testimonials

**Files:**
- Create: `src/components/Testimonials.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write Testimonials**

Write `src/components/Testimonials.tsx`:

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TESTIMONIALS } from '@/lib/tokens'

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-gold text-sm">★</span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let paused = false
    track.addEventListener('mouseenter', () => { paused = true })
    track.addEventListener('mouseleave', () => { paused = false })

    let frame: number
    let x = 0
    const speed = 0.4
    const step = () => {
      if (!paused && track) {
        x -= speed
        const halfWidth = track.scrollWidth / 2
        if (Math.abs(x) >= halfWidth) x = 0
        track.style.transform = `translateX(${x}px)`
      }
      frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [])

  const doubled = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <section className="py-24 bg-[#0d0d0d] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-gold text-xs tracking-widest uppercase mb-3">Reviews</p>
          <h2 className="text-4xl md:text-5xl font-black">What Clients Say</h2>
        </motion.div>
      </div>

      <div ref={trackRef} className="flex gap-6 w-max">
        {doubled.map((t, i) => (
          <div
            key={i}
            className="w-80 flex-shrink-0 bg-surface border-l-2 border-gold p-6 rounded-r-lg"
          >
            <Stars count={t.stars} />
            <p className="text-muted text-sm leading-relaxed mt-3 mb-4">"{t.quote}"</p>
            <p className="text-gold text-xs font-bold tracking-wider uppercase">— {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page**

Edit `src/app/page.tsx`:

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import OurWork from '@/components/OurWork'
import BeforeAfter from '@/components/BeforeAfter'
import Testimonials from '@/components/Testimonials'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <OurWork />
      <BeforeAfter />
      <Testimonials />
    </main>
  )
}
```

- [ ] **Step 3: Verify**

Expected: Cards scroll continuously left. Pauses when hovered.

- [ ] **Step 4: Commit**

```bash
git add src/components/Testimonials.tsx src/app/page.tsx
git commit -m "feat: auto-scrolling testimonials carousel"
```

---

## Task 9: About Section

**Files:**
- Create: `src/components/About.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write About**

Write `src/components/About.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'

const BADGES = [
  { icon: '✓', label: 'Fully Insured' },
  { icon: '★', label: '5-Star Rated' },
  { icon: '📍', label: 'Mobile Service' },
]

export default function About() {
  return (
    <section className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="aspect-[4/3] rounded-lg overflow-hidden bg-surface-2 border border-white/5"
        >
          <img
            src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&q=80"
            alt="Precision Detail at work"
            className="w-full h-full object-cover"
          />
          {/* TODO: Replace with /public/images/about.jpg */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="text-gold text-xs tracking-widest uppercase mb-4">Our Story</p>
          <h2 className="text-4xl md:text-5xl font-black mb-6">About Us</h2>
          <p className="text-muted leading-relaxed mb-4">
            Precision Detail was built on one simple belief: your car deserves the same level of care you give everything else you love. We bring professional-grade detailing directly to your door in Kannapolis and the surrounding area.
          </p>
          <p className="text-muted leading-relaxed mb-10">
            Every detail matters to us — from the conditioning of your leather seats to the shine on your rims. We don't cut corners, we don't rush, and we don't leave until it's perfect.
          </p>
          <div className="flex gap-4 flex-wrap">
            {BADGES.map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-2 bg-surface border border-gold/20 rounded px-4 py-2"
              >
                <span className="text-gold">{b.icon}</span>
                <span className="text-sm text-white/80 font-medium">{b.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page**

Edit `src/app/page.tsx`:

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import OurWork from '@/components/OurWork'
import BeforeAfter from '@/components/BeforeAfter'
import Testimonials from '@/components/Testimonials'
import About from '@/components/About'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <OurWork />
      <BeforeAfter />
      <Testimonials />
      <About />
    </main>
  )
}
```

- [ ] **Step 3: Verify**

Expected: Two-column layout — photo on left slides in, text on right slides in. 3 trust badges at bottom. On mobile stacks vertically.

- [ ] **Step 4: Commit**

```bash
git add src/components/About.tsx src/app/page.tsx
git commit -m "feat: about section with trust badges"
```

---

## Task 10: FAQ Accordion

**Files:**
- Create: `src/components/FAQ.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write FAQ**

Write `src/components/FAQ.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FAQ_ITEMS } from '@/lib/tokens'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 px-6 bg-[#0d0d0d]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-xs tracking-widest uppercase mb-3">Common Questions</p>
          <h2 className="text-4xl md:text-5xl font-black">FAQ</h2>
        </motion.div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="border border-white/5 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center px-6 py-5 text-left hover:bg-surface transition-colors"
              >
                <span className="font-medium text-white/90">{item.q}</span>
                <span className={`text-gold text-xl transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-6 pb-5 text-muted text-sm leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page**

Edit `src/app/page.tsx`:

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import OurWork from '@/components/OurWork'
import BeforeAfter from '@/components/BeforeAfter'
import Testimonials from '@/components/Testimonials'
import About from '@/components/About'
import FAQ from '@/components/FAQ'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <OurWork />
      <BeforeAfter />
      <Testimonials />
      <About />
      <FAQ />
    </main>
  )
}
```

- [ ] **Step 3: Verify**

Expected: 5 accordion items. Click any → answer expands with smooth animation, `+` rotates to `×`. Only one open at a time.

- [ ] **Step 4: Commit**

```bash
git add src/components/FAQ.tsx src/app/page.tsx
git commit -m "feat: FAQ accordion with animated expand/collapse"
```

---

## Task 11: Booking Section

**Files:**
- Create: `src/components/Booking.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write Booking**

Write `src/components/Booking.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'

const CONTACT = [
  {
    icon: '📞',
    label: 'Call Us',
    value: '704-960-5602',
    href: 'tel:7049605602',
  },
  {
    icon: '✉',
    label: 'Email',
    value: 'percisiondetail23@gmail.com',
    href: 'mailto:percisiondetail23@gmail.com',
  },
  {
    icon: '📷',
    label: 'Instagram',
    value: '@precision_detail.pro',
    href: 'https://instagram.com/precision_detail.pro',
  },
]

export default function Booking() {
  return (
    <section id="booking" className="py-24 px-6 bg-surface border-t border-gold/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-xs tracking-widest uppercase mb-3">Ready to Book?</p>
          <h2 className="text-4xl md:text-5xl font-black">Book Your Detail</h2>
          <p className="text-muted mt-3">Select your package and preferred date below</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Booking widget — 2/3 width */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 rounded-lg overflow-hidden border border-gold/20"
            style={{ minHeight: 600 }}
          >
            {/* TODO: swap src to new booking system when migrating off fieldd.co */}
            <iframe
              src="https://precisiondetailllc.fieldd.co/"
              className="w-full"
              style={{ height: 600, border: 'none', background: '#0a0a0a' }}
              title="Book a Detail"
            />
          </motion.div>

          {/* Contact sidebar — 1/3 width */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <p className="text-muted text-sm mb-2">Prefer to reach out directly?</p>
            {CONTACT.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-start gap-4 bg-[#0a0a0a] border border-white/5 rounded-lg p-4 hover:border-gold/40 transition-colors group"
              >
                <span className="text-2xl">{c.icon}</span>
                <div>
                  <p className="text-xs text-gold tracking-wider uppercase font-bold mb-1">{c.label}</p>
                  <p className="text-white/70 text-sm group-hover:text-white transition-colors">{c.value}</p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page**

Edit `src/app/page.tsx`:

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import OurWork from '@/components/OurWork'
import BeforeAfter from '@/components/BeforeAfter'
import Testimonials from '@/components/Testimonials'
import About from '@/components/About'
import FAQ from '@/components/FAQ'
import Booking from '@/components/Booking'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <OurWork />
      <BeforeAfter />
      <Testimonials />
      <About />
      <FAQ />
      <Booking />
    </main>
  )
}
```

- [ ] **Step 3: Verify**

Expected: fieldd.co booking widget loads in iframe (left). Phone, email, Instagram contact cards on the right. Clicking "Book Now" anywhere on the page scrolls here.

- [ ] **Step 4: Commit**

```bash
git add src/components/Booking.tsx src/app/page.tsx
git commit -m "feat: booking section with fieldd.co iframe embed"
```

---

## Task 12: Footer

**Files:**
- Create: `src/components/Footer.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write Footer**

Write `src/components/Footer.tsx`:

```tsx
export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-gold font-black tracking-widest text-sm uppercase">Precision Detail</p>
          <p className="text-muted text-xs mt-1">Premium Mobile Auto Detailing · Kannapolis, NC</p>
        </div>
        <div className="flex gap-6 text-muted text-sm">
          <a href="tel:7049605602" className="hover:text-gold transition-colors">704-960-5602</a>
          <a
            href="https://instagram.com/precision_detail.pro"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold transition-colors"
          >
            Instagram
          </a>
        </div>
        <p className="text-muted/40 text-xs">© {new Date().getFullYear()} Precision Detail. All rights reserved.</p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Add to page (final page.tsx)**

Write the complete final `src/app/page.tsx`:

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import OurWork from '@/components/OurWork'
import BeforeAfter from '@/components/BeforeAfter'
import Testimonials from '@/components/Testimonials'
import About from '@/components/About'
import FAQ from '@/components/FAQ'
import Booking from '@/components/Booking'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <OurWork />
      <BeforeAfter />
      <Testimonials />
      <About />
      <FAQ />
      <Booking />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 3: Verify full page**

```bash
npm run dev
```

Walk the full page top to bottom. Verify every "Book Now" button scrolls to `#booking`. Verify mobile layout at 375px width.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.tsx src/app/page.tsx
git commit -m "feat: footer and complete page assembly"
```

---

## Task 13: Polish Pass

**Files:** All component files (review-only, targeted edits)

> Before this task: invoke `impeccable` and `emil-design-eng` skills for a design review pass.

- [ ] **Step 1: Run build to catch type errors**

```bash
npm run build
```

Expected: Build succeeds with `output: export`. Fix any TypeScript errors before continuing.

- [ ] **Step 2: Check mobile layout**

In browser devtools, test at 375px (iPhone SE), 390px (iPhone 14), 768px (iPad). Fix any overflow, font-size, or spacing issues.

- [ ] **Step 3: Verify smooth scroll**

Click every "Book Now" / "Book This Package" button. Each must smoothly scroll to `#booking`. If any don't, check that `scrollToSection('booking')` is called.

- [ ] **Step 4: Test iframe**

Verify `https://precisiondetailllc.fieldd.co/` loads in the booking section iframe. If blocked by X-Frame-Options, note it in a `<!-- TODO: fieldd.co may block iframe embeds — test in production -->` comment and leave a visible "Book Now" external link as fallback:

```tsx
<a
  href="https://precisiondetailllc.fieldd.co/"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block bg-gold text-black font-bold px-8 py-4 rounded tracking-widest uppercase hover:bg-yellow-400 transition-colors"
>
  Open Booking →
</a>
```

- [ ] **Step 5: Commit polish**

```bash
git add -A
git commit -m "polish: mobile fixes and iframe fallback"
```

---

## Task 14: GitHub Pages Deploy

**Files:**
- `.github/workflows/deploy.yml` (already written in Task 1)

- [ ] **Step 1: Verify build produces `out/` directory**

```bash
npm run build
ls out/
```

Expected: `out/` directory with `index.html` and static assets.

- [ ] **Step 2: Enable GitHub Pages in repo settings**

Go to repo Settings → Pages → Source: `gh-pages` branch, `/ (root)`.

- [ ] **Step 3: Push to trigger deploy**

```bash
git push origin main
```

Then go to the repo's Actions tab and watch the `Deploy to GitHub Pages` workflow run.

- [ ] **Step 4: Verify live site**

Open `https://<your-github-username>.github.io/Precison/` in a browser.

Expected: Full site loads, all sections visible, booking iframe renders.

- [ ] **Step 5: Commit any final fixes**

```bash
git add -A
git commit -m "chore: verify GitHub Pages deploy"
git push origin main
```
