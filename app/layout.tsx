import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Taik Mini App',
  description: 'Mini App Farcaster yang dibuat dengan Next.js',
  metadataBase: new URL('https://your-domain.com'),
  openGraph: {
    title: 'Taik Mini App',
    description: 'Mini App Farcaster yang dibuat dengan Next.js',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://auth.farcaster.xyz" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
} 