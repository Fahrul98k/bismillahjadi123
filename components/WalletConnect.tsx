'use client'

import { useState, useEffect } from 'react'
import { sdk } from '@farcaster/frame-sdk'

export function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const provider = await sdk.wallet.getEthereumProvider()
        if (provider) {
          const accounts = await provider.request({ method: 'eth_accounts' })
          if (accounts && accounts.length > 0) {
            setIsConnected(true)
            setAddress(accounts[0] as string)
          }
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error)
      }
    }

    checkConnection()
  }, [])

  const handleConnect = async () => {
    setIsLoading(true)
    try {
      const provider = await sdk.wallet.getEthereumProvider()
      if (provider) {
        const accounts = await provider.request({ method: 'eth_requestAccounts' })
        if (accounts && accounts.length > 0) {
          setIsConnected(true)
          setAddress(accounts[0] as string)
        }
      }
    } catch (error) {
      console.error('Error connecting wallet:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setAddress(null)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <h3 className="font-semibold text-gray-900 mb-3">🔗 Wallet Connection</h3>
      
      {isConnected ? (
        <div className="space-y-3">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-800 font-medium">✅ Terhubung</p>
            <p className="text-xs text-green-600 font-mono break-all">
              {address}
            </p>
          </div>
          <button
            onClick={handleDisconnect}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Putuskan Koneksi
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">⚠️ Wallet belum terhubung</p>
          </div>
          <button
            onClick={handleConnect}
            disabled={isLoading}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-300 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {isLoading ? '⏳' : '🔗'} Hubungkan Wallet
          </button>
        </div>
      )}
    </div>
  )
} 