import { useState } from 'react'
import { motion } from 'framer-motion'

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
    <div className="min-h-screen w-full bg-slate-900 flex items-center justify-center">
      <div className="text-center px-8">
        <h1 className="text-white font-sans text-4xl font-bold mb-4">
          {SECTIONS[currentIndex].title}
        </h1>
        <p className="text-white font-sans text-lg opacity-80">
          {SECTIONS[currentIndex].text}
        </p>
      </div>
    </div>
  )
}

export default PortfolioContainer
