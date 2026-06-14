import { useState, useCallback } from 'react'
import LoadingAnimation from '../components/LoadingAnimation'

export default function Home() {
  const [showContent, setShowContent] = useState(false)
  const [showLoading, setShowLoading] = useState(true)

  const handleComplete = useCallback(() => {
    setShowContent(true)
    setTimeout(() => setShowLoading(false), 500)
  }, [])

  return (
    <>
      {showLoading && <LoadingAnimation onComplete={handleComplete} />}

      <main style={{
        opacity: showContent ? 1 : 0,
        transition: 'opacity 0.8s ease-in',
        pointerEvents: showContent ? 'auto' : 'none',
        minHeight: '100vh',
        background: '#0a0a0f',
        color: '#e8edf2',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}>
        {/* Hero */}
        <section style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '40px 24px',
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(229,9,20,0.12), transparent), radial-gradient(ellipse 60% 60% at 80% 80%, rgba(99,102,241,0.08), transparent)',
        }}>
          <div style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', marginBottom: '8px' }}>🎬</div>
          <h1 style={{
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            fontWeight: 800,
            margin: '0 0 8px',
            background: 'linear-gradient(135deg, #E50914, #818cf8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Yazeed Shows
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#94a3b8', maxWidth: '500px', margin: '0 0 32px' }}>
            Deutsche Sender, Filme & Serien – kostenlos.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#live" style={{
              padding: '14px 36px',
              borderRadius: '12px',
              background: '#E50914',
              color: '#fff',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '1rem',
              boxShadow: '0 4px 24px rgba(229,9,20,0.35)',
            }}>📺 Live TV</a>
            <a href="https://www.1shows.org" target="_blank" rel="noopener noreferrer" style={{
              padding: '14px 36px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#e8edf2',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: '1rem',
            }}>🍿 1Shows.org</a>
          </div>
        </section>

        {/* Live TV */}
        <section id="live" style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, textAlign: 'center', marginBottom: '8px' }}>🇩🇪 Live TV</h2>
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '32px' }}>Deutsche Sender – klick und schau live</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '16px',
          }}>
            {[
              { name: 'ARD/tagesschau', url: 'https://www.youtube.com/embed/live_stream?channel=UC5NOEUbkR71R3R3w45Ch0eQ&autoplay=1', icon: '📺' },
              { name: 'DW Deutsch', url: 'https://www.youtube.com/embed/live_stream?channel=UCVu8Mmg1KGkcSisJgZnHd1g&autoplay=1', icon: '🌍' },
              { name: 'Phoenix', url: 'https://www.youtube.com/embed/live_stream?channel=UCmGCMUQKzD2MhT6wLvj7WIg&autoplay=1', icon: '🏛️' },
              { name: 'Arte', url: 'https://www.youtube.com/embed/live_stream?channel=UCqXlETNA7qgBT09iMdA74PA&autoplay=1', icon: '🎨' },
              { name: 'ZDF', url: 'https://www.zdf.de/live-tv', icon: '📡', external: true },
              { name: 'NDR', url: 'https://www.ndr.de/fernsehen/livestream/', icon: '🌊', external: true },
            ].map((ch, i) => (
              <a key={i} href={ch.external ? ch.url : '#player-' + i} target={ch.external ? '_blank' : ''} rel={ch.external ? 'noopener noreferrer' : ''} style={{
                background: '#12141c',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '14px',
                padding: '24px',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s',
                cursor: 'pointer',
                display: 'block',
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(229,9,20,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'none' }}
              >
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>{ch.icon}</span>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>{ch.name}</h3>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '4px 0 0' }}>{ch.external ? '🔗 Extern' : '▶ Live stream'}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Pluto TV */}
        <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, textAlign: 'center', marginBottom: '8px' }}>📡 Pluto TV</h2>
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '32px' }}>Kostenlose Channels auf Deutsch</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '12px',
          }}>
            {[
              { name: 'Filme', url: 'https://pluto.tv/de/live-tv/pluto-tv-filme', icon: '🎬' },
              { name: 'Serien', url: 'https://pluto.tv/de/live-tv/pluto-tv-serien', icon: '📺' },
              { name: 'Dokus', url: 'https://pluto.tv/de/live-tv/pluto-tv-dokus', icon: '📽️' },
              { name: 'Krimi', url: 'https://pluto.tv/de/live-tv/pluto-tv-krimi', icon: '🔍' },
              { name: 'Comedy', url: 'https://pluto.tv/de/live-tv/pluto-tv-comedy', icon: '😂' },
              { name: 'Kids', url: 'https://pluto.tv/de/live-tv/pluto-tv-kids', icon: '🧒' },
            ].map((ch, i) => (
              <a key={i} href={ch.url} target="_blank" rel="noopener noreferrer" style={{
                background: '#12141c',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '18px',
                textDecoration: 'none',
                color: 'inherit',
                textAlign: 'center',
                transition: 'all 0.2s',
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'none' }}
              >
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '4px' }}>{ch.icon}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{ch.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* 1Shows */}
        <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px 80px', textAlign: 'center' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(229,9,20,0.1), rgba(99,102,241,0.1))',
            border: '1px solid rgba(229,9,20,0.2)',
            borderRadius: '20px',
            padding: '48px 24px',
          }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '12px' }}>🍿</span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 8px' }}>1Shows.org</h2>
            <p style={{ color: '#94a3b8', maxWidth: '400px', margin: '0 auto 20px' }}>
              Tausende Filme, Serien & Anime kostenlos – in HD & 4K
            </p>
            <a href="https://www.1shows.org" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-block',
              padding: '14px 40px',
              borderRadius: '12px',
              background: '#E50914',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.05rem',
              textDecoration: 'none',
              boxShadow: '0 4px 24px rgba(229,9,20,0.35)',
            }}>
              🔗 Zu 1Shows.org
            </a>
            <p style={{ color: '#64748b', fontSize: '0.82rem', marginTop: '12px' }}>
              🌐 Oben rechts auf <strong style={{ color: '#f43f5e' }}>DE</strong> klicken für Deutsch
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '24px',
          textAlign: 'center',
          color: '#64748b',
          fontSize: '0.82rem',
        }}>
          Yazeed Shows – Kostenlose Unterhaltung
        </footer>
      </main>
    </>
  )
}
