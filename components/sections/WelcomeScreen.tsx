'use client'
import Image from 'next/image'

export default function WelcomeScreen() {
  return (
    <section
      id="welcome"
      style={{
        minHeight:      '100vh',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        textAlign:      'center',
        position:       'relative',
        overflow:       'hidden',
        padding:        '2rem',
      }}
    >
      {/* ── Background ───────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset:    0,
          background:
            'radial-gradient(ellipse at 55% 35%, rgba(123,47,190,0.22) 0%, transparent 60%),' +
            'radial-gradient(ellipse at 20% 80%, rgba(201,168,76,0.1) 0%, transparent 50%),' +
            'linear-gradient(160deg, #0D0810, #050305)',
        }}
      />

      {/* ── Star particles ───────────────── */}
      <div
        className="animate-twinkle"
        style={{
          position: 'absolute',
          inset:    0,
          backgroundImage: `
            radial-gradient(1px 1px at 15% 25%, rgba(201,168,76,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 82% 18%, rgba(201,168,76,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 48% 68%, rgba(159,94,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 28% 78%, rgba(201,168,76,0.35) 0%, transparent 100%),
            radial-gradient(1px 1px at 72% 55%, rgba(159,94,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 8%  48%, rgba(201,168,76,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 91% 72%, rgba(201,168,76,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 60% 10%, rgba(159,94,255,0.3) 0%, transparent 100%)
          `,
        }}
      />

      {/* ── Content ──────────────────────── */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Logo */}
        <div
          style={{
            width:        '200px',
            height:       '200px',
            margin:       '0 auto 1.5rem',
            animation:    'fadeUp 0.8s 0.2s both',
          }}
        >
          <Image
            src="/images/logo.jpg"
            alt="Empire Luxe Lounge"
            width={200}
            height={200}
            style={{
              objectFit: 'contain',
              width:     '100%',
              height:    '100%',
              filter:    'drop-shadow(0 0 30px rgba(201,168,76,0.4))',
            }}
          />
        </div>

        {/* Tag line */}
        <p
          className="section-tag"
          style={{
            animation: 'fadeUp 0.8s 0.4s both',
            opacity:   0,
          }}
        >
          EST. 2024 &nbsp;·&nbsp; CITY CENTER
        </p>

        {/* Tagline */}
        <p
          style={{
            fontSize:      '0.65rem',
            letterSpacing: '0.3em',
            color:         'var(--muted)',
            marginBottom:  '2.5rem',
            animation:     'fadeUp 0.8s 0.6s both',
            opacity:       0,
          }}
        >
          <span style={{ color: 'var(--gold-dim)' }}>INDULGE.</span>
          &nbsp;·&nbsp;
          <span style={{ color: 'var(--gold-dim)' }}>UNWIND.</span>
          &nbsp;·&nbsp;
          <span style={{ color: 'var(--gold-dim)' }}>BE ICONIC.</span>
        </p>

        {/* Enter button */}
        <a
          href="#home"
          style={{
            display:        'inline-flex',
            alignItems:     'center',
            gap:            '0.8rem',
            padding:        '0.95rem 3rem',
            border:         '1px solid var(--gold)',
            color:          'var(--cream)',
            textDecoration: 'none',
            fontSize:       '0.65rem',
            letterSpacing:  '0.3em',
            animation:      'fadeUp 0.8s 0.8s both',
            opacity:        0,
            position:       'relative',
            overflow:       'hidden',
            transition:     'color 0.4s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#0D0810'
            const bg = e.currentTarget.querySelector('.btn-bg') as HTMLElement
            if (bg) bg.style.transform = 'translateX(0)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--cream)'
            const bg = e.currentTarget.querySelector('.btn-bg') as HTMLElement
            if (bg) bg.style.transform = 'translateX(-101%)'
          }}
        >
          {/* Hover fill */}
          <span
            className="btn-bg"
            style={{
              position:   'absolute',
              inset:      0,
              background: 'var(--gold)',
              transform:  'translateX(-101%)',
              transition: 'transform 0.4s',
              zIndex:     -1,
            }}
          />
          ENTER EMPIRE
          <span style={{ transition: 'transform 0.3s' }}>→</span>
        </a>

        {/* Feature pills */}
        <div
          style={{
            display:        'flex',
            gap:            '2.5rem',
            marginTop:      '3.5rem',
            justifyContent: 'center',
            flexWrap:       'wrap',
            animation:      'fadeUp 0.8s 1s both',
            opacity:        0,
          }}
        >
          {[
            { icon: '🍸', label: 'PREMIUM DRINKS' },
            { icon: '🎧', label: 'LIVE DJ NIGHTS' },
            { icon: '👑', label: 'VIP EXPERIENCE' },
            { icon: '✨', label: 'GOOD VIBES'     },
          ].map((f) => (
            <div key={f.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>{f.icon}</div>
              <div
                style={{
                  fontSize:      '0.5rem',
                  letterSpacing: '0.25em',
                  color:         'var(--muted)',
                }}
              >
                {f.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll hint ───────────────────── */}
      <div
        style={{
          position:       'absolute',
          bottom:         '1.5rem',
          left:           '50%',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          gap:            '0.4rem',
          animation:      'bounce 2s ease-in-out infinite',
        }}
      >
        <span
          style={{
            fontSize:      '0.45rem',
            letterSpacing: '0.25em',
            color:         'var(--muted)',
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width:      '1px',
            height:     '36px',
            background: 'linear-gradient(to bottom, var(--gold-dim), transparent)',
          }}
        />
      </div>
    </section>
  )
}
