'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { mockListeningData } from '@/lib/questions'

interface LoadingPhaseProps {
  onComplete: () => void
}

export default function LoadingPhase({ onComplete }: LoadingPhaseProps) {
  const [stage, setStage] = useState<'connecting' | 'revealing' | 'done'>(
    'connecting'
  )
  const [visibleItems, setVisibleItems] = useState(0)

  useEffect(() => {
    const connectTimer = setTimeout(() => {
      setStage('revealing')
    }, 1200)

    return () => clearTimeout(connectTimer)
  }, [])

  useEffect(() => {
    if (stage !== 'revealing') return

    const intervals: NodeJS.Timeout[] = []
    mockListeningData.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleItems(i + 1)
        if (i === mockListeningData.length - 1) {
          setTimeout(() => setStage('done'), 800)
        }
      }, i * 400)
      intervals.push(t)
    })

    return () => intervals.forEach(clearTimeout)
  }, [stage])

  useEffect(() => {
    if (stage === 'done') {
      const t = setTimeout(onComplete, 1200)
      return () => clearTimeout(t)
    }
  }, [stage, onComplete])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10">
      <div className="max-w-md w-full">
        <motion.div
          className="font-[family-name:var(--font-mono)] text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {stage === 'connecting' && (
              <motion.p
                key="connecting"
                className="text-text-secondary mb-6 cursor-blink"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Connecting to your listening profile...
              </motion.p>
            )}
            {(stage === 'revealing' || stage === 'done') && (
              <motion.p
                key="connected"
                className="text-accent mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Profile loaded.
              </motion.p>
            )}
          </AnimatePresence>

          <div className="space-y-3">
            {mockListeningData.map((item, i) => (
              <motion.div
                key={item.label}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -8 }}
                animate={{
                  opacity: i < visibleItems ? 1 : 0,
                  x: i < visibleItems ? 0 : -8,
                }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <span className="text-accent text-[10px]">&#9632;</span>
                <span className="text-text-primary font-semibold">
                  {item.value}
                </span>
                <span className="text-text-muted">{item.label}</span>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {stage === 'done' && (
              <motion.p
                className="mt-8 text-text-secondary"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                Let&apos;s measure what the numbers miss.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
