import { Metadata } from 'next'
import MiniApp from '@/components/MiniApp'

export const metadata: Metadata = {
  other: {
    'fc:frame': JSON.stringify({
      version: "next",
      imageUrl: "https://your-domain.com/og-image.png",
      button: {
        title: "🚀 Mulai",
        action: {
          type: "launch_frame",
          name: "Taik Mini App",
          url: "https://your-domain.com",
          splashImageUrl: "https://your-domain.com/logo.png",
          splashBackgroundColor: "#0ea5e9"
        }
      }
    })
  }
}

export default function Home() {
  return <MiniApp />
} 