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
    const DURATION = 2800 // total animation in ms

    function draw() {
      const elapsed = performance.now() - startTime
      const progress = Math.min(1, elapsed / DURATION)

      // Handle resize
      if (w !== window.innerWidth || h !== window.innerHeight) {
        w = canvas.width = window.innerWidth
        h = canvas.height = window.innerHeight
      }

      ctx.clearRect(0, 0, w, h)

      // Pure black background
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, w, h)

      // Subtle red glow at center
      const glow = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.45, w * 0.25)
      glow.addColorStop(0, `rgba(229, 9, 20, ${progress * 0.08})`)
      glow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, w, h)

      // Calculate Y size
      const size = Math.min(w, h) * 0.28
      const cx = w * 0.5
      const cy = h * 0.45
      const thickness = size * 0.13

      // Y letter morphing animation
      // Phase 1 (0-0.5): Y grows from center
      // Phase 2 (0.5-0.8): Y pulses
      // Phase 3 (0.8-1.0): fade out

      let scale, alpha
      if (progress < 0.5) {
        // Grow out from center
        const t = progress / 0.5
        scale = Math.pow(t, 1.5) * 0.3 + t * 0.7
        alpha = Math.min(1, t * 1.5)
      } else if (progress < 0.8) {
        // Hold with slight pulse
        const t = (progress - 0.5) / 0.3
        scale = 1 + Math.sin(t * Math.PI * 4) * 0.02
        alpha = 1
      } else {
        // Fade out
        const t = (progress - 0.8) / 0.2
        scale = 1
        alpha = 1 - t
      }

      ctx.save()
      ctx.globalAlpha = alpha

      // Draw the Y
      const s = size * scale
      const t = thickness * scale

      ctx.shadowColor = RED
      ctx.shadowBlur = 40 * scale

      // Left arm of Y: from top-left to center
      ctx.beginPath()
      ctx.moveTo(cx - s * 0.4, cy - s * 0.75)
      ctx.lineTo(cx - s * 0.4 + t, cy - s * 0.75)
      ctx.lineTo(cx + t * 0.5, cy - s * 0.05)
      ctx.lineTo(cx - t * 0.5, cy - s * 0.05)
      ctx.closePath()
      ctx.fillStyle = RED
      ctx.fill()

      // Right arm of Y: from top-right to center
      ctx.beginPath()
      ctx.moveTo(cx + s * 0.4, cy - s * 0.75)
      ctx.lineTo(cx + s * 0.4 - t, cy - s * 0.75)
      ctx.lineTo(cx - t * 0.5, cy - s * 0.05)
      ctx.lineTo(cx + t * 0.5, cy - s * 0.05)
      ctx.closePath()
      ctx.fillStyle = RED
      ctx.fill()

      // Stem of Y: from center to bottom
      ctx.beginPath()
      ctx.moveTo(cx - t * 0.5, cy - s * 0.05)
      ctx.lineTo(cx + t * 0.5, cy - s * 0.05)
      ctx.lineTo(cx + t * 0.5, cy + s * 0.7)
      ctx.lineTo(cx - t * 0.5, cy + s * 0.7)
      ctx.closePath()
      ctx.fillStyle = RED
      ctx.fill()

      ctx.shadowBlur = 0

      // Inner highlight on Y (subtle)
      const hl = ctx.createLinearGradient(cx - s * 0.4, 0, cx + s * 0.4, 0)
      hl.addColorStop(0, 'rgba(255,255,255,0)')
      hl.addColorStop(0.3, 'rgba(255,255,255,0.12)')
      hl.addColorStop(0.7, 'rgba(255,255,255,0.12)')
      hl.addColorStop(1, 'rgba(255,255,255,0)')

      // Re-draw Y with highlight overlay (simplified as a single Y path)
      ctx.globalAlpha = alpha * 0.4
      ctx.fillStyle = hl
      ctx.beginPath()
      // Left arm
      ctx.moveTo(cx - s * 0.4, cy - s * 0.75)
      ctx.lineTo(cx - s * 0.4 + t, cy - s * 0.75)
      ctx.lineTo(cx + t * 0.5, cy - s * 0.05)
      // Right arm
      ctx.lineTo(cx + s * 0.4 - t, cy - s * 0.75)
      ctx.lineTo(cx + s * 0.4, cy - s * 0.75)
      ctx.lineTo(cx + t * 0.5, cy - s * 0.05)
      ctx.closePath()
      ctx.fill()

      ctx.restore()

      // End animation
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
