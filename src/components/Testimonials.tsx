'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TESTIMONIALS } from '@/lib/tokens'

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-gold text-sm" aria-hidden="true">★</span>
      ))}
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
    const speed = 0.4
    const step = () => {
      if (!paused && track) {
        x -= speed
        const halfWidth = track.scrollWidth / 2
        if (Math.abs(x) >= halfWidth) x = 0
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
    <section className="py-24 bg-[#0d0d0d] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-gold text-xs tracking-widest uppercase mb-3">Reviews</p>
          <h2 className="text-4xl md:text-5xl font-black">What Clients Say</h2>
        </motion.div>
      </div>

      <div ref={trackRef} className="flex gap-6 w-max">
        {doubled.map((t, i) => (
          <div
            key={i}
            className="w-80 flex-shrink-0 bg-surface border-l-2 border-gold p-6 rounded-r-lg"
          >
            <Stars count={t.stars} />
            <p className="text-muted text-sm leading-relaxed mt-3 mb-4">&ldquo;{t.quote}&rdquo;</p>
            <p className="text-gold text-xs font-bold tracking-wider uppercase">— {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
