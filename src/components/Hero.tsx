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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-8 bg-gold/60" />
          <p className="label-gold">Premium Mobile Detailing &nbsp;·&nbsp; Kannapolis, NC</p>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="font-display text-6xl md:text-8xl font-light leading-[0.95] mb-8 max-w-2xl"
        >
          Your Car<br />
          Deserves{' '}
          <em className="text-gold not-italic">the Best</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-white/50 text-base font-sans tracking-wide mb-10 max-w-sm"
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
            className="bg-gold text-black font-sans font-semibold px-8 py-3.5 rounded-sm tracking-[0.15em] text-xs uppercase hover:bg-yellow-400 transition-all duration-200 gold-glow hover:gold-glow"
          >
            Book Now
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="border border-white/20 text-white/60 font-sans px-8 py-3.5 rounded-sm text-xs tracking-[0.15em] uppercase hover:border-gold/60 hover:text-gold/80 transition-all duration-200"
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
