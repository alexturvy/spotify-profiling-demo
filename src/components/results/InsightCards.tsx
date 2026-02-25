'use client'

import { motion } from 'framer-motion'

interface InsightCardsProps {
  insights: { title: string; body: string }[]
}

export default function InsightCards({ insights }: InsightCardsProps) {
  return (
    <div className="grid gap-4 max-w-2xl mx-auto">
      {insights.map((insight, i) => (
        <motion.div
          key={insight.title}
          className="glass-card p-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 + i * 0.15 }}
        >
          <h4 className="font-[family-name:var(--font-display)] text-base font-semibold text-accent mb-2">
            {insight.title}
          </h4>
          <p className="text-text-secondary text-sm leading-relaxed">
            {insight.body}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
