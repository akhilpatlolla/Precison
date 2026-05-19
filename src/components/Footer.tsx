export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-display text-gold text-lg font-light tracking-[0.15em] uppercase">Precision Detail</p>
          <p className="text-muted text-xs mt-1">Premium Mobile Auto Detailing · Kannapolis, NC</p>
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
        <p className="text-muted/40 text-xs">
          © {new Date().getFullYear()} Precision Detail. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
