import { useState, useCallback } from 'react'
import LoadingAnimation from '../components/LoadingAnimation'

export default function Home() {
  const [showContent, setShowContent] = useState(false)
  const [showLoading, setShowLoading] = useState(true)

  const handleComplete = useCallback(() => {
    setShowContent(true)
    setTimeout(() => setShowLoading(false), 600)
  }, [])

  return (
    <>
      {showLoading && <LoadingAnimation onComplete={handleComplete} />}

      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: showContent ? 1 : 0,
        opacity: showContent ? 1 : 0,
        transition: 'opacity 0.8s ease-in',
        pointerEvents: showContent ? 'auto' : 'none',
        background: '#0a0a0f',
      }}>
        <iframe
          src="https://www.1shows.org"
          title="1Shows"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          allow="fullscreen"
        />

        {/* Fallback-Leiste unten */}
        <div style={{
          position: 'fixed',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '14px',
          padding: '10px 20px',
          fontSize: '0.85rem',
        }}>
          <span style={{ color: '#94a3b8' }}>
            🌐 Sprache: Oben rechts auf <strong style={{ color: '#f43f5e' }}>DE</strong> klicken
          </span>
          <span style={{ color: '#333' }}>|</span>
          <a
            href="https://www.1shows.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 600,
              padding: '6px 16px',
              borderRadius: '8px',
              background: '#E50914',
              fontSize: '0.82rem',
            }}
          >
            🔗 Öffnen
          </a>
        </div>
      </div>
    </>
  )
}
