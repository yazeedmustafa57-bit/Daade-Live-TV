import { useEffect, useRef } from 'react'

// Colors
const COLORS = ['#f43f5e', '#fbbf24', '#6366f1', '#22c55e']
const BG_TOP = '#1a0000'
const BG_BOTTOM = '#050505'

// Y shape definition: for each column, returns { top, bottom } or null
function getYShape(col, totalCols) {
  const x = col / totalCols
  const cx = 0.5
  const halfWidth = 0.35 // Y spans from 0.15 to 0.85
  const armEndY = 0.48   // where arms meet
  const bottomY = 0.92   // bottom of stem
  const thick = 0.045    // thickness factor

  // x position relative to Y center (0 = center, 1 = edge)
  const d = Math.abs(x - cx) / halfWidth

  if (d > 1 + thick * 1.5) return null // outside Y

  // Check if in left arm
  let ranges = []

  // ---- Left arm (x < cx) ----
  if (x < cx + thick) {
    const t = (x - (cx - halfWidth)) / halfWidth // 0 at left edge, 1 at center
    if (t >= 0 && t <= 1 + thick * 2) {
      // Arm center y at this x
      let yCenter = armEndY * t
      // Top and bottom of arm
      const armTop = Math.max(0.03, yCenter - thick)
      const armBot = Math.min(armEndY + thick * 2, yCenter + thick)
      ranges.push({ top: armTop, bottom: armBot })
    }
  }

  // ---- Right arm (x > cx) ----
  if (x > cx - thick) {
    const t = (cx + halfWidth - x) / halfWidth // 0 at right edge, 1 at center
    if (t >= 0 && t <= 1 + thick * 2) {
      let yCenter = armEndY * t
      const armTop = Math.max(0.03, yCenter - thick)
      const armBot = Math.min(armEndY + thick * 2, yCenter + thick)
      ranges.push({ top: armTop, bottom: armBot })
    }
  }

  // ---- Stem (near center) ----
  if (Math.abs(x - cx) < thick * 1.2) {
    ranges.push({ top: armEndY - thick * 0.5, bottom: bottomY })
  }

  // Merge overlapping ranges
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

    // Number of vertical lines
    const NUM_LINES = w < 600 ? 30 : w < 1024 ? 50 : 72

    // Create lines
    let lines = []
    for (let i = 0; i < NUM_LINES; i++) {
      const col = i / NUM_LINES
      const yShape = getYShape(col, 1)
      lines.push({
        // Current position (starts at random x across width)
        x: Math.random() * w,
        // Target position for Y formation
        targetX: col * w,
        // Current height (0 initially)
        currentH: 0,
        // Target height (from Y shape)
        targetH: yShape ? (yShape.bottom - yShape.top) * h : 0,
        // Target Y position (top of line within Y)
        targetY: yShape ? yShape.top * h : h * 0.5,
        // Color (random from palette)
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        // Random delay for rising phase
        riseDelay: Math.random() * 1.2,
        // Random offset for Y position
        randomOffset: (Math.random() - 0.5) * 0.04 * h,
        opacity: 0.7 + Math.random() * 0.3,
      })
    }

    // Phase tracking
    let phase = 'rise' // 'rise' | 'form' | 'text' | 'done'
    let phaseStart = startTime
    const RISE_DURATION = 2000
    const FORM_DURATION = 2000
    const TEXT_FADE_DURATION = 1200
    const TOTAL_DURATION = 6200

    function draw() {
      const now = performance.now()
      const elapsed = now - startTime

      // Determine phase
      if (elapsed < RISE_DURATION) {
        phase = 'rise'
      } else if (elapsed < RISE_DURATION + FORM_DURATION) {
        phase = 'form'
      } else if (elapsed < RISE_DURATION + FORM_DURATION + TEXT_FADE_DURATION) {
        phase = 'text'
      } else if (!finished) {
        phase = 'done'
        finished = true
        setTimeout(() => onComplete?.(), 800)
      }

      // Update lines
      const riseProgress = Math.min(1, elapsed / RISE_DURATION)
      const formProgress = Math.min(1, (elapsed - RISE_DURATION) / FORM_DURATION)
      const textProgress = Math.min(1, (elapsed - RISE_DURATION - FORM_DURATION) / TEXT_FADE_DURATION)

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]

        if (phase === 'rise' || phase === 'form') {
          const adjustedRise = Math.max(0, Math.min(1, (riseProgress - line.riseDelay / 2) / (1 - line.riseDelay / 2)))
          if (phase === 'rise') {
            // Rising from bottom: height increases
            const easedRise = 1 - Math.pow(1 - adjustedRise, 3)
            line.currentH = easedRise * h * (0.2 + Math.random() * 0.3)
            line.x += (line.targetX - line.x) * 0.02
          }
          if (phase === 'form') {
            // Morphing into Y shape
            const easedForm = 1 - Math.pow(1 - formProgress, 2)
            // Move x to target
            line.x += (line.targetX - line.x) * 0.08
            // Adjust height and y position
            const targetH = Math.max(line.targetH, 4)
            const targetY = line.targetY + line.randomOffset
            line.currentH += (targetH - line.currentH) * 0.08
            // Calculate y position from bottom
            line._y = h - line.currentH
          }
        }
      }

      // Draw
      ctx.clearRect(0, 0, w, h)

      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, 0, h)
      grad.addColorStop(0, BG_TOP)
      grad.addColorStop(0.3, '#0d0000')
      grad.addColorStop(0.7, '#080000')
      grad.addColorStop(1, BG_BOTTOM)
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // Subtle background glow
      if (phase === 'form' || phase === 'text') {
        const glowAlpha = phase === 'text' ? 0.15 : 0.08
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

        // Glow effect
        ctx.shadowColor = line.color
        ctx.shadowBlur = phase === 'rise' ? 12 : 6

        ctx.fillStyle = line.color
        const lineW = Math.max(2, w / NUM_LINES * 0.7)
        ctx.fillRect(x - lineW / 2, y, lineW, line.currentH)

        // Bright top highlight
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
      if (phase === 'text' || phase === 'done') {
        const textAlpha = phase === 'text' ? Math.min(1, textProgress) : 1
        ctx.globalAlpha = textAlpha

        // "Yazeed" part
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        // Shadow under text
        ctx.shadowColor = '#f43f5e'
        ctx.shadowBlur = 30

        // "Yazeed"
        ctx.font = `600 ${Math.round(h * 0.07)}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
        const gradY = ctx.createLinearGradient(w * 0.5 - 150, 0, w * 0.5 + 150, 0)
        gradY.addColorStop(0, '#f43f5e')
        gradY.addColorStop(0.5, '#818cf8')
        gradY.addColorStop(1, '#f43f5e')
        ctx.fillStyle = gradY
        ctx.fillText('Yazeed', w * 0.5, h * 0.55)

        // "Shows"
        ctx.font = `300 ${Math.round(h * 0.05)}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
        ctx.fillStyle = '#94a3b8'
        ctx.shadowBlur = 0
        ctx.fillText('Shows', w * 0.5, h * 0.62)

        // Subtitle
        ctx.font = `${Math.round(h * 0.018)}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
        ctx.fillStyle = '#64748b'
        ctx.fillText('Filme • Serien • Anime • Kostenlos', w * 0.5, h * 0.68)

        ctx.shadowBlur = 0
        ctx.globalAlpha = 1
      }

      // Handle resize
      if (w !== window.innerWidth || h !== window.innerHeight) {
        w = canvas.width = window.innerWidth
        h = canvas.height = window.innerHeight
      }

      if (!finished) {
        animationId = requestAnimationFrame(draw)
      }
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
