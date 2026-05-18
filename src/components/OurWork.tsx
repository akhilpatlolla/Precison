'use client'

import { motion } from 'framer-motion'

const PHOTOS = [
  { src: '/Precison/images/work/IMG_1074.jpeg', caption: 'McLaren 720S' },
  { src: '/Precison/images/work/IMG_1760.jpeg', caption: 'McLaren Cockpit Detail' },
  { src: '/Precison/images/work/IMG_2153.jpeg', caption: 'Mercedes S-Class' },
  { src: '/Precison/images/work/IMG_3045.jpeg', caption: 'Wheel Restoration' },
  { src: '/Precison/images/work/IMG_3439.jpeg', caption: 'Lexus RX Detail' },
  { src: '/Precison/images/work/IMG_3448.jpeg', caption: 'Interior Conditioning' },
  { src: '/Precison/images/work/IMG_3630.jpeg', caption: 'Interior Deep Clean' },
  { src: '/Precison/images/work/IMG_3631.jpeg', caption: 'Cabin Detailing' },
  { src: '/Precison/images/work/IMG_3663.jpeg', caption: 'Boat Detailing' },
  { src: '/Precison/images/work/IMG_3664.jpeg', caption: 'Foam Wash' },
  { src: '/Precison/images/work/IMG_3665.jpeg', caption: 'Lexus RC F' },
  { src: '/Precison/images/work/IMG_6555.jpeg', caption: 'Cadillac Escalade' },
  { src: '/Precison/images/work/IMG_7073.jpeg', caption: 'BMW 5-Series' },
  { src: '/Precison/images/work/IMG_7443.jpeg', caption: 'Mercedes AMG GT-R' },
  { src: '/Precison/images/work/IMG_7534.jpeg', caption: 'Corvette Detail' },
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
      </div>
    </section>
  )
}
