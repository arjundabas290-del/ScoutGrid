import Link from 'next/link'
import { Users, Search, Shield } from 'lucide-react'
import { supabase, Player } from '@/lib/supabase'
import PlayersClient from './players-client'

async function getPlayers(): Promise<Player[]> {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch players:', error.message)
    return []
  }
  return data as Player[]
}

export default async function Home() {
  const players = await getPlayers()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/30 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-medium">
                {players.length > 0 ? `${players.length} verified players` : '500+ verified players'}
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-none mb-4">
              Get{' '}
              <span className="gradient-text">Recruited.</span>
              <br />
              Get Seen.
            </h1>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              The recruiting platform built for the next generation of soccer
              talent. Create your profile, upload highlights, and connect with
              college coaches.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/create-profile"
                className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                Create Free Profile
              </Link>
              <Link
                href="/coaches"
                className="border border-white/10 hover:border-white/20 text-white/70 hover:text-white font-medium px-6 py-3 rounded-xl transition-colors text-sm"
              >
                I&apos;m a Coach →
              </Link>
            </div>
          </div>

          <div className="flex gap-8 mt-16">
            {[
              { icon: Users, label: 'Players', value: `${players.length}` },
              { icon: Search, label: 'Coach Views', value: '12k+' },
              { icon: Shield, label: 'Commitments', value: `${players.filter(p => p.committed).length}` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label}>
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-white/40 text-sm flex items-center gap-1.5 mt-0.5">
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Player Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-xl font-semibold text-white mb-6">Browse Players</h2>
        <PlayersClient players={players} />
      </section>
    </div>
  )
}
