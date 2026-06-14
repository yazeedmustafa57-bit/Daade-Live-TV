import { useState, useCallback, useEffect } from 'react'
import LoadingAnimation from '../components/LoadingAnimation'

export default function Home() {
  const [done, setDone] = useState(false)

  const handleComplete = useCallback(() => {
    setDone(true)
  }, [])

  useEffect(() => {
    if (done) {
      window.location.replace('https://www.1shows.org')
    }
  }, [done])

  return (
    <>
      {!done && <LoadingAnimation onComplete={handleComplete} />}
    </>
  )
}
