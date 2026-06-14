import { useEffect, useRef } from 'react'

export default function LoadingAnimation({ onComplete }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight
    let animationId = null
    let startTime = performance.now()
    let finished = false
    let ready = false

    const RED = '#E50914'
    const DURATION = 2600

    // Fallback: if animation takes too long, still finish
    const fallbackTimer = setTimeout(() => {
      if (!finished) {
        finished = true
        ready = true
        onComplete?.()
      }
    }, 5000)

    function draw() {
      const elapsed = performance.now() - startTime
      const progress = Math.min(1, elapsed / DURATION)

      if (w !== window.innerWidth || h !== window.innerHeight) {
        w = canvas.width = window.innerWidth
        h = canvas.height = window.innerHeight
      }

      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, w, h)

      // Glow
      if (progress > 0.05) {
        const glow = ctx.createRadialGradient(w * 0.5, h * 0.42, 0, w * 0.5, h * 0.42, w * 0.3)
        glow.addColorStop(0, `rgba(229, 9, 20, ${Math.min(progress * 0.12, 0.1)})`)
        glow.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = glow
        ctx.fillRect(0, 0, w, h)
      }

      const size = Math.min(w, h) * 0.28
      const cx = w * 0.5
      const cy = h * 0.42
      const tw = size * 0.13

      let scale, alpha
      if (progress < 0.45) {
        const p = progress / 0.45
        scale = Math.pow(p, 1.4) * 0.2 + p * 0.8
        alpha = Math.min(1, p * 1.8)
      } else if (progress < 0.75) {
        const p = (progress - 0.45) / 0.3
        scale = 1 + Math.sin(p * Math.PI * 5) * 0.015
        alpha = 1
      } else if (progress < 0.88) {
        scale = 1
        alpha = 1
      } else {
        const p = (progress - 0.88) / 0.12
        scale = 1
        alpha = 1 - p
      }

      // Always draw Y once progress starts
      if (progress > 0.01) {
        ctx.save()
        ctx.globalAlpha = alpha
        const s = size * scale
        const t = tw * scale

        ctx.shadowColor = RED
        ctx.shadowBlur = 50 * scale

        // Left arm
        ctx.beginPath()
        ctx.moveTo(cx - s * 0.42, cy - s * 0.78)
        ctx.lineTo(cx - s * 0.42 + t, cy - s * 0.78)
        ctx.lineTo(cx + t * 0.5, cy - s * 0.05)
        ctx.lineTo(cx - t * 0.5, cy - s * 0.05)
        ctx.closePath()
        ctx.fillStyle = RED
        ctx.fill()

        // Right arm
        ctx.beginPath()
        ctx.moveTo(cx + s * 0.42, cy - s * 0.78)
        ctx.lineTo(cx + s * 0.42 - t, cy - s * 0.78)
        ctx.lineTo(cx - t * 0.5, cy - s * 0.05)
        ctx.lineTo(cx + t * 0.5, cy - s * 0.05)
        ctx.closePath()
        ctx.fillStyle = RED
        ctx.fill()

        // Stem
        ctx.beginPath()
        ctx.moveTo(cx - t * 0.5, cy - s * 0.05)
        ctx.lineTo(cx + t * 0.5, cy - s * 0.05)
        ctx.lineTo(cx + t * 0.5, cy + s * 0.72)
        ctx.lineTo(cx - t * 0.5, cy + s * 0.72)
        ctx.closePath()
        ctx.fillStyle = RED
        ctx.fill()

        ctx.shadowBlur = 0
        ctx.restore()
      }

      if (progress >= 1 && !finished) {
        finished = true
        clearTimeout(fallbackTimer)
        setTimeout(() => { ready = true; onComplete?.() }, 300)
        return
      }

      animationId = requestAnimationFrame(draw)
    }

    animationId = requestAnimationFrame(draw)

    return () => {
      clearTimeout(fallbackTimer)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [onComplete])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'block',
        zIndex: 100,
        background: '#000',
      }}
    />
  )
}
