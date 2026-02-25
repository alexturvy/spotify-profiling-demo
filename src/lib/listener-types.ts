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
      'Feature routing: high-confidence recommendation surfaces, reduced explanation friction, mood-aware contexts prioritized',
    internalDescription:
      'Satisfaction is tightly coupled to emotional accuracy, not genre matching — standard collaborative filtering metrics (skip rate, save rate) underpredict this segment\'s retention drivers. Risk model: low baseline churn, but disproportionate sensitivity to resonance-breaking algorithm changes because the trust is affective, not cognitive.',
    diagnosticLine:
      'Retention driver is emotional accuracy, not genre matching — standard CF metrics underpredict churn sensitivity for this segment.',
  },
  {
    name: 'The Transparent Listener',
    pattern: 'High transparency + high agency',
    description:
      "You want to see the gears turning. Personalization is a collaboration, not a magic trick.",
    segmentId: 'LP-02',
    populationPct: '~18%',
    productRouting:
      'Feature routing: explainability surfaces, co-creation tools, taste profile visibility, recommendation feedback loops',
    internalDescription:
      'High need for algorithmic legibility — but "transparency" here means perceived control, not literal model explanation. Responds to narrative framing ("because you listened to X") more than technical accuracy. Best beta cohort for features that surface reasoning, but over-explanation risks patronizing this segment.',
    diagnosticLine:
      'High need for algorithmic legibility, but \'transparency\' here means perceived control, not model explanation. Over-engineering explainability risks patronizing.',
  },
  {
    name: 'The Skeptical Listener',
    pattern: 'Low transparency + low agency',
    description:
      "You're not sure the algorithm is learning the right things — and that matters to you.",
    segmentId: 'LP-03',
    populationPct: '~20%',
    productRouting:
      'Feature routing: trust-building interventions, visible learning signals, feedback loop disambiguation',
    internalDescription:
      'The perception problem may be independent of actual algorithm performance — this segment may receive equally accurate recommendations as LP-01 but experience them as random. Churn risk is elevated not because the product fails, but because the product fails to communicate. Intervention question: does making the algorithm legible convert skeptics, or does skepticism reflect a stable disposition?',
    diagnosticLine:
      'Perception gap may be independent of actual algorithm performance — this segment may receive equally accurate recommendations and experience them as random.',
  },
  {
    name: 'The Surrendered Listener',
    pattern: 'High fit + low transparency',
    description:
      "You don't need to know how it works. You just know it works.",
    segmentId: 'LP-04',
    populationPct: '~25%',
    productRouting:
      'Feature routing: low-friction autoplay paths, minimal interstitial UI, passive personalization surfaces',
    internalDescription:
      'Satisfaction without understanding creates a fragile trust structure — no mental model to absorb a miss. The product risk isn\'t churn from bad recommendations; it\'s that this segment can\'t distinguish a bad algorithm from a bad mood. Explaining "why" to this segment may actually decrease satisfaction by surfacing a process they prefer to ignore.',
    diagnosticLine:
      'Satisfaction without a mental model — trust structure is affective, not cognitive. Algorithm changes hit this segment before metrics detect it.',
  },
  {
    name: 'The Feeling Seeker',
    pattern: 'High resonance + low fit',
    description:
      "Accuracy is secondary. You're chasing the moments that move you.",
    segmentId: 'LP-05',
    populationPct: '~15%',
    productRouting:
      'Feature routing: serendipity-weighted recommendations, contextual and mood surfaces, exploration-mode features',
    internalDescription:
      'Standard accuracy metrics actively mislead for this segment — high skip rates may coexist with high satisfaction because the value is in the search, not the match. Requires its own success metrics (resonance events per session, save-after-skip patterns). Optimizing for low skip rate would flatten the experience this segment actually wants.',
    diagnosticLine:
      'Standard accuracy metrics actively mislead — high skip rates can coexist with high satisfaction. Optimizing for low skip rate flattens the experience this segment wants.',
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
      body: 'High Perceived Fit with low Transparency flags fragile trust — satisfaction without a mental model. This profile rated Discover Weekly highly (Q1) but showed low credibility tolerance on the AI DJ narration test (Q3), suggesting the algorithm earns trust through outcomes, not explanations. One visible miss erodes confidence disproportionately because there\'s no reasoning scaffold to absorb it.',
    })
  }

  if (resonance >= 5) {
    insights.push({
      title: 'Affect Over Accuracy',
      body: 'High Resonance means the retention driver is affective peak experiences, not functional genre matching. This profile reported high anticipatory accuracy on the Daylist naming item (Q6) — the evocative label produced mood-prediction confidence before listening. Product routing: contextual framing surfaces (Daylist naming, time-of-day tuning, mood-aware playlists) will move engagement metrics more than algorithm precision improvements.',
    })
  }

  if (agency <= 3 && fit >= 4) {
    insights.push({
      title: 'The Feedback Gap',
      body: 'Low skip confidence (Q7) despite adequate Fit reveals a one-directional relationship — the algorithm delivers, but behavioral signals feel unheard. The gap between "I like what it picks" and "I don\'t trust it learns from my skips" is a design problem, not an algorithm problem. Post-skip disambiguation ("not now" vs. "not ever") and visible learning signals ("we noticed you skipped jazz this week") would close this perception gap.',
    })
  }

  if (transparency >= 5 && agency >= 5) {
    insights.push({
      title: 'The Collaborator Profile',
      body: 'High Transparency + Agency identifies the co-creation segment. This profile scored high on attribution need (Q4: "figure out why it\'s there") and skip confidence (Q7), indicating active participation in the feedback loop. Ideal beta cohort for features that surface algorithmic reasoning — but note from Q3: credibility tolerance may be high, meaning approximate explanations satisfy. Don\'t over-engineer the explainability.',
    })
  }

  if (resonance <= 3 && fit >= 4) {
    insights.push({
      title: 'Functional, Not Magical',
      body: 'Accurate but emotionally flat — the algorithm is a utility. Low Resonance despite adequate Fit means this profile\'s signal-to-noise threshold (Q2) is met, but the "right song for the right mood" frequency (Q5) is low. The ceiling of genre-matching accuracy has been hit. The next value frontier is contextual personalization that creates affective peaks — the variable Q5 and Q6 are designed to measure.',
    })
  }

  if (fit <= 3 && resonance <= 3) {
    insights.push({
      title: 'The Perception Deficit',
      body: 'Low Fit and Resonance together — but the critical question is whether this reflects genuine algorithm inaccuracy or a perception gap. Cross-referencing with behavioral play-through data (the metric Q2\'s "want to press play" is designed to pair with) would reveal whether the perception-behavior gap is large. If actual engagement outperforms self-reported fit, the intervention is perceptual, not algorithmic.',
    })
  }

  if (transparency <= 3 && agency <= 3) {
    insights.push({
      title: 'The Black Box Problem',
      body: 'Low Transparency + Agency indicates maximum perceived opacity. This profile likely scored "just let it play" on Q4 (low attribution need) combined with low skip confidence (Q7) — passive engagement without trust. The research question: is this learned helplessness (feedback never worked) or disposition (never cared)? Longitudinal tracking of Q7 across listening tenure would distinguish the two and determine whether explainability investment converts this segment.',
    })
  }

  // Methodology-grounded insights that fire on specific cross-item patterns
  if (fit >= 4 && resonance >= 4 && agency <= 3) {
    insights.push({
      title: 'The Perception-Agency Disconnect',
      body: 'This profile rates the algorithm as accurate (Q1-Q2) and emotionally resonant (Q5-Q6), but doesn\'t believe their feedback is heard (Q7). The instrument captures this as a construct-level tension: the system is perceived as good at its job but unresponsive to correction. This is a UX problem — making the feedback loop visible — not a model quality problem.',
    })
  }

  if (transparency >= 4 && resonance <= 3) {
    insights.push({
      title: 'Legibility Without Magic',
      body: 'High Transparency with low Resonance suggests this profile understands the algorithm but isn\'t moved by it. The AI DJ credibility test (Q3) likely landed well — "close enough" — but the Daylist anticipatory test (Q6) fell flat. The algorithm is legible but not emotionally intelligent. For this profile, the gap between "I see why it picked this" and "this is the right song for right now" is the product opportunity.',
    })
  }

  // Always return 2-3 insights
  if (insights.length === 0) {
    insights.push({
      title: 'A Balanced Profile',
      body: 'Even scores across all four constructs — no single dimension dominates. Cross-item analysis shows consistent mid-range responses on both the direct measures (Q1, Q5) and the indirect/latent items (Q4, Q8), suggesting the profile isn\'t anchoring on surface-level questions differently than the deeper ones. This is the hardest segment to design for — no single lever to pull. Behavioral data pairing would surface the variable this instrument doesn\'t capture.',
    })
    insights.push({
      title: 'The Middle Ground',
      body: 'Moderate scores indicate personalization is functional but not remarkable. The signal-to-noise threshold (Q2) is met but not exceeded; affective peaks (Q5) are occasional, not regular. The research question for this segment is what would make it remarkable — and this instrument identifies where to look: the construct with the lowest variance across the two items is where the ceiling is binding.',
    })
  }

  return insights.slice(0, 3)
}
