import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Authentication Methods Demo</h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Explore different authentication methods: JWT, Sessions, and OAuth
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* JWT Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">JWT</h2>
            <p className="text-gray-600 mb-4">
              JSON Web Tokens - Stateless authentication with signed tokens
            </p>
            <ul className="text-sm text-gray-500 mb-6 space-y-1">
              <li>✓ Stateless</li>
              <li>✓ Scalable</li>
              <li>✓ Cross-domain</li>
              <li>✗ Hard to revoke</li>
            </ul>
            <Link
              href="/jwt"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block"
            >
              Test JWT
            </Link>
          </div>

          {/* Sessions Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <h2 className="text-2xl font-bold mb-4 text-green-600">Sessions</h2>
            <p className="text-gray-600 mb-4">Server sessions with secure cookies</p>
            <ul className="text-sm text-gray-500 mb-6 space-y-1">
              <li>✓ Easy revocation</li>
              <li>✓ More secure</li>
              <li>✓ Total control</li>
              <li>✗ Requires state</li>
            </ul>
            <Link
              href="/session"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 inline-block"
            >
              Test Sessions
            </Link>
          </div>

          {/* OAuth Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">OAuth</h2>
            <p className="text-gray-600 mb-4">
              Authentication with external providers (Google, GitHub, etc.)
            </p>
            <ul className="text-sm text-gray-500 mb-6 space-y-1">
              <li>✓ No passwords needed</li>
              <li>✓ Familiar UX for users</li>
              <li>✓ Secure delegation of authentication</li>
              <li>✗ External dependency</li>
            </ul>
            <Link
              href="/oauth"
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 inline-block"
            >
              Test OAuth
            </Link>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">When to Use Each Method?</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-blue-600">JWT</h4>
              <p>APIs, microservices, distributed applications</p>
            </div>
            <div>
              <h4 className="font-semibold text-green-600">Sessions</h4>
              <p>Traditional web applications, high security</p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-600">OAuth</h4>
              <p>Social login, third-party integration</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
