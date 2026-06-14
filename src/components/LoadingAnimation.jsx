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

    const RED = '#E50914'
    const DURATION = 2800

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

      // Subtle glow
      const glow = ctx.createRadialGradient(w * 0.5, h * 0.42, 0, w * 0.5, h * 0.42, w * 0.3)
      glow.addColorStop(0, `rgba(229, 9, 20, ${Math.min(progress * 0.12, 0.1)})`)
      glow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, w, h)

      const size = Math.min(w, h) * 0.28
      const cx = w * 0.5
      const cy = h * 0.42
      const tw = size * 0.13

      let scale, alpha
      if (progress < 0.5) {
        const p = progress / 0.5
        scale = Math.pow(p, 1.4) * 0.2 + p * 0.8
        alpha = Math.min(1, p * 1.8)
      } else if (progress < 0.78) {
        const p = (progress - 0.5) / 0.28
        scale = 1 + Math.sin(p * Math.PI * 5) * 0.015
        alpha = 1
      } else {
        const p = (progress - 0.78) / 0.22
        scale = 1
        alpha = 1 - p * p
      }

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

      // Highlight
      if (alpha > 0.1 && scale > 0.5) {
        ctx.globalAlpha = alpha * 0.35
        const hl = ctx.createLinearGradient(cx - s * 0.4, 0, cx + s * 0.4, 0)
        hl.addColorStop(0, 'rgba(255,255,255,0)')
        hl.addColorStop(0.35, `rgba(255,255,255,${0.15 * scale})`)
        hl.addColorStop(0.65, `rgba(255,255,255,${0.15 * scale})`)
        hl.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = hl
        ctx.beginPath()
        ctx.moveTo(cx - s * 0.42, cy - s * 0.78)
        ctx.lineTo(cx - s * 0.42 + t, cy - s * 0.78)
        ctx.lineTo(cx + t * 0.5, cy - s * 0.05)
        ctx.lineTo(cx + s * 0.42 - t, cy - s * 0.78)
        ctx.lineTo(cx + s * 0.42, cy - s * 0.78)
        ctx.lineTo(cx + t * 0.5, cy - s * 0.05)
        ctx.closePath()
        ctx.fill()
      }

      ctx.restore()

      if (progress >= 1) {
        if (!finished) {
          finished = true
          setTimeout(() => onComplete?.(), 400)
        }
        return
      }

      animationId = requestAnimationFrame(draw)
    }

    animationId = requestAnimationFrame(draw)

    return () => {
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
