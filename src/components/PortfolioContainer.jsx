import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import RainBackground from './RainBackground'

const SECTIONS = [
  {
    id: 0,
    title: "Software Engineer",
    color: "text-blue-900"
  },
  {
    id: 1,
    title: "Education",
    color: "text-blue-900"
  },
  {
    id: 2,
    title: "Experience",
    color: "text-blue-900"
  },
  {
    id: 3,
    title: "Community & Volunteering",
    color: "text-blue-900"
  },
  {
    id: 4,
    title: "Projects",
    color: "text-blue-900"
  }
]

function PortfolioContainer() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isWiping, setIsWiping] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [blinkVisible, setBlinkVisible] = useState(true)
  const [fogOpacity, setFogOpacity] = useState(0)
  const [progress, setProgress] = useState(0) // 0 to 1 over 15s

  const rainRef = useRef(null)
  const startTimeRef = useRef(Date.now())
  const animationFrameRef = useRef()

  const currentSection = SECTIONS[currentIndex]

  // Handle wiper animation and text switching
  const handleWipe = async () => {
    setIsWiping(true)

    // Wait 900ms for wiper to reach center
    await new Promise(resolve => setTimeout(resolve, 900))

    // INSTANT CLEAN: Reset fog, progress, and clear droplets
    setFogOpacity(0)
    setProgress(0)
    startTimeRef.current = Date.now() // Reset timer
    if (rainRef.current) {
      rainRef.current.clearDroplets()
    }

    // Switch the text while wiper is covering it
    setCurrentIndex((prevIndex) => (prevIndex + 1) % SECTIONS.length)

    // Wait 900ms for wiper to finish moving right
    await new Promise(resolve => setTimeout(resolve, 900))

    setIsWiping(false)
  }

  // Timer Logic: Fog (0-1) and Progress (0-1) over 15s
  useEffect(() => {
    const updateTimer = () => {
      if (isHovering || isWiping) {
        // Pause timer if hovering
        startTimeRef.current = Date.now() - (progress * 15000)
      } else {
        const elapsed = Date.now() - startTimeRef.current
        const newProgress = Math.min(elapsed / 15000, 1)

        setProgress(newProgress)
        setFogOpacity(newProgress) // Fog matches progress
      }
      animationFrameRef.current = requestAnimationFrame(updateTimer)
    }

    animationFrameRef.current = requestAnimationFrame(updateTimer)

    return () => cancelAnimationFrame(animationFrameRef.current)
  }, [isHovering, isWiping, progress])

  // Auto-rotate sections every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        console.log("Tick") // Debug log
        handleWipe()
      } else {
        console.log("Paused - hovering")
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [isHovering])

  // Blinking cursor effect for terminal
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkVisible(prev => !prev)
    }, 530)

    return () => clearInterval(blinkInterval)
  }, [])

  // Helper to determine if a card should glow based on progress
  const getCardGlowClass = (index) => {
    // 4 cards, split 15s into 4 chunks (0-0.25, 0.25-0.5, etc.)
    const start = index * 0.25
    const end = (index + 1) * 0.25

    // If progress is within this card's window
    if (progress >= start && progress < end) {
      return "shadow-[0_0_30px_rgba(34,211,238,0.6)] border-cyan-300 scale-105 bg-white/60"
    }
    return "shadow-sm border-white/50 scale-100 bg-white/40"
  }

  // Render layouts based on current index
  const renderContent = () => {
    switch (currentIndex) {
      case 0: // Profile - Flex Row
        return (
          <div className="flex flex-row items-center gap-10 w-full">
            {/* Left: Profile Picture */}
            <div className="flex-shrink-0">
              <img
                src="https://placehold.co/400x400/22d3ee/1e293b?text=Profile+Pic"
                alt="Abby Profile"
                className="w-56 h-56 rounded-2xl object-cover shadow-lg flex-shrink-0"
              />
            </div>

            {/* Right: Bio + Social Icons */}
            <div className="flex-1 text-left space-y-6">
              <h1 className={`${currentSection.color} text-4xl md:text-5xl font-bold`}>
                Software Engineer
              </h1>
              <p className="text-slate-800 text-lg leading-relaxed">
                Full-Stack Engineer specialized in Cloud (AWS/Pulumi) & Mobile.
                I build systems that generate revenue and reduce debug time.
              </p>

              {/* Social Icons Inline */}
              <div className="flex items-center gap-4 pt-4">
                <a
                  href="https://github.com/Abby010"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-800 hover:text-blue-900 transition-colors duration-300 bg-white/50 px-4 py-2 rounded-full border border-white/20 shadow-sm"
                >
                  <Github size={20} />
                  <span className="text-sm">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-800 hover:text-blue-900 transition-colors duration-300 bg-white/50 px-4 py-2 rounded-full border border-white/20 shadow-sm"
                >
                  <Linkedin size={20} />
                  <span className="text-sm">LinkedIn</span>
                </a>
                <a
                  href="mailto:your.email@example.com"
                  className="flex items-center gap-2 text-slate-800 hover:text-blue-900 transition-colors duration-300 bg-white/50 px-4 py-2 rounded-full border border-white/20 shadow-sm"
                >
                  <Mail size={20} />
                  <span className="text-sm">Email</span>
                </a>
              </div>
            </div>
          </div>
        )

      case 1: // Education - Split Image Header
        return (
          <div className="w-full space-y-8">
            <h1 className={`${currentSection.color} text-4xl font-bold text-center mb-6`}>
              Education
            </h1>

            {/* Top: Two Images Side by Side */}
            <div className="grid grid-cols-2 gap-4 h-48 w-full mb-6">
              <div className="overflow-hidden rounded-lg h-full">
                <img
                  src="https://placehold.co/600x400/3b82f6/1e293b?text=Award+Moment"
                  alt="Taking Award"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="overflow-hidden rounded-lg h-full">
                <img
                  src="https://placehold.co/600x400/3b82f6/1e293b?text=Team+Photo"
                  alt="SafetyCulture Team"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Bottom: Stats in 2-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-white/40 rounded-xl p-6 border border-white/50 shadow-sm">
                <div className="text-5xl font-bold text-blue-900 mb-2">92.5%</div>
                <div className="text-slate-800 font-semibold text-lg">WAM Score</div>
                <div className="text-slate-600 text-sm mt-1">Top 5% of Cohort</div>
              </div>
              <div className="bg-white/40 rounded-xl p-6 border border-white/50 shadow-sm">
                <div className="text-3xl font-bold text-blue-900 mb-2">Dean's Scholar</div>
                <div className="text-slate-800 font-semibold text-lg">Bachelor of Computer Science</div>
                <div className="text-slate-600 text-sm mt-1">University of Wollongong</div>
              </div>
              <div className="bg-white/40 rounded-xl p-6 border border-white/50 shadow-sm md:col-span-2">
                <div className="text-2xl font-bold text-blue-900 mb-2">🏆 Academic Excellence Award</div>
                <div className="text-slate-800 font-semibold">Human-Computer Interaction</div>
                <div className="text-slate-600 text-sm mt-1">Top of class in HCI design and research</div>
              </div>
            </div>
          </div>
        )

      case 2: // Experience - Electric Zig-Zag
        return (
          <div className="w-full relative">
            <h1 className={`${currentSection.color} text-4xl font-bold text-center mb-8`}>
              Experience
            </h1>

            {/* SVG Wire Container */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <svg className="w-full h-full" preserveAspectRatio="none">
                {/* 
                  Path Logic:
                  Start: 25% x, 12% y (Center of Card 1)
                  Point 2: 75% x, 37% y (Center of Card 2)
                  Point 3: 25% x, 62% y (Center of Card 3)
                  End: 75% x, 87% y (Center of Card 4)
                  (Approximate percentages based on 4 items stacked vertically)
                */}
                <defs>
                  <path id="wirePath" d="M 25% 12% L 75% 37% L 25% 62% L 75% 87%" />
                </defs>

                {/* Base Line (Dashed) */}
                <path
                  d="M 25% 12% L 75% 37% L 25% 62% L 75% 87%"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                />

                {/* Active Spark Line */}
                <path
                  d="M 25% 12% L 75% 37% L 25% 62% L 75% 87%"
                  fill="none"
                  stroke="#22d3ee" // Cyan-300
                  strokeWidth="4"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset={1 - progress} // Draws from 1 to 0
                  className="drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                />
              </svg>
            </div>

            {/* Zig-Zag Stack */}
            <div className="flex flex-col gap-6 relative z-10">

              {/* Item 1 (Left) */}
              <div className={`w-[45%] self-start flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${getCardGlowClass(0)}`}>
                <div className="flex-1 text-left">
                  <h3 className="text-blue-900 font-bold text-lg">Matrix AI</h3>
                  <p className="text-slate-700 text-xs font-medium">Software Engineer</p>
                </div>
                <img
                  src="https://placehold.co/100x100/2563eb/white?text=Matrix"
                  alt="Matrix AI"
                  className="w-12 h-12 rounded-md object-contain flex-shrink-0"
                />
              </div>

              {/* Item 2 (Right) */}
              <div className={`w-[45%] self-end flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${getCardGlowClass(1)}`}>
                <img
                  src="https://placehold.co/100x100/0ea5e9/white?text=SC"
                  alt="SafetyCulture"
                  className="w-12 h-12 rounded-md object-contain flex-shrink-0"
                />
                <div className="flex-1 text-left">
                  <h3 className="text-blue-900 font-bold text-lg">SafetyCulture</h3>
                  <p className="text-slate-700 text-xs font-medium">Mobile Intern</p>
                </div>
              </div>

              {/* Item 3 (Left) */}
              <div className={`w-[45%] self-start flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${getCardGlowClass(2)}`}>
                <div className="flex-1 text-left">
                  <h3 className="text-blue-900 font-bold text-lg">Geo Pulse</h3>
                  <p className="text-slate-700 text-xs font-medium">Team Lead</p>
                </div>
                <img
                  src="https://placehold.co/100x100/06b6d4/white?text=Pulse"
                  alt="Geo Pulse"
                  className="w-12 h-12 rounded-md object-contain flex-shrink-0"
                />
              </div>

              {/* Item 4 (Right) */}
              <div className={`w-[45%] self-end flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${getCardGlowClass(3)}`}>
                <img
                  src="https://placehold.co/100x100/0891b2/white?text=UOW"
                  alt="UOW"
                  className="w-12 h-12 rounded-md object-contain flex-shrink-0"
                />
                <div className="flex-1 text-left">
                  <h3 className="text-blue-900 font-bold text-lg">UOW</h3>
                  <p className="text-slate-700 text-xs font-medium">C++ Tutor</p>
                </div>
              </div>

            </div>
          </div>
        )

      case 3: // Volunteering - Gallery Layout
        return (
          <div className="w-full space-y-8">
            <h1 className={`${currentSection.color} text-4xl font-bold text-center mb-6`}>
              Community & Volunteering
            </h1>

            {/* Top: 3 Portrait Images */}
            <div className="grid grid-cols-3 gap-4">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://placehold.co/150x200/10b981/1e293b?text=Vol+1"
                  alt="Video Game Society"
                  className="h-32 w-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://placehold.co/150x200/14b8a6/1e293b?text=Vol+2"
                  alt="Engineering Mentor"
                  className="h-32 w-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://placehold.co/150x200/06b6d4/1e293b?text=Vol+3"
                  alt="UOW Pulse"
                  className="h-32 w-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Bottom: Text Descriptions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/40 rounded-xl p-5 border border-white/50 shadow-sm">
                <h3 className="text-blue-900 font-bold text-lg">Video Game Society</h3>
                <p className="text-slate-700 text-sm font-medium mt-1">Executive - Well-Being Officer</p>
                <p className="text-slate-600 text-sm mt-2">Fostering inclusive community for 200+ members</p>
              </div>
              <div className="bg-white/40 rounded-xl p-5 border border-white/50 shadow-sm">
                <h3 className="text-blue-900 font-bold text-lg">UOW Engineering</h3>
                <p className="text-slate-700 text-sm font-medium mt-1">Faculty Mentor</p>
                <p className="text-slate-600 text-sm mt-2">Guiding first-year engineering students</p>
              </div>
              <div className="bg-white/40 rounded-xl p-5 border border-white/50 shadow-sm">
                <h3 className="text-blue-900 font-bold text-lg">UOW Pulse</h3>
                <p className="text-slate-700 text-sm font-medium mt-1">Campus Volunteer</p>
                <p className="text-slate-600 text-sm mt-2">Supporting university events and culture</p>
              </div>
            </div>
          </div>
        )

      case 4: // Projects - Terminal Aesthetic
        return (
          <div className="w-full">
            <h1 className={`${currentSection.color} text-4xl font-bold text-center mb-8`}>
              Projects
            </h1>

            {/* Terminal Box */}
            <div className="bg-black/80 rounded-xl p-8 border-2 border-cyan-500/30 font-mono text-left shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-cyan-500/30">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-slate-400 text-sm">terminal — projects</span>
              </div>

              {/* Terminal Content */}
              <div className="space-y-2 text-cyan-300">
                <div className="flex items-center">
                  <span className="text-green-400">➜</span>
                  <span className="ml-2">~/portfolio/projects</span>
                </div>
                <div className="text-white">
                  <span className="text-cyan-400">$</span> ls -la
                </div>
                <div className="pl-4 text-slate-400">
                  <div>drwxr-xr-x  12 abby staff   384 Jan 15 2025 .</div>
                  <div>drwxr-xr-x   8 abby staff   256 Jan 14 2025 ..</div>
                </div>
                <div className="text-white pt-4">
                  <span className="text-cyan-400">$</span> npm run compile
                </div>
                <div className="pl-4 text-slate-300">
                  <div>&gt; Compiling latest projects...</div>
                  <div>&gt; Optimizing portfolio showcase...</div>
                  <div className="flex items-center mt-2">
                    <span>&gt; Status: Coming Soon</span>
                    {blinkVisible && <span className="ml-1 bg-cyan-400 w-2 h-5 inline-block"></span>}
                  </div>
                </div>
                <div className="text-slate-500 text-sm pt-6 italic">
                  // Featured projects will be deployed here soon
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-sky-200 via-blue-100 to-sky-300 flex items-center justify-center overflow-hidden">
      <RainBackground ref={rainRef} />

      {/* Wiper - Animated squeegee effect */}
      <motion.div
        className="absolute top-0 z-[100] h-[120vh] w-32 backdrop-blur-xl flex items-center justify-center"
        animate={isWiping ? { left: "120%" } : { left: "-20%" }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      >
        <div className="h-full w-2 bg-slate-800" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 px-4 md:px-8 w-full flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0, rotate: -2 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`relative overflow-hidden backdrop-blur-xl border border-white/50 rounded-2xl p-8 md:p-12 w-full max-w-5xl mx-auto min-h-[550px] shadow-xl font-mono transition-colors duration-300 flex items-center ${isHovering ? 'bg-white/40' : 'bg-white/30'
              }`}
          >
            {/* Fog Layer - Overlay that gets opaque over time */}
            <div
              className="absolute inset-0 z-20 pointer-events-none bg-white/20 backdrop-blur-[2px]"
              style={{ opacity: fogOpacity }}
            />

            {/* Content */}
            <div className="relative z-10 w-full">
              {renderContent()}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 h-1 bg-slate-800/50">
        <motion.div
          key={currentIndex}
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 15, ease: "linear" }}
        />
      </div>
    </div>
  )
}

export default PortfolioContainer
