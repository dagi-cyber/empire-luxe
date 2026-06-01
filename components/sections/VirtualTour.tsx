'use client'
import { useState } from 'react'

const ROOMS = [
  {
    id:       'lounge',
    icon:     '🍸',
    name:     'MAIN LOUNGE',
    desc:     'The heart of Empire Luxe — 200-capacity main floor with central bar',
    capacity: '200 guests',
    bg:       'linear-gradient(135deg, #1A0F30, #2D1060)',
    detail:   'Our stunning main floor features a fully stocked central bar, premium seating areas, state-of-the-art sound system and immersive lighting designed to create the perfect nightlife atmosphere.',
  },
  {
    id:       'vip',
    icon:     '👑',
    name:     'VIP ROOM',
    desc:     'Exclusive private booths — intimate, luxurious, and entirely yours',
    capacity: 'Up to 20 guests',
    bg:       'linear-gradient(135deg, #301A0A, #604020)',
    detail:   'Our VIP room offers the ultimate private experience. Plush seating, dedicated service staff, private bar access and a secluded atmosphere perfect for celebrations and corporate entertaining.',
  },
  {
    id:       'bar',
    icon:     '🍾',
    name:     'BOTTLE BAR',
    desc:     'The premium spirits destination — expert bartenders, rare pours',
    capacity: '40 guests',
    bg:       'linear-gradient(135deg, #0A1A30, #103060)',
    detail:   'Our curated bottle bar houses over 200 premium spirits, rare whiskeys and vintage champagnes. Expert mixologists craft bespoke cocktails tailored to your taste.',
  },
  {
    id:       'dj',
    icon:     '🎧',
    name:     'DJ BOOTH',
    desc:     'The engine room — where the music lives and the night begins',
    capacity: 'Professional setup',
    bg:       'linear-gradient(135deg, #1A0A28, #3D1080)',
    detail:   'State-of-the-art Pioneer CDJ setup, premium sound engineering and custom lighting rigs. Our DJ booth is built for world-class performances every night.',
  },
  {
    id:       'terrace',
    icon:     '🌿',
    name:     'OUTDOOR TERRACE',
    desc:     'Open-air rooftop lounge — city views, cool breeze, warm vibes',
    capacity: '80 guests',
    bg:       'linear-gradient(135deg, #0A1A0A, #104010)',
    detail:   'Escape to our stunning outdoor terrace with panoramic city views. Perfect for pre-dinner drinks, private gatherings or simply enjoying the night air in style.',
  },
]

