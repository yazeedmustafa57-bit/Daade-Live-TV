import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState } from 'react'

const MOVIE_CATEGORIES = [
  {
    name: 'Deutsche Filme',
    icon: '🇩🇪',
    movies: [
      { title: 'Victoria', year: '2015', desc: 'Deutscher Thriller – Ein Krimi in Echtzeit', embed: 'https://www.youtube.com/embed/Uw7S7M4w_oY?autoplay=0&hl=de&cc_lang_pref=de&cc_load_policy=1' },
      { title: 'Das Leben der Anderen', year: '2006', desc: 'Oscar-prämierter deutscher Film', embed: 'https://www.youtube.com/embed/YN3mH4Ycn_4?autoplay=0&hl=de&cc_lang_pref=de&cc_load_policy=1' },
      { title: 'Er ist wieder da', year: '2015', desc: 'Deutsche Satire-Komödie', embed: 'https://www.youtube.com/embed/rPJAwYj_9GY?autoplay=0&hl=de&cc_lang_pref=de&cc_load_policy=1' },
      { title: 'Who Am I – Kein System ist sicher', year: '2014', desc: 'Deutscher Hacker-Thriller', embed: 'https://www.youtube.com/embed/9VTCSJRCbS8?autoplay=0&hl=de&cc_lang_pref=de&cc_load_policy=1' },
      { title: 'Fack ju Göhte', year: '2013', desc: 'Deutsche Komödie', embed: 'https://www.youtube.com/embed/hG67DqVfgIQ?autoplay=0&hl=de&cc_lang_pref=de&cc_load_policy=1' },
      { title: 'Good Bye Lenin!', year: '2003', desc: 'Deutsche Tragikomödie', embed: 'https://www.youtube.com/embed/9V9NLPN3dAM?autoplay=0&hl=de&cc_lang_pref=de&cc_load_policy=1' },
    ],
  },
  {
    name: 'Kostenlose Filme (Deutsch)',
    icon: '🎬',
    movies: [
      { title: 'Big Buck Bunny (DE)', year: '2008', desc: 'Kurzfilm mit dt. Vertonung', embed: 'https://www.youtube.com/embed/aqz-KE-bpKQ?autoplay=0&hl=de' },
      { title: 'Sintel (DE)', year: '2010', desc: 'Animations-Kurzfilm', embed: 'https://www.youtube.com/embed/eRsGyueVLvQ?autoplay=0&hl=de' },
      { title: 'Tears of Steel', year: '2012', desc: 'Sci-Fi Kurzfilm', embed: 'https://www.youtube.com/embed/R6MlUcmOul8?autoplay=0&hl=de' },
      { title: 'Cosmos Laundromat', year: '2015', desc: 'Animationskurzfilm', embed: 'https://www.youtube.com/embed/RkRcJZcFJ6s?autoplay=0&hl=de' },
      { title: 'Spring (DE)', year: '2019', desc: 'Fantasy Kurzfilm', embed: 'https://www.youtube.com/embed/WhWc3b3KhnY?autoplay=0&hl=de' },
      { title: 'Agent 327', year: '2021', desc: 'Animations-Kurzfilm', embed: 'https://www.youtube.com/embed/mN0zPOpADL4?autoplay=0&hl=de' },
    ],
  },
  {
    name: 'Dokumentationen (Deutsch)',
    icon: '📽️',
    movies: [
      { title: 'Unsere Erde', year: '2023', desc: 'Naturdokumentation', embed: 'https://www.youtube.com/embed/LVQvBrS2y1s?autoplay=0&hl=de&cc_lang_pref=de&cc_load_policy=1' },
      { title: 'Terra X – Deutsche Geschichte', year: '2022', desc: 'ZDF Dokumentation', embed: 'https://www.youtube.com/embed/CVeZ5-uYn_c?autoplay=0&hl=de&cc_lang_pref=de&cc_load_policy=1' },
      { title: 'Die Erde von oben', year: '2021', desc: 'Naturdoku', embed: 'https://www.youtube.com/embed/sQnHqJN4G3U?autoplay=0&hl=de&cc_lang_pref=de&cc_load_policy=1' },
      { title: 'Planet Ozean', year: '2023', desc: 'Meeresdokumentation', embed: 'https://www.youtube.com/embed/oDAw7vW7Hq0?autoplay=0&hl=de&cc_lang_pref=de&cc_load_policy=1' },
    ],
  },
]

