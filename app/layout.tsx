import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Farcaster MiniApp Clean',
  description: 'Mini App Farcaster modern, siap deploy Vercel',
  metadataBase: new URL('https://bismillahjadi123.vercel.app'),
  openGraph: {
    title: 'Farcaster MiniApp Clean',
    description: 'Mini App Farcaster modern, siap deploy Vercel',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://auth.farcaster.xyz" />
      </head>
      <body>{children}</body>
    </html>
  )
} 