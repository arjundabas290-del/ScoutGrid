import Link from 'next/link'
import { Trophy, Target, Users, Zap } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-black" />
            </div>
            <span className="font-bold text-xl tracking-tight">
              Scout<span className="text-green-400">Grid</span>
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Built for players who deserve to be seen.
          </h1>
          <p className="text-white/50 text-lg leading-relaxed">
            The college soccer recruiting process is broken. Talented players get overlooked
            because they don't know how to market themselves. ScoutGrid fixes that.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4 text-green-400" />
            <h2 className="font-semibold text-white">The Mission</h2>
          </div>
          <p className="text-white/60 leading-relaxed">
            We built ScoutGrid to give every player — regardless of club size or connections —
            a professional recruiting profile they can share directly with college coaches.
            No expensive recruiting services. No middlemen. Just your highlights, your stats,
            and a link coaches can actually use.
          </p>
        </div>

        {/* Why it exists */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-green-400" />
            <h2 className="font-semibold text-white">Why We Built This</h2>
          </div>
          <p className="text-white/60 leading-relaxed">
            Having played competitive soccer and watched teammates get overlooked by coaches
            who simply never saw them play, we knew there had to be a better way. Existing
            platforms are clunky, expensive, and built for the platform — not the player.
            ScoutGrid puts the player first.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { value: 'Free', label: 'Always free for players' },
            { value: '2 min', label: 'To create a profile' },
            { value: '100%', label: 'Player owned profiles' },
          ].map(({ value, label }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <p className="text-2xl font-bold text-green-400 mb-1">{value}</p>
              <p className="text-white/40 text-xs">{label}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-4 h-4 text-green-400" />
            <h2 className="font-semibold text-white">Who We Are</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-black font-bold text-lg flex-shrink-0">
              A
            </div>
            <div>
              <p className="font-medium text-white">Arjun Dabas</p>
              <p className="text-white/40 text-sm">Founder · Student athlete & developer</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to get recruited?</h2>
          <p className="text-white/40 mb-6">Create your free profile in 2 minutes.</p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/create-profile"
              className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              Create Your Profile
            </Link>
            <Link
              href="/"
              className="border border-white/10 hover:border-white/20 text-white/70 hover:text-white font-medium px-6 py-3 rounded-xl transition-colors text-sm"
            >
              Browse Players
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
