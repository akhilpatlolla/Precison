'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Cinematic background montage — slow Ken Burns zoom + crossfade across
 * real Precision Detail work. If /video/hero.mp4 exists it takes over
 * automatically (the montage keeps running underneath until the video
 * can play).
 */
const SHOTS = [
  { src: '/Precison/images/work/IMG_1074.jpeg', pos: 'center 60%' },
  { src: '/Precison/images/work/IMG_7534.jpeg', pos: 'center 55%' },
  { src: '/Precison/images/work/IMG_3664.jpeg', pos: 'center 50%' },
  { src: '/Precison/images/work/IMG_3665.jpeg', pos: 'center 60%' },
  { src: '/Precison/images/work/IMG_7443.jpeg', pos: 'center 55%' },
]

const SLIDE_MS = 6500

export default function HeroMontage() {
  const [index, setIndex] = useState(0)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    if (videoReady) return
    const t = setInterval(() => setIndex((i) => (i + 1) % SHOTS.length), SLIDE_MS)
    return () => clearInterval(t)
  }, [videoReady])

  // Preload the next shot so crossfades never flash
  useEffect(() => {
    const img = new Image()
    img.src = SHOTS[(index + 1) % SHOTS.length].src
  }, [index])

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0a0a]">
      {/* Ken Burns montage */}
      {!videoReady && (
        <AnimatePresence>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <motion.img
              src={SHOTS[index].src}
              alt=""
              aria-hidden="true"
              initial={{ scale: 1.06, x: index % 2 === 0 ? '-1.5%' : '1.5%' }}
              animate={{ scale: 1.18, x: index % 2 === 0 ? '1.5%' : '-1.5%' }}
              transition={{ duration: (SLIDE_MS + 2000) / 1000, ease: 'linear' }}
              className="absolute inset-0 w-full h-full object-cover will-change-transform"
              style={{ objectPosition: SHOTS[index].pos }}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Optional real video — drop a clip at public/video/hero.mp4 */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onCanPlay={() => setVideoReady(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source src="/Precison/video/hero.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
