'use client'

import { motion } from 'framer-motion'
import { ListenerTypeInfo } from '@/types/survey'
import { listenerTypes } from '@/lib/listener-types'

interface SegmentTypologyProps {
  activeType: ListenerTypeInfo
}

export default function SegmentTypology({ activeType }: SegmentTypologyProps) {
  return (
    <div>
      <div className="grid gap-3">
        {listenerTypes.map((segment, i) => {
          const isActive = segment.segmentId === activeType.segmentId
          return (
            <motion.div
              key={segment.segmentId}
              className={`glass-card p-5 transition-all duration-300 ${
                isActive
                  ? 'border border-accent/40 bg-accent/[0.04]'
                  : 'opacity-45'
              }`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: isActive ? 1 : 0.45, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-3">
                  <span
                    className={`font-[family-name:var(--font-mono)] text-[11px] tracking-wider ${
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
      <p className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted text-center mt-4">
        Simplified for demonstration — production system includes 12+ segments
        with continuous scoring
      </p>
    </div>
  )
}
