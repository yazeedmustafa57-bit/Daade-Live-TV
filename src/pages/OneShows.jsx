import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function OneShows() {
  return (
    <>
      <Helmet>
        <title>1Shows – Filme, Serien & Anime auf Daade Live TV</title>
        <meta name="description" content="1Shows auf Daade Live TV – Tausende Filme, Serien und Anime kostenlos streamen in HD & 4K." />
      </Helmet>

      <Header />

      <main>
        <section className="hero" style={{ minHeight: 'auto', padding: '100px 24px 40px' }}>
          <div className="hero-bg" />
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-pre">Partner: </span>
              1<span className="hero-accent">Shows</span>.org
            </h1>
            <p className="hero-sub">
              Tausende Filme, Serien &amp; Anime kostenlos in HD &amp; 4K – jetzt durchstöbern!
            </p>
          </div>
        </section>

        <section className="channels-section" style={{ paddingTop: '0' }}>
          <div
            style={{
              width: '100%',
              height: 'calc(100vh - 200px)',
              minHeight: '600px',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)',
              background: '#0b0d11',
            }}
          >
            <iframe
              src="https://www.1shows.org"
              title="1Shows.org"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              allow="fullscreen"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
          <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.85rem', color: '#64748b' }}>
            💡 Du kannst direkt in 1Shows stöbern – Filme, Serien und Anime auf Deutsch und vielen Sprachen.
          </p>
        </section>
      </main>

      <Footer />
    </>
  )
}
