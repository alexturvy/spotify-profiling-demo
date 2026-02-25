import { ConstructScores, ListenerTypeInfo } from '@/types/survey'

export const listenerTypes: ListenerTypeInfo[] = [
  {
    name: 'The Attuned Listener',
    pattern: 'High fit + high resonance',
    description:
      'The algorithm works because it nails the feeling, not just the genre.',
    segmentId: 'LP-01',
    populationPct: '~22%',
    productRouting:
      'Feature routing: aggressive recommendations, minimal explanation, mood-aware surfaces prioritized',
    internalDescription:
      'High-trust, high-satisfaction segment. Algorithm accuracy maps directly to emotional payoff. Low churn risk; high sensitivity to resonance-breaking changes.',
  },
  {
    name: 'The Transparent Listener',
    pattern: 'High transparency + high agency',
    description:
      "You want to see the gears turning. Personalization is a collaboration, not a magic trick.",
    segmentId: 'LP-02',
    populationPct: '~18%',
    productRouting:
      'Feature routing: explainability surfaces, co-creation tools, taste profile editing, recommendation tuning dials',
    internalDescription:
      'Early adopter segment for control features. Highest engagement with "why this was recommended" labels. Ideal beta cohort for algorithmic transparency experiments.',
  },
  {
    name: 'The Skeptical Listener',
    pattern: 'Low transparency + low agency',
    description:
      "You're not sure the algorithm is learning the right things — and that matters to you.",
    segmentId: 'LP-03',
    populationPct: '~20%',
    productRouting:
      'Feature routing: trust-building interventions, visible learning signals, post-skip disambiguation prompts',
    internalDescription:
      'Highest churn risk segment. Perceives algorithm as opaque and unresponsive. Requires investment in feedback loop visibility before feature adoption improves.',
  },
  {
    name: 'The Surrendered Listener',
    pattern: 'High fit + low transparency',
    description:
      "You don't need to know how it works. You just know it works.",
    segmentId: 'LP-04',
    populationPct: '~25%',
    productRouting:
      'Feature routing: autoplay-heavy, minimal UI friction, suppress explainability features that add cognitive load',
    internalDescription:
      'Largest segment. Satisfaction without understanding — fragile trust that erodes disproportionately on miss. One bad recommendation week triggers outsized dissatisfaction.',
  },
  {
    name: 'The Feeling Seeker',
    pattern: 'High resonance + low fit',
    description:
      "Accuracy is secondary. You're chasing the moments that move you.",
    segmentId: 'LP-05',
    populationPct: '~15%',
    productRouting:
      'Feature routing: serendipity-weighted recommendations, contextual playlists, Daylist and mood surfaces prioritized over genre accuracy',
    internalDescription:
      'Hardest segment to serve with accuracy-optimized algorithms. Retention driven by affective peaks, not functional matching. Requires separate success metrics (resonance events/week vs. skip rate).',
  },
]

export function classifyListener(scores: ConstructScores): ListenerTypeInfo {
  const mid = 4
  const fit = scores['Perceived Fit']
  const transparency = scores['Algorithmic Transparency']
  const resonance = scores['Emotional Resonance']
  const agency = scores['Agency & Trust']

  // Attuned: high fit + high resonance
  if (fit >= mid && resonance >= mid && fit + resonance >= transparency + agency) {
    return listenerTypes[0]
  }
  // Transparent: high transparency + high agency
  if (transparency >= mid && agency >= mid && transparency + agency >= fit + resonance) {
    return listenerTypes[1]
  }
  // Skeptical: low transparency + low agency
  if (transparency < mid && agency < mid) {
    return listenerTypes[2]
  }
  // Surrendered: high fit + low transparency
  if (fit >= mid && transparency < mid) {
    return listenerTypes[3]
  }
  // Feeling Seeker: high resonance + low fit
  if (resonance >= mid && fit < mid) {
    return listenerTypes[4]
  }

  // Fallback to highest scoring pair
  const pairs = [
    { score: fit + resonance, type: listenerTypes[0] },
    { score: transparency + agency, type: listenerTypes[1] },
    { score: resonance, type: listenerTypes[4] },
  ]
  pairs.sort((a, b) => b.score - a.score)
  return pairs[0].type
}

