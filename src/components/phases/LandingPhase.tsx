'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

interface LandingPhaseProps {
  onStart: () => void
}

export default function LandingPhase({ onStart }: LandingPhaseProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10">
      <motion.div
        className="max-w-2xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.3em] uppercase text-text-muted block mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          A Perception Measurement Instrument
        </motion.span>

        <motion.h1
          className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          You&apos;ve listened to{' '}
          <span className="text-accent">847 songs</span> this month.
          <br />
          <span className="text-text-secondary font-medium">
            But how many felt like they were chosen for you?
          </span>
        </motion.h1>

        <motion.p
          className="text-text-secondary text-base leading-relaxed mb-8 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          Spotify knows what you play, skip, save, and repeat. But behavioral
          data can&apos;t measure how personalization{' '}
          <em className="text-text-primary not-italic font-medium">feels</em>.
        </motion.p>

        <motion.p
          className="text-text-primary text-base mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9 }}
        >
          I built you a 90-second research instrument that measures the gap.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.1 }}
        >
          <Button onClick={onStart}>Start the Study</Button>
        </motion.div>

        <motion.p
          className="mt-10 font-[family-name:var(--font-display)] text-lg sm:text-xl font-semibold text-text-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.4 }}
        >
          Built by Alex Turvy, PhD
        </motion.p>
      </motion.div>
    </div>
  )
}
