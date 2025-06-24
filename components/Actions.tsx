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

  const addFrame = () => handleAction('addFrame', () => sdk.actions.addFrame())
  
  const openUrl = () => handleAction('openUrl', () => 
    sdk.actions.openUrl('https://farcaster.xyz')
  )

  const closeApp = () => handleAction('closeApp', () => sdk.actions.close())

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900">🎯 Actions</h3>
      
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={addFrame}
          disabled={isLoading === 'addFrame'}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
        >
          {isLoading === 'addFrame' ? '⏳' : '📱'} Add Frame
        </button>

        <button
          onClick={openUrl}
          disabled={isLoading === 'openUrl'}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
        >
          {isLoading === 'openUrl' ? '⏳' : '🔗'} Open URL
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