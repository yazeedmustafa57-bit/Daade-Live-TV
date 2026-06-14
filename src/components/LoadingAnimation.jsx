import { useEffect, useRef } from 'react'

const COLORS = ['#f43f5e', '#fbbf24', '#6366f1', '#22c55e']
const BG_TOP = '#1a0000'
const BG_BOTTOM = '#050505'

function getYShape(col, totalCols) {
  const x = col / totalCols
  const cx = 0.5
  const halfWidth = 0.35
  const armEndY = 0.48
  const bottomY = 0.92
  const thick = 0.045
  const d = Math.abs(x - cx) / halfWidth
  if (d > 1 + thick * 1.5) return null

  let ranges = []
  if (x < cx + thick) {
    const t = (x - (cx - halfWidth)) / halfWidth
    if (t >= 0 && t <= 1 + thick * 2) {
      let yCenter = armEndY * t
      const armTop = Math.max(0.03, yCenter - thick)
      const armBot = Math.min(armEndY + thick * 2, yCenter + thick)
      ranges.push({ top: armTop, bottom: armBot })
    }
  }
  if (x > cx - thick) {
    const t = (cx + halfWidth - x) / halfWidth
    if (t >= 0 && t <= 1 + thick * 2) {
      let yCenter = armEndY * t
      const armTop = Math.max(0.03, yCenter - thick)
      const armBot = Math.min(armEndY + thick * 2, yCenter + thick)
      ranges.push({ top: armTop, bottom: armBot })
    }
  }
  if (Math.abs(x - cx) < thick * 1.2) {
    ranges.push({ top: armEndY - thick * 0.5, bottom: bottomY })
  }

  if (ranges.length === 0) return null
  let top = Math.min(...ranges.map(r => r.top))
  let bottom = Math.max(...ranges.map(r => r.bottom))
  return { top, bottom }
}

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

    const NUM_LINES = w < 600 ? 30 : w < 1024 ? 50 : 72
    let lines = []
    for (let i = 0; i < NUM_LINES; i++) {
      const col = i / NUM_LINES
      const yShape = getYShape(col, 1)
      lines.push({
        x: Math.random() * w,
        targetX: col * w,
        currentH: 0,
        targetH: yShape ? (yShape.bottom - yShape.top) * h : 0,
        targetY: yShape ? yShape.top * h : h * 0.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        riseDelay: Math.random() * 1.2,
        randomOffset: (Math.random() - 0.5) * 0.04 * h,
        opacity: 0.7 + Math.random() * 0.3,
      })
    }

    const RISE_DURATION = 2000
    const FORM_DURATION = 2000
    const TEXT_FADE_DURATION = 1200
    const TOTAL_DURATION = 6200

    function draw() {
      const now = performance.now()
      const elapsed = now - startTime
      const riseProgress = Math.min(1, elapsed / RISE_DURATION)
      const formProgress = Math.min(1, Math.max(0, (elapsed - RISE_DURATION) / FORM_DURATION))
      const textProgress = Math.min(1, Math.max(0, (elapsed - RISE_DURATION - FORM_DURATION) / TEXT_FADE_DURATION))
      const isText = elapsed >= RISE_DURATION + FORM_DURATION
      const isForm = elapsed >= RISE_DURATION && !isText
      const isRise = !isForm && !isText
      const totalProgress = elapsed / TOTAL_DURATION

      if (w !== window.innerWidth || h !== window.innerHeight) {
        w = canvas.width = window.innerWidth
        h = canvas.height = window.innerHeight
      }

      ctx.clearRect(0, 0, w, h)

      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, 0, h)
      grad.addColorStop(0, BG_TOP)
      grad.addColorStop(0.3, '#0d0000')
      grad.addColorStop(0.7, '#080000')
      grad.addColorStop(1, BG_BOTTOM)
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // Update lines
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        if (isRise) {
          const adjustedRise = Math.max(0, Math.min(1, (riseProgress - line.riseDelay / 2) / (1 - line.riseDelay / 2)))
          const easedRise = 1 - Math.pow(1 - adjustedRise, 3)
          line.currentH = easedRise * h * (0.2 + Math.random() * 0.3)
          line.x += (line.targetX - line.x) * 0.02
        }
        if (isForm) {
          const easedForm = 1 - Math.pow(1 - formProgress, 2)
          line.x += (line.targetX - line.x) * 0.08
          const targetH = Math.max(line.targetH, 4)
          const targetY = line.targetY + line.randomOffset
          line.currentH += (targetH - line.currentH) * 0.08
        }
      }

      // Background glow during form phase
      if (isForm || isText) {
        const glowAlpha = isText ? 0.15 : 0.08
        const grd = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.45, w * 0.3)
        grd.addColorStop(0, `rgba(244, 63, 94, ${glowAlpha})`)
        grd.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = grd
        ctx.fillRect(0, 0, w, h)
      }

      // Draw lines
      for (const line of lines) {
        if (line.currentH <= 0) continue
        const x = line.x
        const y = h - line.currentH
        ctx.globalAlpha = line.opacity
        ctx.shadowColor = line.color
        ctx.shadowBlur = isRise ? 12 : 6
        ctx.fillStyle = line.color
        const lineW = Math.max(2, w / NUM_LINES * 0.7)
        ctx.fillRect(x - lineW / 2, y, lineW, line.currentH)

        ctx.shadowBlur = 0
        ctx.globalAlpha = line.opacity * 0.5
        const grdH = ctx.createLinearGradient(0, y, 0, y + line.currentH * 0.1)
        grdH.addColorStop(0, 'rgba(255,255,255,0.3)')
        grdH.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = grdH
        ctx.fillRect(x - lineW / 2, y, lineW, line.currentH * 0.1)
      }
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0

      // Draw text
      if (isText || totalProgress > 0.7) {
        const textAlpha = isText ? Math.min(1, textProgress) : 1
        ctx.save()
        ctx.globalAlpha = textAlpha
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        ctx.shadowColor = '#f43f5e'
        ctx.shadowBlur = 30

        ctx.font = `600 ${Math.round(h * 0.07)}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
        const gradY = ctx.createLinearGradient(w * 0.5 - 150, 0, w * 0.5 + 150, 0)
        gradY.addColorStop(0, '#f43f5e')
        gradY.addColorStop(0.5, '#818cf8')
        gradY.addColorStop(1, '#f43f5e')
        ctx.fillStyle = gradY
        ctx.fillText('Yazeed', w * 0.5, h * 0.55)

        ctx.font = `300 ${Math.round(h * 0.05)}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
        ctx.fillStyle = '#94a3b8'
        ctx.shadowBlur = 0
        ctx.fillText('Shows', w * 0.5, h * 0.62)

        ctx.font = `${Math.round(h * 0.018)}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
        ctx.fillStyle = '#64748b'
        ctx.fillText('Filme • Serien • Anime • Kostenlos', w * 0.5, h * 0.68)

        ctx.restore()
      }

      if (totalProgress >= 1) {
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
      }}
    />
  )
}
