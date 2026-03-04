import { useState } from 'react'
import { MusicPlayer } from './pages/MusicPlayer'
import { BrowserHistory } from './pages/BrowserHistory'
// no pude hacerlo en tsx, no se porque 
//css echo casi por completo por gemini 
import './index.css'

function App() {
  const [activeTab, setActiveTab] = useState<'music' | 'browser'>('music')

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Pagina de listas📋</h1>
        <nav className="tabs">
          <button
            className={`tab ${activeTab === 'music' ? 'active' : ''}`}
            onClick={() => setActiveTab('music')}
          >
            🎵 MUSIC
          </button>
          <button
            className={`tab ${activeTab === 'browser' ? 'active' : ''}`}
            onClick={() => setActiveTab('browser')}
          >
            🌐 BROWSER
          </button>
        </nav>
      </header>

      <main className="main-content">
        {activeTab === 'music' ? <MusicPlayer /> : <BrowserHistory />}
      </main>
    </div>
    // esta clase siurve para el cambio de funcionalidad de la pagina de musica a historial
    //
  )
}

export default App
