'use client'

interface User {
  fid: number
  username?: string
  displayName?: string
  pfpUrl?: string
}

interface UserProfileProps {
  user: User
}

export function UserProfile({ user }: UserProfileProps) {
  return (
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
  )
} 