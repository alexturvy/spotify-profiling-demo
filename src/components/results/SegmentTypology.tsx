'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ListenerTypeInfo } from '@/types/survey'
import { listenerTypes } from '@/lib/listener-types'

interface SegmentTypologyProps {
  activeType: ListenerTypeInfo
}

export default function SegmentTypology({ activeType }: SegmentTypologyProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [highlightFaded, setHighlightFaded] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Fire once when section leaves viewport (scrolled past)
        if (!entry.isIntersecting) {
          setHighlightFaded(true)
          observer.disconnect()
        }
      },
      { threshold: 0 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef}>
      <p className="font-[family-name:var(--font-mono)] text-xs text-text-muted text-center mb-6">
        Simplified for demonstration
      </p>
      <div className="grid gap-3">
        {listenerTypes.map((segment, i) => {
          const isActive = segment.segmentId === activeType.segmentId
          return (
            <motion.div
              key={segment.segmentId}
              className="glass-card p-5 transition-colors duration-500"
              initial={{ opacity: 0, y: 12 }}
              animate={{
                opacity: highlightFaded ? 1 : isActive ? 1 : 0.45,
                y: 0,
                borderColor: !highlightFaded && isActive
                  ? 'rgba(30,215,96,0.4)'
                  : 'rgba(255,255,255,0.06)',
              }}
              transition={{ duration: 0.5, delay: highlightFaded ? 0 : 0.1 + i * 0.08 }}
              style={{
                border: '1px solid',
                background: !highlightFaded && isActive
                  ? 'rgba(30,215,96,0.04)'
                  : undefined,
              }}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-3">
                  <span
                    className={`font-[family-name:var(--font-mono)] text-[11px] tracking-wider transition-colors duration-500 ${
                      isActive ? 'text-accent' : 'text-text-muted'
                    }`}
                  >
                    {segment.segmentId}
                  </span>
                  <h4 className="font-[family-name:var(--font-display)] text-base font-semibold text-text-primary">
                    {segment.name}
                  </h4>
                </div>
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted shrink-0">
                  {segment.populationPct}
                </span>
              </div>
              <p className="font-[family-name:var(--font-mono)] text-[11px] text-text-secondary mb-2">
                {segment.pattern}
              </p>
              <p className="text-text-secondary text-sm leading-relaxed mb-2">
                {segment.internalDescription}
              </p>
              <p className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted leading-relaxed">
                {segment.productRouting}
              </p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
