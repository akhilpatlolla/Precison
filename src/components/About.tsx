'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ShieldCheck, Star, MapPin } from '@phosphor-icons/react'
import { EASE } from '@/lib/motion'

const BADGES = [
  { Icon: ShieldCheck, label: 'Fully Insured' },
  { Icon: Star, label: '5-Star Rated' },
  { Icon: MapPin, label: 'Mobile Service' },
]

export default function About() {
  const imgRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section id="about" className="relative py-28 px-6 bg-base section-glow-left">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -48, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1, ease: EASE }}
          className="relative"
        >
          {/* Offset accent frame */}
          <div
            aria-hidden="true"
            className="absolute -top-4 -left-4 right-8 bottom-8 border border-gold/25 rounded-lg pointer-events-none"
          />
          {/* Parallax image */}
          <div ref={imgRef} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-surface border border-ink/10 shadow-[0_32px_64px_-24px_rgb(0_0_0/0.7)]">
            <motion.img
              style={{ y }}
              src="/Precison/images/work/IMG_3448.jpeg"
              alt="Interior conditioning by Precision Detail"
              className="w-full h-[120%] object-cover scale-110 will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 48, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1, delay: 0.12, ease: EASE }}
          className="relative"
        >
          <div className="relative flex items-center gap-4 mb-4">
            <span aria-hidden="true" className="w-2 h-2 rotate-45 bg-gold/70 shrink-0" />
            <span className="h-px w-10 bg-gold/50" />
            <p className="label-gold">Our Story</p>
          </div>
          <h2 className="relative font-display text-5xl md:text-7xl font-light mb-6">
            About <em className="not-italic text-gradient">Us</em>
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            Precision Detail was built on one simple belief: your car deserves the same level of care you give everything else you love. We bring professional-grade detailing directly to your door in Kannapolis and the surrounding area.
          </p>
          <p className="text-muted leading-relaxed mb-10">
            Every detail matters to us, from the conditioning of your leather seats to the shine on your rims. We don&apos;t cut corners, we don&apos;t rush, and we don&apos;t leave until it&apos;s perfect.
          </p>
          <div className="flex gap-4 flex-wrap">
            {BADGES.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: EASE }}
                className="lift flex items-center gap-2 bg-surface border border-gold/30 rounded-full px-5 py-2.5"
              >
                <b.Icon className="text-gold" size={18} weight="fill" aria-hidden="true" />
                <span className="text-sm text-ink/80 font-medium">{b.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
