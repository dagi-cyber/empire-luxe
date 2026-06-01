'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const NAV_LINKS = [
  { href: '#home',         label: 'HOME' },
  { href: '#events',       label: 'EVENTS' },
  { href: '#services',     label: 'SERVICES' },
  { href: '#liquor',       label: 'LIQUOR' },
  { href: '#food',         label: 'FOOD' },
  { href: '#dj',           label: 'DJ' },
  { href: '#virtual-tour', label: 'VIRTUAL TOUR' },
  { href: '#location',     label: 'LOCATION' },
]

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── Main nav ───────────────────────────── */}
      <nav
        style={{
          position:       'fixed',
          top:            0,
          left:           0,
          right:          0,
          zIndex:         100,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          padding:        scrolled ? '0.7rem 3rem' : '1rem 3rem',
          background:     scrolled
            ? 'rgba(5,3,5,0.97)'
            : 'linear-gradient(to bottom, rgba(5,3,5,0.95), transparent)',
          borderBottom:   scrolled ? '1px solid rgba(201,168,76,0.2)' : 'none',
          transition:     'all 0.4s',
        }}
      >
        {/* Logo */}
        <a href="#welcome" style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/images/logo.jpg"
            alt="Empire Luxe Lounge"
            width={55}
            height={55}
            style={{
              objectFit:  'contain',
              filter:     'drop-shadow(0 0 8px rgba(201,168,76,0.35))',
            }}
          />
        </a>

        {/* Desktop links */}
        <div
          style={{
            display:    'flex',
            gap:        '1.8rem',
            alignItems: 'center',
          }}
          className="desktop-nav"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize:       '0.58rem',
                letterSpacing:  '0.2em',
                color:          'var(--muted)',
                textDecoration: 'none',
                transition:     'color 0.3s',
                textTransform:  'uppercase',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {link.label}
            </a>
          ))}

          {/* Reservation CTA */}
          <a
            href="#reservation"
            style={{
              fontSize:       '0.58rem',
              letterSpacing:  '0.2em',
              color:          'var(--gold)',
              textDecoration: 'none',
              border:         '1px solid var(--gold)',
              padding:        '0.5rem 1.3rem',
              fontWeight:     600,
              transition:     'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--gold)'
              e.currentTarget.style.color      = '#0D0810'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color      = 'var(--gold)'
            }}
          >
            RESERVATION
          </a>
        </div>

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMobileOpen(true)}
          style={{
            display:        'none',
            flexDirection:  'column',
            gap:            '5px',
            background:     'none',
            border:         'none',
            cursor:         'pointer',
            padding:        '4px',
          }}
          className="hamburger"
          aria-label="Open menu"
        >
          <span style={{ width: '22px', height: '1px', background: 'var(--gold)', display: 'block' }} />
          <span style={{ width: '22px', height: '1px', background: 'var(--gold)', display: 'block' }} />
          <span style={{ width: '16px', height: '1px', background: 'var(--gold)', display: 'block' }} />
        </button>
      </nav>

      {/* ── Mobile drawer ──────────────────────── */}
      {/* Backdrop */}
      <div
        onClick={() => setMobileOpen(false)}
        style={{
          position:   'fixed',
          inset:      0,
          zIndex:     200,
          background: 'rgba(0,0,0,0.6)',
          opacity:    mobileOpen ? 1 : 0,
          visibility: mobileOpen ? 'visible' : 'hidden',
          transition: 'all 0.4s',
        }}
      />

      {/* Drawer panel */}
      <div
        style={{
          position:   'fixed',
          top:        0,
          right:      0,
          bottom:     0,
          width:      '270px',
          zIndex:     300,
          background: 'var(--dark)',
          borderLeft: '1px solid rgba(201,168,76,0.2)',
          padding:    '5rem 2rem 2rem',
          display:    'flex',
          flexDirection: 'column',
          gap:        '1.2rem',
          transform:  mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s',
        }}
      >
        {/* Close button */}
        <button
          onClick={() => setMobileOpen(false)}
          style={{
            position:   'absolute',
            top:        '1.2rem',
            right:      '1.2rem',
            background: 'none',
            border:     'none',
            color:      'var(--muted)',
            fontSize:   '1.1rem',
            cursor:     'pointer',
          }}
        >
          ✕
        </button>

        {/* Mobile links */}
        {[...NAV_LINKS, { href: '#reservation', label: 'RESERVATION' }].map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            style={{
              fontSize:       '0.72rem',
              letterSpacing:  '0.2em',
              color:          'var(--muted)',
              textDecoration: 'none',
              paddingBottom:  '0.8rem',
              borderBottom:   '1px solid rgba(201,168,76,0.1)',
              transition:     'color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* ── Responsive styles ─────────────────── */}
      <style jsx>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
        }
      `}</style>
    </>
  )
}
