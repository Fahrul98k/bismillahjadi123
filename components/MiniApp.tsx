'use client'

import { useEffect, useState } from 'react'
import { sdk } from '@farcaster/frame-sdk'

export default function MiniApp() {
  const [isReady, setIsReady] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [context, setContext] = useState<any>(null)

  useEffect(() => {
    async function init() {
      try {
        // Cek environment MiniApp
        const isMiniApp = await sdk.isInMiniApp()
        if (isMiniApp) {
          const ctx = await sdk.context
          setContext(ctx)
          setUser(ctx.user)
          await sdk.actions.ready()
        }
        setIsReady(true)
      } catch {
        setIsReady(true)
      }
    }
    init()
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-8 text-white text-center">
          <h1 className="text-2xl font-bold mb-2">🚀 Farcaster MiniApp Clean</h1>
          <p className="text-primary-100">Mini App Farcaster modern, siap deploy Vercel</p>
        </div>
        <div className="p-6 space-y-6">
          {user && (
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-4">
              <div className="flex items-center space-x-4">
                {user.pfpUrl && (
                  <img
                    src={user.pfpUrl}
                    alt="Profile"
                    className="w-12 h-12 rounded-full border-2 border-primary-200"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {user.displayName || `User ${user.fid}`}
                  </h3>
                  {user.username && (
                    <p className="text-sm text-primary-600">@{user.username}</p>
                  )}
                  <p className="text-xs text-gray-500">FID: {user.fid}</p>
                </div>
              </div>
            </div>
          )}
          <Actions context={context} />
        </div>
      </div>
    </div>
  )
}

function Actions({ context }: { context: any }) {
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleAction = async (action: string, actionFn: () => Promise<any>) => {
    setIsLoading(action)
    try {
      await actionFn()
    } catch (error) {
      //
    } finally {
      setIsLoading(null)
    }
  }

  const addMiniApp = () => handleAction('addMiniApp', () => sdk.actions.addMiniApp())
  const composeCast = () => handleAction('composeCast', () => sdk.actions.composeCast({ text: "Saya baru saja mencoba MiniApp Farcaster! 🚀", embeds: [window.location.origin] }))
  const openUrl = () => handleAction('openUrl', () => sdk.actions.openUrl('https://farcaster.xyz'))
  const closeApp = () => handleAction('closeApp', () => sdk.actions.close())

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900">🎯 Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={addMiniApp}
          disabled={isLoading === 'addMiniApp'}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
        >
          {isLoading === 'addMiniApp' ? '⏳' : '📱'} Add MiniApp
        </button>
        <button
          onClick={composeCast}
          disabled={isLoading === 'composeCast'}
          className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
        >
          {isLoading === 'composeCast' ? '⏳' : '📝'} Compose Cast
        </button>
        <button
          onClick={openUrl}
          disabled={isLoading === 'openUrl'}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
        >
          {isLoading === 'openUrl' ? '⏳' : '🔗'} Open URL
        </button>
        <button
          onClick={closeApp}
          disabled={isLoading === 'closeApp'}
          className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
        >
          {isLoading === 'closeApp' ? '⏳' : '❌'} Tutup Aplikasi
        </button>
      </div>
      {context && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <h4 className="font-medium text-gray-900 mb-2">📊 Context Info</h4>
          <div className="text-xs text-gray-600 space-y-1">
            <p>Location: {context.location?.type || 'unknown'}</p>
            <p>Client FID: {context.client?.clientFid || 'unknown'}</p>
            <p>Added: {context.client?.added ? 'Yes' : 'No'}</p>
          </div>
        </div>
      )}
    </div>
  )
} 