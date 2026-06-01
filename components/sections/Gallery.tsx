'use client'
import { useState, useEffect } from 'react'
import { sanityClient, urlFor } from '@/lib/sanity'
import Image from 'next/image'

const FALLBACK = [
  { _id:'g1', label:'SIGNATURE COCKTAILS', bg:'linear-gradient(135deg,#1A0F30,#2D1060)', icon:'🍸', large:true,  tall:false },
  { _id:'g2', label:'VIP EXPERIENCE',      bg:'linear-gradient(135deg,#0F1A30,#103060)', icon:'🌟', large:false, tall:true  },
  { _id:'g3', label:'LIVE DJ NIGHTS',      bg:'linear-gradient(135deg,#1A0A20,#3D1070)', icon:'🎧', large:false, tall:false },
  { _id:'g4', label:'BOTTLE SERVICE',      bg:'linear-gradient(135deg,#200A1A,#701040)', icon:'🍾', large:false, tall:false },
  { _id:'g5', label:'NEON VIBES',          bg:'linear-gradient(135deg,#0A1020,#201060)', icon:'💜', large:true,  tall:false },
  { _id:'g6', label:'TERRACE NIGHTS',      bg:'linear-gradient(135deg,#0A200A,#104010)', icon:'🌿', large:false, tall:false },
  { _id:'g7', label:'VIP TABLES',          bg:'linear-gradient(135deg,#201A0A,#504010)', icon:'👑', large:false, tall:false },
]

const FILTER_TABS = [
  { key: 'all',       label: 'ALL'       },
  { key: 'cocktails', label: 'COCKTAILS' },
  { key: 'vip',       label: 'VIP'       },
  { key: 'events',    label: 'EVENTS'    },
  { key: 'food',      label: 'FOOD'      },
  { key: 'ambiance',  label: 'AMBIANCE'  },
]

