'use client'

import { useEffect, useState } from 'react'
import { sdk } from '@farcaster/frame-sdk'
import { WagmiProvider } from './WagmiProvider'
import { WalletConnect } from './WalletConnect'
import { UserProfile } from './UserProfile'
import { Actions } from './Actions'
import { QuickAuth } from './QuickAuth'
import { Capabilities } from './Capabilities'

export default function MiniApp() {
  const [user, setUser] = useState<any>(null)
  const [context, setContext] = useState<any>(null)

  useEffect(() => {
    // Ambil context langsung dari sdk lama
    if (sdk && sdk.context) {
      setContext(sdk.context)
      setUser(sdk.context.user)
    }
  }, [])

  return (
    <WagmiProvider>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-8 text-white text-center">
              <h1 className="text-2xl font-bold mb-2">🚀 Taik Mini App</h1>
              <p className="text-primary-100">Mini App Farcaster dengan Next.js</p>
            </div>
            {/* Content */}
            <div className="p-6 space-y-6">
              {user && <UserProfile user={user} />}
              <QuickAuth />
              <Capabilities />
              <WalletConnect />
              <Actions context={context} />
            </div>
          </div>
        </div>
      </div>
    </WagmiProvider>
  )
} 