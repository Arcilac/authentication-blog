'use client'

import type React from 'react'

import { useState } from 'react'

export default function JWTDemo() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/auth/jwt/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.token) {
        setToken(data.token)
        localStorage.setItem('jwt-token', data.token)
        alert('¡Login successful! Token JWT generated')
      } else {
        alert('Login error: ' + data.error)
      }
    } catch (error) {
      alert('Connection error')
    }

    setLoading(false)
  }

  const handleVerify = async () => {
    const storedToken = localStorage.getItem('jwt-token') || token

    if (!storedToken) {
      alert('No token available for verification')
      return
    }

    try {
      const response = await fetch('/api/auth/jwt/verify', {
        headers: { Authorization: `Bearer ${storedToken}` },
      })

      const data = await response.json()

      if (data.user) {
        setUser(data.user)
        alert('Token valid!')
      } else {
        alert('Token invalid: ' + data.error)
      }
    } catch (error) {
      alert('Error verifying token')
    }
  }

  const handleLogout = () => {
    setToken('')
    setUser(null)
    localStorage.removeItem('jwt-token')
    alert('Logout successful')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-600">JWT Authentication Demo</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">How JWT Works?</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>User sends credentials</li>
            <li>Server verifies and generates signed JWT</li>
            <li>Client stores token (localStorage/cookie)</li>
            <li>Client sends token with each request</li>
            <li>Server verifies token signature</li>
          </ol>
        </div>

        {!token ? (
          <form onSubmit={handleLogin} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Login with JWT</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded text-gray-800"
                  placeholder="demo@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded text-gray-800"
                  placeholder="password123"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">Usa: demo@example.com / password123</p>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Token JWT generated</h3>
              <div className="bg-gray-100 p-3 rounded text-xs break-all text-gray-800">{token}</div>
              <div className="mt-4 space-x-2">
                <button
                  onClick={handleVerify}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Validate Token
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </div>

            {user && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800">User authenticated:</h4>
                <pre className="text-sm mt-2 text-green-700">{JSON.stringify(user, null, 2)}</pre>
              </div>
            )}
          </div>
        )}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800">Advantages of JWT:</h4>
          <ul className="text-sm mt-2 space-y-1">
            <li>• Stateless authentication (no need for server-side sessions)</li>
            <li>• Scalable for distributed systems</li>
            <li>• Compact and URL-safe format</li>
            <li>• Decentralized verification across services</li>
            <li>• Supports custom claims (e.g., roles, permissions)</li>
            <li>• Widely supported and easy to implement</li>
            <li>• Built-in expiration and refresh strategies</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