export function generateInsights(scores: ConstructScores): { title: string; body: string }[] {
  const insights: { title: string; body: string }[] = []
  const fit = scores['Perceived Fit']
  const transparency = scores['Algorithmic Transparency']
  const resonance = scores['Emotional Resonance']
  const agency = scores['Agency & Trust']

  if (fit >= 5 && transparency <= 3) {
    insights.push({
      title: 'The Trust Paradox',
      body: 'High Perceived Fit with low Transparency flags a product risk: satisfaction without understanding is fragile. One bad recommendation erodes trust disproportionately because the user has no mental model to explain a miss. Product implication: this segment needs explainability features most urgently.',
    })
  }

  if (resonance >= 5) {
    insights.push({
      title: 'Affect Over Accuracy',
      body: "Emotional Resonance as the dominant dimension means this listener's retention driver isn't functional accuracy — it's affective peak experiences. Product implication: mood-aware recommendation and contextual framing (Daylist naming, time-of-day tuning) will move engagement metrics more than algorithm precision for this segment.",
    })
  }

  if (agency <= 3 && fit >= 4) {
    insights.push({
      title: 'The Feedback Gap',
      body: 'The algorithm delivers but feels one-directional. Low Agency despite adequate Fit signals that feedback mechanisms are invisible or untrusted. Product implication: post-skip disambiguation ("not now" vs. "not ever") and visible learning signals ("we noticed you skipped jazz this week") would close this gap.',
    })
  }

  if (transparency >= 5 && agency >= 5) {
    insights.push({
      title: 'The Collaborator Profile',
      body: 'High Transparency and Agency scores identify the ideal early adopter for co-creation features — playlist co-piloting, taste profile editing, recommendation tuning dials. Product implication: this segment will generate the highest engagement with any feature that surfaces algorithmic reasoning or grants control.',
    })
  }

  if (resonance <= 3 && fit >= 4) {
    insights.push({
      title: 'Functional, Not Magical',
      body: 'Accurate but emotionally flat — the algorithm is a utility, not a discovery engine. Product implication: this segment has hit the ceiling of genre-matching accuracy. The next value frontier is contextual personalization (mood, moment, activity) that creates affective peaks.',
    })
  }

  if (fit <= 3 && resonance <= 3) {
    insights.push({
      title: 'The Perception Deficit',
      body: 'Low Fit and Resonance together could signal a genuine accuracy problem or a perception problem — the algorithm may perform better than it feels. Product implication: A/B test surfacing "why this was recommended" explanations to determine whether perception closes the gap without algorithm changes.',
    })
  }

  if (transparency <= 3 && agency <= 3) {
    insights.push({
      title: 'The Black Box Problem',
      body: 'Low Transparency and Agency together indicate maximum perceived opacity. Product implication: this is the strongest signal for investment in explainability infrastructure — not as a feature request, but as a trust architecture problem that affects long-term retention.',
    })
  }

  // Always return 2-3 insights
  if (insights.length === 0) {
    insights.push({
      title: 'A Balanced Profile',
      body: "Even scores across all four dimensions — no single construct dominates. Product implication: this is the hardest segment to design for because there's no single lever to pull. Broad personalization improvements will move this segment incrementally; targeted interventions need to be identified through behavioral data pairing.",
    })
    insights.push({
      title: 'The Middle Ground',
      body: "Moderate scores indicate personalization is working 'well enough' — functional but not remarkable. Product implication: the research question for this segment is what would make it remarkable. Qualitative follow-up (diary studies, in-depth interviews) would surface the missing variable.",
    })
  }

  return insights.slice(0, 3)
}
