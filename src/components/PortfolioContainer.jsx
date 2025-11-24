import { useState } from 'react'
import { motion } from 'framer-motion'
import RainBackground from './RainBackground'

const SECTIONS = [
  {
    id: 0,
    title: "The Engineer",
    text: "I am Abby, a Computer Science graduate and creative problem solver. I build software that blends technical precision with human-centric design."
  },
  {
    id: 1,
    title: "The Scholar",
    text: "Dean's Scholar with a WAM of 88. Proven academic excellence in algorithms and data structures."
  },
  {
    id: 2,
    title: "The Lead",
    text: "Capstone Team Lead & Former Tutor. Experience across two corporate internships, bridging the gap between theory and production code."
  },
  {
    id: 3,
    title: "The Builder",
    text: "From full-stack applications to creative coding experiments. I turn complex logic into clean, usable interfaces."
  }
]

function PortfolioContainer() {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className="relative min-h-screen w-full bg-slate-900 flex items-center justify-center">
      <RainBackground />

      {/* Wiper - Hidden off-screen, ready to animate */}
      <motion.div
        className="absolute -left-40 top-0 z-50 h-[120vh] w-32 backdrop-blur-xl flex items-center justify-center"
      >
        <div className="h-full w-2 bg-slate-800" />
      </motion.div>

      <div className="relative z-10 px-8">
        <div className="backdrop-blur-md bg-slate-900/40 border border-white/10 rounded-2xl p-12 max-w-2xl shadow-2xl text-center font-mono">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            {SECTIONS[currentIndex].title}
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            {SECTIONS[currentIndex].text}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PortfolioContainer
