import { useEffect, useRef } from 'react'

// Synthesize the Netflix-style "ta-dum" sound using Web Audio API
function playTadamSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0.5, ctx.currentTime)
    masterGain.connect(ctx.destination)

    // --- Low rumble / sub bass ---
    const osc1 = ctx.createOscillator()
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(60, ctx.currentTime)
    osc1.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.3)
    osc1.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.7)
    const gain1 = ctx.createGain()
    gain1.gain.setValueAtTime(0.6, ctx.currentTime)
    gain1.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.3)
    gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.0)
    osc1.connect(gain1)
    gain1.connect(masterGain)
    osc1.start(ctx.currentTime)
    osc1.stop(ctx.currentTime + 1.0)

    // --- Mid punch ---
    const osc2 = ctx.createOscillator()
    osc2.type = 'sawtooth'
    osc2.frequency.setValueAtTime(120, ctx.currentTime)
    osc2.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.4)
    osc2.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.8)
    const gain2 = ctx.createGain()
    gain2.gain.setValueAtTime(0.3, ctx.currentTime)
    gain2.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.4)
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0)
    osc2.connect(gain2)
    gain2.connect(masterGain)
    osc2.start(ctx.currentTime)
    osc2.stop(ctx.currentTime + 1.0)

    // --- Impact / "dum" hit at the end ---
    const osc3 = ctx.createOscillator()
    osc3.type = 'triangle'
    osc3.frequency.setValueAtTime(80, ctx.currentTime + 0.65)
    osc3.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 1.0)
    const gain3 = ctx.createGain()
    gain3.gain.setValueAtTime(0, ctx.currentTime)
    gain3.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6)
    gain3.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.7)
    gain3.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2)
    osc3.connect(gain3)
    gain3.connect(masterGain)
    osc3.start(ctx.currentTime + 0.6)
    osc3.stop(ctx.currentTime + 1.2)

    // --- Noise burst for texture ---
    const bufferSize = ctx.sampleRate * 0.3
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.15))
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0.15, ctx.currentTime)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
    noise.connect(noiseGain)
    noiseGain.connect(masterGain)
    noise.start(ctx.currentTime)
  } catch (e) {
    // Audio not supported, fail silently
  }
}

export default function LoadingAnimation({ onComplete }) {
  const canvasRef = useRef(null)
  const soundPlayed = useRef(false)

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

      // Play sound when Y starts appearing (around 10% into animation)
      if (!soundPlayed.current && progress > 0.08) {
        soundPlayed.current = true
        playTadamSound()
      }

      if (w !== window.innerWidth || h !== window.innerHeight) {
        w = canvas.width = window.innerWidth
        h = canvas.height = window.innerHeight
      }

      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, w, h)

      // Subtle glow
      const glow = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.45, w * 0.25)
      glow.addColorStop(0, `rgba(229, 9, 20, ${progress * 0.08})`)
      glow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, w, h)

      const size = Math.min(w, h) * 0.28
      const cx = w * 0.5
      const cy = h * 0.45
      const t = size * 0.13

      let scale, alpha
      if (progress < 0.5) {
        const p = progress / 0.5
        scale = Math.pow(p, 1.5) * 0.3 + p * 0.7
        alpha = Math.min(1, p * 1.5)
      } else if (progress < 0.8) {
        const p = (progress - 0.5) / 0.3
        scale = 1 + Math.sin(p * Math.PI * 4) * 0.02
        alpha = 1
      } else {
        const p = (progress - 0.8) / 0.2
        scale = 1
        alpha = 1 - p
      }

      ctx.save()
      ctx.globalAlpha = alpha

      const s = size * scale
      const tw = t * scale

      ctx.shadowColor = RED
      ctx.shadowBlur = 40 * scale

      // Left arm
      ctx.beginPath()
      ctx.moveTo(cx - s * 0.4, cy - s * 0.75)
      ctx.lineTo(cx - s * 0.4 + tw, cy - s * 0.75)
      ctx.lineTo(cx + tw * 0.5, cy - s * 0.05)
      ctx.lineTo(cx - tw * 0.5, cy - s * 0.05)
      ctx.closePath()
      ctx.fillStyle = RED
      ctx.fill()

      // Right arm
      ctx.beginPath()
      ctx.moveTo(cx + s * 0.4, cy - s * 0.75)
      ctx.lineTo(cx + s * 0.4 - tw, cy - s * 0.75)
      ctx.lineTo(cx - tw * 0.5, cy - s * 0.05)
      ctx.lineTo(cx + tw * 0.5, cy - s * 0.05)
      ctx.closePath()
      ctx.fillStyle = RED
      ctx.fill()

      // Stem
      ctx.beginPath()
      ctx.moveTo(cx - tw * 0.5, cy - s * 0.05)
      ctx.lineTo(cx + tw * 0.5, cy - s * 0.05)
      ctx.lineTo(cx + tw * 0.5, cy + s * 0.7)
      ctx.lineTo(cx - tw * 0.5, cy + s * 0.7)
      ctx.closePath()
      ctx.fillStyle = RED
      ctx.fill()

      ctx.shadowBlur = 0

      // Highlight overlay
      ctx.globalAlpha = alpha * 0.4
      const hl = ctx.createLinearGradient(cx - s * 0.4, 0, cx + s * 0.4, 0)
      hl.addColorStop(0, 'rgba(255,255,255,0)')
      hl.addColorStop(0.3, 'rgba(255,255,255,0.12)')
      hl.addColorStop(0.7, 'rgba(255,255,255,0.12)')
      hl.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = hl
      ctx.beginPath()
      ctx.moveTo(cx - s * 0.4, cy - s * 0.75)
      ctx.lineTo(cx - s * 0.4 + tw, cy - s * 0.75)
      ctx.lineTo(cx + tw * 0.5, cy - s * 0.05)
      ctx.lineTo(cx + s * 0.4 - tw, cy - s * 0.75)
      ctx.lineTo(cx + s * 0.4, cy - s * 0.75)
      ctx.lineTo(cx + tw * 0.5, cy - s * 0.05)
      ctx.closePath()
      ctx.fill()
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
