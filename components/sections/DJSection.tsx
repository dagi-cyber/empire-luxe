'use client'
import { useState, useEffect } from 'react'
import { sanityClient, urlFor } from '@/lib/sanity'
import Image from 'next/image'

const FALLBACK_DJS = [
  {
    _id: 'd1', name: 'DJ Ignite', genre: 'House & Afro Beats',
    isResident: true, bio: 'Our resident powerhouse. DJ Ignite has been setting the Empire Luxe dance floor on fire every Saturday with an electric blend of house, afro beats and chart anthems.',
    upcomingDates: [
      { date: '2024-05-24', eventName: 'Saturday Sessions', startTime: '10PM' },
      { date: '2024-06-28', eventName: 'End of Month Bash',  startTime: '10PM' },
    ],
  },
  {
    _id: 'd2', name: 'DJ Alex',  genre: 'Tech House & Electronic',
    isResident: false, bio: 'Known for his immersive sets and ability to read the crowd. DJ Alex brings a unique blend of tech house and electronic music that keeps the floor moving all night.',
    upcomingDates: [
      { date: '2024-05-30', eventName: 'Neon Nights', startTime: '10PM' },
    ],
  },
  {
    _id: 'd3', name: 'DJ Nova',  genre: 'R&B & Hip Hop',
    isResident: false, bio: 'The queen of the decks. DJ Nova brings smooth R&B flows and hard-hitting hip hop to create the ultimate ladies night experience.',
    upcomingDates: [
      { date: '2024-06-07', eventName: 'Ladies Night', startTime: '8PM' },
    ],
  },
  {
    _id: 'd4', name: 'DJ Marcus B', genre: 'Afro House',
    isResident: false, bio: 'Guest artist from the international circuit. DJ Marcus B brings authentic afro house sounds with deep rhythms and infectious energy.',
    upcomingDates: [
      { date: '2024-06-14', eventName: 'Afro House Night', startTime: '11PM' },
    ],
  },
]

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return {
    day:   d.getDate().toString().padStart(2, '0'),
    month: d.toLocaleString('en', { month: 'short' }).toUpperCase(),
  }
}

