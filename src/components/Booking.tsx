'use client'

import { motion } from 'framer-motion'
import { Phone, EnvelopeSimple, InstagramLogo } from '@phosphor-icons/react'
import SectionHeader from './SectionHeader'

const CONTACT = [
  {
    Icon: Phone,
    label: 'Call Us',
    value: '704-960-5602',
    href: 'tel:7049605602',
  },
  {
    Icon: EnvelopeSimple,
    label: 'Email',
    value: 'percisiondetail23@gmail.com',
    href: 'mailto:percisiondetail23@gmail.com',
  },
  {
    Icon: InstagramLogo,
    label: 'Instagram',
    value: '@precision_detail.pro',
    href: 'https://www.instagram.com/precision_detail.pro',
  },
]

export default function Booking() {
  return (
    <section id="booking" className="py-24 px-6 bg-base2 border-t border-gold/20">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Reserve Your Spot"
          title={<>Book Your <em className="not-italic text-gradient">Detail</em></>}
          sub="Select your package and preferred date below"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Booking widget — 2/3 width */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 rounded-lg overflow-hidden border border-gold/20 shadow-[0_24px_48px_-24px_rgb(0_0_0/0.2)]"
          >
            {/* TODO: swap src to new booking system when migrating off fieldd.co */}
            {/* The external fieldd widget renders dark text, so it always sits on white */}
            <div className="relative bg-white" style={{ height: 600 }}>
              <iframe
                src="https://precisiondetailllc.fieldd.co/"
                className="w-full h-full"
                style={{ border: 'none', background: '#ffffff', colorScheme: 'light' }}
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
                className="absolute inset-0 flex-col items-center justify-center gap-4 bg-surface"
              >
                <p className="text-muted text-sm">Booking widget unavailable in this browser.</p>
                <a
                  href="https://precisiondetailllc.fieldd.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gold text-white font-bold px-8 py-4 rounded tracking-widest uppercase hover:bg-gold-bright transition-colors"
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
                className="lift flex items-start gap-4 bg-surface border border-ink/10 rounded-lg p-4 hover:border-gold/40"
              >
                <c.Icon className="text-gold mt-0.5" size={24} aria-hidden="true" />
                <div>
                  <p className="text-xs text-gold tracking-wider uppercase font-bold mb-1">{c.label}</p>
                  <p className="text-ink/70 text-sm group-hover:text-ink transition-colors">{c.value}</p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
