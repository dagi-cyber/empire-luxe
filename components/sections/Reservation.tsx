'use client'
import { useState } from 'react'

const TIMES = [
  '6:00 PM','6:30 PM','7:00 PM','7:30 PM','8:00 PM','8:30 PM',
  '9:00 PM','9:30 PM','10:00 PM','10:30 PM','11:00 PM',
]
const GUEST_OPTIONS = [
  '1 Guest','2 Guests','3 Guests','4 Guests',
  '5–8 Guests','9–12 Guests','13+ Guests (Private Event)',
]
const SEATING_OPTIONS = [
  { value: 'standard', label: 'Standard Table' },
  { value: 'bar',      label: 'Bar Seating'    },
  { value: 'vip',      label: 'VIP Booth'      },
  { value: 'terrace',  label: 'Terrace'        },
  { value: 'private',  label: 'Private Room'   },
]

const EMPTY = {
  firstName: '', lastName: '', email: '',
  phone: '', date: '', time: '',
  guests: '2 Guests', seating: 'standard', requests: '',
}

export default function Reservation() {
  const [form,    setForm]    = useState(EMPTY)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error,   setError]   = useState('')

  function set(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }))
    }
  }

  function validate() {
    if (!form.firstName) return 'First name is required'
    if (!form.lastName)  return 'Last name is required'
    if (!form.email)     return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Invalid email address'
    if (!form.phone)     return 'Phone number is required'
    if (!form.date)      return 'Please select a date'
    if (!form.time)      return 'Please select a time'
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const err = validate()
    if (err) { setError(err); return }

    setLoading(true)

    // ── For now: simulate success (we connect real backend later) ──
    await new Promise((r) => setTimeout(r, 1200))
    setSuccess(true)
    setLoading(false)
    setForm(EMPTY)

    // Auto-hide success after 5 seconds
    setTimeout(() => setSuccess(false), 5000)
  }

  return (
    <section
      id="reservation"
      className="section-pad"
      style={{ background: 'var(--dark)' }}
    >
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">SECURE YOUR SPOT</span>
          <h2 className="section-title">
            Book a <em>Table</em>
          </h2>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            maxWidth: '300px', margin: '1.2rem auto 0',
          }}>
            <div style={{ flex:1, height:'1px', background:'rgba(201,168,76,0.25)' }} />
            <span style={{ color:'var(--gold-dim)', fontSize:'0.65rem' }}>✦</span>
            <div style={{ flex:1, height:'1px', background:'rgba(201,168,76,0.25)' }} />
          </div>
        </div>

        <div style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:                 '5rem',
          alignItems:          'start',
        }} className="res-layout">

          {/* ── Form ─────────────────────────── */}
          <div style={{
            background: 'var(--card)',
            border:     '1px solid rgba(201,168,76,0.25)',
            padding:    '2.5rem',
            position:   'relative',
          }}>
            {/* Inner border decoration */}
            <div style={{
              position:     'absolute',
              inset:        '8px',
              border:       '1px solid rgba(201,168,76,0.07)',
              pointerEvents:'none',
            }} />

            <p style={{
              fontSize:      '0.58rem',
              letterSpacing: '0.3em',
              color:         'var(--gold)',
              marginBottom:  '2rem',
            }}>
              RESERVATION DETAILS
            </p>

            {/* Success message */}
            {success && (
              <div style={{
                background:   'rgba(201,168,76,0.1)',
                border:       '1px solid var(--gold)',
                padding:      '1rem',
                marginBottom: '1.5rem',
                textAlign:    'center',
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>✓</div>
                <p style={{ fontSize: '0.68rem', color: 'var(--gold)', letterSpacing: '0.1em' }}>
                  Reservation confirmed! We'll be in touch shortly.
                </p>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div style={{
                background:   'rgba(255,50,50,0.08)',
                border:       '1px solid rgba(255,50,50,0.3)',
                padding:      '0.8rem 1rem',
                marginBottom: '1rem',
                fontSize:     '0.65rem',
                color:        '#ff6b6b',
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Row 1 — Name */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.9rem', marginBottom:'0.9rem' }}>
                <div>
                  <label style={labelStyle}>FIRST NAME</label>
                  <input
                    type="text"
                    className="luxe-input"
                    placeholder="First name"
                    value={form.firstName}
                    onChange={set('firstName')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>LAST NAME</label>
                  <input
                    type="text"
                    className="luxe-input"
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={set('lastName')}
                  />
                </div>
              </div>

              {/* Row 2 — Contact */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.9rem', marginBottom:'0.9rem' }}>
                <div>
                  <label style={labelStyle}>EMAIL</label>
                  <input
                    type="email"
                    className="luxe-input"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={set('email')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>PHONE</label>
                  <input
                    type="tel"
                    className="luxe-input"
                    placeholder="+1 555 000 0000"
                    value={form.phone}
                    onChange={set('phone')}
                  />
                </div>
              </div>

              {/* Row 3 — Date & Time */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.9rem', marginBottom:'0.9rem' }}>
                <div>
                  <label style={labelStyle}>DATE</label>
                  <input
                    type="date"
                    className="luxe-input"
                    value={form.date}
                    onChange={set('date')}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label style={labelStyle}>TIME</label>
                  <select className="luxe-input" value={form.time} onChange={set('time')}>
                    <option value="">Select time</option>
                    {TIMES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              {/* Row 4 — Guests & Seating */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.9rem', marginBottom:'0.9rem' }}>
                <div>
                  <label style={labelStyle}>GUESTS</label>
                  <select className="luxe-input" value={form.guests} onChange={set('guests')}>
                    {GUEST_OPTIONS.map((g) => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>SEATING</label>
                  <select className="luxe-input" value={form.seating} onChange={set('seating')}>
                    {SEATING_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Special requests */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>SPECIAL REQUESTS</label>
                <textarea
                  className="luxe-input"
                  placeholder="Celebrations, dietary requirements, bottle service preferences…"
                  value={form.requests}
                  onChange={set('requests')}
                  style={{ resize:'vertical', minHeight:'75px' }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width:         '100%',
                  padding:       '1rem',
                  background:    loading ? 'rgba(201,168,76,0.5)' : 'var(--gold)',
                  border:        'none',
                  color:         '#0D0810',
                  fontFamily:    'Josefin Sans, sans-serif',
                  fontSize:      '0.7rem',
                  letterSpacing: '0.3em',
                  fontWeight:    600,
                  cursor:        loading ? 'not-allowed' : 'pointer',
                  transition:    'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  if (!loading) (e.currentTarget as HTMLElement).style.background = 'var(--gold-light)'
                }}
                onMouseLeave={(e) => {
                  if (!loading) (e.currentTarget as HTMLElement).style.background = 'var(--gold)'
                }}
              >
                {loading ? 'CONFIRMING…' : 'CONFIRM RESERVATION'}
              </button>

              <p style={{
                fontSize:      '0.56rem',
                color:         'var(--muted)',
                textAlign:     'center',
                marginTop:     '0.8rem',
                letterSpacing: '0.06em',
              }}>
                We'll confirm your booking within 2 hours via email.
              </p>
            </form>
          </div>

          {/* ── Info ─────────────────────────── */}
          <div>
            {/* Contact */}
            <h3 className="font-cormorant" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>
              Find Us
            </h3>

            {[
              { icon:'📍', title:'123 Nightlife Blvd, City Center', sub:'NY 10001 · Ground Floor & Mezzanine' },
              { icon:'📞', title:'+1 (555) 123-4567',               sub:'Reservations & General Enquiries'    },
              { icon:'✉️', title:'hello@empireluxe.com',            sub:'Response within 2 hours'             },
            ].map((item) => (
              <div key={item.title} style={{
                display:      'flex',
                gap:          '0.8rem',
                marginBottom: '1rem',
                alignItems:   'flex-start',
              }}>
                <span style={{ fontSize: '1rem', color: 'var(--gold)', marginTop: '2px' }}>
                  {item.icon}
                </span>
                <div>
                  <p style={{ fontSize: '0.72rem', color: 'var(--cream)', marginBottom: '0.2rem' }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: '0.62rem', color: 'var(--muted)', letterSpacing: '0.05em' }}>
                    {item.sub}
                  </p>
                </div>
              </div>
            ))}

            {/* Hours */}
            <h3 className="font-cormorant" style={{
              fontSize: '1.8rem', margin: '2rem 0 1rem',
            }}>
              Opening Hours
            </h3>

            <div style={{ borderTop: '1px solid rgba(201,168,76,0.12)' }}>
              {[
                { day:'Monday — Thursday', hours:'6:00 PM — 2:00 AM', gold: false },
                { day:'Friday — Saturday', hours:'6:00 PM — 4:00 AM', gold: false },
                { day:'Sunday',            hours:'6:00 PM — 1:00 AM', gold: false },
                { day:'Happy Hour',        hours:'5:00 PM — 8:00 PM', gold: true  },
              ].map((h) => (
                <div key={h.day} style={{
                  display:        'flex',
                  justifyContent: 'space-between',
                  padding:        '0.7rem 0',
                  borderBottom:   '1px solid rgba(201,168,76,0.1)',
                  fontSize:       '0.68rem',
                }}>
                  <span style={{ color: h.gold ? 'var(--gold)' : 'var(--muted)' }}>{h.day}</span>
                  <span style={{ color: h.gold ? 'var(--gold)' : 'var(--cream)' }}>{h.hours}</span>
                </div>
              ))}
            </div>

            {/* VIP callout */}
            <div style={{
              marginTop:  '1.5rem',
              padding:    '1.5rem',
              border:     '1px solid rgba(201,168,76,0.3)',
              background: 'rgba(201,168,76,0.04)',
              position:   'relative',
            }}>
              <span style={{
                position:      'absolute',
                top:           '-0.7rem',
                left:          '1.5rem',
                padding:       '0 0.7rem',
                background:    'var(--dark)',
                color:         'var(--gold)',
                fontSize:      '0.52rem',
                letterSpacing: '0.28em',
              }}>
                VIP
              </span>
              <p style={{
                fontSize:   '0.68rem',
                color:      'var(--muted)',
                lineHeight: 1.9,
              }}>
                For VIP table reservations, private events, or bottle service packages,
                our concierge team is available daily from 12PM – 10PM.
              </p>
              <a href="tel:+15551234567" style={{
                display:        'inline-flex',
                alignItems:     'center',
                gap:            '0.4rem',
                marginTop:      '1rem',
                fontSize:       '0.58rem',
                letterSpacing:  '0.2em',
                color:          'var(--gold)',
                textDecoration: 'none',
              }}>
                CALL CONCIERGE →
              </a>
            </div>

            {/* Newsletter */}
            <div style={{
              marginTop:  '1.2rem',
              padding:    '1.2rem',
              border:     '1px solid rgba(159,94,255,0.25)',
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
                fontSize:     '0.62rem',
                color:        'var(--muted)',
                marginBottom: '0.8rem',
              }}>
                Get exclusive event invites &amp; VIP offers.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="email"
                  className="luxe-input"
                  placeholder="your@email.com"
                  style={{ flex: 1 }}
                  id="nl-email"
                />
                <button
                  onClick={() => {
                    const el = document.getElementById('nl-email') as HTMLInputElement
                    if (el?.value) { el.value = ''; alert('You\'re on the list!') }
                  }}
                  style={{
                    padding:       '0.8rem 1rem',
                    background:    'var(--purple)',
                    border:        'none',
                    color:         'var(--cream)',
                    fontFamily:    'Josefin Sans, sans-serif',
                    fontSize:      '0.58rem',
                    letterSpacing: '0.1em',
                    cursor:        'pointer',
                    transition:    'background 0.3s',
                    whiteSpace:    'nowrap',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--purple-bright)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--purple)')}
                  type="button"
                >
                  JOIN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .res-layout { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  )
}

const labelStyle: React.CSSProperties = {
  display:       'block',
  fontSize:      '0.54rem',
  letterSpacing: '0.2em',
  color:         'var(--gold)',
  marginBottom:  '0.45rem',
}