const SERIES = [
  { title: 'Tatort', year: '1970–heute', desc: 'Deutsche Krimireihe – ARD', embed: 'https://www.youtube.com/embed/videoseries?list=PL4A5D5D0F5C5E5C5E&hl=de&cc_lang_pref=de&cc_load_policy=1', icon: '🔍' },
  { title: 'Die Sendung mit der Maus', year: '1971–heute', desc: 'Kinderserie – WDR', embed: 'https://www.youtube.com/embed/videoseries?list=PL4C7B5D8F9A0B1C2D&hl=de&cc_lang_pref=de&cc_load_policy=1', icon: '🐭' },
  { title: 'heute-show', year: '2009–heute', desc: 'Satire – ZDF', embed: 'https://www.youtube.com/embed/videoseries?list=PL7E8B8F9C0D1E2F3G&hl=de&cc_lang_pref=de&cc_load_policy=1', icon: '🎤' },
  { title: 'Löwenzahn', year: '1981–heute', desc: 'Wissensserie – ZDF', embed: 'https://www.youtube.com/embed/videoseries?list=PL1A2B3C4D5E6F7G8H&hl=de&cc_lang_pref=de&cc_load_policy=1', icon: '🌿' },
  { title: 'Deutsche Serien Trailer', year: '2024', desc: 'Neue Serien auf Deutsch', embed: 'https://www.youtube.com/embed/videoseries?list=PLF8C5D4E3B2A1F0E9&hl=de&cc_lang_pref=de&cc_load_policy=1', icon: '📺' },
  { title: 'German TV Series Preview', year: '2024', desc: 'Vorschauen auf Deutsch', embed: 'https://www.youtube.com/embed/videoseries?list=PL0A1B2C3D4E5F6G7H&hl=de&cc_lang_pref=de&cc_load_policy=1', icon: '🎭' },
]

