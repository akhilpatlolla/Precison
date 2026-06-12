'use client'

import { ReactNode, useEffect } from 'react'
import Lenis from 'lenis'

/* Singleton Lenis instance so scrollTo / stop / start can be used anywhere. */
let lenis: Lenis | null = null

export function getLenis() {
  return lenis
}

/** Pause smooth scrolling (call when a modal / drawer opens). */
export function lockScroll() {
  lenis?.stop()
}

/** Resume smooth scrolling. */
export function unlockScroll() {
  lenis?.start()
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Respect users who prefer reduced motion — fall back to native scroll.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })

    let raf: number
    const loop = (time: number) => {
      lenis?.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis?.destroy()
      lenis = null
    }
  }, [])

  return <>{children}</>
}
