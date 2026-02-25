'use client'

import { questions } from '@/lib/questions'

interface ProgressBarProps {
  currentIndex: number
  constructLabel: string
}

export default function ProgressBar({
  currentIndex,
  constructLabel,
}: ProgressBarProps) {
  const total = questions.length
  const pct = ((currentIndex + 1) / total) * 100

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <div className="flex items-center justify-between mb-3">
        <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.15em] uppercase text-accent">
          Measuring: {constructLabel}
        </span>
        <span className="font-[family-name:var(--font-mono)] text-xs text-text-muted">
          {currentIndex + 1} of {total}
        </span>
      </div>
      <div className="w-full h-[2px] bg-border rounded-full overflow-hidden">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
