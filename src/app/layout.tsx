import type { Metadata } from 'next'
import { Fraunces, DM_Sans } from 'next/font/google'
import SmoothScroll from '@/lib/lenis'
import { ThemeProvider, THEME_INIT_SCRIPT } from '@/lib/theme'
import './globals.css'

/* Fraunces — editorial luxury serif. Variable optical sizing keeps it
   sharp in labels and dramatic at display sizes. */
const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz', 'SOFT', 'WONK'],
  style: ['normal', 'italic'],
  variable: '--font-display',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
})

const SITE_URL = 'https://akhilpatlolla.github.io/Precison'
const OG_IMAGE = `${SITE_URL}/images/work/IMG_1074.jpeg`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Precision Detail | Premium Mobile Auto Detailing in Kannapolis, NC',
  description: 'Premium mobile auto detailing that comes to you. Interior, exterior, and full detail packages. Book online today.',
  keywords: ['mobile auto detailing', 'car detailing Kannapolis', 'ceramic coating', 'interior detailing', 'paint correction', 'mobile detailing NC'],
  alternates: { canonical: `${SITE_URL}/` },
  icons: { icon: '/Precison/images/logo.webp' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${SITE_URL}/`,
    siteName: 'Precision Detail',
    title: 'Precision Detail | Premium Mobile Auto Detailing in Kannapolis, NC',
    description: 'Premium mobile auto detailing that comes to you. Interior, exterior, and full detail packages. Book online today.',
    images: [{ url: OG_IMAGE, width: 1024, height: 1024, alt: 'Precision Detail finished work' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Precision Detail | Premium Mobile Auto Detailing in Kannapolis, NC',
    description: 'Premium mobile auto detailing that comes to you. Interior, exterior, and full detail packages.',
    images: [OG_IMAGE],
  },
}

// LocalBusiness structured data. Rating mirrors the figures already shown
// on the Reviews section (5.0 / 30+); no invented metrics.
const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'AutomotiveBusiness'],
  name: 'Precision Detail',
  description: 'Premium mobile auto detailing serving Kannapolis, NC and surrounding areas.',
  url: `${SITE_URL}/`,
  image: OG_IMAGE,
  logo: `${SITE_URL}/images/logo.webp`,
  telephone: '+1-704-960-5602',
  email: 'percisiondetail23@gmail.com',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kannapolis',
    addressRegion: 'NC',
    addressCountry: 'US',
  },
  areaServed: ['Kannapolis', 'Concord', 'Salisbury', 'Charlotte'],
  sameAs: ['https://www.instagram.com/precision_detail.pro'],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '30',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${dmSans.variable} font-sans bg-base text-ink antialiased`}>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
