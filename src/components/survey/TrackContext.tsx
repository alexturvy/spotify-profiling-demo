'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrackInfo } from '@/types/survey'

interface TrackContextProps {
  tracks: TrackInfo[]
  hasPlayButton?: boolean
}

function TrackCard({
  track,
  hasPlayButton,
  onPlay,
}: {
  track: TrackInfo
  hasPlayButton?: boolean
  onPlay?: () => void
}) {
  return (
    <div
      className="w-[72px] h-[72px] rounded-lg shrink-0 relative overflow-hidden cursor-default"
      style={{
        background: `linear-gradient(135deg, ${track.colors[0]}, ${track.colors[1]})`,
        boxShadow: 'inset 0 -24px 20px -12px rgba(0,0,0,0.5)',
      }}
    >
      {/* Album cover text overlay */}
      <div className="absolute bottom-1.5 left-1.5 right-1.5 z-10">
        <p
          className="text-white text-[9px] font-medium leading-tight truncate"
          style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
        >
          {track.artist}
        </p>
        <p
          className="text-white/70 text-[8px] leading-tight truncate"
          style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
        >
          {track.title}
        </p>
      </div>
      {hasPlayButton && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onPlay?.()
          }}
          className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/30 transition-colors z-20"
          aria-label={`Play ${track.title} by ${track.artist}`}
        >
          <span className="text-white/80 text-xs">▶</span>
        </button>
      )}
    </div>
  )
}

function PlayJokeModal({ onDismiss }: { onDismiss: () => void }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onDismiss} />
      <motion.div
        className="glass-card p-8 max-w-md relative z-10 text-center"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2, delay: 0.05 }}
      >
        {loading ? (
          <motion.div
            className="w-8 h-8 rounded-full border-2 border-accent/30 mx-auto"
            animate={{
              scale: [1, 1.2, 1],
              borderColor: [
                'rgba(30,215,96,0.3)',
                'rgba(30,215,96,0.6)',
                'rgba(30,215,96,0.3)',
              ],
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        ) : (
          <>
            <p className="text-text-primary text-base leading-relaxed mb-6">
              I don&apos;t actually have the Spotify API. But the fact that you
              wanted to hear it before rating it? That&apos;s a behavioral signal
              this survey captures — you evaluate recommendations by engaging,
              not just browsing.
            </p>
            <button
              onClick={onDismiss}
              className="font-[family-name:var(--font-mono)] text-sm text-accent hover:text-accent/80 transition-colors"
            >
              Fair enough. Back to the question.
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function TrackContext({ tracks, hasPlayButton }: TrackContextProps) {
  const [showJoke, setShowJoke] = useState(false)
  const isGrid = tracks.length > 3

  return (
    <>
      <motion.div
        className={
          isGrid
            ? 'grid grid-cols-4 gap-2.5 mb-8 max-w-[330px] mx-auto'
            : 'flex items-center justify-center gap-3 mb-8 flex-wrap'
        }
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {tracks.map((track) => (
          <TrackCard
            key={`${track.artist}-${track.title}`}
            track={track}
            hasPlayButton={hasPlayButton}
            onPlay={() => setShowJoke(true)}
          />
        ))}
      </motion.div>

      <AnimatePresence>
        {showJoke && <PlayJokeModal onDismiss={() => setShowJoke(false)} />}
      </AnimatePresence>
    </>
  )
}
