'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { scrollToSection } from '@/lib/scrollTo'
import { useBooking } from '@/lib/bookingContext'

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <img
            src="/Precison/images/logo.webp"
            alt="Precision Detail"
            className="h-14 w-auto"
            style={{ filter: 'invert(1)', mixBlendMode: 'screen' }}
          />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.slice(0, 2).map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-muted hover:text-white text-sm tracking-wide transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={openModal}
              className="bg-gold text-black text-xs font-semibold px-5 py-2 rounded-sm tracking-[0.15em] uppercase hover:bg-yellow-400 transition-colors gold-glow"
            >
              Book Now
            </button>
          </div>

          {/* Mobile: hamburger + book */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={openModal}
              className="bg-gold text-black text-xs font-semibold px-4 py-2 rounded-sm tracking-[0.15em] uppercase"
            >
              Book
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex flex-col gap-1.5 p-2"
            >
              <span className="w-5 h-px bg-white/70 block" />
              <span className="w-5 h-px bg-white/70 block" />
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

            {/* Drawer panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.32, ease: [0.32, 0, 0.08, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-72 bg-[#0d0d0d] border-l border-white/5 flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-white/5">
                <p className="font-display text-gold text-base font-light tracking-[0.15em] uppercase">Menu</p>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors"
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
                    className="text-left py-3 border-b border-white/5 last:border-0"
                  >
                    <span className="font-display text-2xl font-light text-white/80 hover:text-white transition-colors">
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
                  className="w-full bg-gold text-black font-semibold text-xs py-4 rounded-sm tracking-[0.15em] uppercase hover:bg-yellow-400 transition-colors gold-glow"
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
