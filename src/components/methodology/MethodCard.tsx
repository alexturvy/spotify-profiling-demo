'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Question } from '@/types/survey'

interface MethodCardProps {
  question: Question
  index: number
}

export default function MethodCard({ question, index }: MethodCardProps) {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (index === 0) {
      const t = setTimeout(() => setExpanded(true), 800)
      return () => clearTimeout(t)
    }
  }, [index])

  return (
    <motion.div
      className="glass-card overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-5 flex items-start gap-4">
        <span className="font-[family-name:var(--font-mono)] text-[11px] text-text-muted shrink-0 mt-0.5">
          Q{question.id}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.12em] uppercase text-accent px-2 py-0.5 rounded border border-accent/15 bg-accent-dim">
              {question.construct}
            </span>
            {!expanded && (
              <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted/40">
                View methodology
              </span>
            )}
          </div>
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
            {question.text}
          </p>
        </div>
        <motion.span
          className="font-[family-name:var(--font-mono)] text-text-muted text-sm shrink-0 mt-0.5 inline-block"
          animate={{ rotate: expanded ? 90 : 0 }}
          transition={{ duration: 0.15 }}
        >
          &#x203A;
        </motion.span>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="px-5 pb-5 pt-0 border-t border-border ml-9 space-y-4">
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="glass-card p-4">
                  <h5 className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] uppercase text-text-muted mb-1.5">
                    What you thought you were answering
                  </h5>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {question.text}
                  </p>
                </div>
                <div className="glass-card p-4" style={{ borderColor: 'rgba(30,215,96,0.1)' }}>
                  <h5 className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] uppercase text-accent mb-1.5">
                    What this actually measures
                  </h5>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {question.latentNote}
                  </p>
                </div>
              </div>

              <div>
                <h5 className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] uppercase text-accent mb-1.5">
                  Why this framing
                </h5>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {question.framingNote}
                </p>
              </div>
              <div>
                <h5 className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] uppercase text-accent mb-1.5">
                  How it maps to experimentation
                </h5>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {question.experimentNote}
                </p>
              </div>
              <div>
                <h5 className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] uppercase text-accent mb-1.5">
                  How it scales
                </h5>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {question.scaleNote}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
