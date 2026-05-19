'use client'

import { motion } from 'framer-motion'

const CONTACT = [
  {
    icon: '📞',
    label: 'Call Us',
    value: '704-960-5602',
    href: 'tel:7049605602',
  },
  {
    icon: '✉',
    label: 'Email',
    value: 'percisiondetail23@gmail.com',
    href: 'mailto:percisiondetail23@gmail.com',
  },
  {
    icon: '📷',
    label: 'Instagram',
    value: '@precision_detail.pro',
    href: 'https://www.instagram.com/precision_detail.pro',
  },
]

export default function Booking() {
  return (
    <section id="booking" className="py-24 px-6 bg-surface border-t border-gold/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="label-gold mb-3">Ready to Book?</p>
          <h2 className="font-display text-5xl md:text-6xl font-light">Book Your Detail</h2>
          <p className="text-muted mt-3">Select your package and preferred date below</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Booking widget — 2/3 width */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 rounded-lg overflow-hidden border border-gold/20"
          >
            {/* TODO: swap src to new booking system when migrating off fieldd.co */}
            <div className="relative" style={{ height: 600 }}>
              <iframe
                src="https://precisiondetailllc.fieldd.co/"
                className="w-full h-full"
                style={{ border: 'none', background: '#0a0a0a' }}
                title="Book a Detail with Precision Detail"
                loading="lazy"
                onError={() => {
                  const el = document.getElementById('booking-fallback')
                  if (el) el.style.display = 'flex'
                }}
              />
              <div
                id="booking-fallback"
                style={{ display: 'none' }}
                className="absolute inset-0 flex-col items-center justify-center gap-4 bg-[#0a0a0a]"
              >
                <p className="text-muted text-sm">Booking widget unavailable in this browser.</p>
                <a
                  href="https://precisiondetailllc.fieldd.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gold text-black font-bold px-8 py-4 rounded tracking-widest uppercase hover:bg-yellow-400 transition-colors"
                >
                  Open Booking →
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact sidebar — 1/3 width */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <p className="text-muted text-sm mb-2">Prefer to reach out directly?</p>
            {CONTACT.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('https') ? '_blank' : undefined}
                rel={c.href.startsWith('https') ? 'noopener noreferrer' : undefined}
                className="flex items-start gap-4 bg-[#0a0a0a] border border-white/5 rounded-lg p-4 hover:border-gold/40 transition-colors group"
              >
                <span className="text-2xl" aria-hidden="true">{c.icon}</span>
                <div>
                  <p className="text-xs text-gold tracking-wider uppercase font-bold mb-1">{c.label}</p>
                  <p className="text-white/70 text-sm group-hover:text-white transition-colors">{c.value}</p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
