# Precision Detail Website — Design Spec

## Overview

A one-page parallax landing page for **Precision Detail**, a premium mobile auto detailing business in Kannapolis, NC. Built as a showcase/proposal for the business owner, deployable to GitHub Pages now and migratable to Squarespace or a custom domain later.

## Goals

- Replace the existing Squarespace site with a visually striking dark luxury design
- Demonstrate the quality of the business through cinematic visuals and polished UI
- Drive bookings via a seamless in-page experience — no navigation away from the site
- Provide real photos/video from the business owner; Unsplash placeholders for any gaps

## Tech Stack

- **Framework:** Next.js 14 (App Router) with `output: 'export'` for static GitHub Pages deploy
- **Styling:** Tailwind CSS with custom dark luxury design tokens
- **Animations:** Framer Motion (parallax, scroll-triggered entrances, micro-interactions)
- **Deployment:** GitHub Pages via GitHub Actions
- **Design polish skills:** `impeccable`, `high-end-visual-design`, `emil-design-eng`, `design-taste-frontend`

## Design Language

### Colors
| Token | Value | Usage |
|---|---|---|
| `gold` | `#c9a84c` | Accents, CTAs, borders, headings |
| `gold-dim` | `#c9a84c33` | Subtle borders, card backgrounds |
| `black` | `#0a0a0a` | Page background |
| `surface` | `#141414` | Card backgrounds |
| `surface-2` | `#1a1a1a` | Nested surfaces |
| `white` | `#ffffff` | Primary text |
| `muted` | `#888888` | Secondary text |

### Typography
- Headlines: `font-black` (800), letter-spacing tight
- Labels/tags: uppercase, `tracking-widest`, small size
- Body: `font-normal`, relaxed line-height

### Motion Principles
- Sections fade + slide up on scroll entry (Framer Motion `whileInView`)
- Staggered children animations on cards/grids
- Hero video parallax: background scrolls at 0.4x speed
- Nav: blur backdrop (`backdrop-blur-md`) on scroll, transparent at top
- Hover states: gold border glow, subtle scale on cards

## Page Structure

Single page, 8 sections + sticky nav + footer. All "Book Now" CTAs smooth-scroll to `#booking`.

### Navigation (Sticky)
- Transparent at top of page, `bg-black/90 backdrop-blur-md` after scrolling 80px
- Left: `PRECISION DETAIL` logo in gold
- Right: `Services`, `Gallery`, `Book Now` (gold pill button → scrolls to `#booking`)

### ① Hero
- **Background:** User's video (`/public/video/hero.mp4`) — `autoPlay muted loop playsInline`, dark overlay (`bg-black/60`)
- **Content:** Gold label ("PREMIUM MOBILE DETAILING · KANNAPOLIS, NC"), white headline ("Your Car Deserves the Best"), muted subtext, two CTAs:
  - Primary: "BOOK NOW" gold button → smooth scroll `#booking`
  - Secondary: "View Services" outline button → smooth scroll `#services`
- **Effect:** Hero content parallax — content scrolls at 0.85x speed via Framer Motion `useScroll`

### ② Services
- Section heading: "OUR PACKAGES" gold label + white title
- Three cards: **Interior**, **Wash & Wax**, **Full Detail** (highlighted as "Most Popular")
- Each card: icon, package name, features list, price placeholder, "Book This Package ↓" button → scrolls `#booking`
- Full Detail card has gold border + subtle gold background tint

### ③ Our Work
- Section heading: "OUR WORK" label
- Masonry or 3-column responsive grid of user's standalone photos
- Each photo card: image fills card, on hover → gold border glow + caption overlay slides up with dark gradient
- Framer Motion staggered entrance on scroll

### ④ Before & After
- Section heading: "BEFORE & AFTER"
- Drag-to-reveal slider component: two images overlaid, gold vertical divider handle, drag left/right
- Touch-enabled (pointer events)
- Multiple pairs if user provides more than one set

### ⑤ Testimonials
- Section heading: "WHAT CLIENTS SAY"
- Auto-scrolling carousel (no user interaction required), pauses on hover
- Each card: quote text, client name, star rating (5 gold stars), gold left border
- 3 placeholder testimonials (easily swappable)

### ⑥ About
- Two-column layout: left = photo placeholder, right = brand story text + trust badges
- Trust badges: "✓ Fully Insured", "★ 5-Star Rated", "📍 Mobile Service"
- Framer Motion entrance: photo slides from left, text slides from right

### ⑦ FAQ
- Accordion, 5 questions:
  1. How long does a full detail take?
  2. Do you need water or electricity access?
  3. What areas do you serve?
  4. Do you bring your own supplies?
  5. How far in advance should I book?
- Gold `+` / `−` toggle, smooth height animation on open/close

### ⑧ Booking (`id="booking"`)
- Two-column layout:
  - **Left (2/3 width):** `<iframe src="https://precisiondetailllc.fieldd.co/" />` — full booking widget embedded
    - Code comment: `{/* TODO: swap src when migrating off fieldd.co */}`
  - **Right (1/3 width):** Contact info cards — Phone (click-to-call), Email (mailto), Instagram (external link)
- Section has gold top border accent
- Background slightly lighter than page (`bg-surface`) to make it feel like a destination

### Footer
- Logo, tagline, location (Kannapolis, NC)
- Social links: Instagram
- Copyright line

## Booking Flow

Every "Book Now" / "Book This Package" button uses:
```tsx
onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
```
No routing, no page transitions — purely in-page scroll.

## Asset Placeholders

| Location | Placeholder | Replace With |
|---|---|---|
| `/public/video/hero.mp4` | None — user must provide | User's detailing video |
| `/public/images/work/*.jpg` | Unsplash car detailing photos | User's standalone photos |
| `/public/images/before/*.jpg` | Unsplash dirty car | User's before photos |
| `/public/images/after/*.jpg` | Unsplash clean car | User's after photos |
| `/public/images/about.jpg` | Unsplash detailing shot | User's photo |

## GitHub Pages Deploy

- `next.config.js`: `output: 'export'`, `basePath: '/Precison'` (repo name)
- GitHub Actions workflow: build on push to `main`, deploy `out/` to `gh-pages` branch
- URL: `https://c-akhilreddy.patlolla.github.io/Precison/`

## Migration Path

When moving off GitHub Pages:
1. Remove `basePath` from `next.config.js`
2. Deploy `out/` to any static host, OR convert to Vercel/Netlify
3. Swap `<iframe src>` in Booking section to new booking system
