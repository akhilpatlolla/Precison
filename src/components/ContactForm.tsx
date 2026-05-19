'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const FIELD_CLASS =
  'w-full bg-[#0a0a0a] border border-white/10 rounded px-4 py-3 text-white text-sm placeholder:text-muted focus:outline-none focus:border-gold/60 transition-colors'

const LABEL_CLASS = 'block text-xs text-muted tracking-wider uppercase mb-2'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      // TODO: replace YOUR_FORM_ID with the ID from formspree.io/new
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative py-24 px-6 bg-[#0a0a0a] section-glow">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="label-gold mb-3">Get in Touch</p>
          <h2 className="font-display text-5xl md:text-6xl font-light">Request a Quote</h2>
          <p className="text-muted mt-3 text-sm">We&apos;ll get back to you within 24 hours.</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-5 bg-surface border border-white/5 rounded-xl p-8"
        >
          {/* Name */}
          <div>
            <label className={LABEL_CLASS}>
              Full Name <span className="text-gold">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="First and Last Name"
              className={FIELD_CLASS}
            />
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={LABEL_CLASS}>
                Email <span className="text-gold">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className={FIELD_CLASS}
              />
            </div>
            <div>
              <label className={LABEL_CLASS}>
                Phone <span className="text-gold">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="(704) 000-0000"
                className={FIELD_CLASS}
              />
            </div>
          </div>

          {/* Vehicle */}
          <div>
            <label className={LABEL_CLASS}>
              Vehicle Year, Make &amp; Model <span className="text-gold">*</span>
            </label>
            <input
              type="text"
              name="vehicle"
              required
              placeholder="e.g. 2021 BMW M3"
              className={FIELD_CLASS}
            />
          </div>

          {/* Concerns */}
          <div>
            <label className={LABEL_CLASS}>Main Concerns</label>
            <textarea
              name="concerns"
              rows={4}
              placeholder="Describe what you'd like addressed — pet hair, paint swirls, leather conditioning, etc."
              className={`${FIELD_CLASS} resize-none`}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-gold text-black font-bold py-3.5 rounded tracking-widest text-sm uppercase hover:bg-yellow-400 transition-colors gold-glow disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Sending…' : 'Request a Quote'}
          </button>

          {/* Feedback */}
          {status === 'success' && (
            <p className="text-center text-sm text-gold">
              ✓ Received! We&apos;ll be in touch within 24 hours.
            </p>
          )}
          {status === 'error' && (
            <p className="text-center text-sm text-red-400">
              Something went wrong — please call us at 704-960-5602.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  )
}
