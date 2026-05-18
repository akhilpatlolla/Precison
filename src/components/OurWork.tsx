'use client'

import { motion } from 'framer-motion'

const PHOTOS = [
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', caption: 'Interior Detail' },
  { src: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&q=80', caption: 'Exterior Polish' },
  { src: 'https://images.unsplash.com/photo-1600705722908-bca4a8c1ad67?w=600&q=80', caption: 'Wheel Restoration' },
  { src: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&q=80', caption: 'Paint Correction' },
  { src: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=600&q=80', caption: 'Leather Conditioning' },
  { src: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=600&q=80', caption: 'Full Detail' },
]

export default function OurWork() {
  return (
    <section id="gallery" className="py-24 px-6 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-xs tracking-widest uppercase mb-3">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-black">Our Work</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative group aspect-square overflow-hidden rounded-lg cursor-pointer"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300" />
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-bold text-sm">{photo.caption}</p>
              </div>
              <div className="absolute inset-0 rounded-lg ring-0 group-hover:ring-2 group-hover:ring-gold/60 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
        {/* Replace PHOTOS array src values with your real photos in /public/images/work/ */}
      </div>
    </section>
  )
}
