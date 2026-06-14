import { Helmet } from 'react-helmet-async'

const style = `
html, body, #root {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
}
`

export default function OneShows() {
  return (
    <>
      <Helmet>
        <title>1Shows – Filme, Serien & Anime</title>
        <style>{style}</style>
      </Helmet>
      <iframe
        src="https://www.1shows.org"
        title="1Shows.org"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          border: 'none',
          background: '#000',
        }}
        allow="fullscreen"
      />
    </>
  )
}
