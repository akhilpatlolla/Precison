'use client'

import { useTheme } from '@/lib/theme'

export default function Footer() {
  const { theme } = useTheme()
  const logoSrc = theme === 'dark'
    ? '/Precison/images/logo-bright.png'
    : '/Precison/images/logo-blue.png'

  return (
    <footer className="relative bg-base3 py-12 px-6">
      <div aria-hidden="true" className="hairline absolute top-0 inset-x-0" />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start gap-3">
          <img
            src={logoSrc}
            alt="Precision Detail"
            className="h-16 w-auto drop-shadow-[0_0_18px_rgb(var(--brand-rgb)/0.25)]"
          />
          <p className="text-muted text-xs">Premium Mobile Auto Detailing · Kannapolis, NC</p>
        </div>
        <div className="flex gap-6 text-muted text-sm">
          <a href="tel:7049605602" className="hover:text-gold transition-colors">
            704-960-5602
          </a>
          <a
            href="https://www.instagram.com/precision_detail.pro"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold transition-colors"
          >
            Instagram
          </a>
        </div>
        <p className="text-muted/60 text-xs">
          © {new Date().getFullYear()} Precision Detail. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
