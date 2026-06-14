import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export default function Movies() {
  return (
    <>
      <Helmet>
        <title>Filme & Serien – Daade Live TV</title>
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0b0d11',
        color: '#e8edf2',
        textAlign: 'center',
        padding: '24px',
        gap: '24px',
      }}>
        <div style={{ fontSize: '4rem' }}>🍿</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>
          Filme & Serien auf Deutsch
        </h1>
        <p style={{ color: '#94a3b8', maxWidth: '400px', margin: 0, lineHeight: 1.6 }}>
          Alle Inhalte in deutscher Sprache. Klick unten – dann öffnet sich 1Shows.org im Vollbild.
        </p>
        <Link to="/1shows"
          style={{
            display: 'inline-block',
            padding: '16px 48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f43f5e, #e11d48)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.1rem',
            textDecoration: 'none',
            boxShadow: '0 4px 24px rgba(244,63,94,0.35)',
            transition: 'all .25s',
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'none'}
        >
          🍿 Zu 1Shows.org
        </Link>
        <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
          Tausende Filme, Serien &amp; Anime – kostenlos in HD &amp; 4K
        </p>
      </div>
    </>
  )
}
