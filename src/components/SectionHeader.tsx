'use client'

import { Reveal } from '@/lib/motion'

/**
 * Editorial section header: gold diamond + rule eyebrow, oversized
 * serif title. Left-aligned by default.
 */
export default function SectionHeader({
  eyebrow,
  title,
  sub,
  align = 'left',
}: {
  eyebrow: string
  title: React.ReactNode
  sub?: string
  align?: 'left' | 'center'
}) {
  const centered = align === 'center'
  return (
    <div className={`relative mb-16 ${centered ? 'text-center' : ''}`}>
      <Reveal>
        <div className={`flex items-center gap-4 mb-4 ${centered ? 'justify-center' : ''}`}>
          <span aria-hidden="true" className="w-2 h-2 rotate-45 bg-gold/70 shrink-0" />
          <span className="h-px w-10 bg-gold/50" />
          <p className="label-gold">{eyebrow}</p>
          {centered && (
            <>
              <span className="h-px w-10 bg-gold/50" />
              <span aria-hidden="true" className="w-2 h-2 rotate-45 bg-gold/70 shrink-0" />
            </>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 className="font-display text-5xl md:text-7xl font-light leading-[1.02]">{title}</h2>
      </Reveal>

      {sub && (
        <Reveal delay={0.2}>
          <p className="text-muted mt-5 text-sm tracking-wide">{sub}</p>
        </Reveal>
      )}
    </div>
  )
}
