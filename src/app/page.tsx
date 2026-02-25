'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Phase, SurveyResponse } from '@/types/survey'
import LandingPhase from '@/components/phases/LandingPhase'
import LoadingPhase from '@/components/phases/LoadingPhase'
import SurveyPhase from '@/components/phases/SurveyPhase'
import PostSurveyPhase from '@/components/phases/PostSurveyPhase'

export default function Home() {
  const [phase, setPhase] = useState<Phase>('landing')
  const [responses, setResponses] = useState<SurveyResponse[]>([])

  const goToPhase = useCallback((next: Phase) => {
    setPhase(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleSurveyComplete = useCallback(
    (r: SurveyResponse[]) => {
      setResponses(r)
      goToPhase('post-survey')
    },
    [goToPhase]
  )

  return (
    <main className="relative">
      <AnimatePresence mode="wait">
        {phase === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <LandingPhase onStart={() => goToPhase('loading')} />
          </motion.div>
        )}

        {phase === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <LoadingPhase onComplete={() => goToPhase('survey')} />
          </motion.div>
        )}

        {phase === 'survey' && (
          <motion.div
            key="survey"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <SurveyPhase onComplete={handleSurveyComplete} />
          </motion.div>
        )}

        {phase === 'post-survey' && (
          <motion.div
            key="post-survey"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PostSurveyPhase responses={responses} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
