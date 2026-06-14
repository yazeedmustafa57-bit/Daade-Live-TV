import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <span className="logo-icon">📺</span>
          <span className="logo-text">Daade<span className="logo-accent">Live</span>TV</span>
        </Link>
        <nav className="nav">
          <a href="#live" className="nav-link">Live</a>
          <Link to="/movies" className="nav-link">Filme</Link>
          <a href="#channels" className="nav-link">Sender</a>
          <a href="#about" className="nav-link">Info</a>
        </nav>
      </div>
    </header>
  )
}
