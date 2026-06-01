'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function AgeGate() {
  const [verified, setVerified] = useState<boolean | null>(null)
  const [declined, setDeclined] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem('empire-age')
    if (stored === 'yes') {
      setVerified(true)
    } else {
      setVerified(false)
    }
  }, [])

  function handleYes() {
    sessionStorage.setItem('empire-age', 'yes')
    setVerified(true)
  }

  function handleNo() {
    setDeclined(true)
  }

  // Already verified — don't show gate
  if (verified === true) return null

  // Waiting for hydration check
  if (verified === null) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--black)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      {declined ? (
        /* ── Declined screen ── */
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <Image
            src="/images/logo.jpg"
            alt="Empire Luxe Lounge"
            width={140}
            height={140}
            style={{ objectFit: 'contain', margin: '0 auto 1.5rem', display: 'block' }}
          />
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.8rem',
              color: 'var(--gold)',
              marginBottom: '1rem',
            }}
          >
            We're sorry.
          </p>
          <p
            style={{
              fontSize: '0.75rem',
              color: 'var(--muted)',
              lineHeight: 2,
              letterSpacing: '0.08em',
            }}
          >
            You must be of legal drinking age to enter this site.
            <br />
            Please come back when you're old enough to join us.
          </p>
        </div>
      ) : (
        /* ── Verification screen ── */
        <div
          style={{
            maxWidth: '460px',
            width: '100%',
            border: '1px solid rgba(201,168,76,0.35)',
            background: 'var(--dark)',
            padding: '3rem 2.5rem',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          {/* Inner border decoration */}
          <div
            style={{
              position: 'absolute',
              inset: '8px',
              border: '1px solid rgba(201,168,76,0.1)',
              pointerEvents: 'none',
            }}
          />

          {/* Logo */}
          <Image
            src="/images/logo.jpg"
            alt="Empire Luxe Lounge"
            width={160}
            height={160}
            style={{
              objectFit: 'contain',
              margin: '0 auto 1.5rem',
              display: 'block',
              filter: 'drop-shadow(0 0 20px rgba(201,168,76,0.3))',
            }}
          />

          {/* Heading */}
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.4rem',
              fontWeight: 300,
              color: 'var(--cream)',
              marginBottom: '0.8rem',
            }}
          >
            Are you of legal drinking age?
          </h2>

          {/* Subtext */}
          <p
            style={{
              fontSize: '0.68rem',
              color: 'var(--muted)',
              lineHeight: 1.9,
              letterSpacing: '0.06em',
              marginBottom: '2rem',
              maxWidth: '320px',
              margin: '0 auto 2rem',
            }}
          >
            By entering this site you confirm you are of legal
            drinking age in your country of residence. This site
            contains alcohol-related content for adults only.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center' }}>
            <button
              onClick={handleYes}
              className="btn-gold"
              style={{ minWidth: '140px' }}
            >
              YES, I'M OF AGE
            </button>
            <button
              onClick={handleNo}
              className="btn-outline"
              style={{ minWidth: '100px' }}
            >
              NO
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
