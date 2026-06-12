'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBooking } from '@/lib/bookingContext'
import { lockScroll, unlockScroll } from '@/lib/lenis'

const CONTACT = [
  { icon: '📞', label: 'Call', value: '704-960-5602', href: 'tel:7049605602' },
  { icon: '✉', label: 'Email', value: 'percisiondetail23@gmail.com', href: 'mailto:percisiondetail23@gmail.com' },
]

export default function BookingModal() {
  const { isOpen, closeModal } = useBooking()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      lockScroll()
    } else {
      document.body.style.overflow = ''
      unlockScroll()
    }
    return () => { document.body.style.overflow = ''; unlockScroll() }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeModal])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-center justify-center px-4 md:px-10 [perspective:1200px]"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
        >
          {/* Backdrop — semi-transparent so desktop video bleeds through */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          {/* 3D entrance: panel swings up from depth like a card being dealt */}
          <motion.div
            initial={{ opacity: 0, y: 60, z: -160, rotateX: 14, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, z: 0, rotateX: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, z: -120, rotateX: 10, scale: 0.96 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative z-10 w-full max-w-2xl will-change-transform"
          >
            {/* Header row */}
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-gold text-xs tracking-widest uppercase mb-1">Ready to Book?</p>
                <h2 className="font-display text-white text-3xl md:text-4xl font-light leading-tight">
                  Book Your <em className="not-italic text-gradient">Detail</em>
                </h2>
              </div>
              <button
                onClick={closeModal}
                aria-label="Close booking"
                className="text-white/50 hover:text-white transition-colors w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 text-lg mb-1"
              >
                ✕
              </button>
            </div>

            {/* iframe panel */}
            <div
              className="rounded-lg overflow-hidden border border-gold/25 bg-white"
              style={{ height: 'min(70vh, 580px)' }}
            >
              <iframe
                src="https://precisiondetailllc.fieldd.co/"
                className="w-full h-full"
                style={{ border: 'none', background: '#ffffff', colorScheme: 'light' }}
                title="Book a Detail with Precision Detail"
                loading="lazy"
              />
            </div>

            {/* Quick contact strip */}
            <div className="flex gap-3 mt-3">
              {CONTACT.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/40 rounded px-4 py-2 transition-colors text-sm text-white/70 hover:text-white"
                >
                  <span>{c.icon}</span>
                  <span>{c.value}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
