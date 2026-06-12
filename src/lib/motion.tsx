'use client'

import { ReactNode, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion'

/* Signature luxury easing — slow, weighted deceleration. */
export const EASE = [0.22, 1, 0.36, 1] as const

/* ── Reveal ─────────────────────────────────────────────
   Scroll-triggered entrance: rises, un-blurs, fades in. */
export function Reveal({
  children,
  delay = 0,
  y = 32,
  duration = 0.9,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  duration?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y, filter: 'blur(10px)' }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Magnetic ───────────────────────────────────────────
   Element is gently pulled toward the cursor, springs back on leave. */
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 160, damping: 14, mass: 0.2 })
  const sy = useSpring(y, { stiffness: 160, damping: 14, mass: 0.2 })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

/* ── TiltCard ───────────────────────────────────────────
   True 3D perspective tilt that follows the cursor, with a
   light "glare" sheen that tracks the pointer. */
export function TiltCard({
  children,
  className,
  max = 7,
  glare = true,
  scale = 1.015,
}: {
  children: ReactNode
  className?: string
  max?: number
  glare?: boolean
  scale?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const gop = useMotionValue(0)

  const srx = useSpring(rx, { stiffness: 180, damping: 22, mass: 0.4 })
  const sry = useSpring(ry, { stiffness: 180, damping: 22, mass: 0.4 })
  const sgop = useSpring(gop, { stiffness: 120, damping: 20 })

  const glareBg = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgb(255 255 255 / 0.10), rgb(var(--brand-rgb) / 0.04) 40%, transparent 70%)`

  if (reduced) return <div className={className}>{children}</div>

  return (
    <div style={{ perspective: 1100 }}>
      <motion.div
        ref={ref}
        className={className}
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
        whileHover={{ scale }}
        transition={{ duration: 0.4, ease: EASE }}
        onPointerMove={(e) => {
          if (e.pointerType !== 'mouse') return
          const r = ref.current?.getBoundingClientRect()
          if (!r) return
          const px = (e.clientX - r.left) / r.width
          const py = (e.clientY - r.top) / r.height
          ry.set((px - 0.5) * 2 * max)
          rx.set(-(py - 0.5) * 2 * max)
          gx.set(px * 100)
          gy.set(py * 100)
          gop.set(1)
        }}
        onPointerLeave={() => {
          rx.set(0)
          ry.set(0)
          gop.set(0)
        }}
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] z-20"
            style={{ background: glareBg, opacity: sgop }}
          />
        )}
      </motion.div>
    </div>
  )
}
