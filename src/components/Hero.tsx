'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { scrollToSection } from '@/lib/scrollTo'
import { useBooking } from '@/lib/bookingContext'
import { Magnetic, EASE } from '@/lib/motion'

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false })
const HeroMontage = dynamic(() => import('./HeroMontage'), { ssr: false })

/* Word-by-word mask reveal */
function MaskedLine({ words, delay, className }: { words: { text: string; gradient?: boolean }[]; delay: number; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.08em] -mb-[0.08em] ${className ?? ''}`}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: '115%', rotate: 2.5 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ duration: 1.1, delay: delay + i * 0.08, ease: EASE }}
          className={`inline-block whitespace-pre origin-left ${w.gradient ? 'text-gradient' : ''}`}
        >
          {w.text}
        </motion.span>
      ))}
    </span>
  )
}

export default function Hero() {
  const { openModal } = useBooking()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '32%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  return (
    <section ref={ref} className="relative h-screen min-h-[640px] flex items-center overflow-hidden">
      {/* Background: cinematic montage of real work (or hero.mp4 if present) */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0 will-change-transform">
        <HeroMontage />

        {/* Cinematic grading: vignette + brand glow + bottom blend */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 90% 70% at 30% 40%, transparent 0%, rgb(0 0 0 / 0.55) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 45% at 70% 20%, rgb(var(--brand-rgb) / 0.10) 0%, transparent 70%)' }} />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-base to-transparent" />
      </motion.div>

      {/* 3D particle ambience */}
      <div className="absolute inset-0 z-[1]">
        <HeroCanvas />
      </div>

      {/* Copy */}
      <motion.div
        style={{ opacity, y: contentY }}
        className="relative z-10 max-w-6xl mx-auto px-6 pt-16 w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          className="flex items-center gap-3 mb-7"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
            className="h-px w-10 bg-gold/70 origin-left"
          />
          <p className="label-gold">Premium Mobile Detailing &nbsp;·&nbsp; Kannapolis, NC</p>
        </motion.div>

        <h1 className="font-display text-white text-6xl md:text-8xl font-light leading-[0.95] mb-8 max-w-2xl [text-shadow:0_2px_24px_rgb(0_0_0/0.45)]">
          <MaskedLine delay={0.35} words={[{ text: 'Your ' }, { text: 'Car' }]} />
          <MaskedLine
            delay={0.55}
            words={[{ text: 'Deserves ' }, { text: 'the Best', gradient: true }]}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.95, ease: EASE }}
          className="text-white/55 text-base font-sans tracking-wide mb-11 max-w-sm"
        >
          We come to you. Showroom shine, every time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
          className="flex gap-4 flex-wrap"
        >
          <Magnetic strength={0.25}>
            <button
              onClick={openModal}
              className="btn-shine bg-gold text-white font-sans font-semibold px-9 py-4 rounded-sm tracking-[0.15em] text-xs uppercase hover:bg-gold-bright transition-colors duration-300 gold-glow"
            >
              Book Now
            </button>
          </Magnetic>
          <Magnetic strength={0.2}>
            <button
              onClick={() => scrollToSection('services')}
              className="glass text-white/70 font-sans px-9 py-4 rounded-sm text-xs tracking-[0.15em] uppercase hover:text-white hover:border-gold/50 transition-all duration-300"
            >
              View Services
            </button>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Scroll cue: animated line */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-white/35 text-[10px] tracking-[0.35em] uppercase">Scroll</span>
        <div className="relative w-px h-14 bg-white/10 overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent via-gold to-transparent"
          />
        </div>
      </motion.div>
    </section>
  )
}
