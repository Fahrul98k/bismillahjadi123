import { Metadata } from 'next'
import MiniApp from '../components/MiniApp'

export const metadata: Metadata = {
  other: {
    'fc:frame': JSON.stringify({
      version: "next",
      imageUrl: "https://bismillahjadi123.vercel.app/og-image.png",
      button: {
        title: "🚀 Mulai",
        action: {
          type: "launch_frame",
          name: "Farcaster MiniApp Clean",
          url: "https://bismillahjadi123.vercel.app",
          splashImageUrl: "https://bismillahjadi123.vercel.app/logo.png",
          splashBackgroundColor: "#0ea5e9"
        }
      }
    })
  }
}

export default function Home() {
  return <MiniApp />
} 