'use client'

import { useState, useEffect } from 'react'
import { sdk } from '@farcaster/frame-sdk'

export function QuickAuth() {
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState<any>(null)

  const getToken = async () => {
    setIsLoading(true)
    try {
      const { token: authToken } = await sdk.quickAuth.getToken()
      setToken(authToken)
      
      // Contoh penggunaan fetch dengan token
      const response = await sdk.quickAuth.fetch('https://api.example.com/me')
      if (response.ok) {
        const user = await response.json()
        setUserData(user)
      }
    } catch (error) {
      console.error('Quick Auth error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const makeAuthenticatedRequest = async () => {
    try {
      const response = await sdk.quickAuth.fetch('https://api.example.com/protected', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'Hello from Mini App!' }),
      })
      
      if (response.ok) {
        const result = await response.json()
        console.log('Authenticated request result:', result)
      }
    } catch (error) {
      console.error('Authenticated request error:', error)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <h3 className="font-semibold text-gray-900 mb-3">🔐 Quick Auth</h3>
      
      <div className="space-y-3">
        <button
          onClick={getToken}
          disabled={isLoading}
          className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          {isLoading ? '⏳' : '🔑'} Get Auth Token
        </button>

        {token && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-800 font-medium">✅ Token Tersedia</p>
            <p className="text-xs text-green-600 font-mono break-all">
              {token.substring(0, 20)}...
            </p>
          </div>
        )}

        {userData && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800 font-medium">👤 User Data</p>
            <pre className="text-xs text-blue-600 overflow-auto">
              {JSON.stringify(userData, null, 2)}
            </pre>
          </div>
        )}

        <button
          onClick={makeAuthenticatedRequest}
          disabled={!token}
          className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          🌐 Make Auth Request
        </button>
      </div>
    </div>
  )
} 