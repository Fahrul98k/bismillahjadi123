'use client'

export function Capabilities() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <h3 className="font-semibold text-gray-900 mb-3">🔧 SDK Info</h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-700 mb-2">🎯 Available Methods (SDK v0.0.16)</h4>
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