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
  const [isReady, setIsReady] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [context, setContext] = useState<any>(null)

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Cek apakah kita berada di Mini App environment
        const isMiniApp = await sdk.isInMiniApp()
        
        if (isMiniApp) {
          // Dapatkan context
          const appContext = sdk.context
          setContext(appContext)
          setUser(appContext.user)
          
          // Sembunyikan splash screen
          await sdk.actions.ready()
          setIsReady(true)
        } else {
          // Fallback untuk web biasa
          setIsReady(true)
        }
      } catch (error) {
        console.error('Error initializing Mini App:', error)
        setIsReady(true)
      }
    }

    initializeApp()
  }, [])

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-primary-700">Memuat aplikasi...</p>
        </div>
      </div>
    )
  }

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
              {/* User Profile */}
              {user && <UserProfile user={user} />}

              {/* Quick Auth */}
              <QuickAuth />

              {/* Capabilities */}
              <Capabilities />

              {/* Wallet Connection */}
              <WalletConnect />

              {/* Actions */}
              <Actions context={context} />
            </div>
          </div>
        </div>
      </div>
    </WagmiProvider>
  )
} 