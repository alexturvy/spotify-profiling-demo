'use client'

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts'
import { Construct } from '@/types/survey'
import { baselineScores } from '@/lib/baselines'

interface PerceptionRadarProps {
  scores: Record<Construct, number>
}

export default function PerceptionRadar({ scores }: PerceptionRadarProps) {
  const data = [
    {
      construct: 'Perceived Fit',
      you: scores['Perceived Fit'],
      baseline: baselineScores['Perceived Fit'],
    },
    {
      construct: 'Transparency',
      you: scores['Algorithmic Transparency'],
      baseline: baselineScores['Algorithmic Transparency'],
    },
    {
      construct: 'Resonance',
      you: scores['Emotional Resonance'],
      baseline: baselineScores['Emotional Resonance'],
    },
    {
      construct: 'Agency & Trust',
      you: scores['Agency & Trust'],
      baseline: baselineScores['Agency & Trust'],
    },
  ]

  return (
    <div className="w-full max-w-md mx-auto">
      <ResponsiveContainer width="100%" height={360}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="72%">
          <PolarGrid stroke="rgba(255,255,255,0.06)" />
          <PolarAngleAxis
            dataKey="construct"
            tick={{
              fill: '#8a8680',
              fontSize: 11,
              fontFamily: 'var(--font-martian), monospace',
            }}
          />
          <Radar
            name="Population Baseline"
            dataKey="baseline"
            stroke="rgba(255,255,255,0.2)"
            strokeDasharray="4 4"
            fill="transparent"
            strokeWidth={1.5}
          />
          <Radar
            name="Your Scores"
            dataKey="you"
            stroke="#1ed760"
            fill="rgba(30, 215, 96, 0.12)"
            strokeWidth={2}
            dot={{
              r: 4,
              fill: '#1ed760',
              stroke: '#0a0b0f',
              strokeWidth: 2,
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center gap-6 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-[2px] bg-accent" />
          <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-secondary">
            Your scores
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-[2px] border-t border-dashed border-white/20" />
          <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-secondary">
            Population baseline
          </span>
        </div>
      </div>
    </div>
  )
}
