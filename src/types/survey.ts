export interface TrackInfo {
  artist: string
  title: string
  colors: [string, string]
}

export interface Question {
  id: number
  construct: Construct
  text: string
  context: string
  scaleLeft: string
  scaleRight: string
  methodNote: string
  framingNote: string
  experimentNote: string
  scaleNote: string
  latentNote: string
  tracks?: TrackInfo[]
  hasPlayButton?: boolean
  scaleRange?: [number, number]
}

export type Construct =
  | 'Perceived Fit'
  | 'Algorithmic Transparency'
  | 'Emotional Resonance'
  | 'Agency & Trust'

export interface SurveyResponse {
  questionId: number
  value: number // 1-7
}

export interface ConstructScores {
  'Perceived Fit': number
  'Algorithmic Transparency': number
  'Emotional Resonance': number
  'Agency & Trust': number
}

export type ListenerTypeName =
  | 'The Attuned Listener'
  | 'The Transparent Listener'
  | 'The Skeptical Listener'
  | 'The Surrendered Listener'
  | 'The Feeling Seeker'

export interface ListenerTypeInfo {
  name: ListenerTypeName
  pattern: string
  description: string
  segmentId: string
  populationPct: string
  productRouting: string
  internalDescription: string
}

export interface Insight {
  title: string
  body: string
}

export type Phase =
  | 'landing'
  | 'loading'
  | 'survey'
  | 'post-survey'
