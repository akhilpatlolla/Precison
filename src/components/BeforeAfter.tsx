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
    before: 'https://images.unsplash.com/photo-1549194388-b6fc5a2de40e?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    label: 'Interior Detail',
  },
  {
    before: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&q=80',
    label: 'Exterior Polish',
  },
]

export default function BeforeAfter() {
  return (
    <section className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-xs tracking-widest uppercase mb-3">Transformations</p>
          <h2 className="text-4xl md:text-5xl font-black">Before & After</h2>
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
        {/* Replace PAIRS src values with your real photos in /public/images/before/ and /public/images/after/ */}
      </div>
    </section>
  )
}
