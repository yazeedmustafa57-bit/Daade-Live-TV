import { useState } from 'react'

const CHANNELS = [
  { id: 'tagesschau', name: 'Tagesschau (ARD)', stream: 'https://www.youtube.com/embed/live_stream?channel=UC5NOEUbkR71R3R3w45Ch0eQ&autoplay=1&mute=1', desc: '24/7 Nachrichten', icon: '📺' },
  { id: 'dw', name: 'DW Deutsch', stream: 'https://www.youtube.com/embed/live_stream?channel=UCVu8Mmg1KGkcSisJgZnHd1g&autoplay=1&mute=1', desc: 'Deutsche Welle Nachrichten', icon: '🌍' },
  { id: 'zdf', name: 'ZDF', stream: 'https://www.youtube.com/embed/live_stream?channel=UCZFuR6TpfjNuL3HGCe8bVcg&autoplay=1&mute=1', desc: 'ZDF Programm live', icon: '📺' },
  { id: 'zdfheute', name: 'ZDFheute', stream: 'https://www.youtube.com/embed/live_stream?channel=UCsN9KJRMxbRNIUmqXILBcXg&autoplay=1&mute=1', desc: 'ZDF Nachrichten live', icon: '📰' },
  { id: 'phoenix', name: 'Phoenix', stream: 'https://www.youtube.com/embed/live_stream?channel=UCmGCMUQKzD2MhT6wLvj7WIg&autoplay=1&mute=1', desc: 'Ereignisse & Politik live', icon: '🏛️' },
  { id: 'arte', name: 'Arte', stream: 'https://www.youtube.com/embed/live_stream?channel=UCqXlETNA7qgBT09iMdA74PA&autoplay=1&mute=1', desc: 'Kultur & Dokumentationen', icon: '🎨' },
  { id: '3sat', name: '3sat', stream: 'https://www.youtube.com/embed/live_stream?channel=UCsh3J9KAMaEYlb13jPItqRw&autoplay=1&mute=1', desc: 'Kultur & Wissen', icon: '🎭' },
  { id: 'ndr', name: 'NDR', stream: 'https://www.youtube.com/embed/live_stream?channel=UCG3eONRqg7-T-pqCB8KkBDg&autoplay=1&mute=1', desc: 'Norddeutscher Rundfunk', icon: '🌊' },
  { id: 'wdr', name: 'WDR', stream: 'https://www.youtube.com/embed/live_stream?channel=UCKBqPYcFPUpeUB_7jQfCkkw&autoplay=1&mute=1', desc: 'Westdeutscher Rundfunk', icon: '🏭' },
  { id: 'br', name: 'BR', stream: 'https://www.youtube.com/embed/live_stream?channel=UCcR6ugGTmksj_-eNwMJoGJg&autoplay=1&mute=1', desc: 'Bayerischer Rundfunk', icon: '🏔️' },
  { id: 'mdr', name: 'MDR', stream: 'https://www.youtube.com/embed/live_stream?channel=UC8gR29fT1h2fHt7kfJwKkJg&autoplay=1&mute=1', desc: 'Mitteldeutscher Rundfunk', icon: '🏰' },
  { id: 'rbb', name: 'rbb', stream: 'https://www.youtube.com/embed/live_stream?channel=UCL_f53ZEJxp8TxYRX3qnJEA&autoplay=1&mute=1', desc: 'Rundfunk Berlin-Brandenburg', icon: '🏛️' },
  { id: 'swr', name: 'SWR', stream: 'https://www.youtube.com/embed/live_stream?channel=UCqKjR-qZHXBZC3WHTqH4S5A&autoplay=1&mute=1', desc: 'Südwestrundfunk', icon: '🌳' },
  { id: 'hr', name: 'hr-fernsehen', stream: 'https://www.youtube.com/embed/live_stream?channel=UCQBUZFuGRFfF-ZjAK5cDfiw&autoplay=1&mute=1', desc: 'Hessischer Rundfunk', icon: '🏙️' },
  { id: 'kika', name: 'KiKA', stream: 'https://www.youtube.com/embed/live_stream?channel=UCmYI4ouOEg5wY5qYqHvF0Eg&autoplay=1&mute=1', desc: 'Kinderkanal', icon: '🧸' },
  { id: 'zdfneo', name: 'ZDFneo', stream: 'https://www.youtube.com/embed/live_stream?channel=UCQ0VpERgyWsb7e3MQq2LyYw&autoplay=1&mute=1', desc: 'Junges Programm', icon: '🔥' },
  { id: 'zdfinfo', name: 'ZDFinfo', stream: 'https://www.youtube.com/embed/live_stream?channel=UCJ6Z3FJcYSnts6V9-t9GvXQ&autoplay=1&mute=1', desc: 'Dokumentationen & Wissen', icon: '🔬' },
  { id: 'musik', name: 'Musik Live', stream: 'https://www.youtube.com/embed/live_stream?channel=UC-9-kyTW8ZkZNDHQJ6FgpwQ&autoplay=1&mute=1', desc: 'Musik-Events & Konzerte', icon: '🎵' },
]

