import { useState, useCallback, useEffect } from 'react'
import LoadingAnimation from '../components/LoadingAnimation'

export default function Home() {
  const [showAnimation, setShowAnimation] = useState(true)
  const [showRedirect, setShowRedirect] = useState(false)

  const handleComplete = useCallback(() => {
    setShowAnimation(false)
    setShowRedirect(true)
  }, [])

  // Redirect to 1shows.org after animation finishes
  useEffect(() => {
    if (showRedirect) {
      const timer = setTimeout(() => {
        window.location.href = 'https://www.1shows.org'
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [showRedirect])

  return (
    <>
      {showAnimation && <LoadingAnimation onComplete={handleComplete} />}

      {showRedirect && (
        <div style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
          color: '#fff',
          zIndex: 50,
          animation: 'fadeIn 0.8s ease-out',
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🍿</div>
          <h1 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 700,
            margin: '0 0 8px',
            background: 'linear-gradient(135deg, #E50914, #818cf8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Yazeed Shows
          </h1>
          <p style={{ color: '#94a3b8', margin: '0 0 24px' }}>
            Du wirst weitergeleitet ...
          </p>
          <a
            href="https://www.1shows.org"
            style={{
              display: 'inline-block',
              padding: '14px 40px',
              borderRadius: '12px',
              background: '#E50914',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.1rem',
              textDecoration: 'none',
              transition: 'transform 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            🎬 Zu 1Shows.org
          </a>
          <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '16px' }}>
            Öffnet in einem neuen Tab – oder automatisch in 1 Sekunde
          </p>
          <p style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '8px' }}>
            🌐 Oben rechts auf 1Shows: Sprachauswahl → <strong style={{ color: '#f43f5e' }}>DE</strong> für Deutsch
          </p>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  )
}
