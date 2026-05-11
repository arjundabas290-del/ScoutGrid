'use server'

import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export async function createProfile(formData: FormData) {
  const name = formData.get('name') as string
  const position = formData.get('position') as string
  const secondary_position = (formData.get('secondary_position') as string) || null
  const grad_year = parseInt(formData.get('grad_year') as string)
  const club = formData.get('club') as string
  const location = formData.get('location') as string
  const height = (formData.get('height') as string) || null
  const gpa = (formData.get('gpa') as string) || null
  const bio = (formData.get('bio') as string) || null
  const highlight_url = (formData.get('highlight_url') as string) || null
  const goals = parseInt((formData.get('goals') as string) || '0')
  const assists = parseInt((formData.get('assists') as string) || '0')

  // Generate a unique username from name
  const baseSlug = slugify(name)
  const suffix = Math.floor(Math.random() * 9000) + 1000
  const username = `${baseSlug}-${suffix}`

  // Convert any YouTube URL format to a privacy-enhanced embed URL
  let embedUrl = highlight_url
  if (embedUrl) {
    // Already an embed URL — just swap domain to nocookie
    const alreadyEmbed = embedUrl.match(/(?:youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9_-]{11})/)
    if (alreadyEmbed) {
      embedUrl = `https://www.youtube-nocookie.com/embed/${alreadyEmbed[1]}`
    } else {
      // watch?v=ID or youtu.be/ID or shorts/ID
      const idMatch = embedUrl.match(
        /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      )
      if (idMatch) {
        embedUrl = `https://www.youtube-nocookie.com/embed/${idMatch[1]}`
      }
      // Hudl: keep as-is, they support embedding
    }
  }

  const { error } = await supabase.from('players').insert({
    username,
    name,
    position,
    secondary_position,
    grad_year,
    club,
    location,
    height,
    gpa,
    bio,
    highlight_url: embedUrl,
    stats: {
      goals,
      assists,
      season: '2025-26',
    },
    committed: false,
    committed_to: null,
  })

  if (error) {
    throw new Error(error.message)
  }

  redirect(`/players/${username}`)
}
