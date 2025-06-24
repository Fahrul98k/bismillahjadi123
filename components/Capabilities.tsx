'use client'

import { useState, useEffect } from 'react'
import { sdk } from '@farcaster/frame-sdk'

export function Capabilities() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkSDK = async () => {
      try {
        // Cek apakah SDK tersedia
        if (!sdk) {
          setError('SDK tidak tersedia')
          setIsLoading(false)
          return
        }

        // Untuk versi 0.0.16, kita hanya bisa cek method yang tersedia
        const availableMethods = []
        
        if (sdk.actions) {
          if (sdk.actions.addFrame) availableMethods.push('actions.addFrame')
          if (sdk.actions.openUrl) availableMethods.push('actions.openUrl')
          if (sdk.actions.close) availableMethods.push('actions.close')
        }

        if (sdk.wallet) {
          if (sdk.wallet.getEthereumProvider) availableMethods.push('wallet.getEthereumProvider')
        }

        setIsLoading(false)
      } catch (error) {
        console.error('Error checking SDK:', error)
        setError('Gagal memuat SDK info')
        setIsLoading(false)
      }
    }

    checkSDK()
  }, [])

  const getCapabilityIcon = (capability: string) => {
    if (capability.includes('wallet')) return '💼'
    if (capability.includes('actions')) return '🎯'
    return '✅'
  }

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="font-semibold text-gray-900 mb-3">🔧 SDK Info</h3>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="font-semibold text-gray-900 mb-3">🔧 SDK Info</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-800">❌ {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <h3 className="font-semibold text-gray-900 mb-3">🔧 SDK Info</h3>
      
      <div className="space-y-4">
        {/* Available Methods */}
        <div>
          <h4 className="font-medium text-gray-700 mb-2">🎯 Available Methods</h4>
          <div className="space-y-1">
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">🎯</span>
              <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
                actions.addFrame
              </code>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">🔗</span>
              <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
                actions.openUrl
              </code>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">❌</span>
              <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
                actions.close
              </code>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">💼</span>
              <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
                wallet.getEthereumProvider
              </code>
            </div>
          </div>
        </div>

        {/* SDK Version */}
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-sm text-gray-600">
            <p>📦 SDK Version: 0.0.16</p>
            <p>🎯 Total Methods: 4</p>
          </div>
        </div>
      </div>
    </div>
  )
} 