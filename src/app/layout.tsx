import type { Metadata } from 'next'
import { Syne, Martian_Mono, Outfit } from 'next/font/google'
import './globals.css'

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  display: 'swap',
})

const martianMono = Martian_Mono({
  variable: '--font-martian',
  subsets: ['latin'],
  display: 'swap',
})

const outfit = Outfit({
  variable: '--font-circular',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://alexturvy.com/spotify'),
  title: 'The Personalization Perception Lab — Alex Turvy',
  description:
    'A live research instrument measuring the gap between what Spotify\'s algorithm does and what listeners actually perceive. Built by Alex Turvy, PhD.',
  openGraph: {
    title: 'The Personalization Perception Lab',
    description:
      'You\'ve listened to 847 songs this month. But how many felt like they were chosen for you?',
    type: 'website',
    url: 'https://alexturvy.com/spotify',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Personalization Perception Lab',
    description:
      'You\'ve listened to 847 songs this month. But how many felt like they were chosen for you?',
    images: ['/og.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${martianMono.variable} ${outfit.variable} antialiased`}
      >
        <div className="gradient-mesh" />
        {children}
      </body>
    </html>
  )
}
