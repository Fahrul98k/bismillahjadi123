'use client'

import { useState } from 'react'
import { sdk } from '@farcaster/frame-sdk'

interface ActionsProps {
  context: any
}

export function Actions({ context }: ActionsProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleAction = async (action: string, actionFn: () => Promise<any>) => {
    setIsLoading(action)
    try {
      await actionFn()
    } catch (error) {
      console.error(`Error in ${action}:`, error)
    } finally {
      setIsLoading(null)
    }
  }

  const addMiniApp = () => handleAction('addMiniApp', () => sdk.actions.addMiniApp())
  
  const composeCast = () => handleAction('composeCast', () => 
    sdk.actions.composeCast({
      text: "Saya baru saja mencoba Taik Mini App! 🚀",
      embeds: ["https://your-domain.com"]
    })
  )

  const viewProfile = () => handleAction('viewProfile', () => 
    sdk.actions.viewProfile({ fid: 6841 }) // Contoh FID
  )

  const openUrl = () => handleAction('openUrl', () => 
    sdk.actions.openUrl('https://farcaster.xyz')
  )

  const closeApp = () => handleAction('closeApp', () => sdk.actions.close())

  const triggerHaptic = async (type: 'impact' | 'notification' | 'selection') => {
    try {
      const capabilities = await sdk.getCapabilities()
      
      if (type === 'impact' && capabilities.includes('haptics.impactOccurred')) {
        await sdk.haptics.impactOccurred('medium')
      } else if (type === 'notification' && capabilities.includes('haptics.notificationOccurred')) {
        await sdk.haptics.notificationOccurred('success')
      } else if (type === 'selection' && capabilities.includes('haptics.selectionChanged')) {
        await sdk.haptics.selectionChanged()
      }
    } catch (error) {
      console.error('Haptic error:', error)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900">🎯 Actions</h3>
      
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={addMiniApp}
          disabled={isLoading === 'addMiniApp'}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
        >
          {isLoading === 'addMiniApp' ? '⏳' : '📱'} Add App
        </button>

        <button
          onClick={composeCast}
          disabled={isLoading === 'composeCast'}
          className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
        >
          {isLoading === 'composeCast' ? '⏳' : '📝'} Compose Cast
        </button>

        <button
          onClick={viewProfile}
          disabled={isLoading === 'viewProfile'}
          className="bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
        >
          {isLoading === 'viewProfile' ? '⏳' : '👤'} View Profile
        </button>

        <button
          onClick={openUrl}
          disabled={isLoading === 'openUrl'}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
        >
          {isLoading === 'openUrl' ? '⏳' : '🔗'} Open URL
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => triggerHaptic('impact')}
          className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
        >
          📳 Impact
        </button>

        <button
          onClick={() => triggerHaptic('notification')}
          className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
        >
          🔔 Notify
        </button>

        <button
          onClick={() => triggerHaptic('selection')}
          className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
        >
          ✨ Select
        </button>
      </div>

      <button
        onClick={closeApp}
        disabled={isLoading === 'closeApp'}
        className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        {isLoading === 'closeApp' ? '⏳' : '❌'} Tutup Aplikasi
      </button>

      {/* Context Info */}
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