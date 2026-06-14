import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Movies() {
  const [customUrl, setCustomUrl] = useState('')
  const [activeVideo, setActiveVideo] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!customUrl.trim()) return
    let embedUrl = customUrl.trim()
    const ytMatch = embedUrl.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
    )
    if (ytMatch) {
      embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&hl=de&cc_lang_pref=de&cc_load_policy=1`
    }
    setActiveVideo({ title: customUrl.length > 40 ? customUrl.slice(0, 40) + '…' : customUrl, embed: embedUrl })
  }

  return (
    <>
      <Helmet>
        <title>Filme & Serien auf Deutsch – Daade Live TV</title>
        <meta name="description" content="Filme und Serien auf Deutsch kostenlos streamen – powered by 1Shows.org." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Header />

      <main>
        <section className="hero" style={{ minHeight: 'auto', padding: '100px 24px 40px' }}>
          <div className="hero-bg" />
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-pre">Filme & Serien auf</span>
              Daade <span className="hero-accent">Deutsch</span>
            </h1>
            <p className="hero-sub">
              Alle Inhalte in deutscher Sprache – direkt von unserem Partner <strong>1Shows.org</strong>.
            </p>
          </div>
        </section>

        {/* 1Shows.org Embed - Hauptinhalt */}
        <section className="channels-section" style={{ paddingTop: '0' }}>
          <h2 className="section-title">🍿 1Shows.org – Filme, Serien & Anime</h2>
          <p className="section-subtitle">
            Klick auf "Jetzt stöbern" oder durchsuche 1Shows direkt unten – alles auf Deutsch verfügbar.
          </p>

          <Link to="/1shows" className="external-card" style={{ marginBottom: '32px' }}>
            <span className="external-icon">🍿</span>
            <h3>1Shows.org – Jetzt stöbern</h3>
            <p>
              Tausende Filme, Serien und Anime kostenlos streamen – in HD & 4K.
              Multi-Language-Support, Auto-Next-Playback und täglich neue Inhalte.
              <br /><br />
              <strong>Tipp:</strong> Oben rechts auf "DE" oder die Sprachauswahl klicken für deutsche Inhalte!
            </p>
            <span className="external-badge">🔗 Zu 1Shows.org</span>
          </Link>

          {/* Eingebettetes 1shows */}
          <div style={{
            width: '100%',
            height: 'calc(100vh - 300px)',
            minHeight: '500px',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
            background: '#0b0d11',
          }}>
            <iframe
              src="https://www.1shows.org"
              title="1Shows.org"
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="fullscreen"
            />
          </div>
        </section>

        {/* YouTube Player für eigene URLs */}
        {activeVideo && (
          <section className="live-section" style={{ paddingTop: '0' }}>
            <div className="player-container" style={{ gridTemplateColumns: '1fr' }}>
              <div className="player-wrapper">
                <iframe
                  className="player-iframe"
                  src={activeVideo.embed}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{activeVideo.title}</p>
                <button className="btn-secondary" onClick={() => setActiveVideo(null)} style={{ marginTop: '8px' }}>
                  ✕ Schließen
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Eigenen Film/Serie eingeben */}
        <section className="channels-section" style={{ paddingTop: '0' }}>
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div className="stream-form">
              <h3>🔗 Eigenen YouTube-Link abspielen</h3>
              <div className="input-group">
                <input
                  type="url"
                  placeholder="YouTube URL eingeben..."
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                />
                <button className="btn-primary" onClick={handleSubmit}>Abspielen</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
