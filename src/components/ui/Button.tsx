'use client'

import { motion } from 'framer-motion'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  href?: string
  className?: string
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  href,
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-[family-name:var(--font-body)] font-semibold tracking-wide transition-all duration-200 cursor-pointer'

  const variants = {
    primary:
      'bg-accent text-bg-primary px-8 py-3.5 rounded-full text-sm hover:bg-[#1fdf64] hover:scale-[1.02] active:scale-[0.98] active:bg-[#1ac955]',
    secondary:
      'border border-[rgba(255,255,255,0.15)] text-text-primary px-6 py-2.5 rounded-full text-sm hover:border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.05)]',
    ghost:
      'text-text-secondary text-sm hover:text-text-primary underline-offset-4 hover:underline',
  }

  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      className={classes}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  )
}
