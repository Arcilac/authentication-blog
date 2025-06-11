'use client'

import type React from 'react'

import { useState, useEffect } from 'react'

export default function SessionDemo() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    try {
      const response = await fetch('/api/protected')
      const data = await response.json()

      if (data.user) {
        setUser(data.user)
      }
    } catch (error) {
      console.log('No session found')
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/auth/session/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        setUser(data.user)
        alert('¡Login successful! Session created')
      } else {
        alert('Login error: ' + data.error)
      }
    } catch (error) {
      alert('Connection error')
    }

    setLoading(false)
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/session/logout', { method: 'POST' })
      setUser(null)
      alert('Logout successful')
    } catch (error) {
      alert('Logout error')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-green-600">Session Authentication Demo</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">How Sessions Work?</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>User sends credentials</li>
            <li>Server creates session and stores it</li>
            <li>Server sends cookie with session ID</li>
            <li>Client automatically sends cookie</li>
            <li>Server validates session ID</li>
          </ol>
        </div>

        {!user ? (
          <form onSubmit={handleLogin} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Login with Sessions</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="demo@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="password123"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">Use: demo@example.com / password123</p>
          </form>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Active Session</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-green-800">Authenticated User:</h4>
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

        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-800">Advantages of Sessions:</h4>
          <ul className="text-sm mt-2 space-y-1">
            <li>• Easy revocation of sessions</li>
            <li>• Greater server control</li>
            <li>• More secure HttpOnly cookies</li>
            <li>• Ideal for traditional web applications</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