const PLUTO_CHANNELS = [
  { name: 'Pluto TV Filme', url: 'https://pluto.tv/de/live-tv/pluto-tv-filme', desc: 'Spielfilme 24/7', icon: '🎬' },
  { name: 'Pluto TV Serien', url: 'https://pluto.tv/de/live-tv/pluto-tv-serien', desc: 'Serien-Marathon', icon: '📺' },
  { name: 'Pluto TV Dokus', url: 'https://pluto.tv/de/live-tv/pluto-tv-dokus', desc: 'Dokumentationen', icon: '📽️' },
  { name: 'Pluto TV Krimi', url: 'https://pluto.tv/de/live-tv/pluto-tv-krimi', desc: 'Krimi & Spannung', icon: '🔍' },
  { name: 'Pluto TV Comedy', url: 'https://pluto.tv/de/live-tv/pluto-tv-comedy', desc: 'Lachen garantiert', icon: '😂' },
  { name: 'Pluto TV Sport', url: 'https://pluto.tv/de/live-tv/pluto-tv-sport', desc: 'Sport live', icon: '⚽' },
  { name: 'Pluto TV Kids', url: 'https://pluto.tv/de/live-tv/pluto-tv-kids', desc: 'Kinderprogramm', icon: '🧒' },
  { name: 'Pluto TV Reality', url: 'https://pluto.tv/de/live-tv/pluto-tv-reality', desc: 'Reality TV', icon: '📸' },
]

export default function LivePlayer() {
  const [activeChannel, setActiveChannel] = useState(CHANNELS[0])
  const [customUrl, setCustomUrl] = useState('')
  const [showPluto, setShowPluto] = useState(false)

  const handleUrlSubmit = (e) => {
    e.preventDefault()
    if (!customUrl.trim()) return
    let embedUrl = customUrl.trim()

    const ytMatch = embedUrl.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
    )
    if (ytMatch) {
      embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=1`
    }
    setActiveChannel({
      id: 'custom',
      name: customUrl.length > 30 ? customUrl.slice(0, 30) + '…' : customUrl,
      stream: embedUrl,
      desc: 'Custom Stream',
      icon: '📡',
    })
    setShowPluto(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleUrlSubmit(e)
  }

  const handlePlutoClick = (ch) => {
    window.open(ch.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="live" className="live-section">
      <h2 className="section-title">🇩🇪 Live TV – Deutsche Sender</h2>
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
                Wähle einen Sender aus der Liste oder füge einen eigenen Link ein.
              </p>
            </div>
          )}
        </div>

        <div className="player-sidebar">
          {/* Tab: Deutsche Sender / Pluto TV */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
            <button
              className={`tab-btn ${!showPluto ? 'tab-active' : ''}`}
              onClick={() => setShowPluto(false)}
            >
              📺 Deutsche Sender
            </button>
            <button
              className={`tab-btn ${showPluto ? 'tab-active' : ''}`}
              onClick={() => setShowPluto(true)}
            >
              📡 Pluto TV
            </button>
          </div>

          {!showPluto && (
            <div className="channel-list">
              <h3 style={{ fontSize: '0.8rem' }}>
                {CHANNELS.length} Sender – Klick zum Starten
              </h3>
              <div className="channel-scroll">
                {CHANNELS.map((ch) => (
                  <button
                    key={ch.id}
                    className={`channel-btn ${activeChannel.id === ch.id ? 'active' : ''}`}
                    onClick={() => { setActiveChannel(ch); setShowPluto(false) }}
                  >
                    <span className="channel-icon">{ch.icon}</span>
                    <div className="channel-info">
                      <span className="channel-name">{ch.name}</span>
                      <span className="channel-desc">{ch.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {showPluto && (
            <div className="channel-list">
              <h3 style={{ fontSize: '0.8rem' }}>
                Pluto TV Deutschland – Klick öffnet neuen Tab
              </h3>
              <div className="channel-scroll">
                {PLUTO_CHANNELS.map((ch, i) => (
                  <button
                    key={i}
                    className="channel-btn"
                    onClick={() => handlePlutoClick(ch)}
                  >
                    <span className="channel-icon">{ch.icon}</span>
                    <div className="channel-info">
                      <span className="channel-name">{ch.name}</span>
                      <span className="channel-desc">{ch.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
              <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(244,63,94,0.08)', borderRadius: '10px', fontSize: '0.78rem', color: '#94a3b8' }}>
                💡 Pluto TV ist ein kostenloser Streaming-Dienst mit vielen deutschen Sendern.
                Klicke auf einen Sender um ihn im neuen Tab zu öffnen.
              </div>
            </div>
          )}

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
