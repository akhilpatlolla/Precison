'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FAQ_ITEMS } from '@/lib/tokens'
import { EASE } from '@/lib/motion'
import SectionHeader from './SectionHeader'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 px-6 bg-base2">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          eyebrow="Questions"
          title={<><em className="not-italic text-gradient">FAQ</em></>}
        />

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
              className={`border rounded-lg overflow-hidden transition-colors duration-500 ${
                open === i ? 'border-gold/30 bg-surface' : 'border-ink/10'
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="w-full flex justify-between items-center px-6 py-5 text-left hover:bg-surface transition-colors"
              >
                <span className="font-medium text-ink/90">{item.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-gold text-xl flex-shrink-0 ml-4"
                  aria-hidden="true"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    style={{ overflow: 'hidden' }}
                  >
                    {/* 3D fold-down for the answer */}
                    <motion.p
                      initial={{ rotateX: -28, opacity: 0, transformPerspective: 900 }}
                      animate={{ rotateX: 0, opacity: 1 }}
                      exit={{ rotateX: -20, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      style={{ transformOrigin: 'top center' }}
                      className="px-6 pb-5 text-muted text-sm leading-relaxed"
                    >
                      {item.a}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
