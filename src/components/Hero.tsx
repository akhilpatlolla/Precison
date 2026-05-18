'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { scrollToSection } from '@/lib/scrollTo'
import { useBooking } from '@/lib/bookingContext'

export default function Hero() {
  const { openModal } = useBooking()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        {/* Thumbnail fallback — visible when video hasn't loaded yet */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://video.squarespace-cdn.com/content/v1/67e9dca7f6055d56f94552ac/06e0dfed-8804-41b9-9548-0c1af1f3887c/thumbnail')`,
          }}
        />
        {/* TODO: drop your video file into public/video/hero.mp4 to enable the video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://video.squarespace-cdn.com/content/v1/67e9dca7f6055d56f94552ac/06e0dfed-8804-41b9-9548-0c1af1f3887c/thumbnail"
        >
          <source src="/Precison/video/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/65" />
      </motion.div>

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
            onClick={openModal}
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

      <motion.div
        aria-hidden="true"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/40 text-2xl"
      >
        ↓
      </motion.div>
    </section>
  )
}
