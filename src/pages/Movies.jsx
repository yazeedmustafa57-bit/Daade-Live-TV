import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState } from 'react'

const MOVIE_CATEGORIES = [
  {
    name: 'Action & Abenteuer',
    icon: '🎬',
    movies: [
      { title: 'Big Buck Bunny', year: '2008', embed: 'https://www.youtube.com/embed/aqz-KE-bpKQ?autoplay=0' },
      { title: 'Sintel – Blender Open Movie', year: '2010', embed: 'https://www.youtube.com/embed/eRsGyueVLvQ?autoplay=0' },
      { title: 'Tears of Steel', year: '2012', embed: 'https://www.youtube.com/embed/R6MlUcmOul8?autoplay=0' },
    ],
  },
  {
    name: 'Dokumentationen',
    icon: '📽️',
    movies: [
      { title: 'Kurzfilm: Cosmos Laundromat', year: '2015', embed: 'https://www.youtube.com/embed/RkRcJZcFJ6s?autoplay=0' },
      { title: 'Spring – Blender Open Movie', year: '2019', embed: 'https://www.youtube.com/embed/WhWc3b3KhnY?autoplay=0' },
      { title: 'Agent 327', year: '2021', embed: 'https://www.youtube.com/embed/mN0zPOpADL4?autoplay=0' },
    ],
  },
  {
    name: 'Trailer & Highlights',
    icon: '🎞️',
    movies: [
      { title: 'Blender Studio: Sprite Fright', year: '2021', embed: 'https://www.youtube.com/embed/QgOoRc1G_YE?autoplay=0' },
      { title: 'Wing It!', year: '2023', embed: 'https://www.youtube.com/embed/7QftKxCwlNI?autoplay=0' },
    ],
  },
]

export default function Movies() {
  const [activeMovie, setActiveMovie] = useState(null)

  return (
    <>
      <Helmet>
        <title>Filme – Daade Live TV | Kostenlose Filme online</title>
        <meta name="description" content="Schaue kostenlose Filme online bei Daade Live TV. Action, Dokumentationen, Trailer und mehr." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Header />

      <main>
        <section className="movies-hero">
          <div className="hero-bg" />
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-pre">Gratis Filme bei</span>
              Daade <span className="hero-accent">Movies</span>
            </h1>
            <p className="hero-sub">
              Kostenlose Filme und Trailer – jederzeit abrufbar.
            </p>
          </div>
        </section>

        {/* Movie Player */}
        {activeMovie && (
          <section className="live-section">
            <div className="player-container" style={{ gridTemplateColumns: '1fr' }}>
              <div className="player-wrapper">
                <iframe
                  className="player-iframe"
                  src={activeMovie.embed}
                  title={activeMovie.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div style={{ textAlign: 'center', marginTop: '-12px' }}>
                <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                  {activeMovie.title} ({activeMovie.year})
                </p>
                <button
                  className="btn-secondary"
                  onClick={() => setActiveMovie(null)}
                  style={{ marginTop: '8px' }}
                >
                  ✕ Schließen
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Movie Categories */}
        <section className="channels-section">
          <h2 className="section-title">🎥 Filme & Videos</h2>
          <p className="section-subtitle">
            Wähle einen Film aus und starte sofort.
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
                    onClick={() => setActiveMovie(movie)}
                  >
                    <span className="card-icon">🎬</span>
                    <h3>{movie.title}</h3>
                    <p style={{ marginBottom: '8px' }}>{movie.year}</p>
                    <span className="btn-primary movie-btn">Jetzt ansehen</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </>
  )
}
