'use client'
import { useState } from 'react'
import Image from 'next/image'

const NAV_LINKS = [
  { href: '#home',         label: 'Home'         },
  { href: '#events',       label: 'Events'       },
  { href: '#services',     label: 'Services'     },
  { href: '#liquor',       label: 'Liquor Menu'  },
  { href: '#food',         label: 'Food Menu'    },
  { href: '#dj',           label: 'DJs'          },
  { href: '#virtual-tour', label: 'Virtual Tour' },
  { href: '#gallery',      label: 'Gallery'      },
  { href: '#reservation',  label: 'Reservation'  },
  { href: '#location',     label: 'Location'     },
]

const SERVICES = [
  'VIP Packages',
  'Bottle Service',
  'Private Events',
  'Corporate Hire',
  'Birthday Packages',
  'DJ Booking',
]

const HOURS = [
  { day: 'Mon — Thu',  hours: '6PM — 2AM'       },
  { day: 'Friday',     hours: '6PM — 4AM'       },
  { day: 'Saturday',   hours: '6PM — 4AM'       },
  { day: 'Sunday',     hours: '6PM — 1AM'       },
  { day: 'Happy Hour', hours: '5PM — 8PM Daily', gold: true },
]

const FEATURES = [
  { icon: '👑', title: 'VIP EXPERIENCE',   desc: 'Elevated service just for you'    },
  { icon: '🎧', title: 'LIVE DJ',          desc: 'Top DJs. Epic vibes.'             },
  { icon: '🍸', title: 'SIGNATURE DRINKS', desc: 'Crafted to perfection'            },
  { icon: '✨', title: 'LUXURY AMBIANCE',  desc: 'Unforgettable nights'             },
  { icon: '📅', title: 'RESERVATIONS',     desc: 'Book your table in advance'       },
]

