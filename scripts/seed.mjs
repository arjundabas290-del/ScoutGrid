import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://lykkpuicpahpsayptgch.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5a2twdWljcGFocHNheXB0Z2NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0NTQyNDIsImV4cCI6MjA5NDAzMDI0Mn0.6irRn9_kNS7N-LA7nHslXBvDfbEcoDSXIIXo2Q091pI'
)

const players = [
  {
    username: 'alex-rodriguez',
    name: 'Alex Rodriguez',
    position: 'Striker',
    secondary_position: 'Attacking Mid',
    grad_year: 2026,
    club: 'FC Dallas Academy',
    location: 'Dallas, TX',
    height: "5'11\"",
    gpa: '3.8',
    bio: 'High-energy striker with pace and finishing ability. Team captain for two seasons. Looking for D1 opportunities.',
    highlight_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    stats: { goals: 22, assists: 11, appearances: 28, season: '2025-26' },
    committed: false,
    committed_to: null,
  },
  {
    username: 'jordan-kim',
    name: 'Jordan Kim',
    position: 'Central Midfielder',
    secondary_position: 'Defensive Mid',
    grad_year: 2025,
    club: 'LA Galaxy Academy',
    location: 'Los Angeles, CA',
    height: "5'9\"",
    gpa: '4.0',
    bio: 'Box-to-box midfielder with elite passing range and vision. Strong in the press. Academic All-State.',
    highlight_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    stats: { goals: 7, assists: 19, appearances: 30, season: '2025-26' },
    committed: true,
    committed_to: 'UCLA',
  },
  {
    username: 'maya-thompson',
    name: 'Maya Thompson',
    position: 'Center Back',
    secondary_position: 'Right Back',
    grad_year: 2026,
    club: 'Chicago Fire Academy',
    location: 'Chicago, IL',
    height: "5'8\"",
    gpa: '3.6',
    bio: 'Physical and technical CB. Strong in the air, comfortable playing out from the back. ODP State Pool.',
    highlight_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    stats: { goals: 3, assists: 2, appearances: 26, season: '2025-26' },
    committed: false,
    committed_to: null,
  },
  {
    username: 'tyler-okonkwo',
    name: 'Tyler Okonkwo',
    position: 'Goalkeeper',
    secondary_position: null,
    grad_year: 2027,
    club: 'NYCFC Academy',
    location: 'New York, NY',
    height: "6'2\"",
    gpa: '3.9',
    bio: 'Shot-stopper with elite distribution. Comfortable sweeping and organizing the backline. High School All-American.',
    highlight_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    stats: { goals: 0, assists: 1, appearances: 24, season: '2025-26' },
    committed: false,
    committed_to: null,
  },
  {
    username: 'sofia-martinez',
    name: 'Sofia Martinez',
    position: 'Winger',
    secondary_position: 'Striker',
    grad_year: 2026,
    club: 'Portland Thorns Academy',
    location: 'Portland, OR',
    height: "5'6\"",
    gpa: '3.7',
    bio: 'Left-footed winger with elite pace and 1v1 ability. Top scorer in ECNL Pacific Northwest conference.',
    highlight_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    stats: { goals: 18, assists: 14, appearances: 29, season: '2025-26' },
    committed: true,
    committed_to: 'Stanford',
  },
  {
    username: 'cam-wu',
    name: 'Cameron Wu',
    position: 'Defensive Mid',
    secondary_position: 'Center Back',
    grad_year: 2025,
    club: 'Seattle Sounders Academy',
    location: 'Seattle, WA',
    height: "5'10\"",
    gpa: '3.5',
    bio: 'Tenacious defensive midfielder. Wins the ball back and keeps it simple. Leadership on and off the pitch.',
    highlight_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    stats: { goals: 2, assists: 8, appearances: 27, season: '2025-26' },
    committed: false,
    committed_to: null,
  },
]

const { data, error } = await supabase.from('players').insert(players).select()

if (error) {
  console.error('Seed failed:', error.message)
} else {
  console.log(`Seeded ${data.length} players successfully!`)
  data.forEach((p) => console.log(` ✓ ${p.name}`))
}
