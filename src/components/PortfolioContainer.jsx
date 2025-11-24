import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import RainBackground from './RainBackground'

const SECTIONS = [
  {
    id: 0,
    title: "The Engineer",
    text: "I am Abby, a Computer Science graduate and creative problem solver. I build software that blends technical precision with human-centric design.",
    color: "text-cyan-300"
  },
  {
    id: 1,
    title: "The Scholar",
    text: "Dean's Scholar with a WAM of 88. Proven academic excellence in algorithms and data structures.",
    color: "text-blue-300"
  },
  {
    id: 2,
    title: "The Lead",
    text: "Capstone Team Lead & Former Tutor. Experience across two corporate internships, bridging the gap between theory and production code.",
    color: "text-sky-300"
  },
  {
    id: 3,
    title: "The Builder",
    text: "From full-stack applications to creative coding experiments. I turn complex logic into clean, usable interfaces.",
    color: "text-teal-300"
  }
]

function PortfolioContainer() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isWiping, setIsWiping] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  // Handle wiper animation and text switching
  const handleWipe = async () => {
    setIsWiping(true)

    // Wait 900ms for wiper to reach center
    await new Promise(resolve => setTimeout(resolve, 900))

    // Switch the text while wiper is covering it
    setCurrentIndex((prevIndex) => (prevIndex + 1) % SECTIONS.length)

    // Wait 900ms for wiper to finish moving right
    await new Promise(resolve => setTimeout(resolve, 900))

    setIsWiping(false)
  }

  // Auto-rotate sections every 8 seconds (pauses on hover)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        console.log("Switching!")
        handleWipe()
      } else {
        console.log("Paused - hovering")
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [isHovering])

  return (
    <div className="relative min-h-screen w-full bg-slate-900 flex items-center justify-center overflow-hidden">
      <RainBackground />

      {/* Wiper - Animated squeegee effect */}
      <motion.div
        className="absolute top-0 z-50 h-[120vh] w-32 backdrop-blur-xl flex items-center justify-center"
        animate={isWiping ? { left: "120%" } : { left: "-20%" }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      >
        <div className="h-full w-2 bg-slate-800" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0, rotate: -2 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`backdrop-blur-md border border-white/10 rounded-2xl p-12 max-w-2xl shadow-2xl text-center font-mono transition-colors duration-300 ${
              isHovering ? 'bg-slate-900/60' : 'bg-slate-900/40'
            }`}
          >
            <h1 className={`${SECTIONS[currentIndex].color} text-4xl md:text-5xl font-bold mb-4`}>
              {SECTIONS[currentIndex].title}
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              {SECTIONS[currentIndex].text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Social Links Footer */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="backdrop-blur-md bg-white/5 rounded-full px-6 py-3 border border-white/10 flex items-center gap-4">
          <a
            href="https://github.com/Abby010"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-cyan-300 transition-colors duration-300"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-cyan-300 transition-colors duration-300"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:your.email@example.com"
            className="text-white hover:text-cyan-300 transition-colors duration-300"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 h-1 bg-slate-800/50">
        <motion.div
          key={currentIndex}
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 8, ease: "linear" }}
        />
      </div>
    </div>
  )
}

export default PortfolioContainer
