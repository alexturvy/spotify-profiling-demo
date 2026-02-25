'use client'

import { motion } from 'framer-motion'

const framework = [
  {
    construct: 'Perceived Fit',
    question: 'Does the algorithm reflect my taste?',
    items: [
      'Q1: Direct accuracy rating (Discover Weekly) — anchor item',
      'Q2: Engagement intent as proxy for signal quality (Release Radar) — latent item',
    ],
  },
  {
    construct: 'Algorithmic Transparency',
    question: 'Do I understand why I\'m hearing this?',
    items: [
      'Q3: Explanation credibility (AI DJ) — direct assessment',
      'Q4: Attribution need via behavioral instinct (Daily Mix) — latent item',
    ],
  },
  {
    construct: 'Emotional Resonance',
    question: 'Does personalization create feeling?',
    items: [
      'Q5: Moment-level resonance frequency — direct recall',
      'Q6: Anticipatory accuracy from naming (Daylist) — latent item',
    ],
  },
  {
    construct: 'Agency & Trust',
    question: 'Am I a partner or a subject?',
    items: [
      'Q7: Feedback loop confidence (skip behavior) — direct assessment',
      'Q8: Agency orientation via scenario reaction — latent item',
    ],
  },
]

const annotations = [
  'Each construct measured by 1 direct + 1 latent item — respondents rate experience, not constructs',
  'Latent factor structure validated via confirmatory factor analysis (CFA)',
  'Listener types emerge from latent profile analysis (LPA), not rule-based classification',
  'Each construct maps to a specific feature team\'s OKRs',
]

export default function FrameworkDiagram() {
  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        className="glass-card p-6 sm:p-8 font-[family-name:var(--font-mono)] text-sm"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h4 className="text-accent text-xs tracking-[0.15em] uppercase mb-6">
          Latent Perception Framework
        </h4>

        <div className="space-y-5">
          {framework.map((f, i) => (
            <motion.div
              key={f.construct}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="text-text-primary font-semibold whitespace-nowrap">
                  {f.construct}
                </span>
                <span className="text-text-muted hidden sm:inline">
                  {'─'.repeat(3)}
                </span>
                <span className="text-text-secondary text-xs italic">
                  &ldquo;{f.question}&rdquo;
                </span>
              </div>
              {f.items.map((item) => (
                <div key={item} className="ml-4 text-text-muted text-xs">
                  <span className="text-text-muted/50 mr-2">├──</span>
                  {item}
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border space-y-1">
          {annotations.map((a) => (
            <div key={a} className="text-text-secondary text-xs">
              <span className="text-accent mr-2">→</span>
              {a}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
