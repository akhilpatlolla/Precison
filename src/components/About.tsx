'use client'

import { motion } from 'framer-motion'

const BADGES = [
  { icon: '✓', label: 'Fully Insured' },
  { icon: '★', label: '5-Star Rated' },
  { icon: '📍', label: 'Mobile Service' },
]

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6 bg-[#0a0a0a] section-glow-left">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="aspect-[4/3] rounded-lg overflow-hidden bg-surface border border-white/5"
        >
          <img
            src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&q=80"
            alt="Precision Detail professional at work"
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
          <p className="label-gold mb-4">Our Story</p>
          <h2 className="font-display text-5xl md:text-6xl font-light mb-6">About Us</h2>
          <p className="text-muted leading-relaxed mb-4">
            Precision Detail was built on one simple belief: your car deserves the same level of care you give everything else you love. We bring professional-grade detailing directly to your door in Kannapolis and the surrounding area.
          </p>
          <p className="text-muted leading-relaxed mb-10">
            Every detail matters to us — from the conditioning of your leather seats to the shine on your rims. We don&apos;t cut corners, we don&apos;t rush, and we don&apos;t leave until it&apos;s perfect.
          </p>
          <div className="flex gap-4 flex-wrap">
            {BADGES.map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-2 bg-surface border border-gold/20 rounded px-4 py-2"
              >
                <span className="text-gold" aria-hidden="true">{b.icon}</span>
                <span className="text-sm text-white/80 font-medium">{b.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
