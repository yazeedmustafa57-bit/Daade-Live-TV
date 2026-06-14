export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="logo-icon">📺</span>
          <span>Daade Live TV</span>
        </div>
        <p className="footer-disclaimer">
          © {new Date().getFullYear()} Daade Live TV. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  )
}
