'use client'

import Link from 'next/link'
import { Trophy } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="border-b border-white/10 bg-black/40 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-black" />
            </div>
            <span className="font-bold text-xl tracking-tight">
              Scout<span className="text-green-400">Grid</span>
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Players
            </Link>
            <Link
              href="/coaches"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Coaches
            </Link>
            <Link
              href="/about"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="/create-profile"
              className="bg-green-500 hover:bg-green-400 text-black text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Create Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
