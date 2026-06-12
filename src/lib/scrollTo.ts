import { getLenis } from './lenis'

export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(el, {
      offset: -80,
      duration: 1.5,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