export default function Gallery() {
  const [images,    setImages]    = useState<any[]>([])
  const [loading,   setLoading]   = useState(true)
  const [filter,    setFilter]    = useState('all')
  const [lightbox,  setLightbox]  = useState<any | null>(null)
  const [hovered,   setHovered]   = useState<string | null>(null)

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "galleryImage"] | order(order asc) {
        _id, image, caption, category
      }`)
      .then((data) => {
        setImages(data || [])
        setLoading(false)
      })
      .catch(() => {
        setImages([])
        setLoading(false)
      })
  }, [])

  const useSanity   = images.length > 0
  const filtered    = useSanity
    ? (filter === 'all' ? images : images.filter((i) => i.category === filter))
    : FALLBACK

  return (
    <section
      id="gallery"
      className="section-pad"
      style={{ background: 'var(--black)' }}
    >
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="section-tag">ATMOSPHERE &amp; AMBIANCE</span>
          <h2 className="section-title">
            Our <em>Gallery</em>
          </h2>

          {/* Filter tabs — only show when Sanity has images */}
          {useSanity && (
            <div style={{
              display:        'flex',
              gap:            '0',
              justifyContent: 'center',
              marginTop:      '1.5rem',
              borderBottom:   '1px solid rgba(201,168,76,0.15)',
              flexWrap:       'wrap',
            }}>
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  style={{
                    padding:       '0.6rem 1.2rem',
                    background:    'transparent',
                    border:        'none',
                    borderBottom:  filter === tab.key
                      ? '2px solid var(--gold)'
                      : '2px solid transparent',
                    marginBottom:  '-1px',
                    fontFamily:    'Josefin Sans, sans-serif',
                    fontSize:      '0.55rem',
                    letterSpacing: '0.18em',
                    color:         filter === tab.key ? 'var(--gold)' : 'var(--muted)',
                    cursor:        'pointer',
                    transition:    'all 0.3s',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Gallery grid */}
        {loading ? (
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gridAutoRows:        '180px',
            gap:                 '4px',
          }}>
            {[1,2,3,4,5,6,7].map((i) => (
              <div key={i} style={{
                background: 'var(--card)',
                border:     '1px solid rgba(201,168,76,0.1)',
                opacity:    0.4,
              }} />
            ))}
          </div>
        ) : useSanity ? (
          /* ── Sanity images grid ── */
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap:                 '0.5rem',
          }} className="gal-grid">
            {filtered.map((item: any) => (
              <div
                key={item._id}
                onClick={() => setLightbox(item)}
                onMouseEnter={() => setHovered(item._id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position:    'relative',
                  aspectRatio: '4/3',
                  overflow:    'hidden',
                  cursor:      'pointer',
                  border:      `1px solid ${hovered === item._id ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.15)'}`,
                  transition:  'border-color 0.3s',
                }}
              >
                <Image
                  src={urlFor(item.image).width(500).height(375).url()}
                  alt={item.caption || 'Gallery image'}
                  fill
                  style={{
                    objectFit:  'cover',
                    transition: 'transform 0.5s',
                    transform:  hovered === item._id ? 'scale(1.05)' : 'scale(1)',
                  }}
                />
                {/* Hover overlay */}
                <div style={{
                  position:       'absolute',
                  inset:          0,
                  background:     'rgba(201,168,76,0.15)',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  opacity:        hovered === item._id ? 1 : 0,
                  transition:     'opacity 0.3s',
                }}>
                  {item.caption && (
                    <span style={{
                      fontSize:      '0.58rem',
                      letterSpacing: '0.18em',
                      color:         'var(--cream)',
                      background:    'rgba(5,3,5,0.7)',
                      padding:       '0.4rem 1rem',
                    }}>
                      {item.caption.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ── Fallback mosaic grid ── */
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gridAutoRows:        '180px',
            gap:                 '4px',
          }} className="gal-grid">
            {FALLBACK.map((item) => (
              <div
                key={item._id}
                onMouseEnter={() => setHovered(item._id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background:  item.bg,
                  border:      `1px solid ${hovered === item._id ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.15)'}`,
                  display:     'flex',
                  alignItems:  'center',
                  justifyContent:'center',
                  fontSize:    '2.8rem',
                  cursor:      'pointer',
                  position:    'relative',
                  overflow:    'hidden',
                  transition:  'border-color 0.4s',
                  gridColumn:  item.large ? 'span 2' : 'span 1',
                  gridRow:     item.tall  ? 'span 2' : 'span 1',
                }}
              >
                {item.icon}
                <div style={{
                  position:       'absolute',
                  inset:          0,
                  background:     'rgba(201,168,76,0.12)',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  opacity:        hovered === item._id ? 1 : 0,
                  transition:     'opacity 0.3s',
                }}>
                  <span style={{
                    fontSize:      '0.54rem',
                    letterSpacing: '0.18em',
                    color:         'var(--gold)',
                    fontFamily:    'Josefin Sans, sans-serif',
                  }}>
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload CTA when no Sanity images */}
        {!loading && !useSanity && (
          <div style={{
            textAlign:   'center',
            marginTop:   '1.5rem',
            padding:     '1rem',
            border:      '1px dashed rgba(201,168,76,0.2)',
            background:  'rgba(201,168,76,0.02)',
          }}>
            <p style={{
              fontSize:      '0.62rem',
              color:         'var(--muted)',
              letterSpacing: '0.05em',
            }}>
              📸 Add real photos via{' '}
              <a
                href="/studio"
                style={{ color: 'var(--gold)', textDecoration: 'none' }}
              >
                Sanity Studio → Gallery
              </a>
            </p>
          </div>
        )}
      </div>

      {/* ── Lightbox ─────────────────────── */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position:       'fixed',
            inset:          0,
            zIndex:         500,
            background:     'rgba(5,3,5,0.95)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            padding:        '2rem',
            cursor:         'zoom-out',
          }}
        >
          <div style={{
            position:  'relative',
            maxWidth:  '900px',
            maxHeight: '80vh',
            width:     '100%',
          }}>
            <Image
              src={urlFor(lightbox.image).width(900).url()}
              alt={lightbox.caption || ''}
              width={900}
              height={600}
              style={{
                objectFit: 'contain',
                width:     '100%',
                height:    'auto',
                maxHeight: '80vh',
              }}
            />
            {lightbox.caption && (
              <p style={{
                textAlign:     'center',
                marginTop:     '1rem',
                fontSize:      '0.65rem',
                color:         'var(--muted)',
                letterSpacing: '0.1em',
              }}>
                {lightbox.caption}
              </p>
            )}
            {/* Close button */}
            <button
              onClick={() => setLightbox(null)}
              style={{
                position:   'absolute',
                top:        '-1rem',
                right:      '-1rem',
                width:      '36px',
                height:     '36px',
                borderRadius:'50%',
                background: 'var(--gold)',
                border:     'none',
                color:      '#0D0810',
                fontSize:   '1rem',
                cursor:     'pointer',
                display:    'flex',
                alignItems: 'center',
                justifyContent:'center',
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .gal-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  )
}
