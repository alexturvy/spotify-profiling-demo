'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SurveyResponse, ConstructScores } from '@/types/survey'
import { computeScores, normalizeScores } from '@/lib/scoring'
import { classifyListener, generateInsights } from '@/lib/listener-types'
import { questions } from '@/lib/questions'
import PerceptionRadar from '@/components/results/PerceptionRadar'
import SegmentTypology from '@/components/results/SegmentTypology'
import InsightCards from '@/components/results/InsightCards'
import MethodCard from '@/components/methodology/MethodCard'
import FrameworkDiagram from '@/components/methodology/FrameworkDiagram'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/ui/ScrollReveal'

interface PostSurveyPhaseProps {
  responses: SurveyResponse[]
}

const proposals = [
  {
    title: 'Personalization Perception Index (PPI)',
    body: "Quarterly survey tracking the 4 constructs across user segments. Enables pre/post measurement for every algorithm change. The instrument above is the prototype.",
    tag: 'Survey Framework',
  },
  {
    title: 'The Familiarity/Novelty Dial',
    body: "Mixed-methods study on the core product tension: how much novelty is too much? Forced rank + MaxDiff methodology to quantify the optimal ratio by segment.",
    tag: 'Mixed Methods',
  },
  {
    title: 'Feature Trust Audit',
    body: "Matrix grid measurement across all personalization surfaces to identify trust deficits — features where accuracy is high but perceived trust is low.",
    tag: 'Quantitative UXR',
  },
  {
    title: 'AI-Enhanced Research Operations',
    body: 'NLP coding of open-ended responses at scale, LLM-assisted hypothesis generation from survey + behavioral data, automated synthesis.',
    tag: 'Research Ops',
  },
]

const advancedMethods = [
  {
    name: 'Confirmatory Factor Analysis (CFA)',
    description:
      'Validates the 4-factor structure — confirming that the 8 items load onto Perceived Fit, Transparency, Resonance, and Agency as theorized, rather than collapsing into fewer dimensions or cross-loading unpredictably.',
  },
  {
    name: 'Latent Profile Analysis (LPA)',
    description:
      'The 5 listener types aren\'t rule-based buckets — they emerge statistically from response patterns across all 8 items. LPA identifies natural clusters in the data, meaning the types reflect real population segments rather than researcher-imposed categories.',
  },
  {
    name: 'Item Response Theory (IRT)',
    description:
      'Calibrates which questions provide the most information at different trait levels. For example, Q8 (agency scenario) may discriminate best among listeners with moderate agency scores, while Q7 (skip confidence) discriminates at the extremes.',
  },
  {
    name: 'Structural Equation Modeling (SEM)',
    description:
      'Maps construct relationships — does transparency drive agency, or vice versa? Does resonance mediate the relationship between fit and retention? SEM tests these directional hypotheses simultaneously.',
  },
]

