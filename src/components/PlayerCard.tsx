import Link from 'next/link'
import { MapPin, GraduationCap, Star } from 'lucide-react'
import { Player } from '@/lib/supabase'

const positionColors: Record<string, string> = {
  Goalkeeper: 'bg-yellow-500/20 text-yellow-300',
  'Center Back': 'bg-blue-500/20 text-blue-300',
  'Right Back': 'bg-blue-500/20 text-blue-300',
  'Left Back': 'bg-blue-500/20 text-blue-300',
  'Defensive Mid': 'bg-purple-500/20 text-purple-300',
  'Central Midfielder': 'bg-purple-500/20 text-purple-300',
  'Attacking Mid': 'bg-orange-500/20 text-orange-300',
  Winger: 'bg-red-500/20 text-red-300',
  Striker: 'bg-green-500/20 text-green-300',
}

export default function PlayerCard({ player }: { player: Player }) {
  const initials = player.name
    .split(' ')
    .map((n) => n[0])
    .join('')

  const positionColor =
    positionColors[player.position] ?? 'bg-white/10 text-white/60'

  return (
    <Link href={`/players/${player.username}`}>
      <div className="card-hover bg-white/5 border border-white/10 rounded-2xl p-5 cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-black font-bold text-lg flex-shrink-0">
              {initials}
            </div>
            <div>
              <h3 className="font-semibold text-white text-base leading-tight">
                {player.name}
              </h3>
              <p className="text-white/50 text-sm">{player.club}</p>
            </div>
          </div>
          {player.committed && (
            <div className="flex items-center gap-1 bg-green-500/10 border border-green-500/30 rounded-full px-2 py-0.5">
              <Star className="w-3 h-3 text-green-400 fill-green-400" />
              <span className="text-green-400 text-xs font-medium">
                {player.committed_to}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${positionColor}`}>
            {player.position}
          </span>
          {player.secondary_position && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 text-white/40">
              {player.secondary_position}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-white/5 rounded-xl p-2 text-center">
            <p className="text-xl font-bold text-white">{player.stats.goals}</p>
            <p className="text-white/40 text-xs">Goals</p>
          </div>
          <div className="bg-white/5 rounded-xl p-2 text-center">
            <p className="text-xl font-bold text-white">{player.stats.assists}</p>
            <p className="text-white/40 text-xs">Assists</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-white/40 text-xs">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {player.location}
          </div>
          <div className="flex items-center gap-1">
            <GraduationCap className="w-3 h-3" />
            Class of {player.grad_year}
          </div>
          {player.height && <span>{player.height}</span>}
        </div>
      </div>
    </Link>
  )
}
