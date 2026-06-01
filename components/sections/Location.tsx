'use client'
import { useState } from 'react'

export default function Location() {
  const [copied, setCopied] = useState(false)

  function copyAddress() {
    navigator.clipboard.writeText('123 Nightlife Blvd, City Center, NY 10001')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id="location"
      className="section-pad"
      style={{ background: 'var(--dark)' }}
    >
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">FIND US</span>
          <h2 className="section-title">
            Our <em>Location</em>
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
          gridTemplateColumns: '1fr 380px',
          gap:                 '2.5rem',
          alignItems:          'start',
        }} className="loc-layout">

          {/* ── Map ──────────────────────────── */}
          <div>
            {/* Google Maps embed */}
            <div style={{
              position:    'relative',
              border:      '1px solid rgba(201,168,76,0.25)',
              overflow:    'hidden',
            }}>
              {/* 
                HOW TO GET YOUR REAL MAP:
                1. Go to maps.google.com
                2. Search your bar address
                3. Click Share → Embed a map
                4. Copy the src URL from the iframe code
                5. Replace the src below with your URL
              */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1!2d-73.9857!3d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjIiTiA3M8KwNTknMDguNSJX!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="420"
                style={{
                  border:     'none',
                  display:    'block',
                  filter:     'invert(90%) hue-rotate(180deg)',
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Empire Luxe Lounge Location"
              />
            </div>

            {/* Address bar below map */}
            <div style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'space-between',
              padding:        '1rem 1.2rem',
              background:     'var(--card)',
              border:         '1px solid rgba(201,168,76,0.2)',
              borderTop:      'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ color: 'var(--gold)' }}>📍</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--cream)' }}>
                  123 Nightlife Blvd, City Center, NY 10001
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={copyAddress}
                  style={{
                    padding:       '0.4rem 0.9rem',
                    background:    'transparent',
                    border:        '1px solid rgba(201,168,76,0.3)',
                    color:         copied ? 'var(--gold)' : 'var(--muted)',
                    fontFamily:    'Josefin Sans, sans-serif',
                    fontSize:      '0.5rem',
                    letterSpacing: '0.15em',
                    cursor:        'pointer',
                    transition:    'all 0.3s',
                  }}
                >
                  {copied ? '✓ COPIED' : 'COPY'}
                </button>
                <a
                  href="https://maps.google.com/?q=123+Nightlife+Blvd+New+York"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding:        '0.4rem 0.9rem',
                    background:     'var(--gold)',
                    color:          '#0D0810',
                    fontFamily:     'Josefin Sans, sans-serif',
                    fontSize:       '0.5rem',
                    letterSpacing:  '0.15em',
                    textDecoration: 'none',
                    transition:     'all 0.3s',
                    whiteSpace:     'nowrap',
                  }}
                >
                  GET DIRECTIONS →
                </a>
              </div>
            </div>
          </div>

          {/* ── Info cards ───────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Address */}
            <div style={{
              padding:    '1.5rem',
              background: 'var(--card)',
              border:     '1px solid rgba(201,168,76,0.2)',
            }}>
              <p style={{
                fontSize:      '0.52rem',
                letterSpacing: '0.28em',
                color:         'var(--gold)',
                marginBottom:  '1rem',
              }}>
                ADDRESS
              </p>
              {[
                { icon:'📍', text:'123 Nightlife Blvd, City Center' },
                { icon:'🏙️', text:'New York, NY 10001'              },
                { icon:'🚇', text:'2 min walk from Central Station' },
                { icon:'🅿️', text:'Valet parking available'        },
              ].map((item) => (
                <div key={item.text} style={{
                  display:      'flex',
                  gap:          '0.7rem',
                  marginBottom: '0.6rem',
                  alignItems:   'center',
                }}>
                  <span style={{ fontSize: '0.85rem' }}>{item.icon}</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Phone */}
            <div style={{
              padding:    '1.5rem',
              background: 'var(--card)',
              border:     '1px solid rgba(201,168,76,0.2)',
            }}>
              <p style={{
                fontSize:      '0.52rem',
                letterSpacing: '0.28em',
                color:         'var(--gold)',
                marginBottom:  '1rem',
              }}>
                CONTACT
              </p>
              {[
                { icon:'📞', label:'Reservations', value:'+1 (555) 123-4567', href:'tel:+15551234567'          },
                { icon:'✉️', label:'Email',        value:'hello@empireluxe.com', href:'mailto:hello@empireluxe.com' },
                { icon:'📱', label:'WhatsApp',     value:'+1 (555) 123-4567', href:'https://wa.me/15551234567'  },
              ].map((item) => (
                <div key={item.label} style={{
                  display:      'flex',
                  gap:          '0.7rem',
                  marginBottom: '0.8rem',
                  alignItems:   'flex-start',
                }}>
                  <span style={{ fontSize: '0.85rem', marginTop: '1px' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.5rem', color: 'var(--gold-dim)', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>
                      {item.label}
                    </div>
                    <a
                      href={item.href}
                      style={{
                        fontSize:       '0.65rem',
                        color:          'var(--cream)',
                        textDecoration: 'none',
                        transition:     'color 0.3s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--cream)')}
                    >
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Hours */}
            <div style={{
              padding:    '1.5rem',
              background: 'var(--card)',
              border:     '1px solid rgba(201,168,76,0.2)',
            }}>
              <p style={{
                fontSize:      '0.52rem',
                letterSpacing: '0.28em',
                color:         'var(--gold)',
                marginBottom:  '1rem',
              }}>
                OPENING HOURS
              </p>
              {[
                { day:'Monday — Thursday', hours:'6PM — 2AM',  special: false },
                { day:'Friday',            hours:'6PM — 4AM',  special: false },
                { day:'Saturday',          hours:'6PM — 4AM',  special: false },
                { day:'Sunday',            hours:'6PM — 1AM',  special: false },
                { day:'Happy Hour',        hours:'5PM — 8PM Daily', special: true  },
              ].map((h) => (
                <div key={h.day} style={{
                  display:        'flex',
                  justifyContent: 'space-between',
                  padding:        '0.45rem 0',
                  borderBottom:   '1px solid rgba(201,168,76,0.08)',
                  fontSize:       '0.62rem',
                }}>
                  <span style={{ color: h.special ? 'var(--gold)' : 'var(--muted)' }}>
                    {h.day}
                  </span>
                  <span style={{ color: h.special ? 'var(--gold)' : 'var(--cream)' }}>
                    {h.hours}
                  </span>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div style={{
              padding:    '1.2rem 1.5rem',
              background: 'var(--card)',
              border:     '1px solid rgba(201,168,76,0.2)',
            }}>
              <p style={{
                fontSize:      '0.52rem',
                letterSpacing: '0.28em',
                color:         'var(--gold)',
                marginBottom:  '1rem',
              }}>
                FOLLOW US
              </p>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {[
                  { label:'Instagram', icon:'📸', href:'#' },
                  { label:'TikTok',    icon:'🎵', href:'#' },
                  { label:'Facebook',  icon:'👥', href:'#' },
                  { label:'Twitter',   icon:'🐦', href:'#' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    style={{
                      display:        'flex',
                      alignItems:     'center',
                      gap:            '0.4rem',
                      padding:        '0.4rem 0.8rem',
                      border:         '1px solid rgba(201,168,76,0.2)',
                      color:          'var(--muted)',
                      textDecoration: 'none',
                      fontSize:       '0.55rem',
                      letterSpacing:  '0.1em',
                      transition:     'all 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)'
                      ;(e.currentTarget as HTMLElement).style.color = 'var(--gold)'
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.2)'
                      ;(e.currentTarget as HTMLElement).style.color = 'var(--muted)'
                    }}
                  >
                    {s.icon} {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .loc-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
