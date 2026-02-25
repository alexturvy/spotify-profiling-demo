'use client'

import SurveyOrchestrator from '@/components/survey/SurveyOrchestrator'
import { SurveyResponse } from '@/types/survey'

interface SurveyPhaseProps {
  onComplete: (responses: SurveyResponse[]) => void
}

export default function SurveyPhase({ onComplete }: SurveyPhaseProps) {
  return <SurveyOrchestrator onComplete={onComplete} />
}
