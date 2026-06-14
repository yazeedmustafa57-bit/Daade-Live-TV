import { useState, useEffect } from 'react'
import LoadingAnimation from '../components/LoadingAnimation'

export default function Home() {
  const [done, setDone] = useState(false)

  // Redirect sobald Animation fertig ist
  useEffect(() => {
    if (done) {
      window.location.replace('https://www.1shows.org')
    }
  }, [done])

  // Sicherheitsfallback: nach 5 Sekunden weiterleiten, falls Animation hängt
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!done) {
        window.location.replace('https://www.1shows.org')
      }
    }, 5000)
    return () => clearTimeout(timer)
  }, [done])

  return (
    <>
      {!done && <LoadingAnimation onComplete={() => setDone(true)} />}
    </>
  )
}
