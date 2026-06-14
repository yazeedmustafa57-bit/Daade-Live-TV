import { useEffect, useRef, useState } from 'react'

// Synthesize Netflix-style sound
function playTadamSound(audioCtx) {
  const now = audioCtx.currentTime
  const master = audioCtx.createGain()
  master.gain.setValueAtTime(0.45, now)
  master.connect(audioCtx.destination)

  // Sub bass
  const o1 = audioCtx.createOscillator()
  o1.type = 'sine'
  o1.frequency.setValueAtTime(50, now)
  o1.frequency.exponentialRampToValueAtTime(90, now + 0.3)
  o1.frequency.exponentialRampToValueAtTime(60, now + 0.7)
  const g1 = audioCtx.createGain()
  g1.gain.setValueAtTime(0.6, now)
  g1.gain.exponentialRampToValueAtTime(0.3, now + 0.3)
  g1.gain.exponentialRampToValueAtTime(0.001, now + 1.2)
  o1.connect(g1).connect(master)
  o1.start(now)
  o1.stop(now + 1.2)

  // Mid punch
  const o2 = audioCtx.createOscillator()
  o2.type = 'sawtooth'
  o2.frequency.setValueAtTime(100, now)
  o2.frequency.exponentialRampToValueAtTime(200, now + 0.35)
  o2.frequency.exponentialRampToValueAtTime(120, now + 0.8)
  const g2 = audioCtx.createGain()
  g2.gain.setValueAtTime(0.2, now)
  g2.gain.exponentialRampToValueAtTime(0.1, now + 0.35)
  g2.gain.exponentialRampToValueAtTime(0.001, now + 1.2)
  o2.connect(g2).connect(master)
  o2.start(now)
  o2.stop(now + 1.2)

  // Impact "dum"
  const o3 = audioCtx.createOscillator()
  o3.type = 'triangle'
  o3.frequency.setValueAtTime(70, now + 0.6)
  o3.frequency.exponentialRampToValueAtTime(40, now + 1.1)
  const g3 = audioCtx.createGain()
  g3.gain.setValueAtTime(0, now)
  g3.gain.linearRampToValueAtTime(0, now + 0.55)
  g3.gain.linearRampToValueAtTime(0.45, now + 0.65)
  g3.gain.exponentialRampToValueAtTime(0.001, now + 1.3)
  o3.connect(g3).connect(master)
  o3.start(now + 0.55)
  o3.stop(now + 1.3)

  // Noise burst
  const len = audioCtx.sampleRate * 0.3
  const buf = audioCtx.createBuffer(1, len, audioCtx.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.12))
  const ns = audioCtx.createBufferSource()
  ns.buffer = buf
  const ng = audioCtx.createGain()
  ng.gain.setValueAtTime(0.15, now)
  ng.gain.exponentialRampToValueAtTime(0.001, now + 0.3)
  ns.connect(ng).connect(master)
  ns.start(now)
}

export default function LoadingAnimation({ onComplete }) {
  const canvasRef = useRef(null)
  const [started, setStarted] = useState(false)
  const audioCtxRef = useRef(null)

  const handleStart = () => {
    if (started) return
    // Create audio context on user gesture
    try {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
      playTadamSound(audioCtxRef.current)
    } catch (e) {
      // Audio not supported
    }
    setStarted(true)
  }

  useEffect(() => {
    if (!started) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)
    let animationId = null
    let startTime = performance.now()
    let finished = false

    const RED = '#E50914'
    const DURATION = 3000

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

      // Radial glow grows with Y
      const glow = ctx.createRadialGradient(w * 0.5, h * 0.42, 0, w * 0.5, h * 0.42, w * 0.35)
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

      // Glow shadow
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
  }, [started, onComplete])

  return (
    <>
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
          cursor: started ? 'default' : 'pointer',
        }}
      />
      {!started && (
        <div
          onClick={handleStart}
          onTouchStart={handleStart}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 101,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
            background: 'rgba(0,0,0,0.5)',
            userSelect: 'none',
          }}
        >
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: '3px solid rgba(229, 9, 20, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 0 40px rgba(229, 9, 20, 0.3)',
            marginBottom: '24px',
          }}
          onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 0 60px rgba(229, 9, 20, 0.5)' }}
          onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(229, 9, 20, 0.3)' }}
          >
            ▶
          </div>
          <p style={{ fontSize: '1.1rem', fontWeight: 300, letterSpacing: '0.05em', color: '#94a3b8' }}>
            Tippe zum Starten
          </p>
          <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '8px' }}>
            Mit Sound – Kopfhörer empfohlen 🎧
          </p>
        </div>
      )}
    </>
  )
}
