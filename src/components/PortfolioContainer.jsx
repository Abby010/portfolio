import { useState, useRef, useEffect } from 'react'
import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUpRight, MapPin, Calendar } from 'lucide-react'

// --- Spotlight Component ---
function Spotlight({ children, className = "" }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      className={`group relative border border-white/10 bg-white/5 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  )
}

// --- Data ---
const EXPERIENCE = [
  {
    id: 1,
    company: "Matrix AI",
    role: "Software Engineer",
    period: "2023 - Present",
    logo: "https://logo.clearbit.com/matrix.ai",
    desc: "Building scalable cloud infrastructure and AI-driven solutions.",
    tags: ["AWS", "Python", "React"]
  },
  {
    id: 2,
    company: "SafetyCulture",
    role: "Mobile Intern",
    period: "2022 - 2023",
    logo: "https://logo.clearbit.com/safetyculture.com",
    desc: "Optimized mobile app performance and reduced crash rates by 15%.",
    tags: ["Kotlin", "Swift", "React Native"]
  },
  {
    id: 3,
    company: "UOW",
    role: "C++ Tutor",
    period: "2021 - 2022",
    logo: "https://logo.clearbit.com/uow.edu.au",
    desc: "Mentored 100+ students in object-oriented programming and algorithms.",
    tags: ["C++", "Teaching"]
  }
]

const PROJECTS = [
  {
    id: 1,
    title: "Cloud Orchestrator",
    desc: "Automated infrastructure provisioning tool using Pulumi & AWS.",
    tags: ["Go", "AWS", "Pulumi"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "Geo Pulse",
    desc: "Real-time location tracking and analytics platform for logistics.",
    tags: ["React", "Node.js", "Socket.io"],
    color: "from-purple-500 to-pink-500"
  }
]

export default function PortfolioContainer() {
  const [activeTab, setActiveTab] = useState('all')

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">

      {/* --- Hero Section --- */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative z-10 max-w-4xl w-full space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-cyan-400 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Available for new opportunities
            </div>

            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-6">
              Building the future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                Cloud & Mobile.
              </span>
            </h1>

            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              I'm <span className="text-white font-semibold">Abhishek Mehta</span>. A Full-Stack Engineer specialized in building robust, scalable systems that drive business growth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex justify-center gap-6 pt-4"
          >
            <a href="https://github.com/Abby010" className="text-slate-400 hover:text-white transition-colors"><Github size={24} /></a>
            <a href="https://linkedin.com" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={24} /></a>
            <a href="mailto:email@example.com" className="text-slate-400 hover:text-white transition-colors"><Mail size={24} /></a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center p-2">
            <div className="w-1 h-1 bg-cyan-400 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* --- Bento Grid Section --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Experience & Projects</h2>
          <div className="h-1 w-20 bg-cyan-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">

          {/* Profile Card (Large) */}
          <Spotlight className="md:col-span-2 md:row-span-1 rounded-3xl p-8 flex flex-col justify-between bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-white">Abhishek Mehta</h3>
                <p className="text-cyan-400">Software Engineer</p>
              </div>
              <img
                src="https://placehold.co/400x400/22d3ee/1e293b?text=AM"
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-white/10"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-400">
                <MapPin size={18} />
                <span>Sydney, Australia</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Passionate about solving complex problems with clean, efficient code.
                Always learning, always building.
              </p>
            </div>
          </Spotlight>

          {/* Education Card */}
          <Spotlight className="md:col-span-1 md:row-span-1 rounded-3xl p-8 bg-slate-900 border-l-4 border-l-blue-500">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">UOW</h3>
                <p className="text-sm text-slate-400">Bachelor of Comp Sci</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-white">92.5%</div>
                <div className="text-sm text-slate-400 uppercase tracking-wider">WAM Score</div>
                <div className="inline-block bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded mt-2">Dean's Scholar</div>
              </div>
            </div>
          </Spotlight>

          {/* Experience Cards */}
          {EXPERIENCE.map((exp) => (
            <Spotlight key={exp.id} className="md:col-span-1 rounded-3xl p-6 bg-slate-900 group">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center overflow-hidden">
                  <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" />
                </div>
                <span className="text-xs text-slate-500 font-mono">{exp.period}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{exp.company}</h3>
              <p className="text-sm text-slate-400 mb-4">{exp.role}</p>
              <p className="text-sm text-slate-300 line-clamp-3 mb-4">{exp.desc}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {exp.tags.map(tag => (
                  <span key={tag} className="text-[10px] bg-white/5 px-2 py-1 rounded text-slate-400 border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </Spotlight>
          ))}

          {/* Project Cards */}
          {PROJECTS.map((project) => (
            <Spotlight key={project.id} className="md:col-span-1 rounded-3xl p-0 overflow-hidden group">
              <div className={`h-full w-full bg-gradient-to-br ${project.color} p-6 flex flex-col justify-between relative`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <ArrowUpRight className="text-white/70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <p className="text-white/90 text-sm mb-4">{project.desc}</p>
                </div>
                <div className="relative z-10 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] bg-black/20 backdrop-blur-md px-2 py-1 rounded text-white border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Spotlight>
          ))}

        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-12 text-center text-slate-600 text-sm">
        <p>© {new Date().getFullYear()} Abhishek Mehta. Built with React & Framer Motion.</p>
      </footer>
    </div>
  )
}