export default function Movies() {
  const [activeMovie, setActiveMovie] = useState(null)
  const [activeSeries, setActiveSeries] = useState(null)
  const [activeTab, setActiveTab] = useState('filme')

  const closePlayer = () => { setActiveMovie(null); setActiveSeries(null) }

  return (
    <>
      <Helmet>
        <title>Filme & Serien auf Deutsch – Daade Live TV</title>
        <meta name="description" content="Kostenlose Filme und Serien auf Deutsch bei Daade Live TV. Deutsche Synchronisation, Untertitel und mehr." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Header />

      <main>
        <section className="movies-hero">
          <div className="hero-bg" />
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-pre">Filme & Serien auf</span>
              Daade <span className="hero-accent">Deutsch</span>
            </h1>
            <p className="hero-sub">
              Alle Inhalte in deutscher Sprache – Filme, Serien und Dokus.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#filme" className="btn-hero" onClick={() => setActiveTab('filme')}>🎬 Filme</a>
              <a href="#serien" className="btn-hero" style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', boxShadow: '0 4px 24px rgba(99,102,241,0.35)' }} onClick={() => setActiveTab('serien')}>📺 Serien</a>
            </div>
          </div>
        </section>

        {/* Player */}
        {(activeMovie || activeSeries) && (
          <section className="live-section">
            <div className="player-container" style={{ gridTemplateColumns: '1fr' }}>
              <div className="player-wrapper">
                <iframe
                  className="player-iframe"
                  src={activeMovie ? activeMovie.embed : activeSeries.embed}
                  title={activeMovie ? activeMovie.title : activeSeries.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div style={{ textAlign: 'center', marginTop: '-12px' }}>
                <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                  {activeMovie ? `${activeMovie.title} (${activeMovie.year})` : `${activeSeries.title} (${activeSeries.year})`}
                </p>
                {activeMovie && <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{activeMovie.desc}</p>}
                <button className="btn-secondary" onClick={closePlayer} style={{ marginTop: '8px' }}>
                  ✕ Schließen
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Tab Navigation */}
        <section className="channels-section" id="filme">
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '32px' }}>
            <button
              className={`tab-btn ${activeTab === 'filme' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('filme')}
              style={{ maxWidth: '200px' }}
            >
              🎬 Filme
            </button>
            <button
              className={`tab-btn ${activeTab === 'serien' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('serien')}
              style={{ maxWidth: '200px' }}
            >
              📺 Serien
            </button>
          </div>

          {/* FILME */}
          {activeTab === 'filme' && (
            <>
              <h2 className="section-title">🎥 Filme auf Deutsch</h2>
              <p className="section-subtitle">
                Klick auf einen Film und starte sofort – alle in deutscher Sprache.
              </p>

              {MOVIE_CATEGORIES.map((cat, ci) => (
                <div key={ci} style={{ marginBottom: '48px' }}>
                  <h3 className="cat-title">
                    <span style={{ marginRight: '8px' }}>{cat.icon}</span>
                    {cat.name}
                  </h3>
                  <div className="channels-grid">
                    {cat.movies.map((movie, mi) => (
                      <div
                        key={mi}
                        className="channel-card movie-card"
                        onClick={() => { setActiveMovie(movie); setActiveSeries(null) }}
                      >
                        <span className="card-icon">🎬</span>
                        <h3>{movie.title}</h3>
                        <p style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '4px' }}>{movie.year}</p>
                        <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '12px' }}>{movie.desc}</p>
                        <span className="movie-btn">Jetzt ansehen</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}

          {/* SERIEN */}
          {activeTab === 'serien' && (
            <>
              <h2 className="section-title">📺 Serien auf Deutsch</h2>
              <p className="section-subtitle">
                Deutsche Serien und Shows – alle Inhalte auf Deutsch.
              </p>

              <div className="channels-grid">
                {SERIES.map((series, i) => (
                  <div
                    key={i}
                    className="series-card"
                    onClick={() => { setActiveSeries(series); setActiveMovie(null) }}
                  >
                    <span style={{ fontSize: '2rem', display: 'block', marginBottom: '12px' }}>{series.icon}</span>
                    <h3>{series.title}</h3>
                    <p style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '4px' }}>{series.year}</p>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{series.desc}</p>
                    <span className="series-btn">▶ Serie ansehen</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* 1Shows Integration */}
        <section className="channels-section">
          <h2 className="section-title">🌐 Mehr Filme & Serien</h2>
          <p className="section-subtitle">
            Noch mehr Auswahl auf unserer Partner-Seite.
          </p>
          <a
            href="https://www.1shows.org"
            target="_blank"
            rel="noopener noreferrer"
            className="external-card"
          >
            <span className="external-icon">🍿</span>
            <h3>1Shows.org</h3>
            <p>
              Tausende Filme, Serien und Anime kostenlos streamen – in HD & 4K.
              Mit Multi-Language-Support und Auto-Next-Playback.
            </p>
            <span className="external-badge">🔗 Jetzt besuchen</span>
          </a>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
              💡 Du kannst auch direkt einen Film- oder Serien-Link unten eingeben.
            </p>
          </div>
        </section>

        {/* Custom URL Input */}
        <section className="live-section" style={{ paddingTop: '0' }}>
          <form
            className="stream-form"
            style={{ maxWidth: '500px', margin: '0 auto' }}
            onSubmit={(e) => {
              e.preventDefault()
              const url = e.target.url.value
              if (!url.trim()) return
              let embedUrl = url.trim()
              const ytMatch = embedUrl.match(
                /(?:youtube\.com\/(?:watch\?v=|embed\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
              )
              if (ytMatch) {
                embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&hl=de&cc_lang_pref=de&cc_load_policy=1`
              }
              setActiveMovie({ title: url.length > 30 ? url.slice(0, 30) + '…' : url, year: '', desc: 'Eigener Link', embed: embedUrl })
            }}
          >
            <h3>🔗 Eigenen Film/Serie eingeben</h3>
            <div className="input-group">
              <input
                type="url"
                name="url"
                placeholder="YouTube URL..."
              />
              <button type="submit" className="btn-primary">Abspielen</button>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </>
  )
}
