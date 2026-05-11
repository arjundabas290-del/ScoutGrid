import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, GraduationCap, ArrowLeft, Star, Play, Trophy } from 'lucide-react'
import { supabase, Player } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('username', username)
    .single()

  if (error || !data) notFound()

  const player = data as Player

  const initials = player.name
    .split(' ')
    .map((n) => n[0])
    .join('')

  // Convert any YouTube URL format to nocookie embed, keep Hudl as-is
  function toEmbedUrl(url: string | null): string | null {
    if (!url) return null
    // Already a nocookie embed
    if (url.includes('youtube-nocookie.com/embed')) return url
    // Regular embed URL
    const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/)
    if (embedMatch) return `https://www.youtube-nocookie.com/embed/${embedMatch[1]}`
    // watch?v= or youtu.be/ or shorts/
    const idMatch = url.match(
      /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    )
    if (idMatch) return `https://www.youtube-nocookie.com/embed/${idMatch[1]}`
    // Hudl or other — return as-is
    return url
  }

  const youtubeEmbedUrl = toEmbedUrl(player.highlight_url)

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to players
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar */}
          <div className="space-y-4">
            {/* Profile card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-black font-bold text-2xl mb-3">
                  {initials}
                </div>
                <h1 className="text-xl font-bold text-white">{player.name}</h1>
                <p className="text-white/50 text-sm">{player.club}</p>

                {player.committed && (
                  <div className="mt-2 flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1">
                    <Star className="w-3.5 h-3.5 text-green-400 fill-green-400" />
                    <span className="text-green-400 text-sm font-medium">
                      Committed to {player.committed_to}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/40 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> Location
                  </span>
                  <span className="text-white/80">{player.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" /> Grad Year
                  </span>
                  <span className="text-white/80">{player.grad_year}</span>
                </div>
                {player.height && (
                  <div className="flex items-center justify-between">
                    <span className="text-white/40">Height</span>
                    <span className="text-white/80">{player.height}</span>
                  </div>
                )}
                {player.gpa && (
                  <div className="flex items-center justify-between">
                    <span className="text-white/40">GPA</span>
                    <span className="text-white/80">{player.gpa}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-2">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-500/20 text-green-300">
                  {player.position}
                </span>
                {player.secondary_position && (
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 text-white/40">
                    {player.secondary_position}
                  </span>
                )}
              </div>

              <button className="w-full mt-4 bg-green-500 hover:bg-green-400 text-black font-semibold py-2.5 rounded-xl text-sm transition-colors">
                Contact Player
              </button>
            </div>

            {/* Stats */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-4 h-4 text-green-400" />
                <h2 className="font-semibold text-white text-sm">
                  {player.stats.season} Stats
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Goals', value: player.stats.goals },
                  { label: 'Assists', value: player.stats.assists },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/5 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-white">{value}</p>
                    <p className="text-white/40 text-xs mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Bio */}
            {player.bio && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="font-semibold text-white mb-3">About</h2>
                <p className="text-white/60 text-sm leading-relaxed">{player.bio}</p>
              </div>
            )}

            {/* Highlight video */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Play className="w-4 h-4 text-green-400" />
                <h2 className="font-semibold text-white">Highlight Reel</h2>
              </div>
              {youtubeEmbedUrl ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
                  <iframe
                    src={youtubeEmbedUrl}
                    title={`${player.name} highlight reel`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              ) : (
                <div className="relative w-full aspect-video rounded-xl bg-white/3 border border-white/5 flex flex-col items-center justify-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white/20" />
                  </div>
                  <p className="text-white/30 text-sm">No highlight video yet</p>
                  <button className="text-green-400 text-xs font-medium border border-green-500/30 rounded-full px-4 py-1.5 hover:bg-green-500/10 transition-colors">
                    + Add YouTube or Hudl link
                  </button>
                </div>
              )}
            </div>

            {/* Share section */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="font-semibold text-white mb-2">Share Profile</h2>
              <p className="text-white/40 text-sm mb-3">
                Send coaches a direct link to this profile
              </p>
              <div className="flex items-center gap-2 bg-black/30 rounded-xl px-4 py-3 border border-white/5">
                <span className="text-white/50 text-sm flex-1 truncate">
                  scoutgrid.com/players/{player.username}
                </span>
                <button className="text-green-400 text-xs font-medium hover:text-green-300 transition-colors flex-shrink-0">
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
