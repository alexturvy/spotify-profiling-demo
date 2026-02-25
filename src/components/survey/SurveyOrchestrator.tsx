'use client'

import { useReducer, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { questions } from '@/lib/questions'
import { SurveyResponse } from '@/types/survey'
import ScaleQuestion from './ScaleQuestion'
import ProgressBar from './ProgressBar'

interface SurveyState {
  currentIndex: number
  responses: SurveyResponse[]
  currentValue: number | null
  transitioning: boolean
}

type SurveyAction =
  | { type: 'SELECT'; value: number }
  | { type: 'ADVANCE' }
  | { type: 'SET_TRANSITIONING'; transitioning: boolean }

function reducer(state: SurveyState, action: SurveyAction): SurveyState {
  switch (action.type) {
    case 'SELECT':
      return { ...state, currentValue: action.value }
    case 'ADVANCE': {
      const response: SurveyResponse = {
        questionId: questions[state.currentIndex].id,
        value: state.currentValue!,
      }
      return {
        ...state,
        responses: [...state.responses, response],
        currentIndex: state.currentIndex + 1,
        currentValue: null,
        transitioning: false,
      }
    }
    case 'SET_TRANSITIONING':
      return { ...state, transitioning: action.transitioning }
    default:
      return state
  }
}

interface SurveyOrchestratorProps {
  onComplete: (responses: SurveyResponse[]) => void
}

export default function SurveyOrchestrator({
  onComplete,
}: SurveyOrchestratorProps) {
  const [state, dispatch] = useReducer(reducer, {
    currentIndex: 0,
    responses: [],
    currentValue: null,
    transitioning: false,
  })

  const handleSelect = useCallback(
    (value: number) => {
      if (state.transitioning) return
      dispatch({ type: 'SELECT', value })

      // Auto-advance after selection with brief delay
      dispatch({ type: 'SET_TRANSITIONING', transitioning: true })
      setTimeout(() => {
        const isLast = state.currentIndex === questions.length - 1
        if (isLast) {
          const finalResponse: SurveyResponse = {
            questionId: questions[state.currentIndex].id,
            value,
          }
          onComplete([...state.responses, finalResponse])
        } else {
          dispatch({ type: 'ADVANCE' })
        }
      }, 600)
    },
    [state.currentIndex, state.responses, state.transitioning, onComplete]
  )

  const question = questions[state.currentIndex]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10">
      <ProgressBar
        currentIndex={state.currentIndex}
        constructLabel={question.construct}
      />

      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ScaleQuestion
              question={question}
              value={state.currentValue}
              onSelect={handleSelect}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
