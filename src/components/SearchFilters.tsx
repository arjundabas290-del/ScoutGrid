'use client'

import { Search } from 'lucide-react'
import { positions, gradYears } from '@/lib/mock-data'

type Props = {
  search: string
  position: string
  gradYear: string
  onSearchChange: (v: string) => void
  onPositionChange: (v: string) => void
  onGradYearChange: (v: string) => void
}

export default function SearchFilters({
  search,
  position,
  gradYear,
  onSearchChange,
  onPositionChange,
  onGradYearChange,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          type="text"
          placeholder="Search players, clubs, locations..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-green-500/50 focus:bg-white/8 transition-colors"
        />
      </div>

      <select
        value={position}
        onChange={(e) => onPositionChange(e.target.value)}
        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-green-500/50 transition-colors cursor-pointer"
      >
        {positions.map((p) => (
          <option key={p} value={p} className="bg-zinc-900">
            {p}
          </option>
        ))}
      </select>

      <select
        value={gradYear}
        onChange={(e) => onGradYearChange(e.target.value)}
        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-green-500/50 transition-colors cursor-pointer"
      >
        {gradYears.map((y) => (
          <option key={y} value={y} className="bg-zinc-900">
            {y}
          </option>
        ))}
      </select>
    </div>
  )
}
