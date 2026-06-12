'use client'

import { useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'
import SectionHeader from './SectionHeader'

interface SliderProps {
  before: string
  after: string
  label?: string
}

function Slider({ before, after, label }: SliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const rafId = useRef<number | null>(null)
  const latestX = useRef(0)

  // Write the slider position to a CSS custom property inside a single
  // rAF per frame — no React re-render per pointer move, so the drag stays
  // smooth even on mobile. clipPath + divider read --pos directly.
  const applyPos = useCallback(() => {
    rafId.current = null
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = Math.min(100, Math.max(0, ((latestX.current - rect.left) / rect.width) * 100))
    el.style.setProperty('--pos', pct.toFixed(2))
  }, [])

  const schedule = useCallback((clientX: number) => {
    latestX.current = clientX
    if (rafId.current == null) rafId.current = requestAnimationFrame(applyPos)
  }, [applyPos])

  useEffect(() => () => { if (rafId.current != null) cancelAnimationFrame(rafId.current) }, [])

  return (
    <div
      ref={containerRef}
      className="relative aspect-video rounded-lg overflow-hidden cursor-ew-resize select-none"
      style={{ ['--pos']: 50, touchAction: 'pan-y' } as React.CSSProperties}
      onPointerDown={(e) => {
        dragging.current = true
        e.currentTarget.setPointerCapture(e.pointerId)
        schedule(e.clientX)
      }}
      onPointerMove={(e) => { if (dragging.current) schedule(e.clientX) }}
      onPointerUp={(e) => {
        dragging.current = false
        try { e.currentTarget.releasePointerCapture(e.pointerId) } catch {}
      }}
      onPointerCancel={() => { dragging.current = false }}
    >
      {/* After (base layer) */}
      <img src={after} alt="After detail" className="absolute inset-0 w-full h-full object-cover" draggable={false} />

      {/* Before (clipped layer) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: 'inset(0 calc((100 - var(--pos)) * 1%) 0 0)', willChange: 'clip-path' }}
      >
        <img src={before} alt="Before detail" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-gold pointer-events-none shadow-[0_0_16px_rgb(var(--brand-rgb)/0.7)]"
        style={{ left: 'calc(var(--pos) * 1%)', willChange: 'left' }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-gold flex items-center justify-center gold-glow ring-4 ring-black/30">
          <span className="text-white text-xs font-bold select-none">⇔</span>
        </div>
      </div>

      <span className="absolute top-3 left-3 glass text-white/90 text-xs px-2.5 py-1 rounded-full pointer-events-none tracking-wide">Before</span>
      <span className="absolute top-3 right-3 bg-gold/90 text-white text-xs font-bold px-2.5 py-1 rounded-full pointer-events-none gold-glow-sm tracking-wide">After</span>

      {label && (
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/60 text-xs pointer-events-none">{label}</span>
      )}
    </div>
  )
}

const PAIRS = [
  {
    before: '/Precison/images/before/IMG_3416.jpeg',
    after: '/Precison/images/after/IMG_3417.jpeg',
    label: 'Interior Deep Clean',
  },
  {
    before: '/Precison/images/before/627120664_122168259206880261_2447563834866533043_n.jpg',
    after: '/Precison/images/after/628044005_122168259344880261_1140634947337978528_n.jpg',
    label: 'Toyota Tacoma TRD Detail',
  },
  {
    before: '/Precison/images/before/628047737_122168259332880261_7718594003553120929_n.jpg',
    after: '/Precison/images/after/627129904_122168259278880261_2628416492131156835_n.jpg',
    label: 'Exterior Paint & Panel',
  },
  {
    before: '/Precison/images/before/625471098_122168259218880261_1653850376281587277_n.jpg',
    after: '/Precison/images/after/630226845_122168259272880261_7566388241574249251_n.jpg',
    label: 'Wheel & Tire Restoration',
  },
]

export default function BeforeAfter() {
  return (
    <section id="before-after" className="relative py-28 px-6 bg-base section-glow">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="The Transformation"
          title={<>Before &amp; <em className="not-italic text-gradient">After</em></>}
          sub="Drag the handle to reveal"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 [perspective:1600px]">
          {PAIRS.map((pair, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36, rotateX: -6, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.9, delay: (i % 2) * 0.15, ease: EASE }}
              className="rounded-lg shadow-[0_24px_60px_-24px_rgb(0_0_0/0.7)]"
            >
              <Slider {...pair} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
