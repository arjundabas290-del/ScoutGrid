'use client'

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import PlayerCard from '@/components/PlayerCard'
import SearchFilters from '@/components/SearchFilters'
import { Player } from '@/lib/supabase'

export default function PlayersClient({ players }: { players: Player[] }) {
  const [search, setSearch] = useState('')
  const [position, setPosition] = useState('All Positions')
  const [gradYear, setGradYear] = useState('All Years')

  const filtered = useMemo(() => {
    return players.filter((p) => {
      const matchesSearch =
        search === '' ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.club.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase())

      const matchesPosition =
        position === 'All Positions' ||
        p.position === position ||
        p.secondary_position === position

      const matchesYear =
        gradYear === 'All Years' || String(p.grad_year) === gradYear

      return matchesSearch && matchesPosition && matchesYear
    })
  }, [players, search, position, gradYear])

  return (
    <>
      <div className="mb-8">
        <SearchFilters
          search={search}
          position={position}
          gradYear={gradYear}
          onSearchChange={setSearch}
          onPositionChange={setPosition}
          onGradYearChange={setGradYear}
        />
      </div>

      <p className="text-white/40 text-sm mb-6">
        {filtered.length} player{filtered.length !== 1 ? 's' : ''} found
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-24 text-white/30">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg">No players match your filters</p>
          <p className="text-sm mt-1">Try adjusting your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      )}
    </>
  )
}
