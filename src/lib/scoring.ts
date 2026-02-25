import { SurveyResponse, ConstructScores, Construct } from '@/types/survey'
import { questions } from './questions'

// Normalize Q2's 0-8 value to the 1-7 scale used by other questions
function normalizeResponseValue(questionId: number, value: number): number {
  const q = questions.find((q) => q.id === questionId)
  if (q?.scaleRange) {
    const [min, max] = q.scaleRange
    // Map from [min..max] to [1..7]
    return ((value - min) / (max - min)) * 6 + 1
  }
  return value
}

export function computeScores(responses: SurveyResponse[]): ConstructScores {
  const constructMap: Record<Construct, number[]> = {
    'Perceived Fit': [],
    'Algorithmic Transparency': [],
    'Emotional Resonance': [],
    'Agency & Trust': [],
  }

  for (const r of responses) {
    const q = questions.find((q) => q.id === r.questionId)
    if (q) {
      constructMap[q.construct].push(
        normalizeResponseValue(r.questionId, r.value)
      )
    }
  }

  const average = (arr: number[]) =>
    arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0

  return {
    'Perceived Fit': average(constructMap['Perceived Fit']),
    'Algorithmic Transparency': average(constructMap['Algorithmic Transparency']),
    'Emotional Resonance': average(constructMap['Emotional Resonance']),
    'Agency & Trust': average(constructMap['Agency & Trust']),
  }
}

// Normalize to 0-100 for radar chart display
export function normalizeScores(
  scores: ConstructScores
): Record<Construct, number> {
  const normalize = (v: number) => Math.round(((v - 1) / 6) * 100)
  return {
    'Perceived Fit': normalize(scores['Perceived Fit']),
    'Algorithmic Transparency': normalize(scores['Algorithmic Transparency']),
    'Emotional Resonance': normalize(scores['Emotional Resonance']),
    'Agency & Trust': normalize(scores['Agency & Trust']),
  }
}
