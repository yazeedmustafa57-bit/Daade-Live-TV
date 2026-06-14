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
    </>
  )
}
