'use client'

/**
 * Infinite scrolling word-strip divider — oversized outline serif type,
 * the editorial signature between sections.
 */
const DEFAULT_WORDS = [
  'Paint Correction',
  'Ceramic Coating',
  'Interior Deep Clean',
  'Mobile Service',
  'Showroom Shine',
]

export default function Marquee({
  words = DEFAULT_WORDS,
  reverse = false,
}: {
  words?: string[]
  reverse?: boolean
}) {
  const row = [...words, ...words]
  return (
    <div aria-hidden="true" className="relative py-10 overflow-hidden select-none mask-fade-x">
      <div className={`flex w-max items-center gap-12 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-12 shrink-0">
            <span className="font-display text-6xl md:text-8xl font-light whitespace-nowrap text-outline hover:text-ink/10 transition-colors duration-700">
              {w}
            </span>
            <span className="w-2.5 h-2.5 rotate-45 bg-gold/50 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}
