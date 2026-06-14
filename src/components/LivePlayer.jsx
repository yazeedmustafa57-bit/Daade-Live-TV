import { useState } from 'react'

const CHANNELS = [
  {
    id: 'main',
    name: 'Daade Live TV',
    stream: 'https://www.youtube.com/embed/live_stream?channel=UC5NOEUbkR71R3R3w45Ch0eQ&autoplay=1&mute=1',
    desc: 'Hauptkanal – Live',
    icon: '🔴',
  },
  {
    id: 'dw',
    name: 'DW Deutsch',
    stream: 'https://www.youtube.com/embed/live_stream?channel=UCVu8Mmg1KGkcSisJgZnHd1g&autoplay=1&mute=1',
    desc: 'Deutsche Welle Nachrichten',
    icon: '📰',
  },
  {
    id: 'phoenix',
    name: 'Phoenix',
    stream: 'https://www.youtube.com/embed/live_stream?channel=UCmGCMUQKzD2MhT6wLvj7WIg&autoplay=1&mute=1',
    desc: 'Ereignisse & Politik live',
    icon: '🏛️',
  },
  {
    id: 'musik',
    name: 'Musik Live',
    stream: 'https://www.youtube.com/embed/live_stream?channel=UC-9-kyTW8ZkZNDHQJ6FgpwQ&autoplay=1&mute=1',
    desc: 'Musik-Events & Konzerte',
    icon: '🎵',
  },
]

export default function LivePlayer() {
  const [activeChannel, setActiveChannel] = useState(CHANNELS[0])
  const [customUrl, setCustomUrl] = useState('')

  const handleUrlSubmit = (e) => {
    e.preventDefault()
    if (!customUrl.trim()) return
    let embedUrl = customUrl.trim()

    // YouTube URL → embed conversion
    const ytMatch = embedUrl.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
    )
    if (ytMatch) {
      embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=1`
    }
    // M3U8 / direct video link detection – keep as-is
    setActiveChannel({ id: 'custom', name: customUrl.length > 30 ? customUrl.slice(0, 30) + '…' : customUrl, stream: embedUrl, desc: 'Custom Stream', icon: '📡' })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleUrlSubmit(e)
    }
  }

  return (
    <section id="live" className="live-section">
      <h2 className="section-title">Live TV</h2>
      <p className="section-subtitle">Aktuell: {activeChannel.name}</p>

      <div className="player-container">
        <div className="player-wrapper">
          {activeChannel.stream ? (
            <iframe
              className="player-iframe"
              src={activeChannel.stream}
              title={activeChannel.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="player-placeholder">
              <span className="placeholder-icon">📡</span>
              <h3>{activeChannel.name}</h3>
              <p>Stream wird geladen...</p>
              <p className="placeholder-hint">
                Füge einen YouTube- oder M3U8-Link unten ein, um zu starten.
              </p>
            </div>
          )}
        </div>

        <div className="player-sidebar">
          <div className="channel-list">
            <h3>📡 Live-Sender</h3>
            {CHANNELS.map((ch) => (
              <button
                key={ch.id}
                className={`channel-btn ${activeChannel.id === ch.id ? 'active' : ''}`}
                onClick={() => setActiveChannel(ch)}
              >
                <span className="channel-icon">{ch.icon}</span>
                <div className="channel-info">
                  <span className="channel-name">{ch.name}</span>
                  <span className="channel-desc">{ch.desc}</span>
                </div>
              </button>
            ))}
          </div>

          <form className="stream-form" onSubmit={handleUrlSubmit}>
            <h3>➕ Eigenen Stream</h3>
            <div className="input-group">
              <input
                type="url"
                placeholder="YouTube URL oder M3U8 Link..."
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button type="submit" className="btn-primary">Starten</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
