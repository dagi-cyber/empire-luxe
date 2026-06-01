'use client'
import { useState, useEffect } from 'react'
import { sanityClient, urlFor } from '@/lib/sanity'
import Image from 'next/image'

// ── Fallback data shown while Sanity loads ─────────
const FALLBACK = [
  {
    _id: '1', day: '24', month: 'MAY',
    title: 'Saturday Sessions', djName: 'DJ IGNITE', eventType: 'WEEKLY',
    description: 'The weekend starts here. DJ Ignite brings the heat with an electric mix of house, afro beats and everything in between.',
    startTime: '10PM', endTime: 'LATE',
    color: 'linear-gradient(135deg, #1A0828, #3D1070)', icon: '🎵',
  },
  {
    _id: '2', day: '30', month: 'MAY',
    title: 'Neon Nights', djName: 'DJ ALEX', eventType: 'SPECIAL',
    description: 'Glow up and get lost in an immersive neon wonderland. DJ Alex takes the decks for a night of pure sonic euphoria.',
    startTime: '10PM', endTime: 'LATE',
    color: 'linear-gradient(135deg, #0A1A28, #103D70)', icon: '🌟',
  },
  {
    _id: '3', day: '07', month: 'JUN',
    title: 'Ladies Night', djName: 'DJ NOVA', eventType: 'MONTHLY',
    description: 'Celebrate the queens. Complimentary cocktails all evening, exclusive table bookings and a night designed entirely for you.',
    startTime: '8PM', endTime: 'LATE',
    color: 'linear-gradient(135deg, #280A18, #701030)', icon: '💎',
  },
  {
    _id: '4', day: '14', month: 'JUN',
    title: 'Afro House Night', djName: 'DJ MARCUS B', eventType: 'GUEST',
    description: 'A special guest set from one of the hottest DJs on the circuit. Pure afro house from start to finish.',
    startTime: '11PM', endTime: 'LATE',
    color: 'linear-gradient(135deg, #1A1A08, #504010)', icon: '🔥',
  },
  {
    _id: '5', day: '21', month: 'JUN',
    title: 'Midsummer Gala', djName: 'DJ LUNA', eventType: 'SPECIAL',
    description: 'The biggest event of the summer. VIP packages available. Dress to impress.',
    startTime: '9PM', endTime: 'LATE',
    color: 'linear-gradient(135deg, #0A2018, #104030)', icon: '🥂',
  },
  {
    _id: '6', day: '28', month: 'JUN',
    title: 'End of Month Bash', djName: 'DJ IGNITE', eventType: 'WEEKLY',
    description: 'Close out the month in style. Our resident DJ brings his signature sound for one last unforgettable Friday.',
    startTime: '10PM', endTime: 'LATE',
    color: 'linear-gradient(135deg, #200A28, #601060)', icon: '🎤',
  },
]

const COLORS = [
  'linear-gradient(135deg, #1A0828, #3D1070)',
  'linear-gradient(135deg, #0A1A28, #103D70)',
  'linear-gradient(135deg, #280A18, #701030)',
  'linear-gradient(135deg, #1A1A08, #504010)',
  'linear-gradient(135deg, #0A2018, #104030)',
  'linear-gradient(135deg, #200A28, #601060)',
]

const ICONS: Record<string, string> = {
  WEEKLY: '🎵', SPECIAL: '🌟', MONTHLY: '💎', GUEST: '🔥',
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return {
    day:   d.getDate().toString().padStart(2, '0'),
    month: d.toLocaleString('en', { month: 'short' }).toUpperCase(),
  }
}