export default function PostSurveyPhase({ responses }: PostSurveyPhaseProps) {
  const [computing, setComputing] = useState(true)
  const [scores, setScores] = useState<ConstructScores | null>(null)

  useEffect(() => {
    const t = setTimeout(() => {
      const raw = computeScores(responses)
      setScores(raw)
      setComputing(false)
    }, 1800)
    return () => clearTimeout(t)
  }, [responses])

  if (computing) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 rounded-full border-2 border-accent/30 mx-auto mb-4"
            animate={{
              scale: [1, 1.2, 1],
              borderColor: [
                'rgba(30,215,96,0.3)',
                'rgba(30,215,96,0.6)',
                'rgba(30,215,96,0.3)',
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <p className="font-[family-name:var(--font-mono)] text-sm text-text-secondary">
            Classifying your perception profile...
          </p>
        </motion.div>
      </div>
    )
  }

  if (!scores) return null

  const normalized = normalizeScores(scores)
  const listenerType = classifyListener(scores)
  const insights = generateInsights(scores)

  return (
    <div className="relative z-10">
      {/* ─── PHASE A: INDIVIDUAL RESPONSE PROFILE ─── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.25em] uppercase text-accent block mb-3">
              Response Profile
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold mb-4">
              Your Perception Profile
            </h2>
          </motion.div>

          <motion.p
            className="text-text-secondary text-sm text-center max-w-2xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Your responses generate the following profile —
            classified within Spotify&apos;s perception dataset alongside 640M+ listeners.
          </motion.p>

          {/* Radar chart + segment assignment */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="glass-card p-6 sm:p-8">
              <PerceptionRadar scores={normalized} />
            </div>
            <div className="glass-card p-8 flex flex-col items-center justify-center text-center">
              <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-text-muted mb-2 block">
                Based on your response pattern
              </span>
              <p className="font-[family-name:var(--font-mono)] text-xs text-accent mb-3">
                Segment {listenerType.segmentId}
              </p>
              <h3 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-text-primary mb-3">
                {listenerType.name}
              </h3>
              <p className="font-[family-name:var(--font-mono)] text-xs text-text-muted mb-4">
                {listenerType.pattern}
              </p>
              <p className="text-text-secondary text-base leading-relaxed max-w-md mx-auto italic">
                &ldquo;{listenerType.description}&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── PHASE B: SEGMENT CLASSIFICATION SYSTEM ─── */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent mb-20" />

          <ScrollReveal>
            <div className="text-center mb-4">
              <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.25em] uppercase text-accent block mb-3">
                Segment Classification
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold mb-4">
                How Spotify&apos;s Perception System Sorts This Profile
              </h2>
            </div>
            <p className="text-text-secondary text-sm text-center max-w-2xl mx-auto mb-12 leading-relaxed">
              Your response pattern maps to one of 5 latent listener segments.
              Here&apos;s where you land — and what that means for product decisions.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <SegmentTypology activeType={listenerType} />
          </ScrollReveal>
        </div>
      </section>

      {/* ─── PHASE C: ROUTING IMPLICATIONS ─── */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent mb-20" />

          <ScrollReveal>
            <div className="text-center mb-6">
              <h3 className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-text-muted">
                Routing Implications
              </h3>
              <p className="text-text-secondary text-sm max-w-xl mx-auto mt-2">
                This segment classification triggers the following product behaviors.
              </p>
            </div>
          </ScrollReveal>

          <InsightCards insights={insights} />
        </div>
      </section>

      {/* ─── SECTION: METHODOLOGY REVEAL ─── */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent mb-20" />

          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.25em] uppercase text-accent block mb-3">
                The Research Behind the Research
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold mb-4">
                Methodology Reveal
              </h2>
              <p className="text-text-secondary text-base max-w-2xl mx-auto leading-relaxed">
                You thought you were rating Discover Weekly playlists and Daylist
                names. But your response pattern across 8 items maps to a 4-factor
                latent perception model — and the questions were designed so the
                construct mapping isn&apos;t obvious to the respondent.
              </p>
            </div>
          </ScrollReveal>

          {/* Expandable method cards */}
          <div className="space-y-3 mb-16">
            {questions.map((q, i) => (
              <MethodCard key={q.id} question={q} index={i} />
            ))}
          </div>

          {/* Advanced methods section */}
          <ScrollReveal delay={0.1}>
            <div className="mb-16">
              <h3 className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-text-muted text-center mb-6">
                Advanced Quantitative Methods
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {advancedMethods.map((method, i) => (
                  <motion.div
                    key={method.name}
                    className="glass-card p-5"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <h4 className="font-[family-name:var(--font-mono)] text-xs text-accent mb-2">
                      {method.name}
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {method.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Framework diagram */}
          <ScrollReveal delay={0.1}>
            <div className="mb-16">
              <h3 className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-text-muted text-center mb-6">
                The Latent Framework
              </h3>
              <FrameworkDiagram />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── SECTION: RESEARCH PROPOSALS ─── */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent mb-20" />

          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.25em] uppercase text-accent block mb-3">
                What I&apos;d Build
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold mb-4">
                Four Research Initiatives
              </h2>
              <p className="text-text-secondary text-base max-w-xl mx-auto">
                Each proposal builds on the framework above and maps to a specific
                team&apos;s OKRs.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 mb-16">
            {proposals.map((p, i) => (
              <Card key={p.title} hover className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.12em] uppercase text-accent-warm px-2 py-0.5 rounded-full border border-accent-warm/20 bg-accent-warm/10 inline-block mb-3">
                    {p.tag}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-text-primary mb-2">
                    {p.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {p.body}
                  </p>
                </motion.div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION: ABOUT + CTAs ─── */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent mb-20" />

          <ScrollReveal>
            <div className="glass-card p-8 sm:p-10 mb-12 max-w-2xl mx-auto">
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-text-primary mb-1">
                Alex Turvy, PhD
              </h3>
              <p className="font-[family-name:var(--font-mono)] text-xs text-accent mb-6">
                UX Researcher & AI Practice Lead · Openfield Creative
              </p>
              <div className="text-text-secondary text-sm leading-relaxed space-y-4">
                <p>
                  I built Openfield Creative&apos;s quantitative research practice
                  from nothing — survey methodology, MaxDiff and conjoint, behavioral
                  analytics, R analysis pipelines — while running qualitative
                  programs that kept the human signal in the data.
                </p>
                <p>
                  I have 5 peer-reviewed publications and I&apos;ve been quoted in
                  The Washington Post, WIRED, Reuters, and The Verge. My PhD (Tulane,
                  Sociology) studied how platform design shapes what people can do,
                  see, and create — which is precisely the question this role answers
                  for Spotify&apos;s 640 million listeners.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Button
              href="https://www.linkedin.com/in/alexturvy/"
              variant="secondary"
            >
              LinkedIn
            </Button>
            <Button
              href="https://alexturvy.com/documents/UXPortfolio.pdf"
              variant="secondary"
            >
              UX Portfolio
            </Button>
            <Button href="mailto:alexturvy@gmail.com" variant="secondary">
              alexturvy@gmail.com
            </Button>
          </motion.div>

          <motion.p
            className="text-center mt-12 font-[family-name:var(--font-mono)] text-[10px] text-text-muted"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            The Personalization Perception Lab · Built with Next.js, Framer
            Motion, Recharts
          </motion.p>
        </div>
      </section>
    </div>
  )
}
