'use client'

import { useState, useEffect } from 'react'
import { sdk } from '@farcaster/frame-sdk'

export function Capabilities() {
  const [capabilities, setCapabilities] = useState<string[]>([])
  const [chains, setChains] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkCapabilities = async () => {
      try {
        // Cek apakah SDK tersedia
        if (!sdk || !sdk.getCapabilities || !sdk.getChains) {
          setError('SDK tidak tersedia')
          setIsLoading(false)
          return
        }

        const [capabilitiesList, chainsList] = await Promise.all([
          sdk.getCapabilities().catch(() => []),
          sdk.getChains().catch(() => [])
        ])
        
        setCapabilities(capabilitiesList)
        setChains(chainsList)
      } catch (error) {
        console.error('Error checking capabilities:', error)
        setError('Gagal memuat capabilities')
      } finally {
        setIsLoading(false)
      }
    }

    checkCapabilities()
  }, [])

  const getCapabilityIcon = (capability: string) => {
    if (capability.includes('wallet')) return '💼'
    if (capability.includes('actions')) return '🎯'
    if (capability.includes('haptics')) return '📳'
    if (capability.includes('back')) return '⬅️'
    return '✅'
  }

  const getChainIcon = (chain: string) => {
    if (chain.includes('eip155:1')) return '🔵' // Ethereum
    if (chain.includes('eip155:8453')) return '🔵' // Base
    if (chain.includes('eip155:10')) return '🔴' // Optimism
    if (chain.includes('solana')) return '🟣' // Solana
    return '⛓️'
  }

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="font-semibold text-gray-900 mb-3">🔧 Capabilities</h3>
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
        <h3 className="font-semibold text-gray-900 mb-3">🔧 Capabilities</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-800">❌ {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <h3 className="font-semibold text-gray-900 mb-3">🔧 Capabilities</h3>
      
      <div className="space-y-4">
        {/* Chains */}
        <div>
          <h4 className="font-medium text-gray-700 mb-2">⛓️ Supported Chains</h4>
          <div className="flex flex-wrap gap-2">
            {chains.map((chain) => (
              <span
                key={chain}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {getChainIcon(chain)} {chain}
              </span>
            ))}
            {chains.length === 0 && (
              <span className="text-sm text-gray-500">Tidak ada chain yang didukung</span>
            )}
          </div>
        </div>

        {/* Capabilities */}
        <div>
          <h4 className="font-medium text-gray-700 mb-2">🎯 Supported Capabilities</h4>
          <div className="space-y-1">
            {capabilities.map((capability) => (
              <div
                key={capability}
                className="flex items-center text-sm text-gray-600"
              >
                <span className="mr-2">{getCapabilityIcon(capability)}</span>
                <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
                  {capability}
                </code>
              </div>
            ))}
            {capabilities.length === 0 && (
              <span className="text-sm text-gray-500">Tidak ada capability yang didukung</span>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-sm text-gray-600">
            <p>📊 Total Chains: {chains.length}</p>
            <p>🎯 Total Capabilities: {capabilities.length}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 