export default function VirtualTour() {
  const [active,  setActive]  = useState(ROOMS[0])
  const [started, setStarted] = useState(false)
  const [transitioning, setTransitioning] = useState(false)

  function changeRoom(room: typeof ROOMS[0]) {
    if (room.id === active.id) return
    setTransitioning(true)
    setTimeout(() => {
      setActive(room)
      setTransitioning(false)
    }, 300)
    if (!started) setStarted(true)
  }

  return (
    <section
      id="virtual-tour"
      className="section-pad"
      style={{
        background: 'linear-gradient(180deg, #050305 0%, #0D0810 100%)',
      }}
    >
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">EXPLORE EMPIRE LUXE</span>
          <h2 className="section-title">
            Virtual <em>Tour</em>
          </h2>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            maxWidth: '300px', margin: '1.2rem auto 0',
          }}>
            <div style={{ flex:1, height:'1px', background:'rgba(201,168,76,0.25)' }} />
            <span style={{ color:'var(--gold-dim)', fontSize:'0.65rem' }}>✦</span>
            <div style={{ flex:1, height:'1px', background:'rgba(201,168,76,0.25)' }} />
          </div>
          <p style={{
            fontSize:   '0.7rem',
            color:      'var(--muted)',
            maxWidth:   '480px',
            margin:     '1rem auto 0',
            lineHeight: 2,
          }}>
            Step inside before your visit. Explore every space in our lounge
            — from the main floor to our exclusive VIP rooms.
          </p>
        </div>

        {/* Main layout */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: '1fr 280px',
          gap:                 '1.5rem',
          alignItems:          'start',
        }} className="tour-layout">

          {/* Viewer */}
          <div>
            <div style={{
              position:   'relative',
              aspectRatio: '16/10',
              border:     '1px solid rgba(201,168,76,0.28)',
              overflow:   'hidden',
              cursor:     'crosshair',
            }}>
              {/* Scene */}
              <div style={{
                position:       'absolute',
                inset:          0,
                background:     active.bg,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                fontSize:       '6rem',
                opacity:        transitioning ? 0 : 0.3,
                transition:     'opacity 0.3s, background 0.5s',
              }}>
                {active.icon}
              </div>

              {/* Room name overlay */}
              <div style={{
                position:   'absolute',
                bottom:     0,
                left:       0,
                right:      0,
                padding:    '2rem 1.5rem 1rem',
                background: 'linear-gradient(to top, rgba(5,3,5,0.9), transparent)',
                opacity:    transitioning ? 0 : 1,
                transition: 'opacity 0.3s',
              }}>
                <div style={{
                  fontSize:      '0.52rem',
                  letterSpacing: '0.28em',
                  color:         'var(--gold)',
                  marginBottom:  '0.3rem',
                }}>
                  NOW VIEWING
                </div>
                <div className="font-cormorant" style={{ fontSize: '1.8rem' }}>
                  {active.name}
                </div>
              </div>

              {/* 360 badge */}
              {started && (
                <div style={{
                  position:      'absolute',
                  top:           '1rem',
                  right:         '1rem',
                  fontSize:      '0.48rem',
                  letterSpacing: '0.15em',
                  color:         'var(--purple-neon)',
                  border:        '1px solid rgba(159,94,255,0.3)',
                  padding:       '0.3rem 0.7rem',
                  background:    'rgba(0,0,0,0.5)',
                }}>
                  360°
                </div>
              )}

              {/* Start overlay */}
              {!started && (
                <div style={{
                  position:       'absolute',
                  inset:          0,
                  display:        'flex',
                  flexDirection:  'column',
                  alignItems:     'center',
                  justifyContent: 'center',
                  gap:            '1rem',
                  background:     'rgba(5,3,5,0.6)',
                }}>
                  <button
                    onClick={() => setStarted(true)}
                    style={{
                      width:          '64px',
                      height:         '64px',
                      borderRadius:   '50%',
                      border:         '2px solid var(--gold)',
                      background:     'rgba(201,168,76,0.1)',
                      color:          'var(--cream)',
                      fontSize:       '1.2rem',
                      cursor:         'pointer',
                      transition:     'all 0.3s',
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      paddingLeft:    '4px',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'var(--gold)'
                      ;(e.currentTarget as HTMLElement).style.color = '#0D0810'
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.1)'
                      ;(e.currentTarget as HTMLElement).style.color = 'var(--cream)'
                    }}
                  >
                    ▶
                  </button>
                  <p style={{
                    fontSize:      '0.56rem',
                    letterSpacing: '0.3em',
                    color:         'var(--muted)',
                  }}>
                    CLICK TO BEGIN 360° TOUR
                  </p>
                </div>
              )}

              {/* Dot navigation */}
              <div style={{
                position:       'absolute',
                bottom:         '1rem',
                right:          '1rem',
                display:        'flex',
                gap:            '0.4rem',
              }}>
                {ROOMS.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => changeRoom(room)}
                    style={{
                      width:      '8px',
                      height:     '8px',
                      border:     '1px solid var(--gold)',
                      background: active.id === room.id ? 'var(--gold)' : 'transparent',
                      cursor:     'pointer',
                      transition: 'all 0.3s',
                      padding:    0,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Info bar below viewer */}
            <div style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'space-between',
              padding:        '1rem 1.2rem',
              background:     'var(--card)',
              border:         '1px solid rgba(201,168,76,0.2)',
              borderTop:      'none',
            }}>
              <div>
                <div style={{
                  fontSize:      '0.56rem',
                  letterSpacing: '0.2em',
                  color:         'var(--gold)',
                  marginBottom:  '0.2rem',
                }}>
                  {active.name}
                </div>
                <div style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>
                  {active.desc}
                </div>
              </div>
              <div style={{
                fontSize:      '0.48rem',
                letterSpacing: '0.12em',
                color:         'var(--purple-neon)',
                border:        '1px solid rgba(159,94,255,0.3)',
                padding:       '0.25rem 0.6rem',
                whiteSpace:    'nowrap',
              }}>
                360°
              </div>
            </div>

            {/* Room detail */}
            <div style={{
              padding:     '1.2rem',
              background:  'rgba(201,168,76,0.02)',
              border:      '1px solid rgba(201,168,76,0.1)',
              borderTop:   'none',
              opacity:     transitioning ? 0 : 1,
              transition:  'opacity 0.3s',
            }}>
              <p style={{
                fontSize:   '0.65rem',
                color:      'var(--muted)',
                lineHeight: 1.9,
              }}>
                {active.detail}
              </p>
            </div>
          </div>

          {/* Sidebar — room selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p style={{
              fontSize:      '0.52rem',
              letterSpacing: '0.25em',
              color:         'var(--gold)',
              marginBottom:  '0.8rem',
            }}>
              SELECT A SPACE
            </p>

            {ROOMS.map((room) => (
              <button
                key={room.id}
                onClick={() => changeRoom(room)}
                style={{
                  display:     'flex',
                  alignItems:  'center',
                  gap:         '0.8rem',
                  padding:     '0.8rem 1rem',
                  border:      `1px solid ${active.id === room.id ? 'var(--gold)' : 'rgba(201,168,76,0.18)'}`,
                  background:  active.id === room.id ? 'rgba(201,168,76,0.06)' : 'var(--card)',
                  cursor:      'pointer',
                  transition:  'all 0.3s',
                  textAlign:   'left',
                  width:       '100%',
                }}
                onMouseEnter={(e) => {
                  if (active.id !== room.id) {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.4)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (active.id !== room.id) {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.18)'
                  }
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>{room.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize:      '0.6rem',
                    letterSpacing: '0.1em',
                    color:         active.id === room.id ? 'var(--gold)' : 'var(--cream)',
                  }}>
                    {room.name}
                  </div>
                  <div style={{ fontSize: '0.52rem', color: 'var(--muted)' }}>
                    {room.capacity}
                  </div>
                </div>
                <span style={{
                  fontSize:      '0.45rem',
                  letterSpacing: '0.12em',
                  color:         'var(--purple-neon)',
                  flexShrink:    0,
                }}>
                  360°
                </span>
              </button>
            ))}

            {/* Capacity info */}
            <div style={{
              marginTop:  '0.5rem',
              padding:    '1.1rem',
              border:     '1px solid rgba(201,168,76,0.2)',
              background: 'var(--card)',
            }}>
              <p style={{
                fontSize:      '0.5rem',
                letterSpacing: '0.22em',
                color:         'var(--gold)',
                marginBottom:  '0.8rem',
              }}>
                TOTAL CAPACITY
              </p>
              {ROOMS.map((room) => (
                <div key={room.id} style={{
                  display:        'flex',
                  justifyContent: 'space-between',
                  padding:        '0.3rem 0',
                  fontSize:       '0.58rem',
                  borderBottom:   '1px solid rgba(201,168,76,0.08)',
                }}>
                  <span style={{ color: 'var(--muted)' }}>{room.name}</span>
                  <span style={{ color: 'var(--cream)' }}>{room.capacity}</span>
                </div>
              ))}
            </div>

            {/* Book CTA */}
            <a
              href="#reservation"
              className="btn-gold"
              style={{
                textAlign:  'center',
                display:    'block',
                fontSize:   '0.6rem',
                padding:    '0.9rem',
                marginTop:  '0.5rem',
              }}
            >
              BOOK A VISIT
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .tour-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
