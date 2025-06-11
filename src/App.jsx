import { useState } from 'react'
import NormalHero from './components/NormalHero.jsx'
import NerdHero from './components/NerdHero.jsx'

function App() {
  const [mode, setMode] = useState('normal')
  const isNerd = mode === 'nerd'

  const toggleMode = () => {
    setMode(isNerd ? 'normal' : 'nerd')
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isNerd ? 'bg-purple-950 text-lime-300' : 'bg-white text-gray-900'}`}>
      <header className="sticky top-0 backdrop-blur bg-white/80 shadow flex justify-between items-center p-4 z-10">
        <h1 className="font-bold">React Tailwind</h1>
        <button
          onClick={toggleMode}
          className={`px-3 py-1 rounded border transition-colors duration-500 ${isNerd ? 'bg-lime-300 text-purple-950' : 'bg-gray-900 text-white'}`}
        >
          {isNerd ? 'Nerd Mode' : 'Normal Mode'}
        </button>
      </header>
      <main className="flex-1">
        {isNerd ? <NerdHero /> : <NormalHero />}
      </main>
    </div>
  )
}

export default App
