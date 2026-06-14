import { useState } from 'react'

const CHANNELS = [
  { id: 'ard', name: 'ARD Mediathek Live', stream: 'https://www.ardmediathek.de/live/', desc: 'ARD Live-Stream (iframe)', icon: '📺', type: 'iframe' },
  { id: 'tagesschau', name: 'Tagesschau (ARD)', stream: 'https://www.youtube.com/embed/live_stream?channel=UC5NOEUbkR71R3R3w45Ch0eQ&autoplay=1', desc: '24/7 Nachrichten live', icon: '📰', type: 'youtube' },
  { id: 'dw', name: 'DW Deutsch', stream: 'https://www.youtube.com/embed/live_stream?channel=UCVu8Mmg1KGkcSisJgZnHd1g&autoplay=1', desc: 'Deutsche Welle 24/7', icon: '🌍', type: 'youtube' },
  { id: 'phoenix', name: 'Phoenix', stream: 'https://www.youtube.com/embed/live_stream?channel=UCmGCMUQKzD2MhT6wLvj7WIg&autoplay=1', desc: 'Politik & Ereignisse', icon: '🏛️', type: 'youtube' },
  { id: 'arte', name: 'Arte', stream: 'https://www.youtube.com/embed/live_stream?channel=UCqXlETNA7qgBT09iMdA74PA&autoplay=1', desc: 'Kultur & Dokus', icon: '🎨', type: 'youtube' },
  { id: 'musik', name: 'Musik Live', stream: 'https://www.youtube.com/embed/live_stream?channel=UC-9-kyTW8ZkZNDHQJ6FgpwQ&autoplay=1', desc: 'Musik-Events live', icon: '🎵', type: 'youtube' },
]

const EXTERNAL_SENDER = [
  { name: 'ZDF live', url: 'https://www.zdf.de/live-tv', icon: '📺', desc: 'ZDF Programm' },
  { name: 'NDR Mediathek', url: 'https://www.ndr.de/fernsehen/livestream/', icon: '🌊', desc: 'Norddeutscher Rundfunk' },
  { name: 'WDR Mediathek', url: 'https://www1.wdr.de/mediathek/video/livestream/index.html', icon: '🏭', desc: 'Westdeutscher Rundfunk' },
  { name: 'BR Mediathek', url: 'https://www.br.de/mediathek/live/index.html', icon: '🏔️', desc: 'Bayerischer Rundfunk' },
  { name: 'MDR Mediathek', url: 'https://www.mdr.de/mediathek/live/index.html', icon: '🏰', desc: 'Mitteldeutscher Rundfunk' },
  { name: 'SWR Mediathek', url: 'https://www.swr.de/mediathek/live/index.html', icon: '🌳', desc: 'Südwestrundfunk' },
  { name: 'rbb Mediathek', url: 'https://www.rbb-online.de/mediathek/live.html', icon: '🏛️', desc: 'Berlin-Brandenburg' },
  { name: 'hr Mediathek', url: 'https://www.hr-fernsehen.de/live/index.html', icon: '🏙️', desc: 'Hessischer Rundfunk' },
  { name: 'KiKA live', url: 'https://www.kika.de/der-kika-livestream-100.html', icon: '🧸', desc: 'Kinderkanal' },
  { name: '3sat Mediathek', url: 'https://www.3sat.de/live-tv', icon: '🎭', desc: 'Kultur & Wissen' },
]

const PLUTO_CHANNELS = [
  { name: 'Pluto TV Filme', url: 'https://pluto.tv/de/live-tv/pluto-tv-filme', desc: 'Spielfilme 24/7', icon: '🎬' },
  { name: 'Pluto TV Serien', url: 'https://pluto.tv/de/live-tv/pluto-tv-serien', desc: 'Serien-Marathon', icon: '📺' },
  { name: 'Pluto TV Dokus', url: 'https://pluto.tv/de/live-tv/pluto-tv-dokus', desc: 'Dokumentationen', icon: '📽️' },
  { name: 'Pluto TV Krimi', url: 'https://pluto.tv/de/live-tv/pluto-tv-krimi', desc: 'Krimi & Spannung', icon: '🔍' },
  { name: 'Pluto TV Comedy', url: 'https://pluto.tv/de/live-tv/pluto-tv-comedy', desc: 'Komödien', icon: '😂' },
  { name: 'Pluto TV Sport', url: 'https://pluto.tv/de/live-tv/pluto-tv-sport', desc: 'Sport live', icon: '⚽' },
  { name: 'Pluto TV Kids', url: 'https://pluto.tv/de/live-tv/pluto-tv-kids', desc: 'Kinderprogramm', icon: '🧒' },
]

