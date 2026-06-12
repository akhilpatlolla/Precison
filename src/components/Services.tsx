'use client'

import { motion } from 'framer-motion'
import { PACKAGES } from '@/lib/tokens'
import { useBooking } from '@/lib/bookingContext'
import { TiltCard, EASE } from '@/lib/motion'
import SectionHeader from './SectionHeader'

const CHECK = '✓'

/* Background photography per package — pulled from the portfolio */
const PKG_IMAGES: Record<string, { src: string; pos?: string }> = {
  interior: { src: '/Precison/images/work/IMG_3630.jpeg', pos: 'center 45%' },
  full: { src: '/Precison/images/work/IMG_1074.jpeg', pos: 'center 60%' },
  wash: { src: '/Precison/images/work/IMG_3664.jpeg', pos: 'center 50%' },
}

export default function Services() {
  const { openModal } = useBooking()
  return (
    <section id="services" className="relative py-28 px-6 bg-base section-glow">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="What We Offer"
          title={<>Our <em className="not-italic text-gradient">Packages</em></>}
          sub="Three levels of obsession — every one finished to showroom standard"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 [perspective:1400px] md:items-stretch">
          {PACKAGES.map((pkg, i) => {
            const img = PKG_IMAGES[pkg.id]
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 44, rotateX: -7 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.9, delay: i * 0.13, ease: EASE }}
                className={pkg.highlight ? 'md:-my-5 z-10' : ''}
              >
                <TiltCard
                  max={5}
                  className={`group relative flex flex-col justify-end rounded-2xl overflow-hidden h-full min-h-[540px] ${
                    pkg.highlight
                      ? 'border border-gold/50 shadow-[0_0_80px_-20px_rgb(var(--brand-rgb)/0.5)]'
                      : 'border border-white/10'
                  }`}
                >
                  {/* Photo background */}
                  <img
                    src={img.src}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                    style={{ objectPosition: img.pos }}
                  />
                  {/* Grading */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/15" />
                  {pkg.highlight && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06101f]/85 via-transparent to-transparent" />
                  )}

                  {/* Top row: tagline + badge */}
                  <div className="absolute top-0 inset-x-0 p-6 flex items-start justify-between">
                    <span className="glass text-white/85 text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full">
                      {pkg.tagline}
                    </span>
                    {pkg.highlight && (
                      <span className="bg-gold text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider uppercase gold-glow-sm">
                        Most Popular
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="relative p-7 pt-0">
                    <div aria-hidden="true" className="flex items-center gap-3 mb-3">
                      <span className="w-1.5 h-1.5 rotate-45 bg-gold/80" />
                      <span className="h-px w-12 bg-gradient-to-r from-gold/70 to-transparent" />
                    </div>
                    <h3 className="font-display text-white text-4xl font-light mb-5 [text-shadow:0_2px_16px_rgb(0_0_0/0.4)]">{pkg.name}</h3>

                    <ul className="space-y-2.5 mb-7">
                      {pkg.features.map((f, fi) => (
                        <motion.li
                          key={f}
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.45, delay: 0.35 + fi * 0.05, ease: EASE }}
                          className="flex gap-3 text-sm text-white/70"
                        >
                          <span className="text-gold mt-0.5">{CHECK}</span>
                          {f}
                        </motion.li>
                      ))}
                    </ul>

                    <button
                      onClick={openModal}
                      className={`btn-shine w-full py-3.5 rounded-sm text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300 ${
                        pkg.highlight
                          ? 'bg-gold text-white hover:bg-gold-bright gold-glow'
                          : 'glass text-white hover:border-gold/60 hover:text-gold'
                      }`}
                    >
                      Book This Package
                    </button>
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
