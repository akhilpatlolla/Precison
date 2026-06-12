'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TESTIMONIALS, AI_REVIEW_SUMMARY } from '@/lib/tokens'
import SectionHeader from './SectionHeader'

const STATS = {
  rating: 5.0,
  total: 30,
  satisfaction: 100,
}

function Stars({ count, size = 'sm' }: { count: number; size?: 'sm' | 'lg' }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`${size === 'lg' ? 'text-2xl' : 'text-sm'} ${i < count ? 'text-gold' : 'text-ink/15'}`}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  )
}

function RatingBar({ label, pct }: { label: string; pct: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted w-16 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-ink/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full bg-gold rounded-full"
        />
      </div>
      <span className="text-xs text-muted w-8 text-right">{pct}%</span>
    </div>
  )
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let paused = false
    const onEnter = () => { paused = true }
    const onLeave = () => { paused = false }
    track.addEventListener('mouseenter', onEnter)
    track.addEventListener('mouseleave', onLeave)

    let frame: number
    let x = 0
    const step = () => {
      if (!paused && track) {
        x -= 0.4
        if (Math.abs(x) >= track.scrollWidth / 2) x = 0
        track.style.transform = `translateX(${x}px)`
      }
      frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener('mouseenter', onEnter)
      track.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const doubled = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <section id="reviews" className="py-24 bg-base2 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-16">

        {/* Heading */}
        <SectionHeader
          eyebrow="Testimonials"
          title={<>What Clients <em className="not-italic text-gradient">Say</em></>}
        />

        {/* Aggregate rating block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16 bg-surface border border-ink/10 rounded-xl p-8"
        >
          {/* Left: big number */}
          <div className="flex flex-col items-center justify-center gap-3 border-b md:border-b-0 md:border-r border-ink/10 pb-8 md:pb-0 md:pr-8">
            <span className="font-display text-8xl font-light text-gold leading-none">{STATS.rating.toFixed(1)}</span>
            <Stars count={5} size="lg" />
            <p className="text-muted text-sm">{STATS.total}+ verified reviews</p>
          </div>

          {/* Right: breakdown bars */}
          <div className="flex flex-col justify-center gap-4">
            <RatingBar label="5 stars" pct={100} />
            <RatingBar label="4 stars" pct={0} />
            <RatingBar label="3 stars" pct={0} />
            <RatingBar label="2 stars" pct={0} />
            <RatingBar label="1 star"  pct={0} />
            <div className="pt-2 border-t border-ink/10 mt-1">
              <p className="text-xs text-muted">
                <span className="text-gold font-bold">{STATS.satisfaction}% satisfaction</span>
                {' '}· Would recommend to a friend
              </p>
            </div>
          </div>
        </motion.div>

        {/* AI Summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mt-6 bg-surface border border-gold/25 rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold tracking-widest uppercase bg-gold/15 text-gold px-2.5 py-1 rounded-full border border-gold/30">
              ✦ AI Summary
            </span>
            <span className="text-muted text-xs">Generated from verified customer reviews</span>
          </div>
          <p className="text-ink/80 text-sm leading-relaxed">{AI_REVIEW_SUMMARY}</p>
        </motion.div>

      </div>

      {/* Scrolling testimonial cards */}
      <div className="mask-fade-x overflow-hidden">
        <div ref={trackRef} className="flex gap-6 w-max px-6">
          {doubled.map((t, i) => (
            <div
              key={i}
              className="lift w-80 flex-shrink-0 bg-surface border border-ink/10 rounded-xl p-6 hover:border-gold/30"
            >
              <Stars count={t.stars} />
              <p className="text-ink/75 text-sm leading-relaxed mt-3 mb-5">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-gold text-xs font-bold">
                  {t.name[0]}
                </div>
                <p className="text-ink/60 text-xs font-medium tracking-wide">{t.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
