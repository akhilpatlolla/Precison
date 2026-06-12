'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TiltCard, EASE } from '@/lib/motion'
import { lockScroll, unlockScroll } from '@/lib/lenis'
import SectionHeader from './SectionHeader'

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

/* Direction-aware 3D swing between photos */
const swing = {
  enter: (dir: number) => ({
    opacity: 0,
    x: 90 * dir,
    rotateY: 22 * dir,
    scale: 0.92,
  }),
  center: { opacity: 1, x: 0, rotateY: 0, scale: 1 },
  exit: (dir: number) => ({
    opacity: 0,
    x: -70 * dir,
    rotateY: -16 * dir,
    scale: 0.94,
  }),
}

function Lightbox({ index, dir, onClose, onPrev, onNext }: {
  index: number
  dir: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const photo = PHOTOS[index]

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    lockScroll()
    return () => { document.body.style.overflow = ''; unlockScroll() }
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
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 [perspective:1600px]"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white/60 hover:text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors z-10"
        aria-label="Close"
      >
        ✕
      </button>

      <p className="absolute top-5 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest">
        {index + 1} / {PHOTOS.length}
      </p>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-4 md:left-8 text-white/50 hover:text-white text-3xl w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors z-10"
        aria-label="Previous"
      >
        ‹
      </button>

      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={index}
          custom={dir}
          variants={swing}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
          className="flex flex-col items-center gap-4 px-16 max-w-5xl w-full will-change-transform"
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
  const [dir, setDir] = useState(1)

  const close = useCallback(() => setLightboxIndex(null), [])
  const prev = useCallback(() => {
    setDir(-1)
    setLightboxIndex(i => i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length)
  }, [])
  const next = useCallback(() => {
    setDir(1)
    setLightboxIndex(i => i === null ? null : (i + 1) % PHOTOS.length)
  }, [])

  return (
    <section id="gallery" className="py-28 px-6 bg-base2">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="The Portfolio"
          title={<>Our <em className="not-italic text-gradient">Work</em></>}
          sub="Every car tells a story — click any photo to enlarge"
        />

        {/* Featured shot */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.98, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-6% 0px' }}
          transition={{ duration: 1, ease: EASE }}
          className="mb-4 md:mb-6"
        >
          <TiltCard max={3} scale={1.008} className="relative rounded-2xl overflow-hidden">
            <button
              onClick={() => setLightboxIndex(0)}
              className="relative group w-full aspect-[16/10] md:aspect-[21/9] overflow-hidden rounded-2xl cursor-zoom-in text-left block"
            >
              <img
                src={PHOTOS[0].src}
                alt={PHOTOS[0].caption}
                className="w-full h-full object-cover object-[center_60%] transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 flex items-end justify-between">
                <div>
                  <p className="text-white/60 text-[10px] tracking-[0.3em] uppercase mb-2">Featured</p>
                  <p className="text-white font-display text-3xl md:text-4xl font-light">{PHOTOS[0].caption}</p>
                  <div className="h-px w-10 bg-gold mt-3" />
                </div>
                <span className="hidden md:flex glass rounded-full w-10 h-10 items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  ⤢
                </span>
              </div>
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-gold/50 transition-all duration-500" />
            </button>
          </TiltCard>
        </motion.div>

        {/* Uniform grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {PHOTOS.slice(1).map((photo, idx) => {
            const i = idx + 1
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28, scale: 0.97, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-6% 0px' }}
                transition={{ duration: 0.8, delay: (idx % 3) * 0.1, ease: EASE }}
              >
                <TiltCard max={4} scale={1.02} className="relative rounded-xl overflow-hidden">
                  <button
                    onClick={() => setLightboxIndex(i)}
                    className="relative group w-full aspect-[4/3] overflow-hidden rounded-xl cursor-zoom-in text-left block"
                  >
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                      <p className="text-white font-medium tracking-wide text-sm">{photo.caption}</p>
                      <div className="h-px w-8 bg-gold mt-2" />
                    </div>
                    <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5 group-hover:ring-gold/50 transition-all duration-500" />
                  </button>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            index={lightboxIndex}
            dir={dir}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
