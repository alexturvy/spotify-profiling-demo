'use client'

import { motion } from 'framer-motion'
import { ListenerTypeInfo } from '@/types/survey'

interface ListenerTypeProps {
  type: ListenerTypeInfo
}

export default function ListenerType({ type }: ListenerTypeProps) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-accent mb-3 block">
        Classification
      </span>
      <h3 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-text-primary mb-3">
        {type.name}
      </h3>
      <p className="font-[family-name:var(--font-mono)] text-xs text-text-muted mb-4">
        {type.pattern}
      </p>
      <p className="text-text-secondary text-lg leading-relaxed max-w-md mx-auto italic">
        &ldquo;{type.description}&rdquo;
      </p>
    </motion.div>
  )
}
