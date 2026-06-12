'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { scrollToSection } from '@/lib/scrollTo'
import { useBooking } from '@/lib/bookingContext'
import { lockScroll, unlockScroll } from '@/lib/lenis'
import { useTheme } from '@/lib/theme'
import { Sun, MoonStars } from '@phosphor-icons/react'

const NAV_LINKS = [
  { label: 'Services', id: 'services' },
  { label: 'Our Work', id: 'gallery' },
  { label: 'Before & After', id: 'before-after' },
  { label: 'Reviews', id: 'reviews' },
  { label: 'About', id: 'about' },
  { label: 'FAQ', id: 'faq' },
  { label: 'Contact', id: 'contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { openModal } = useBooking()
  const { theme, toggle } = useTheme()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 22, restDelta: 0.001 })

  // Over the dark hero (not scrolled) the chrome logo + light text read best;
  // once the themed bar appears, swap to the blue logo in light mode.
  const overHero = !scrolled
  const logoSrc = overHero || theme === 'dark'
    ? '/Precison/images/logo-bright.png'
    : '/Precison/images/logo-blue.png'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    if (menuOpen) lockScroll()
    else unlockScroll()
    return () => { document.body.style.overflow = ''; unlockScroll() }
  }, [menuOpen])

  function handleNavLink(id: string) {
    setMenuOpen(false)
    setTimeout(() => scrollToSection(id), 300)
  }

  function handleBooking() {
    setMenuOpen(false)
    setTimeout(() => openModal(), 300)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-base/75 backdrop-blur-xl backdrop-saturate-150 border-b border-ink/10 shadow-[0_8px_32px_-16px_rgb(0_0_0/0.35)]'
            : 'bg-transparent'
        }`}
      >
        {/* Scroll progress */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute top-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-gold/40 via-gold to-gold-bright"
        />
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Chrome logo lockup — trimmed + brightened version of the original mark */}
          <a
            href="#"
            aria-label="Precision Detail — back to top"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="block shrink-0"
          >
            <img
              src={logoSrc}
              alt="Precision Detail"
              className="h-12 md:h-14 w-auto drop-shadow-[0_0_14px_rgb(var(--brand-rgb)/0.3)] transition-transform duration-500 hover:scale-105"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.slice(0, 2).map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-sm tracking-wide transition-colors ${
                  overHero ? 'text-white/60 hover:text-white' : 'text-muted hover:text-ink'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={toggle}
              aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
              className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-300 ${
                overHero
                  ? 'border-white/20 text-white/70 hover:text-white hover:border-white/50'
                  : 'border-ink/15 text-muted hover:text-gold hover:border-gold/50'
              }`}
            >
              {theme === 'light' ? <MoonStars size={16} weight="fill" /> : <Sun size={16} weight="fill" />}
            </button>
            <button
              onClick={openModal}
              className="bg-gold text-white text-xs font-semibold px-5 py-2 rounded-sm tracking-[0.15em] uppercase hover:bg-gold-bright transition-colors gold-glow"
            >
              Book Now
            </button>
          </div>

          {/* Mobile: theme + hamburger + book */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggle}
              aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
              className={`w-8 h-8 flex items-center justify-center rounded-full border transition-colors ${
                overHero ? 'border-white/20 text-white/70' : 'border-ink/15 text-muted'
              }`}
            >
              {theme === 'light' ? <MoonStars size={14} weight="fill" /> : <Sun size={14} weight="fill" />}
            </button>
            <button
              onClick={openModal}
              className="bg-gold text-white text-xs font-semibold px-4 py-2 rounded-sm tracking-[0.15em] uppercase"
            >
              Book
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex flex-col gap-1.5 p-2"
            >
              <span className={`w-5 h-px block ${overHero ? 'bg-white/70' : 'bg-ink/70'}`} />
              <span className={`w-5 h-px block ${overHero ? 'bg-white/70' : 'bg-ink/70'}`} />
              <span className="w-3 h-px bg-gold block" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer panel — swings in with 3D depth */}
            <motion.div
              initial={{ x: '100%', rotateY: -16, transformPerspective: 1400, opacity: 0.6 }}
              animate={{ x: 0, rotateY: 0, opacity: 1 }}
              exit={{ x: '100%', rotateY: -12, opacity: 0.6 }}
              transition={{ type: 'tween', duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'right center' }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-72 bg-surface border-l border-ink/10 flex flex-col will-change-transform"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-ink/10">
                <p className="font-display text-gold text-base font-light tracking-[0.15em] uppercase">Menu</p>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-8 h-8 flex items-center justify-center text-muted hover:text-ink transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 flex flex-col justify-center px-6 gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.25 }}
                    onClick={() => handleNavLink(link.id)}
                    className="text-left py-3 border-b border-ink/10 last:border-0"
                  >
                    <span className="font-display text-2xl font-light text-ink/80 hover:text-ink transition-colors">
                      {link.label}
                    </span>
                  </motion.button>
                ))}
              </nav>

              {/* Book Now CTA */}
              <div className="px-6 pb-10">
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.25 }}
                  onClick={handleBooking}
                  className="w-full bg-gold text-white font-semibold text-xs py-4 rounded-sm tracking-[0.15em] uppercase hover:bg-gold-bright transition-colors gold-glow"
                >
                  Book Now
                </motion.button>
                <p className="text-muted/50 text-xs text-center mt-4 tracking-wider">
                  Kannapolis, NC · 704-960-5602
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
