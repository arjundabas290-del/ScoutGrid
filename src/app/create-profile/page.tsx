import { createProfile } from './actions'
import { positions, gradYears } from '@/lib/mock-data'
import { User, Trophy, Play, MapPin } from 'lucide-react'

const positionsOnly = positions.filter((p) => p !== 'All Positions')
const yearsOnly = gradYears.filter((y) => y !== 'All Years')

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <Icon className="w-4 h-4 text-green-400" />
        <h2 className="font-semibold text-white">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm text-white/50 mb-1.5">
        {label}
        {required && <span className="text-green-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputClass =
  'w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-green-500/50 transition-colors'

const selectClass =
  'w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-green-500/50 transition-colors cursor-pointer'

export default function CreateProfilePage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Your Profile</h1>
          <p className="text-white/40 text-sm">
            Get in front of college coaches. Takes 2 minutes.
          </p>
        </div>

        <form action={createProfile} className="space-y-4">
          {/* Basic Info */}
          <Section icon={User} title="Basic Info">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" required>
                <input
                  name="name"
                  required
                  placeholder="Alex Rodriguez"
                  className={inputClass}
                />
              </Field>
              <Field label="Grad Year" required>
                <select name="grad_year" required className={selectClass}>
                  {yearsOnly.map((y) => (
                    <option key={y} value={y} className="bg-zinc-900">
                      {y}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Primary Position" required>
                <select name="position" required className={selectClass}>
                  {positionsOnly.map((p) => (
                    <option key={p} value={p} className="bg-zinc-900">
                      {p}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Secondary Position">
                <select name="secondary_position" className={selectClass}>
                  <option value="" className="bg-zinc-900">
                    None
                  </option>
                  {positionsOnly.map((p) => (
                    <option key={p} value={p} className="bg-zinc-900">
                      {p}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Height">
                <input
                  name="height"
                  placeholder={`5'10"`}
                  className={inputClass}
                />
              </Field>
              <Field label="GPA">
                <input
                  name="gpa"
                  placeholder="3.8"
                  className={inputClass}
                />
              </Field>
            </div>
          </Section>

          {/* Club & Location */}
          <Section icon={MapPin} title="Club & Location">
            <Field label="Club / Academy" required>
              <input
                name="club"
                required
                placeholder="FC Dallas Academy"
                className={inputClass}
              />
            </Field>
            <Field label="Location" required>
              <input
                name="location"
                required
                placeholder="Dallas, TX"
                className={inputClass}
              />
            </Field>
            <Field label="Bio">
              <textarea
                name="bio"
                rows={3}
                placeholder="Tell coaches about yourself — your style of play, strengths, achievements..."
                className={`${inputClass} resize-none`}
              />
            </Field>
          </Section>

          {/* Stats */}
          <Section icon={Trophy} title="2025–26 Season Stats">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Goals">
                <input
                  name="goals"
                  type="number"
                  min="0"
                  defaultValue="0"
                  className={inputClass}
                />
              </Field>
              <Field label="Assists">
                <input
                  name="assists"
                  type="number"
                  min="0"
                  defaultValue="0"
                  className={inputClass}
                />
              </Field>
            </div>
          </Section>

          {/* Highlights */}
          <Section icon={Play} title="Highlight Video">
            <Field label="YouTube or Hudl URL">
              <input
                name="highlight_url"
                type="url"
                placeholder="https://youtube.com/watch?v=..."
                className={inputClass}
              />
            </Field>
            <p className="text-white/25 text-xs">
              Paste a YouTube or Hudl link — we&apos;ll embed it on your profile automatically.
            </p>
          </Section>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-3.5 rounded-xl transition-colors text-sm"
          >
            Create My Profile →
          </button>
        </form>
      </div>
    </div>
  )
}