export default function DJSection() {
  const [djs,        setDjs]        = useState<any[]>([])
  const [activeDJ,   setActiveDJ]   = useState<any>(null)
  const [loading,    setLoading]    = useState(true)

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "dj"] | order(isResident desc, name asc) {
        _id, name, bio, genre, isResident, image,
        upcomingDates[]{ date, eventName, startTime }
      }`)
      .then((data) => {
        const list = data?.length ? data : FALLBACK_DJS
        setDjs(list)
        setActiveDJ(list[0])
        setLoading(false)
      })
      .catch(() => {
        setDjs(FALLBACK_DJS)
        setActiveDJ(FALLBACK_DJS[0])
        setLoading(false)
      })
  }, [])

  // Flatten all upcoming dates across all DJs for the schedule
  const schedule = djs
    .flatMap((dj: any) =>
      (dj.upcomingDates || []).map((d: any) => ({
        ...d,
        djName:     dj.name,
        isResident: dj.isResident,
      }))
    )
    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  return (
    <section
      id="dj"
      className="section-pad"
      style={{
        background: 'linear-gradient(135deg, #050305 0%, #0F0820 100%)',
        position:   'relative',
        overflow:   'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position:     'absolute',
        inset:        0,
        background:   'radial-gradient(ellipse at center, rgba(123,47,190,0.13) 0%, transparent 65%)',
        pointerEvents:'none',
      }} />

      <div style={{ maxWidth: '1160px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <span className="section-tag">SOUND &amp; ENTERTAINMENT</span>
          <h2 className="section-title">
            Our <em>DJs</em>
          </h2>
          <div style={{ height: '1px', background: 'rgba(201,168,76,0.2)', marginTop: '1.5rem' }} />
        </div>

        <div style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:                 '3rem',
          alignItems:          'start',
        }} className="dj-grid">

          {/* Left — DJ profiles */}
          <div>
            {/* DJ selector tabs */}
            <div style={{
              display:  'flex',
              gap:      '0.5rem',
              flexWrap: 'wrap',
              marginBottom: '1.5rem',
            }}>
              {djs.map((dj: any) => (
                <button
                  key={dj._id}
                  onClick={() => setActiveDJ(dj)}
                  style={{
                    padding:       '0.5rem 1.2rem',
                    background:    activeDJ?._id === dj._id
                      ? 'var(--gold)' : 'transparent',
                    border:        '1px solid rgba(201,168,76,0.3)',
                    color:         activeDJ?._id === dj._id
                      ? '#0D0810' : 'var(--muted)',
                    fontFamily:    'Josefin Sans, sans-serif',
                    fontSize:      '0.56rem',
                    letterSpacing: '0.15em',
                    cursor:        'pointer',
                    transition:    'all 0.3s',
                  }}
                >
                  {dj.name}
                  {dj.isResident && (
                    <span style={{
                      marginLeft:    '0.4rem',
                      fontSize:      '0.42rem',
                      letterSpacing: '0.1em',
                      color:         activeDJ?._id === dj._id ? '#0D0810' : 'var(--gold)',
                    }}>
                      RESIDENT
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Active DJ card */}
            {activeDJ && (
              <div style={{
                border:     '1px solid rgba(159,94,255,0.3)',
                background: 'var(--card)',
                overflow:   'hidden',
              }}>
                {/* DJ image or equalizer */}
                <div style={{
                  height:         '240px',
                  background:     'linear-gradient(135deg, #0F0820, #1A0835)',
                  display:        'flex',
                  flexDirection:  'column',
                  alignItems:     'center',
                  justifyContent: 'center',
                  gap:            '1.2rem',
                  position:       'relative',
                  overflow:       'hidden',
                }}>
                  {/* Purple glow */}
                  <div style={{
                    position:  'absolute', inset: 0,
                    background:'radial-gradient(ellipse at center, rgba(123,47,190,0.3) 0%, transparent 70%)',
                  }} />

                  {activeDJ.image ? (
                    <div style={{ position: 'relative', width: '120px', height: '120px', zIndex: 1 }}>
                      <Image
                        src={urlFor(activeDJ.image).width(120).height(120).url()}
                        alt={activeDJ.name}
                        fill
                        style={{ objectFit: 'cover', borderRadius: '50%', border: '2px solid var(--gold)' }}
                      />
                    </div>
                  ) : (
                    <>
                      {/* Animated equalizer */}
                      <div style={{
                        display:    'flex',
                        alignItems: 'flex-end',
                        gap:        '3px',
                        height:     '60px',
                        position:   'relative',
                        zIndex:     1,
                      }}>
                        {Array.from({ length: 14 }).map((_, i) => (
                          <div
                            key={i}
                            style={{
                              width:      '6px',
                              borderRadius:'2px 2px 0 0',
                              background:  i % 2 === 0 ? 'var(--purple-bright)' : 'var(--gold)',
                              animation:  `eqBar ${0.4 + (i * 0.07)}s ease-in-out infinite alternate`,
                              height:     `${15 + (i % 5) * 10}px`,
                            }}
                          />
                        ))}
                      </div>
                      <div style={{ fontSize: '1.5rem', position: 'relative', zIndex: 1 }}>🎧</div>
                    </>
                  )}

                  <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <div className="font-cormorant" style={{ fontSize: '1.6rem' }}>
                      {activeDJ.name}
                    </div>
                    <div style={{
                      fontSize:      '0.52rem',
                      letterSpacing: '0.2em',
                      color:         'var(--gold)',
                    }}>
                      {activeDJ.isResident ? 'RESIDENT ARTIST' : 'GUEST ARTIST'}
                    </div>
                  </div>
                </div>

                {/* DJ info */}
                <div style={{ padding: '1.5rem' }}>
                  <div style={{
                    display:       'flex',
                    alignItems:    'center',
                    gap:           '0.8rem',
                    marginBottom:  '1rem',
                  }}>
                    <span style={{
                      fontSize:      '0.5rem',
                      letterSpacing: '0.2em',
                      color:         'var(--purple-neon)',
                      border:        '1px solid rgba(159,94,255,0.3)',
                      padding:       '0.25rem 0.7rem',
                    }}>
                      {activeDJ.genre}
                    </span>
                  </div>

                  <p style={{
                    fontSize:   '0.68rem',
                    color:      'var(--muted)',
                    lineHeight: 2,
                  }}>
                    {activeDJ.bio}
                  </p>

                  {/* Upcoming dates for this DJ */}
                  {activeDJ.upcomingDates?.length > 0 && (
                    <div style={{ marginTop: '1.2rem' }}>
                      <div style={{
                        fontSize:      '0.5rem',
                        letterSpacing: '0.25em',
                        color:         'var(--gold)',
                        marginBottom:  '0.6rem',
                      }}>
                        NEXT APPEARANCES
                      </div>
                      {activeDJ.upcomingDates.map((d: any, i: number) => {
                        const { day, month } = formatDate(d.date)
                        return (
                          <div key={i} style={{
                            display:     'flex',
                            gap:         '0.8rem',
                            alignItems:  'center',
                            padding:     '0.5rem 0',
                            borderBottom:'1px solid rgba(201,168,76,0.1)',
                          }}>
                            <div style={{ textAlign: 'center', minWidth: '36px' }}>
                              <div className="font-cormorant" style={{ fontSize: '1.2rem', color: 'var(--gold)', lineHeight: 1 }}>
                                {day}
                              </div>
                              <div style={{ fontSize: '0.44rem', letterSpacing: '0.15em', color: 'var(--muted)' }}>
                                {month}
                              </div>
                            </div>
                            <div>
                              <div style={{ fontSize: '0.6rem', color: 'var(--cream)' }}>{d.eventName}</div>
                              <div style={{ fontSize: '0.54rem', color: 'var(--muted)' }}>{d.startTime} — LATE</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right — Full schedule */}
          <div>
            <div style={{
              fontSize:      '0.52rem',
              letterSpacing: '0.28em',
              color:         'var(--gold)',
              marginBottom:  '1.2rem',
            }}>
              UPCOMING SCHEDULE
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {schedule.length > 0 ? (
                schedule.map((slot: any, i: number) => {
                  const { day, month } = formatDate(slot.date)
                  return (
                    <div
                      key={i}
                      style={{
                        display:    'flex',
                        alignItems: 'center',
                        gap:        '1.2rem',
                        padding:    '1rem 1.2rem',
                        border:     '1px solid rgba(201,168,76,0.18)',
                        background: 'var(--card)',
                        transition: 'all 0.3s',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)'
                        ;(e.currentTarget as HTMLElement).style.background  = 'rgba(201,168,76,0.03)'
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.18)'
                        ;(e.currentTarget as HTMLElement).style.background  = 'var(--card)'
                      }}
                    >
                      {/* Date */}
                      <div style={{ textAlign: 'center', minWidth: '44px' }}>
                        <div className="font-cormorant" style={{
                          fontSize: '1.6rem', color: 'var(--gold)', lineHeight: 1,
                        }}>
                          {day}
                        </div>
                        <div style={{
                          fontSize: '0.44rem', letterSpacing: '0.15em', color: 'var(--muted)',
                        }}>
                          {month}
                        </div>
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1 }}>
                        <div className="font-cormorant" style={{ fontSize: '1.1rem' }}>
                          {slot.djName}
                        </div>
                        <div style={{
                          fontSize: '0.56rem', color: 'var(--gold)', letterSpacing: '0.1em',
                        }}>
                          {slot.eventName}
                        </div>
                        <div style={{ fontSize: '0.52rem', color: 'var(--muted)' }}>
                          {slot.startTime} — LATE
                        </div>
                      </div>

                      {/* Tag */}
                      <span style={{
                        fontSize:      '0.46rem',
                        letterSpacing: '0.1em',
                        padding:       '0.22rem 0.55rem',
                        border:        '1px solid rgba(159,94,255,0.3)',
                        color:         'var(--purple-neon)',
                        whiteSpace:    'nowrap',
                      }}>
                        {slot.isResident ? 'RESIDENT' : 'GUEST'}
                      </span>
                    </div>
                  )
                })
              ) : (
                // Fallback schedule
                [
                  { day:'24', month:'MAY', name:'DJ Ignite',   event:'Saturday Sessions', time:'10PM', tag:'RESIDENT' },
                  { day:'30', month:'MAY', name:'DJ Alex',     event:'Neon Nights',        time:'10PM', tag:'GUEST'    },
                  { day:'07', month:'JUN', name:'DJ Nova',     event:'Ladies Night',       time:'8PM',  tag:'GUEST'    },
                  { day:'14', month:'JUN', name:'DJ Marcus B', event:'Afro House Night',   time:'11PM', tag:'GUEST'    },
                ].map((s, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '1.2rem',
                    padding: '1rem 1.2rem', border: '1px solid rgba(201,168,76,0.18)',
                    background: 'var(--card)', transition: 'all 0.3s',
                  }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)'
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.18)'
                    }}
                  >
                    <div style={{ textAlign: 'center', minWidth: '44px' }}>
                      <div className="font-cormorant" style={{ fontSize: '1.6rem', color: 'var(--gold)', lineHeight: 1 }}>{s.day}</div>
                      <div style={{ fontSize: '0.44rem', letterSpacing: '0.15em', color: 'var(--muted)' }}>{s.month}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="font-cormorant" style={{ fontSize: '1.1rem' }}>{s.name}</div>
                      <div style={{ fontSize: '0.56rem', color: 'var(--gold)', letterSpacing: '0.1em' }}>{s.event}</div>
                      <div style={{ fontSize: '0.52rem', color: 'var(--muted)' }}>{s.time} — LATE</div>
                    </div>
                    <span style={{
                      fontSize: '0.46rem', letterSpacing: '0.1em',
                      padding: '0.22rem 0.55rem',
                      border: '1px solid rgba(159,94,255,0.3)',
                      color: 'var(--purple-neon)',
                    }}>{s.tag}</span>
                  </div>
                ))
              )}
            </div>

            {/* Book CTA */}
            <div style={{
              marginTop:   '1.5rem',
              padding:     '1.5rem',
              border:      '1px solid rgba(201,168,76,0.2)',
              background:  'rgba(201,168,76,0.04)',
              textAlign:   'center',
            }}>
              <p className="font-cormorant" style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>
                Want to book a DJ for your private event?
              </p>
              <p style={{ fontSize: '0.62rem', color: 'var(--muted)', marginBottom: '1rem' }}>
                Contact our events team for custom packages.
              </p>
              <a href="#reservation" className="btn-gold" style={{ fontSize: '0.6rem' }}>
                ENQUIRE NOW
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes eqBar {
          0%   { height: 6px;  }
          100% { height: 55px; }
        }
        @media (max-width: 900px) {
          .dj-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
