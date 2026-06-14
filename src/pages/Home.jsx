import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Helmet>
        <title>1Shows – Filme, Serien & Anime kostenlos</title>
        <meta name="description" content="Tausende Filme, Serien und Anime kostenlos streamen in HD & 4K. Multi-Language, Auto-Next, täglich neu." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="1Shows – Filme, Serien & Anime kostenlos" />
        <meta property="og:description" content="Tausende Filme, Serien und Anime kostenlos streamen in HD & 4K." />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Loading Screen */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: loaded ? 0 : 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0f',
        color: '#fff',
        opacity: loaded ? 0 : 1,
        transition: 'opacity 0.6s ease-out, z-index 0s 0.6s',
        pointerEvents: loaded ? 'none' : 'all',
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🍿</div>
        <h1 style={{
          fontSize: 'clamp(1.8rem, 5vw, 3rem)',
          fontWeight: 800,
          margin: '0 0 8px',
          background: 'linear-gradient(135deg, #f43f5e, #818cf8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          1Shows
        </h1>
        <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>
          Filme • Serien • Anime • Kostenlos
        </p>
      </div>

      {/* Fullscreen 1Shows.org */}
      <iframe
        src="https://www.1shows.org"
        title="1Shows"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          border: 'none',
          background: '#0a0a0f',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.8s ease-in',
        }}
        allow="fullscreen"
      />
    </>
  )
}
