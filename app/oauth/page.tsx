'use client'

import { useState } from 'react'

export default function OAuthDemo() {
  type OAuthUser = {
    id: string
    name: string
    email: string
    provider: string
    avatar: string
  }

  const [user, setUser] = useState<OAuthUser | null>(null)

  // Simulation of OAuth login flows
  const handleGoogleLogin = () => {
    // Simulate redirect to Google OAuth
    alert(
      'In production, this would redirect to Google OAuth.\n\nTypical flow:\n1. Redirect to Google\n2. User authorizes\n3. Google returns code\n4. Exchange code for token\n5. Get user data',
    )

    // Simulate successful response
    setTimeout(() => {
      setUser({
        id: 'google_123',
        name: 'Demo User',
        email: 'demo@gmail.com',
        provider: 'Google',
        avatar: '/placeholder.svg?height=40&width=40',
      })
    }, 1000)
  }

  const handleGitHubLogin = () => {
    alert(
      'In production, this would redirect to GitHub OAuth.\n\nSimilar to the Google flow but with GitHub as the provider.',
    )

    setTimeout(() => {
      setUser({
        id: 'github_456',
        name: 'Dev User',
        email: 'demo@github.com',
        provider: 'GitHub',
        avatar: '/placeholder.svg?height=40&width=40',
      })
    }, 1000)
  }

  const handleLogout = () => {
    setUser(null)
    alert('Logout successful')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-purple-600">OAuth Authentication Demo</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">How OAuth Works?</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>User clicks "Login with Google/GitHub"</li>
            <li>Redirect to OAuth provider</li>
            <li>User authorizes the application</li>
            <li>Provider returns authorization code</li>
            <li>Exchange code for access token</li>
            <li>Use token to get user data</li>
          </ol>
        </div>

        {!user ? (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Login with OAuth</h3>
            <div className="space-y-4">
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center space-x-2 bg-red-500 text-white p-3 rounded hover:bg-red-600"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <button
                onClick={handleGitHubLogin}
                className="w-full flex items-center justify-center space-x-2 bg-gray-800 text-white p-3 rounded hover:bg-gray-900"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>Continue with GitHub</span>
              </button>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This is a simulation. In production, you would use
                NextAuth.js or similar to handle real OAuth.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">User Authenticated via OAuth</h3>
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={user.avatar || '/placeholder.svg'}
                alt="Avatar"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h4 className="font-semibold">{user.name}</h4>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">Provider: {user.provider}</p>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-purple-800">User Data:</h4>
              <pre className="text-sm mt-2">{JSON.stringify(user, null, 2)}</pre>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}

        <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-purple-800">Advantages of OAuth:</h4>
          <ul className="text-sm mt-2 space-y-1">
            <li>• No need to handle passwords</li>
            <li>• Familiar UX for users</li>
            <li>• Secure delegation of authentication</li>
            <li>• Access to provider data (with permissions)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
