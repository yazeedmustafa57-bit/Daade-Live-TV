import { useState, useCallback } from 'react'
import LoadingAnimation from '../components/LoadingAnimation'

export default function Home() {
  const [showContent, setShowContent] = useState(false)
  const [showLoading, setShowLoading] = useState(true)
  const [showHint, setShowHint] = useState(true)

  const handleComplete = useCallback(() => {
    setShowContent(true)
    setTimeout(() => setShowLoading(false), 600)
    setTimeout(() => setShowHint(false), 6000)
  }, [])

  return (
    <>
      {showLoading && <LoadingAnimation onComplete={handleComplete} />}

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
          opacity: showContent ? 1 : 0,
          transition: 'opacity 0.8s ease-in',
          pointerEvents: showContent ? 'auto' : 'none',
        }}
        allow="fullscreen"
      />

      {/* German language hint overlay */}
      {showHint && showContent && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(229,9,20,0.3)',
          borderRadius: '14px',
          padding: '14px 24px',
          color: '#e8edf2',
          fontSize: '0.9rem',
          textAlign: 'center',
          maxWidth: '440px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          animation: 'fadeInUp 0.5s ease-out',
        }}>
          <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>🌐</div>
          <strong style={{ color: '#f43f5e' }}>Deutsch auswählen:</strong>
          <span style={{ color: '#94a3b8' }}>
            {' '}Oben rechts in 1Shows auf die Sprachauswahl klicken → <strong>DE</strong>
          </span>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </>
  )
}
