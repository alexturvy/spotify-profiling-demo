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
      <div className="grid gap-2.5">
        {listenerTypes.map((segment, i) => {
          const isActive = segment.segmentId === activeType.segmentId
          return (
            <motion.div
              key={segment.segmentId}
              className="rounded-lg p-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: highlightFaded ? 1 : isActive ? 1 : 0.4,
                y: 0,
              }}
              transition={{ duration: 0.4, delay: highlightFaded ? 0 : 0.1 + i * 0.06 }}
              style={{
                background: !highlightFaded && isActive
                  ? 'rgba(30,215,96,0.06)'
                  : 'var(--bg-card)',
                border: `1px solid ${
                  !highlightFaded && isActive
                    ? 'rgba(30,215,96,0.25)'
                    : 'var(--border)'
                }`,
              }}
            >
              <div className="flex items-start justify-between gap-4 mb-1.5">
                <div className="flex items-center gap-3">
                  <span
                    className={`font-[family-name:var(--font-mono)] text-[11px] tracking-wider ${
                      isActive ? 'text-accent' : 'text-text-muted'
                    }`}
                  >
                    {segment.segmentId}
                  </span>
                  <h4 className="font-[family-name:var(--font-display)] text-[15px] font-semibold text-text-primary">
                    {segment.name}
                  </h4>
                </div>
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted shrink-0">
                  {segment.populationPct}
                </span>
              </div>
              <p className="font-[family-name:var(--font-mono)] text-[11px] text-text-muted mb-1.5">
                {segment.pattern}
              </p>
              <p className="text-text-secondary text-sm leading-relaxed mb-1.5">
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
