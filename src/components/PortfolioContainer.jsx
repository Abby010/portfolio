import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'
import RainBackground from './RainBackground'

const SECTIONS = [
  {
    id: 0,
    title: "Software Engineer",
    color: "text-cyan-300",
    type: "profile",
    content: {
      description: "Full-Stack Engineer specialized in Cloud (AWS/Pulumi) & Mobile. I build systems that generate revenue and reduce debug time.",
      photo: "https://placehold.co/120x120/2563eb/white?text=Abby"
    }
  },
  {
    id: 1,
    title: "Education",
    color: "text-blue-300",
    type: "list",
    items: [
      {
        logo: "https://placehold.co/100x100/2563eb/white?text=UOW",
        title: "Bachelor of Computer Science",
        subtitle: "Dean's Scholar - UOW",
        description: "Graduated with distinction and academic excellence",
        link: "#"
      },
      {
        logo: "https://placehold.co/100x100/0ea5e9/white?text=92.5%",
        title: "WAM: 92.5%",
        subtitle: "Top 5% of Cohort",
        description: "Consistent high achievement across all subjects",
        link: "#"
      },
      {
        logo: "https://placehold.co/100x100/06b6d4/white?text=Award",
        title: "Academic Excellence Award",
        subtitle: "Human-Computer Interaction",
        description: "Top of class in HCI design and research",
        link: "#"
      }
    ]
  },
  {
    id: 2,
    title: "Experience",
    color: "text-sky-300",
    type: "grid",
    items: [
      {
        logo: "https://placehold.co/100x100/2563eb/white?text=Matrix",
        title: "Matrix AI",
        subtitle: "Software Engineer",
        description: "Reduced debug time by 40% via TUI Tracing",
        link: "#"
      },
      {
        logo: "https://placehold.co/100x100/0ea5e9/white?text=SC",
        title: "SafetyCulture",
        subtitle: "Mobile Intern",
        description: "Integrated sensors driving $100k+ revenue",
        link: "#"
      },
      {
        logo: "https://placehold.co/100x100/06b6d4/white?text=Pulse",
        title: "SafetyCulture x UOW",
        subtitle: "Team Lead - Geo Pulse",
        description: "Leading 5 devs on field-tracking tech",
        link: "#"
      },
      {
        logo: "https://placehold.co/100x100/0891b2/white?text=UOW",
        title: "UOW",
        subtitle: "C++ Tutor",
        description: "Mentoring students in low-level logic",
        link: "#"
      }
    ]
  },
  {
    id: 3,
    title: "Community & Volunteering",
    color: "text-teal-300",
    type: "list",
    items: [
      {
        logo: "https://placehold.co/100x100/2563eb/white?text=VGS",
        title: "Video Game Society",
        subtitle: "Executive - Well-Being Officer",
        description: "Fostering inclusive community for 200+ members",
        link: "#"
      },
      {
        logo: "https://placehold.co/100x100/0ea5e9/white?text=Eng",
        title: "UOW Engineering",
        subtitle: "Faculty Mentor",
        description: "Guiding first-year engineering students",
        link: "#"
      },
      {
        logo: "https://placehold.co/100x100/06b6d4/white?text=Pulse",
        title: "UOW Pulse",
        subtitle: "Campus Volunteer",
        description: "Supporting university events and culture",
        link: "#"
      }
    ]
  }
]

function PortfolioContainer() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isWiping, setIsWiping] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

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

  // Auto-rotate sections every 12 seconds (pauses on hover)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        console.log("Switching!")
        handleWipe()
      } else {
        console.log("Paused - hovering")
      }
    }, 12000)

    return () => clearInterval(interval)
  }, [isHovering])

  // Render Profile Section
  const renderProfile = () => (
    <div className="flex flex-col items-center gap-6">
      <img
        src={currentSection.content.photo}
        alt="Profile"
        className="w-32 h-32 rounded-full border-4 border-cyan-300/30 shadow-lg"
      />
      <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
        {currentSection.content.description}
      </p>
    </div>
  )

  // Render List Section
  const renderList = () => (
    <div className="space-y-4 w-full max-w-2xl">
      {currentSection.items.map((item, index) => (
        <a
          key={index}
          href={item.link}
          className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 border border-white/5 hover:border-white/10 transition-all duration-300 group"
        >
          <img
            src={item.logo}
            alt={item.title}
            className="w-16 h-16 rounded-lg flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
                <p className="text-cyan-300/80 text-sm font-medium">{item.subtitle}</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-300 transition-colors flex-shrink-0" />
            </div>
            <p className="text-slate-400 text-sm mt-2">{item.description}</p>
          </div>
        </a>
      ))}
    </div>
  )

  // Render Grid Section
  const renderGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
      {currentSection.items.map((item, index) => (
        <a
          key={index}
          href={item.link}
          className="flex flex-col gap-3 p-5 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 border border-white/5 hover:border-white/10 transition-all duration-300 group"
        >
          <div className="flex items-start justify-between">
            <img
              src={item.logo}
              alt={item.title}
              className="w-12 h-12 rounded-lg"
            />
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-300 transition-colors" />
          </div>
          <div>
            <h3 className="text-white font-bold text-base">{item.title}</h3>
            <p className="text-cyan-300/80 text-sm font-medium mt-1">{item.subtitle}</p>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
        </a>
      ))}
    </div>
  )

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
      <div className="relative z-10 px-8 w-full flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0, rotate: -2 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl text-center font-mono transition-colors duration-300 ${
              isHovering ? 'bg-slate-900/60' : 'bg-slate-900/40'
            }`}
          >
            <h1 className={`${currentSection.color} text-3xl md:text-4xl font-bold mb-8`}>
              {currentSection.title}
            </h1>

            <div className="flex justify-center">
              {currentSection.type === 'profile' && renderProfile()}
              {currentSection.type === 'list' && renderList()}
              {currentSection.type === 'grid' && renderGrid()}
            </div>
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
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-cyan-300 transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:your.email@example.com"
            className="text-white hover:text-cyan-300 transition-colors duration-300"
            aria-label="Email"
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
          transition={{ duration: 12, ease: "linear" }}
        />
      </div>
    </div>
  )
}

export default PortfolioContainer
