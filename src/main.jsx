import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const redirect = sessionStorage.redirect
delete sessionStorage.redirect
if (redirect && redirect !== location.href) {
  history.replaceState(null, null, redirect)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
