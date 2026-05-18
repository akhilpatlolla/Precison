'use client'

import { useEffect, useState } from 'react'
import { scrollToSection } from '@/lib/scrollTo'
import { useBooking } from '@/lib/bookingContext'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { openModal } = useBooking()

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
        <img
          src="/Precison/images/logo.webp"
          alt="Precision Detail"
          className="h-14 w-auto"
          style={{ filter: 'invert(1)', mixBlendMode: 'screen' }}
        />
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
            onClick={openModal}
            className="bg-gold text-black text-xs font-bold px-5 py-2 rounded tracking-widest uppercase hover:bg-yellow-400 transition-colors"
          >
            Book Now
          </button>
        </div>
        <button
          onClick={openModal}
          className="md:hidden bg-gold text-black text-xs font-bold px-4 py-2 rounded tracking-widest uppercase"
        >
          Book
        </button>
      </div>
    </nav>
  )
}
