import Link from 'next/link'
import { Search, Star, Mail, Filter } from 'lucide-react'
import { supabase, Player } from '@/lib/supabase'
import PlayersClient from '../players-client'

async function getPlayers(): Promise<Player[]> {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return []
  return data as Player[]
}

export default async function CoachesPage() {
  const players = await getPlayers()
  const committed = players.filter((p) => p.committed).length

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 mb-6">
              <Star className="w-3 h-3 text-blue-400 fill-blue-400" />
              <span className="text-blue-400 text-xs font-medium">
                Free for college coaches
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-none mb-4">
              Find Your Next{' '}
              <span className="text-blue-400">Recruit.</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Browse verified player profiles, watch highlight reels, and
              connect directly with prospects. No gatekeepers, no fees.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="mailto:arjundabas290@gmail.com?subject=ScoutGrid Coach Access"
                className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Request Coach Access
              </a>
              <Link
                href="/"
                className="border border-white/10 hover:border-white/20 text-white/70 hover:text-white font-medium px-6 py-3 rounded-xl transition-colors text-sm"
              >
                Browse Players →
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-16">
            {[
              { icon: Search, label: 'Searchable Profiles', value: `${players.length}` },
              { icon: Filter, label: 'Positions', value: '10' },
              { icon: Star, label: 'Committed Players', value: `${committed}` },
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

      {/* How it works */}
      <section className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-lg font-semibold text-white mb-6">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                step: '01',
                title: 'Search & Filter',
                desc: 'Filter by position, grad year, location, and GPA to find the right fit for your program.',
              },
              {
                step: '02',
                title: 'Watch Highlights',
                desc: 'Every profile includes a highlight reel. See players in action before reaching out.',
              },
              {
                step: '03',
                title: 'Contact Directly',
                desc: "Use the player's profile page to reach out. No middlemen, no delays.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-3xl font-bold text-white/10 mb-3">{step}</p>
                <h3 className="font-semibold text-white mb-1">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Player browser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-xl font-semibold text-white mb-6">Browse Players</h2>
        <PlayersClient players={players} />
      </section>
    </div>
  )
}
