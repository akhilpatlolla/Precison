'use client'

import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

interface SliderProps {
  before: string
  after: string
  label?: string
}

function Slider({ before, after, label }: SliderProps) {
  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const updatePos = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
    setPos(pct)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative aspect-video rounded-lg overflow-hidden cursor-ew-resize select-none"
      onMouseDown={() => { dragging.current = true }}
      onMouseUp={() => { dragging.current = false }}
      onMouseMove={(e) => { if (dragging.current) updatePos(e.clientX) }}
      onMouseLeave={() => { dragging.current = false }}
      onTouchMove={(e) => updatePos(e.touches[0].clientX)}
    >
      {/* After (base layer) */}
      <img src={after} alt="After detail" className="absolute inset-0 w-full h-full object-cover" />

      {/* Before (clipped layer) */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={before} alt="Before detail" className="absolute inset-0 w-full h-full object-cover" />
      </div>

      {/* Divider */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-gold pointer-events-none" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gold flex items-center justify-center shadow-lg">
          <span className="text-black text-xs font-bold select-none">⇔</span>
        </div>
      </div>

      <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded pointer-events-none">Before</span>
      <span className="absolute top-3 right-3 bg-gold/90 text-black text-xs font-bold px-2 py-1 rounded pointer-events-none">After</span>

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
    <section id="before-after" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="label-gold mb-3">Transformations</p>
          <h2 className="font-display text-5xl md:text-6xl font-light">Before &amp; After</h2>
          <p className="text-muted mt-3 text-sm">Drag the gold handle to reveal</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PAIRS.map((pair, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Slider {...pair} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
