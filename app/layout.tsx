import type React from 'react'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Auth Methods Demo - JWT vs Sessions vs OAuth',
  description: 'Demostración práctica de diferentes métodos de autenticación',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Auth Methods Demo</h1>
            <div className="space-x-4">
              <a href="/" className="hover:text-gray-300">
                Home
              </a>
              <a href="/jwt" className="hover:text-gray-300">
                JWT
              </a>
              <a href="/session" className="hover:text-gray-300">
                Sessions
              </a>
              <a href="/oauth" className="hover:text-gray-300">
                OAuth
              </a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
