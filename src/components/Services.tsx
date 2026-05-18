'use client'

import { motion } from 'framer-motion'
import { PACKAGES } from '@/lib/tokens'
import { scrollToSection } from '@/lib/scrollTo'

const CHECK = '✓'

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-xs tracking-widest uppercase mb-3">What We Offer</p>
          <h2 className="text-4xl md:text-5xl font-black">Our Packages</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative flex flex-col rounded-lg p-8 ${
                pkg.highlight
                  ? 'bg-[#1a1208] border border-gold/40'
                  : 'bg-surface border border-white/5'
              }`}
            >
              {pkg.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-black text-xs font-bold px-4 py-1 rounded-full tracking-wider uppercase">
                  Most Popular
                </span>
              )}
              <p className="text-gold text-xs tracking-widest uppercase mb-2">{pkg.tagline}</p>
              <h3 className="text-2xl font-black mb-6">{pkg.name}</h3>
              <ul className="flex-1 space-y-3 mb-8">
                {pkg.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-muted">
                    <span className="text-gold mt-0.5">{CHECK}</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => scrollToSection('booking')}
                className={`w-full py-3 rounded text-sm font-bold tracking-widest uppercase transition-colors ${
                  pkg.highlight
                    ? 'bg-gold text-black hover:bg-yellow-400'
                    : 'border border-gold/40 text-gold hover:bg-gold/10'
                }`}
              >
                Book This Package ↓
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
