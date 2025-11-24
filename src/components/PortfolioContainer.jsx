import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import RainBackground from './RainBackground'

const SECTIONS = [
  {
    id: 0,
    title: "Software Engineer",
    color: "text-cyan-300"
  },
  {
    id: 1,
    title: "Education",
    color: "text-blue-300"
  },
  {
    id: 2,
    title: "Experience",
    color: "text-sky-300"
  },
  {
    id: 3,
    title: "Community & Volunteering",
    color: "text-teal-300"
  },
  {
    id: 4,
    title: "Projects",
    color: "text-cyan-300"
  }
]

function PortfolioContainer() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isWiping, setIsWiping] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [blinkVisible, setBlinkVisible] = useState(true)

  const currentSection = SECTIONS[currentIndex]

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

  // Auto-rotate sections every 15 seconds (pauses on hover)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        console.log("Switching!")
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

  // Render layouts based on current index
  const renderContent = () => {
    switch (currentIndex) {
      case 0: // Profile - Two Columns
        return (
          <div className="flex flex-col md:flex-row items-center gap-8 w-full">
            {/* Left: Profile Picture */}
            <div className="flex-shrink-0">
              <img
                src="https://placehold.co/400x400/22d3ee/1e293b?text=Profile+Pic"
                alt="Abby Profile"
                className="w-64 h-64 rounded-2xl object-cover shadow-2xl border-2 border-cyan-300/20"
              />
            </div>

            {/* Right: Bio + Social Icons */}
            <div className="flex-1 text-left space-y-6">
              <h1 className={`${currentSection.color} text-4xl md:text-5xl font-bold`}>
                Software Engineer
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed">
                Full-Stack Engineer specialized in Cloud (AWS/Pulumi) & Mobile.
                I build systems that generate revenue and reduce debug time.
              </p>

              {/* Social Icons Inline */}
              <div className="flex items-center gap-4 pt-4">
                <a
                  href="https://github.com/Abby010"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white hover:text-cyan-300 transition-colors duration-300 bg-slate-800/50 px-4 py-2 rounded-full border border-white/10"
                >
                  <Github size={20} />
                  <span className="text-sm">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white hover:text-cyan-300 transition-colors duration-300 bg-slate-800/50 px-4 py-2 rounded-full border border-white/10"
                >
                  <Linkedin size={20} />
                  <span className="text-sm">LinkedIn</span>
                </a>
                <a
                  href="mailto:your.email@example.com"
                  className="flex items-center gap-2 text-white hover:text-cyan-300 transition-colors duration-300 bg-slate-800/50 px-4 py-2 rounded-full border border-white/10"
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
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-xl">
                <img
                  src="https://placehold.co/600x400/3b82f6/1e293b?text=Award+Moment"
                  alt="Taking Award"
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="overflow-hidden rounded-xl">
                <img
                  src="https://placehold.co/600x400/3b82f6/1e293b?text=Team+Photo"
                  alt="SafetyCulture Team"
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Bottom: Stats in 2-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-slate-800/30 rounded-xl p-6 border border-white/5">
                <div className="text-5xl font-bold text-cyan-300 mb-2">92.5%</div>
                <div className="text-white font-semibold text-lg">WAM Score</div>
                <div className="text-slate-400 text-sm mt-1">Top 5% of Cohort</div>
              </div>
              <div className="bg-slate-800/30 rounded-xl p-6 border border-white/5">
                <div className="text-3xl font-bold text-blue-300 mb-2">Dean's Scholar</div>
                <div className="text-white font-semibold text-lg">Bachelor of Computer Science</div>
                <div className="text-slate-400 text-sm mt-1">University of Wollongong</div>
              </div>
              <div className="bg-slate-800/30 rounded-xl p-6 border border-white/5 md:col-span-2">
                <div className="text-2xl font-bold text-sky-300 mb-2">🏆 Academic Excellence Award</div>
                <div className="text-white font-semibold">Human-Computer Interaction</div>
                <div className="text-slate-400 text-sm mt-1">Top of class in HCI design and research</div>
              </div>
            </div>
          </div>
        )

      case 2: // Experience - Zig-Zag Layout
        return (
          <div className="w-full space-y-6">
            <h1 className={`${currentSection.color} text-4xl font-bold text-center mb-8`}>
              Experience
            </h1>

            {/* Item 1: Text Left / Logo Right */}
            <div className="flex items-center gap-6 p-5 bg-slate-800/30 rounded-xl border border-white/5 hover:border-white/10 transition-all">
              <div className="flex-1 text-left">
                <h3 className="text-white font-bold text-xl">Matrix AI</h3>
                <p className="text-cyan-300 text-sm font-medium">Software Engineer</p>
                <p className="text-slate-400 text-sm mt-2">Reduced debug time by 40% via TUI Tracing</p>
              </div>
              <img
                src="https://placehold.co/100x100/2563eb/white?text=Matrix"
                alt="Matrix AI"
                className="w-16 h-16 rounded-lg flex-shrink-0"
              />
            </div>

            {/* Item 2: Logo Left / Text Right */}
            <div className="flex items-center gap-6 p-5 bg-slate-800/30 rounded-xl border border-white/5 hover:border-white/10 transition-all">
              <img
                src="https://placehold.co/100x100/0ea5e9/white?text=SC"
                alt="SafetyCulture"
                className="w-16 h-16 rounded-lg flex-shrink-0"
              />
              <div className="flex-1 text-left">
                <h3 className="text-white font-bold text-xl">SafetyCulture</h3>
                <p className="text-cyan-300 text-sm font-medium">Mobile Intern</p>
                <p className="text-slate-400 text-sm mt-2">Integrated sensors driving $100k+ revenue</p>
              </div>
            </div>

            {/* Item 3: Text Left / Logo Right */}
            <div className="flex items-center gap-6 p-5 bg-slate-800/30 rounded-xl border border-white/5 hover:border-white/10 transition-all">
              <div className="flex-1 text-left">
                <h3 className="text-white font-bold text-xl">SafetyCulture x UOW</h3>
                <p className="text-cyan-300 text-sm font-medium">Team Lead - Geo Pulse</p>
                <p className="text-slate-400 text-sm mt-2">Leading 5 devs on field-tracking tech</p>
              </div>
              <img
                src="https://placehold.co/100x100/06b6d4/white?text=Pulse"
                alt="Geo Pulse"
                className="w-16 h-16 rounded-lg flex-shrink-0"
              />
            </div>

            {/* Item 4: Logo Left / Text Right */}
            <div className="flex items-center gap-6 p-5 bg-slate-800/30 rounded-xl border border-white/5 hover:border-white/10 transition-all">
              <img
                src="https://placehold.co/100x100/0891b2/white?text=UOW"
                alt="UOW"
                className="w-16 h-16 rounded-lg flex-shrink-0"
              />
              <div className="flex-1 text-left">
                <h3 className="text-white font-bold text-xl">UOW</h3>
                <p className="text-cyan-300 text-sm font-medium">C++ Tutor</p>
                <p className="text-slate-400 text-sm mt-2">Mentoring students in low-level logic</p>
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
              <div className="overflow-hidden rounded-xl">
                <img
                  src="https://placehold.co/150x200/10b981/1e293b?text=Vol+1"
                  alt="Video Game Society"
                  className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="overflow-hidden rounded-xl">
                <img
                  src="https://placehold.co/150x200/14b8a6/1e293b?text=Vol+2"
                  alt="Engineering Mentor"
                  className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="overflow-hidden rounded-xl">
                <img
                  src="https://placehold.co/150x200/06b6d4/1e293b?text=Vol+3"
                  alt="UOW Pulse"
                  className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Bottom: Text Descriptions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/30 rounded-xl p-5 border border-white/5">
                <h3 className="text-white font-bold text-lg">Video Game Society</h3>
                <p className="text-teal-300 text-sm font-medium mt-1">Executive - Well-Being Officer</p>
                <p className="text-slate-400 text-sm mt-2">Fostering inclusive community for 200+ members</p>
              </div>
              <div className="bg-slate-800/30 rounded-xl p-5 border border-white/5">
                <h3 className="text-white font-bold text-lg">UOW Engineering</h3>
                <p className="text-teal-300 text-sm font-medium mt-1">Faculty Mentor</p>
                <p className="text-slate-400 text-sm mt-2">Guiding first-year engineering students</p>
              </div>
              <div className="bg-slate-800/30 rounded-xl p-5 border border-white/5">
                <h3 className="text-white font-bold text-lg">UOW Pulse</h3>
                <p className="text-teal-300 text-sm font-medium mt-1">Campus Volunteer</p>
                <p className="text-slate-400 text-sm mt-2">Supporting university events and culture</p>
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
            className={`backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 w-full max-w-5xl min-h-[550px] shadow-2xl font-mono transition-colors duration-300 flex items-center ${
              isHovering ? 'bg-slate-900/60' : 'bg-slate-900/40'
            }`}
          >
            {renderContent()}
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
