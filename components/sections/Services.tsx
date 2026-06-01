'use client'
import { useState, useEffect } from 'react'
import { sanityClient } from '@/lib/sanity'

const FALLBACK_SERVICES = [
  {
    _id:         '1',
    icon:        '👑',
    title:       'VIP Experience',
    description: 'Elevated service just for you. Dedicated staff, reserved premium seating, priority entry and personalised attention throughout your evening. Arrive like royalty, leave like a legend.',
    ctaText:     'BOOK VIP TABLE',
    ctaLink:     '#reservation',
  },
  {
    _id:         '2',
    icon:        '🍾',
    title:       'Bottle Service',
    description: 'Celebrate in signature style. Premium spirits, champagnes and mixers delivered to your table with flair. Perfect for birthdays, celebrations and corporate events.',
    ctaText:     'VIEW PACKAGES',
    ctaLink:     '#reservation',
  },
  {
    _id:         '3',
    icon:        '🎧',
    title:       'Live DJ & Entertainment',
    description: 'Top DJs. Epic vibes. Our resident and guest DJs curate soundscapes that elevate every moment — from cocktail hour ambient sets to late-night peak-hour anthems.',
    ctaText:     'SEE SCHEDULE',
    ctaLink:     '#dj',
  },
  {
    _id:         '4',
    icon:        '🥂',
    title:       'Private Events',
    description: 'Birthdays, anniversaries, corporate events — Empire Luxe offers fully customisable packages for private hire with bespoke menus and entertainment.',
    ctaText:     'ENQUIRE NOW',
    ctaLink:     '#reservation',
  },
]

export default function Services() {
  const [services, setServices] = useState<any[]>([])
  const [hovered,  setHovered]  = useState<string | null>(null)
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "service" && active == true] | order(order asc) {
        _id, title, description, icon, ctaText, ctaLink
      }`)
      .then((data) => {
        setServices(data?.length ? data : FALLBACK_SERVICES)
        setLoading(false)
      })
      .catch(() => {
        setServices(FALLBACK_SERVICES)
        setLoading(false)
      })
  }, [])

  const items = services.length ? services : FALLBACK_SERVICES

  return (
    <section
      id="services"
      className="section-pad"
      style={{ background: 'var(--black)' }}
    >
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>

        {/* ── Header ───────────────────────── */}
        <div style={{ marginBottom: '3rem' }}>
          <span className="section-tag">WHAT WE OFFER</span>
          <h2 className="section-title">
            Our <em>Services</em>
          </h2>
          <div style={{
            height:     '1px',
            background: 'rgba(201,168,76,0.2)',
            marginTop:  '1.5rem',
          }} />
        </div>

        {/* ── Grid ─────────────────────────── */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap:                 '1.2rem',
          }}
          className="sv-grid"
        >
          {items.map((s: any) => (
            <div
              key={s._id}
              onMouseEnter={() => setHovered(s._id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding:    '2.2rem',
                background: hovered === s._id ? 'rgba(201,168,76,0.03)' : 'var(--card)',
                border:     `1px solid ${hovered === s._id ? 'var(--gold)' : 'rgba(201,168,76,0.2)'}`,
                position:   'relative',
                overflow:   'hidden',
                transition: 'all 0.4s',
                cursor:     'default',
              }}
            >
              {/* Left accent bar */}
              <div style={{
                position:   'absolute',
                top:        0,
                left:       0,
                width:      '3px',
                height:     hovered === s._id ? '100%' : '0%',
                background: 'var(--gold)',
                transition: 'height 0.4s',
              }} />

              {/* Top right corner decoration */}
              <div style={{
                position:    'absolute',
                top:         '1rem',
                right:       '1rem',
                width:       '40px',
                height:      '40px',
                borderTop:   '1px solid rgba(201,168,76,0.2)',
                borderRight: '1px solid rgba(201,168,76,0.2)',
                opacity:     hovered === s._id ? 1 : 0,
                transition:  'opacity 0.4s',
              }} />

              {/* Icon */}
              <div style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
                {s.icon}
              </div>

              {/* Title */}
              <h3
                className="font-cormorant"
                style={{ fontSize: '1.5rem', marginBottom: '0.8rem' }}
              >
                {s.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize:      '0.68rem',
                lineHeight:    1.95,
                color:         'var(--muted)',
                marginBottom:  '1.5rem',
                letterSpacing: '0.03em',
              }}>
                {s.description}
              </p>

              {/* CTA link */}
              <a
                href={s.ctaLink || '#reservation'}
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            hovered === s._id ? '0.9rem' : '0.4rem',
                  fontSize:       '0.58rem',
                  letterSpacing:  '0.2em',
                  color:          'var(--gold)',
                  textDecoration: 'none',
                  transition:     'gap 0.3s',
                }}
              >
                {s.ctaText || 'LEARN MORE'} →
              </a>
            </div>
          ))}
        </div>

        {/* ── Bottom banner ─────────────────── */}
        <div style={{
          marginTop:      '2rem',
          padding:        '2rem 2.5rem',
          background:     'linear-gradient(135deg, rgba(201,168,76,0.06), rgba(123,47,190,0.06))',
          border:         '1px solid rgba(201,168,76,0.2)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          flexWrap:       'wrap',
          gap:            '1rem',
        }}>
          <div>
            <p
              className="font-cormorant"
              style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}
            >
              Ready for an unforgettable night?
            </p>
            <p style={{
              fontSize:      '0.65rem',
              color:         'var(--muted)',
              letterSpacing: '0.05em',
            }}>
              Book your table now or call us to discuss a custom package.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            <a href="#reservation" className="btn-gold">BOOK A TABLE</a>
            <a href="tel:+15551234567" className="btn-outline">CALL US</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .sv-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
