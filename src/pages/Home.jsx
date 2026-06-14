import { useState, useEffect } from 'react'
import LoadingAnimation from '../components/LoadingAnimation'

export default function Home() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) {
      window.location.href = 'https://www.1shows.org'
    }
  }, [done])

  useEffect(() => {
    // Fallback: falls Animation hängt
    const timer = setTimeout(() => {
      if (!done) {
        window.location.href = 'https://www.1shows.org'
      }
    }, 6000)
    return () => clearTimeout(timer)
  }, [done])

  return (
    <>
      {!done && <LoadingAnimation onComplete={() => setDone(true)} />}
    </>
  )
}