export default function LivePlayer() {
  const [activeChannel, setActiveChannel] = useState(CHANNELS[0])
  const [customUrl, setCustomUrl] = useState('')
  const [showPluto, setShowPluto] = useState(false)
  const [showExtern, setShowExtern] = useState(false)

  const handleUrlSubmit = (e) => {
    e.preventDefault()
    if (!customUrl.trim()) return
    let embedUrl = customUrl.trim()
    const ytMatch = embedUrl.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
    )
    if (ytMatch) {
      embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`
    }
    setActiveChannel({ id: 'custom', name: customUrl.length > 30 ? customUrl.slice(0, 30) + '…' : customUrl, stream: embedUrl, desc: '', icon: '📡', type: 'youtube' })
  }

  return (
    <section id="live" className="live-section">
      <h2 className="section-title">🇩🇪 Live TV</h2>
      <p className="section-subtitle">Aktuell: {activeChannel.name}</p>

      <div className="player-container">
        <div className="player-wrapper">
          {activeChannel.type === 'iframe' ? (
            <iframe
              className="player-iframe"
              src={activeChannel.stream}
              title={activeChannel.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ background: '#000' }}
            />
          ) : activeChannel.stream ? (
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
              <p className="placeholder-hint">Wähle einen Sender oder gib einen Link ein.</p>
            </div>
          )}
          <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.75)', padding: '4px 12px', borderRadius: '8px', fontSize: '0.75rem', color: '#94a3b8' }}>
            {activeChannel.name}
          </div>
        </div>

        <div className="player-sidebar">
          <div style={{ display: 'flex', gap: '4px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <button className={`tab-btn ${!showPluto && !showExtern ? 'tab-active' : ''}`} onClick={() => { setShowPluto(false); setShowExtern(false) }}>
              📺 Live
            </button>
            <button className={`tab-btn ${showExtern ? 'tab-active' : ''}`} onClick={() => { setShowExtern(true); setShowPluto(false) }}>
              🏢 Extern
            </button>
            <button className={`tab-btn ${showPluto ? 'tab-active' : ''}`} onClick={() => { setShowPluto(true); setShowExtern(false) }}>
              📡 Pluto
            </button>
          </div>

          {!showPluto && !showExtern && (
            <div className="channel-list">
              <h3 style={{ fontSize: '0.8rem' }}>📡 Live-Sender (YouTube/ARD)</h3>
              <div className="channel-scroll">
                {CHANNELS.map((ch) => (
                  <button key={ch.id} className={`channel-btn ${activeChannel.id === ch.id ? 'active' : ''}`} onClick={() => { setActiveChannel(ch); setShowPluto(false); setShowExtern(false) }}>
                    <span className="channel-icon">{ch.icon}</span>
                    <div className="channel-info">
                      <span className="channel-name">{ch.name}</span>
                      <span className="channel-desc">{ch.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
              <p style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '8px' }}>
                💡 YouTube-Sender zeigen nur Inhalt wenn sie gerade live senden.
              </p>
            </div>
          )}

          {showExtern && (
            <div className="channel-list">
              <h3 style={{ fontSize: '0.8rem' }}>🏢 Externe Sender (öffnet neuen Tab)</h3>
              <div className="channel-scroll">
                {EXTERNAL_SENDER.map((ch, i) => (
                  <button key={i} className="channel-btn" onClick={() => window.open(ch.url, '_blank', 'noopener,noreferrer')}>
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
              <h3 style={{ fontSize: '0.8rem' }}>📡 Pluto TV Deutschland</h3>
              <div className="channel-scroll">
                {PLUTO_CHANNELS.map((ch, i) => (
                  <button key={i} className="channel-btn" onClick={() => window.open(ch.url, '_blank', 'noopener,noreferrer')}>
                    <span className="channel-icon">{ch.icon}</span>
                    <div className="channel-info">
                      <span className="channel-name">{ch.name}</span>
                      <span className="channel-desc">{ch.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
              <p style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '8px' }}>
                💡 Pluto TV ist kostenlos – öffnet im neuen Tab.
              </p>
            </div>
          )}

          <form className="stream-form" onSubmit={handleUrlSubmit}>
            <h3>➕ Eigenen Link</h3>
            <div className="input-group">
              <input type="url" placeholder="YouTube URL oder M3U8..." value={customUrl} onChange={(e) => setCustomUrl(e.target.value)} />
              <button type="submit" className="btn-primary">Starten</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
