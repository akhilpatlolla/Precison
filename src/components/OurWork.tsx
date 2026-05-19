'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PHOTOS = [
  { src: '/Precison/images/work/IMG_1074.jpeg', caption: 'McLaren 720S' },
  { src: '/Precison/images/work/IMG_1760.jpeg', caption: 'McLaren Cockpit Detail' },
  { src: '/Precison/images/work/IMG_2153.jpeg', caption: 'Mercedes S-Class' },
  { src: '/Precison/images/work/IMG_3045.jpeg', caption: 'Wheel Restoration' },
  { src: '/Precison/images/work/IMG_3439.jpeg', caption: 'Lexus RX Detail' },
  { src: '/Precison/images/work/IMG_3448.jpeg', caption: 'Interior Conditioning' },
  { src: '/Precison/images/work/IMG_3630.jpeg', caption: 'Interior Deep Clean' },
  { src: '/Precison/images/work/IMG_3631.jpeg', caption: 'Cabin Detailing' },
  { src: '/Precison/images/work/IMG_3663.jpeg', caption: 'Boat Detailing' },
  { src: '/Precison/images/work/IMG_3664.jpeg', caption: 'Foam Wash' },
  { src: '/Precison/images/work/IMG_3665.jpeg', caption: 'Corvette Detail' },
  { src: '/Precison/images/work/IMG_6555.jpeg', caption: 'Cadillac Escalade' },
  { src: '/Precison/images/work/IMG_7073.jpeg', caption: 'BMW 5-Series' },
  { src: '/Precison/images/work/IMG_7443.jpeg', caption: 'Lexus RC F' },
  { src: '/Precison/images/work/IMG_7534.jpeg', caption: 'Mercedes AMG GT-R' },
]

function Lightbox({ index, onClose, onPrev, onNext }: {
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const photo = PHOTOS[index]

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onNext, onPrev])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white/60 hover:text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors z-10"
        aria-label="Close"
      >
        ✕
      </button>

      {/* Counter */}
      <p className="absolute top-5 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest">
        {index + 1} / {PHOTOS.length}
      </p>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-4 md:left-8 text-white/50 hover:text-white text-3xl w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors z-10"
        aria-label="Previous"
      >
        ‹
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col items-center gap-4 px-16 max-w-5xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={photo.src}
            alt={photo.caption}
            className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"
          />
          <p className="text-gold text-xs tracking-widest uppercase">{photo.caption}</p>
        </motion.div>
      </AnimatePresence>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-4 md:right-8 text-white/50 hover:text-white text-3xl w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors z-10"
        aria-label="Next"
      >
        ›
      </button>
    </motion.div>
  )
}

export default function OurWork() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const close = useCallback(() => setLightboxIndex(null), [])
  const prev = useCallback(() => setLightboxIndex(i => i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length), [])
  const next = useCallback(() => setLightboxIndex(i => i === null ? null : (i + 1) % PHOTOS.length), [])

  return (
    <section id="gallery" className="py-24 px-6 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-xs tracking-widest uppercase mb-3">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-black">Our Work</h2>
          <p className="text-muted mt-3 text-sm">Click any photo to enlarge</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {PHOTOS.map((photo, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onClick={() => setLightboxIndex(i)}
              className="relative group aspect-square overflow-hidden rounded-lg cursor-zoom-in text-left"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300" />
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-bold text-sm">{photo.caption}</p>
              </div>
              <div className="absolute inset-0 rounded-lg ring-0 group-hover:ring-2 group-hover:ring-gold/60 transition-all duration-300" />
              {/* Zoom hint */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 rounded-full w-7 h-7 flex items-center justify-center text-white text-xs">
                ⤢
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            index={lightboxIndex}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
