import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Player = {
  id: string
  username: string
  name: string
  position: string
  secondary_position: string | null
  grad_year: number
  club: string
  location: string
  height: string | null
  gpa: string | null
  bio: string | null
  highlight_url: string | null
  avatar_url: string | null
  stats: PlayerStats
  committed: boolean
  committed_to: string | null
  created_at: string
}

export type PlayerStats = {
  goals: number
  assists: number
  season: string
}