export default function Events() {
  const [events,  setEvents]  = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "event" && isFeatured == true] | order(date asc) {
        _id, title, date, startTime, endTime, djName, description, eventType, image
      }`)
      .then((data) => {
        setEvents(data?.length ? data : [])
        setLoading(false)
      })
      .catch(() => {
        setEvents([])
        setLoading(false)
      })
  }, [])

  // Use Sanity data if available, fallback if empty
  const items = events.length > 0
    ? events.map((ev: Record<string, any>, i: number) => {
        const { day, month } = formatDate(ev.date)
        return {
          _id:         ev._id,
          day,
          month,
          title:       ev.title,
          djName:      ev.djName || '',
          eventType:   ev.eventType || 'WEEKLY',
          description: ev.description || '',
          startTime:   ev.startTime || '',
          endTime:     ev.endTime   || 'LATE',
          color:       COLORS[i % COLORS.length],
          icon:        ICONS[ev.eventType] || '🎵',
          image:       ev.image || null,
        }
      })
    : FALLBACK

  return (
    <section
      id="events"
      className="section-pad"
      style={{ background: 'var(--dark)' }}
    >
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">UPCOMING EVENTS</span>
          <h2 className="section-title">
            What&apos;s <em>On</em>
          </h2>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            maxWidth: '300px', margin: '1.2rem auto 0',
          }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.25)' }} />
            <span style={{ color: 'var(--gold-dim)', fontSize: '0.65rem' }}>✦</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.25)' }} />
          </div>

          {/* Live badge — shows when pulling from Sanity */}
          {!loading && events.length > 0 && (
            <div style={{
              display:      'inline-flex',
              alignItems:   'center',
              gap:          '0.5rem',
              marginTop:    '1rem',
              background:   'rgba(201,168,76,0.08)',
              border:       '1px solid rgba(201,168,76,0.2)',
              padding:      '0.3rem 0.9rem',
            }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: 'var(--gold)', display: 'block',
                boxShadow: '0 0 6px var(--gold)',
              }} />
              <span style={{ fontSize: '0.5rem', letterSpacing: '0.25em', color: 'var(--gold)' }}>
                LIVE FROM DASHBOARD
              </span>
            </div>
          )}
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem',
          }} className="events-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} style={{
                height: '360px', background: 'var(--card)',
                border: '1px solid rgba(201,168,76,0.1)',
                animation: 'pulse 1.5s ease-in-out infinite',
                opacity: 0.5,
              }} />
            ))}
          </div>
        )}

        {/* Events grid */}
        {!loading && (
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem',
          }} className="events-grid">
            {items.map((ev: Record<string, any>) => (
              <div
                key={ev._id}
                onMouseEnter={() => setHovered(ev._id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  border:      hovered === ev._id ? '1px solid var(--gold)' : '1px solid rgba(201,168,76,0.2)',
                  background:  'var(--card)',
                  overflow:    'hidden',
                  cursor:      'pointer',
                  transition:  'all 0.4s',
                  transform:   hovered === ev._id ? 'translateY(-6px)' : 'translateY(0)',
                  boxShadow:   hovered === ev._id ? '0 20px 60px rgba(0,0,0,0.5)' : 'none',
                }}
              >
                {/* Image or color block */}
                <div style={{
                  height: '170px', position: 'relative',
                  background: ev.color,
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '3.5rem',
                }}>
                  {ev.image ? (
                    <Image
                      src={urlFor(ev.image).width(400).height(170).url()}
                      alt={ev.title}
                      fill
                      style={{ objectFit: 'cover', opacity: 0.7 }}
                    />
                  ) : (
                    <span style={{ position: 'relative', zIndex: 1 }}>{ev.icon}</span>
                  )}

                  {/* Date badge */}
                  <div style={{
                    position: 'absolute', top: '0.8rem', left: '0.8rem',
                    background: 'var(--gold)', padding: '0.35rem 0.7rem',
                    textAlign: 'center', zIndex: 2,
                  }}>
                    <span className="font-cormorant" style={{
                      display: 'block', fontSize: '1.6rem',
                      color: '#0D0810', lineHeight: 1, fontWeight: 700,
                    }}>{ev.day}</span>
                    <span style={{
                      display: 'block', fontSize: '0.48rem',
                      letterSpacing: '0.2em', color: '#0D0810',
                    }}>{ev.month}</span>
                  </div>

                  {/* Type badge */}
                  <div style={{
                    position: 'absolute', top: '0.8rem', right: '0.8rem',
                    fontSize: '0.48rem', letterSpacing: '0.12em',
                    color: ev.eventType === 'SPECIAL' ? 'var(--gold)' : 'var(--purple-neon)',
                    border: `1px solid ${ev.eventType === 'SPECIAL' ? 'var(--gold)' : 'var(--purple-neon)'}`,
                    padding: '0.25rem 0.6rem', background: 'rgba(0,0,0,0.5)', zIndex: 2,
                  }}>{ev.eventType}</div>
                </div>

                {/* Body */}
                <div style={{ padding: '1.2rem' }}>
                  <h3 className="font-cormorant" style={{ fontSize: '1.25rem', marginBottom: '0.3rem' }}>
                    {ev.title}
                  </h3>
                  {ev.djName && (
                    <p style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: 'var(--gold)', marginBottom: '0.6rem' }}>
                      {ev.djName}
                    </p>
                  )}
                  <p style={{ fontSize: '0.62rem', color: 'var(--muted)', lineHeight: 1.8 }}>
                    {ev.description}
                  </p>
                </div>

                {/* Footer */}
                <div style={{
                  padding: '0 1.2rem 1.2rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{ fontSize: '0.56rem', color: 'var(--muted)', letterSpacing: '0.12em' }}>
                    ⏱ {ev.startTime} — {ev.endTime}
                  </span>
                  <a href="#reservation" style={{
                    fontSize: '0.52rem', letterSpacing: '0.15em', color: 'var(--gold)',
                    textDecoration: 'none', border: '1px solid rgba(201,168,76,0.3)',
                    padding: '0.3rem 0.8rem', transition: 'all 0.3s',
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--gold)'
                      e.currentTarget.style.color = '#0D0810'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = 'var(--gold)'
                    }}
                  >BOOK TABLE</a>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <a href="#" className="btn-outline">VIEW ALL EVENTS →</a>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 0.8; }
        }
        @media (max-width: 900px) {
          .events-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 600px) and (max-width: 900px) {
          .events-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  )
}
