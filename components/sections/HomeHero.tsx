'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const WORDS = ['LEGENDARY', 'ICONIC', 'UNFORGETTABLE', 'ELECTRIC', 'LUXURIOUS']

export default function HomeHero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [visible, setVisible]     = useState(true)
  const [mousePos, setMousePos]   = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  // Cycle through words
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % WORDS.length)
        setVisible(true)
      }, 400)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  // Mouse parallax
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 20
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 20
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      style={{
        minHeight:  '100vh',
        position:   'relative',
        overflow:   'hidden',
        display:    'flex',
        alignItems: 'center',
        background: '#050305',
      }}
    >
      {/* Animated background orbs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', width: '700px', height: '700px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(123,47,190,0.18) 0%, transparent 70%)',
          top: '50%', left: '50%',
          transform: `translate(calc(-50% + ${mousePos.x * 1.5}px), calc(-50% + ${mousePos.y * 1.5}px))`,
          transition: 'transform 0.8s ease-out', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)',
          bottom: '-100px', left: '-100px',
          transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)`,
          transition: 'transform 1.2s ease-out', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(191,95,255,0.12) 0%, transparent 70%)',
          top: '-50px', right: '10%',
          transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px)`,
          transition: 'transform 1s ease-out', pointerEvents: 'none',
        }} />
      </div>

      {/* Grid lines */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)`,
        backgroundSize: '60px 60px', pointerEvents: 'none',
      }} />

      {/* Vertical accent line */}
      <div style={{
        position: 'absolute', top: 0, right: '35%', width: '1px', height: '100%',
        background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.15), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Main content */}
      <div
        style={{
          maxWidth: '1200px', margin: '0 auto', padding: '8rem 3rem 4rem',
          width: '100%', position: 'relative', zIndex: 1,
          display: 'grid', gridTemplateColumns: '1fr 420px',
          gap: '3rem', alignItems: 'center',
        }}
        className="hero-grid"
      >
        {/* Left */}
        <div>
          {/* Live badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.8rem',
            background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)',
            padding: '0.5rem 1.2rem', marginBottom: '2rem',
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: 'var(--gold)', display: 'block',
              animation: 'neonPulse 1.5s ease-in-out infinite alternate',
              boxShadow: '0 0 6px var(--gold)',
            }} />
            <span style={{ fontSize: '0.55rem', letterSpacing: '0.3em', color: 'var(--gold)' }}>
              NOW OPEN · CITY CENTER
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-cormorant" style={{ fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', fontWeight: 700, lineHeight: 0.95, marginBottom: '1.5rem' }}>
            <span style={{ display: 'block', color: 'var(--cream)' }}>THE MOST</span>
            <span style={{
              display: 'block', color: 'transparent',
              WebkitTextStroke: '1px var(--gold)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(-10px)',
              transition: 'all 0.4s ease', minHeight: '1.1em',
            }}>
              {WORDS[wordIndex]}
            </span>
            <span style={{ display: 'block', color: 'var(--cream)', fontStyle: 'italic', fontWeight: 300 }}>
              Night of Your Life
            </span>
          </h1>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ height: '1px', width: '60px', background: 'var(--gold)' }} />
            <span style={{ color: 'var(--gold)', fontSize: '0.6rem' }}>◆</span>
            <div style={{ height: '1px', flex: 1, background: 'rgba(201,168,76,0.2)' }} />
          </div>

          {/* Description */}
          <p style={{ fontSize: '0.75rem', lineHeight: 2, color: 'var(--muted)', marginBottom: '2.5rem', maxWidth: '480px', letterSpacing: '0.04em' }}>
            Step into Empire Luxe Lounge — where every detail is crafted for luxury.
            Premium cocktails, electrifying DJ sets, VIP tables and nights you'll never forget.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#reservation" className="btn-gold" style={{ padding: '1rem 2.5rem', fontSize: '0.65rem', letterSpacing: '0.3em' }}>
              BOOK A TABLE
            </a>
            <a href="#virtual-tour" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              fontSize: '0.62rem', letterSpacing: '0.2em', color: 'var(--muted)',
              textDecoration: 'none', transition: 'color 0.3s',
            }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              <span style={{
                width: '36px', height: '36px', borderRadius: '50%',
                border: '1px solid rgba(201,168,76,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem',
              }}>▶</span>
              VIRTUAL TOUR
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', marginTop: '3rem', borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: '2rem' }}>
            {[
              { num: '200+', label: 'Cocktails'     },
              { num: '5★',   label: 'Rated'         },
              { num: 'VIP',  label: 'Tables'        },
              { num: '10+',  label: 'Years of Vibe' },
            ].map((s, i) => (
              <div key={s.label} style={{
                flex: 1, textAlign: 'center',
                borderRight: i < 3 ? '1px solid rgba(201,168,76,0.12)' : 'none',
                padding: '0 1rem',
              }}>
                <div className="font-cormorant" style={{ fontSize: '2rem', color: 'var(--gold)', lineHeight: 1, fontWeight: 600 }}>
                  {s.num}
                </div>
                <div style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: 'var(--muted)', marginTop: '0.3rem', textTransform: 'uppercase' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — 3D logo card */}
        <div
          style={{
            position: 'relative',
            transform: `perspective(1000px) rotateY(${mousePos.x * -0.3}deg) rotateX(${mousePos.y * 0.3}deg)`,
            transition: 'transform 0.6s ease-out',
          }}
          className="hero-card-wrap"
        >
          {/* Rotating gradient border */}
          <div style={{
            position: 'absolute', inset: '-2px',
            background: 'linear-gradient(135deg, var(--gold), transparent, var(--purple-neon), transparent, var(--gold))',
            animation: 'rotateSlow 4s linear infinite', zIndex: 0,
          }} />

          {/* Inner card */}
          <div style={{
            position: 'relative', zIndex: 1, margin: '1px',
            background: 'linear-gradient(135deg, #0D0810 0%, #160F20 50%, #0D0810 100%)',
            padding: '3rem 2rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem',
          }}>
            {/* Logo with rotating rings */}
            <div style={{ position: 'relative', width: '220px', height: '220px' }}>
              <div style={{
                position: 'absolute', inset: '-15px', borderRadius: '50%',
                border: '1px solid rgba(201,168,76,0.2)',
                animation: 'rotateSlow 8s linear infinite',
              }} />
              <div style={{
                position: 'absolute', inset: '-30px', borderRadius: '50%',
                border: '1px dashed rgba(201,168,76,0.1)',
                animation: 'rotateSlow 12s linear infinite reverse',
              }} />
              <Image
                src="/images/logo.jpg"
                alt="Empire Luxe Lounge"
                width={220}
                height={220}
                style={{
                  objectFit: 'contain', width: '100%', height: '100%',
                  filter: 'drop-shadow(0 0 30px rgba(201,168,76,0.5))',
                  position: 'relative', zIndex: 1,
                }}
              />
            </div>

            {/* Neon tagline */}
            <div className="animate-neon font-playfair" style={{
              fontSize: '1.5rem', fontStyle: 'italic',
              color: 'var(--purple-neon)', textAlign: 'center', lineHeight: 1.3,
            }}>
              Good Times<br />Great Vibes
            </div>

            {/* Pills */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['🍸 COCKTAILS', '🎧 LIVE DJ', '👑 VIP', '🌃 OPEN LATE'].map((pill) => (
                <span key={pill} style={{
                  fontSize: '0.5rem', letterSpacing: '0.12em', color: 'var(--gold)',
                  border: '1px solid rgba(201,168,76,0.25)', padding: '0.3rem 0.8rem',
                  background: 'rgba(201,168,76,0.05)',
                }}>{pill}</span>
              ))}
            </div>

            {/* Hours */}
            <div style={{
              background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)',
              padding: '0.8rem 1.5rem', textAlign: 'center', width: '100%',
            }}>
              <div style={{ fontSize: '0.5rem', letterSpacing: '0.3em', color: 'var(--muted)', marginBottom: '0.3rem' }}>
                OPEN TONIGHT
              </div>
              <div className="font-cormorant" style={{ fontSize: '1.3rem', color: 'var(--gold)' }}>
                6PM — 4AM
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 960px) {
          .hero-grid      { grid-template-columns: 1fr !important; padding: 6rem 1.5rem 3rem !important; }
          .hero-card-wrap { transform: none !important; max-width: 340px; margin: 0 auto; }
        }
      `}</style>
    </section>
  )
}