export default function Footer() {
  const [email,   setEmail]   = useState('')
  const [joined,  setJoined]  = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault()
    if (!email || loading) return
    setLoading(true)
    // Simulate — connect to Supabase on deploy
    await new Promise((r) => setTimeout(r, 800))
    setJoined(true)
    setLoading(false)
    setEmail('')
    setTimeout(() => setJoined(false), 4000)
  }

  return (
    <footer
      id="contact"
      style={{
        background: 'var(--dark)',
        borderTop:  '1px solid rgba(201,168,76,0.2)',
        paddingTop: '4rem',
      }}
    >
      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 3rem' }}>

        {/* ── Feature strip ────────────────── */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap:                 '1.5rem',
          paddingBottom:       '3rem',
          borderBottom:        '1px solid rgba(201,168,76,0.15)',
          marginBottom:        '3rem',
        }} className="feat-strip">
          {FEATURES.map((f) => (
            <div key={f.title} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{f.icon}</div>
              <div style={{
                fontSize:      '0.55rem',
                letterSpacing: '0.14em',
                color:         'var(--cream)',
                marginBottom:  '0.25rem',
              }}>
                {f.title}
              </div>
              <div style={{ fontSize: '0.52rem', color: 'var(--muted)' }}>
                {f.desc}
              </div>
            </div>
          ))}
        </div>

        {/* ── Main footer grid ─────────────── */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap:                 '3rem',
          paddingBottom:       '3rem',
          borderBottom:        '1px solid rgba(201,168,76,0.15)',
          marginBottom:        '2rem',
        }} className="footer-grid">

          {/* Brand column */}
          <div>
            <Image
              src="/images/logo.jpg"
              alt="Empire Luxe Lounge"
              width={80}
              height={80}
              style={{
                objectFit:    'contain',
                marginBottom: '0.8rem',
                filter:       'drop-shadow(0 0 8px rgba(201,168,76,0.25))',
              }}
            />
            <p style={{
              fontSize:      '0.63rem',
              color:         'var(--muted)',
              lineHeight:    1.9,
              maxWidth:      '280px',
              marginBottom:  '1.5rem',
              letterSpacing: '0.03em',
            }}>
              Where luxury meets the nightlife. Premium drinks,
              electrifying beats, and unforgettable moments in
              the heart of the city.
            </p>

            {/* Newsletter */}
            <div style={{
              border:     '1px solid rgba(159,94,255,0.25)',
              padding:    '1.2rem',
              background: 'rgba(123,47,190,0.06)',
            }}>
              <p style={{
                fontSize:      '0.5rem',
                letterSpacing: '0.25em',
                color:         'var(--purple-neon)',
                marginBottom:  '0.4rem',
              }}>
                JOIN THE LIST
              </p>
              <p style={{
                fontSize:     '0.6rem',
                color:        'var(--muted)',
                marginBottom: '0.8rem',
              }}>
                Exclusive events, offers &amp; VIP access.
              </p>

              {joined ? (
                <div style={{
                  fontSize:      '0.62rem',
                  color:         'var(--gold)',
                  letterSpacing: '0.1em',
                  padding:       '0.5rem',
                  textAlign:     'center',
                  border:        '1px solid rgba(201,168,76,0.3)',
                }}>
                  ✓ You&apos;re on the list!
                </div>
              ) : (
                <form onSubmit={handleNewsletter} style={{ display: 'flex', gap: '0.4rem' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="luxe-input"
                    style={{ flex: 1, padding: '0.65rem 0.8rem', fontSize: '0.68rem' }}
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding:       '0.65rem 1rem',
                      background:    loading ? 'rgba(123,47,190,0.5)' : 'var(--purple)',
                      border:        'none',
                      color:         'var(--cream)',
                      fontFamily:    'Josefin Sans, sans-serif',
                      fontSize:      '0.58rem',
                      letterSpacing: '0.1em',
                      cursor:        loading ? 'not-allowed' : 'pointer',
                      transition:    'background 0.3s',
                      whiteSpace:    'nowrap',
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) (e.currentTarget as HTMLElement).style.background = 'var(--purple-bright)'
                    }}
                    onMouseLeave={(e) => {
                      if (!loading) (e.currentTarget as HTMLElement).style.background = 'var(--purple)'
                    }}
                  >
                    {loading ? '…' : 'JOIN'}
                  </button>
                </form>
              )}
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.2rem' }}>
              {[
                { label: 'f',   href: '#' },
                { label: 'ig',  href: '#' },
                { label: 'tt',  href: '#' },
                { label: 'tw',  href: '#' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  style={{
                    width:          '34px',
                    height:         '34px',
                    border:         '1px solid rgba(201,168,76,0.22)',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    color:          'var(--muted)',
                    textDecoration: 'none',
                    fontSize:       '0.65rem',
                    fontFamily:     'Josefin Sans, sans-serif',
                    transition:     'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)'
                    ;(e.currentTarget as HTMLElement).style.color = 'var(--gold)'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.22)'
                    ;(e.currentTarget as HTMLElement).style.color = 'var(--muted)'
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 style={{
              fontSize:      '0.54rem',
              letterSpacing: '0.28em',
              color:         'var(--gold)',
              marginBottom:  '1.2rem',
            }}>
              NAVIGATE
            </h4>
            <ul style={{ listStyle: 'none' }}>
              {NAV_LINKS.map((link) => (
                <li key={link.href} style={{ marginBottom: '0.65rem' }}>
                  <a
                    href={link.href}
                    style={{
                      fontSize:       '0.62rem',
                      color:          'var(--muted)',
                      textDecoration: 'none',
                      letterSpacing:  '0.04em',
                      transition:     'color 0.3s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{
              fontSize:      '0.54rem',
              letterSpacing: '0.28em',
              color:         'var(--gold)',
              marginBottom:  '1.2rem',
            }}>
              SERVICES
            </h4>
            <ul style={{ listStyle: 'none' }}>
              {SERVICES.map((s) => (
                <li key={s} style={{ marginBottom: '0.65rem' }}>
                  <a
                    href="#reservation"
                    style={{
                      fontSize:       '0.62rem',
                      color:          'var(--muted)',
                      textDecoration: 'none',
                      letterSpacing:  '0.04em',
                      transition:     'color 0.3s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & Contact */}
          <div>
            <h4 style={{
              fontSize:      '0.54rem',
              letterSpacing: '0.28em',
              color:         'var(--gold)',
              marginBottom:  '1.2rem',
            }}>
              HOURS
            </h4>
            {HOURS.map((h) => (
              <div key={h.day} style={{
                display:        'flex',
                justifyContent: 'space-between',
                marginBottom:   '0.5rem',
                fontSize:       '0.6rem',
                gap:            '0.5rem',
              }}>
                <span style={{ color: (h as any).gold ? 'var(--gold)' : 'var(--muted)' }}>
                  {h.day}
                </span>
                <span style={{ color: (h as any).gold ? 'var(--gold)' : 'var(--cream)' }}>
                  {h.hours}
                </span>
              </div>
            ))}

            <div style={{ height: '1px', background: 'rgba(201,168,76,0.12)', margin: '1.2rem 0' }} />

            <h4 style={{
              fontSize:      '0.54rem',
              letterSpacing: '0.28em',
              color:         'var(--gold)',
              marginBottom:  '1rem',
            }}>
              CONTACT
            </h4>
            {[
              { icon: '📞', text: '+1 (555) 123-4567', href: 'tel:+15551234567'           },
              { icon: '✉️', text: 'hello@empireluxe.com', href: 'mailto:hello@empireluxe.com' },
              { icon: '📍', text: '123 Nightlife Blvd, NY', href: '#location'              },
            ].map((c) => (
              <div key={c.text} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.6rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem' }}>{c.icon}</span>
                <a
                  href={c.href}
                  style={{
                    fontSize:       '0.6rem',
                    color:          'var(--muted)',
                    textDecoration: 'none',
                    transition:     'color 0.3s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                >
                  {c.text}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ───────────────────── */}
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          flexWrap:       'wrap',
          gap:            '1rem',
          paddingBottom:  '2rem',
        }}>
          <p style={{
            fontSize:      '0.54rem',
            color:         'var(--muted)',
            letterSpacing: '0.08em',
          }}>
            © {new Date().getFullYear()} Empire Luxe Lounge. All rights reserved.
            Must be 21+ to enter.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Responsible Drinking'].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  fontSize:       '0.52rem',
                  color:          'var(--muted)',
                  textDecoration: 'none',
                  letterSpacing:  '0.05em',
                  transition:     'color 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .footer-grid  { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
          .feat-strip   { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 480px) {
          .footer-grid  { grid-template-columns: 1fr !important; }
          .feat-strip   { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </footer>
  )
}
