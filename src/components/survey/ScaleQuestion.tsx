'use client'

import { motion } from 'framer-motion'
import { Question } from '@/types/survey'
import TrackContext from '@/components/survey/TrackContext'

interface ScaleQuestionProps {
  question: Question
  value: number | null
  onSelect: (value: number) => void
}

function highlightContext(text: string, context: string) {
  const idx = text.indexOf(context)
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-accent">{context}</span>
      {text.slice(idx + context.length)}
    </>
  )
}

export default function ScaleQuestion({
  question,
  value,
  onSelect,
}: ScaleQuestionProps) {
  const [min, max] = question.scaleRange ?? [1, 7]
  const points = Array.from({ length: max - min + 1 }, (_, i) => min + i)
  const isWideScale = points.length > 7

  return (
    <div className="flex flex-col items-center text-center">
      {question.tracks && (
        <TrackContext
          tracks={question.tracks}
          hasPlayButton={question.hasPlayButton}
        />
      )}
      <motion.p
        className="text-xl sm:text-2xl leading-relaxed text-text-primary max-w-xl mb-14 font-[family-name:var(--font-body)]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {highlightContext(question.text, question.context)}
      </motion.p>

      <motion.div
        className={`flex items-center mb-4 ${isWideScale ? 'gap-2 sm:gap-2.5' : 'gap-3 sm:gap-4'}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        {points.map((p, i) => (
          <button
            key={p}
            onClick={() => onSelect(p)}
            className={`${isWideScale ? 'scale-circle scale-circle-numbered' : 'scale-circle'} ${value === p ? 'selected' : ''} ${
              value !== null && value !== p ? 'faded' : ''
            }`}
            style={{ transitionDelay: `${i * 20}ms` }}
            aria-label={`${p} out of ${max}`}
          >
            {isWideScale && (
              <span className="font-[family-name:var(--font-mono)] text-[11px] text-text-secondary select-none">
                {p}
              </span>
            )}
          </button>
        ))}
      </motion.div>

      <motion.div
        className={`flex justify-between w-full ${isWideScale ? 'max-w-[360px] sm:max-w-[400px]' : 'max-w-[340px] sm:max-w-[380px]'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.35 }}
      >
        <span className="font-[family-name:var(--font-mono)] text-sm text-text-secondary">
          {question.scaleLeft}
        </span>
        <span className="font-[family-name:var(--font-mono)] text-sm text-text-secondary">
          {question.scaleRight}
        </span>
      </motion.div>
    </div>
  )
}
