import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Routes, Route, useNavigate } from 'react-router-dom'

const MotionDiv = motion.div
import NormalHero from './components/NormalHero.jsx'
import NerdHero from './components/NerdHero.jsx'
import ProjectGrid from './components/ProjectGrid.jsx'
import Timeline from './components/Timeline.jsx'
import StatsHUD from './components/StatsHUD.jsx'
import ProjectDetail from './components/ProjectDetail.jsx'
import Terminal from './components/Terminal.jsx'
import ResumeSection from './components/ResumeSection.jsx'

function App() {
  const [mode, setMode] = useState('normal')
  const [glitch, setGlitch] = useState(false)
  const [showResume, setShowResume] = useState(false)
  const isNerd = mode === 'nerd'
  const navigate = useNavigate()

  const toggleMode = () => {
    if (isNerd) {
      setMode('normal')
    } else {
      setGlitch(true)
      setMode('nerd')
    }
  }

  const handleCommand = (cmd) => {
    if (cmd.startsWith('run ')) {
      const id = cmd.slice(4)
      navigate(`/project/${id}`)
      return `Running ${id}...`
    }
    if (cmd === 'open resume') {
      setShowResume(true)
      return 'Opening resume...'
    }
    if (cmd === 'close resume') {
      setShowResume(false)
      return 'Closing resume...'
    }
    return 'Command not found'
  }

  useEffect(() => {
    if (!glitch) return
    const timer = setTimeout(() => setGlitch(false), 400)
    return () => clearTimeout(timer)
  }, [glitch])

  return (
    <div className="relative">
      {glitch && (
        <MotionDiv
          className="fixed inset-0 z-50 pointer-events-none bg-lime-300 mix-blend-difference"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0, 1, 0],
            x: [0, -5, 5, -3, 0],
          }}
          transition={{ duration: 0.4, times: [0, 0.25, 0.5, 0.75, 1] }}
        />
      )}
      <AnimatePresence mode="wait">
        <MotionDiv
          key={mode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`min-h-screen flex flex-col transition-colors duration-500 ${isNerd ? 'bg-purple-950 text-lime-300' : 'bg-white text-gray-900'}`}
        >
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
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {isNerd ? <NerdHero /> : <NormalHero />}
                    <Timeline />
                    <ProjectGrid isNerd={isNerd} />
                  </>
                }
              />
              <Route path="/project/:id" element={<ProjectDetail />} />
            </Routes>
          </main>
        </MotionDiv>
      </AnimatePresence>
      {isNerd && <StatsHUD />}
      {showResume && <ResumeSection onClose={() => setShowResume(false)} />}
      {isNerd && <Terminal onCommand={handleCommand} />}
    </div>
  )
}

export default App
