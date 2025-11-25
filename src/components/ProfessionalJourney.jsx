import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function ProfessionalJourney() {
  const canvasRef = useRef(null)
  const [isLightning, setIsLightning] = useState(false)
  const { theme, currentTheme } = useTheme()

  // Thunder effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const drawLightning = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw the main path line
      ctx.beginPath()
      ctx.strokeStyle = currentTheme === 'dark' ? 'rgba(96, 165, 250, 0.3)' : 'rgba(37, 99, 235, 0.3)'
      ctx.lineWidth = 2
      ctx.setLineDash([10, 5])
      
      const centerX = canvas.width / 2
      const startY = 280
      const spacing = 608
      
      for (let i = 0; i < 3; i++) {
        const y = startY + (i * spacing)
        ctx.moveTo(centerX, y)
        ctx.lineTo(centerX, y + spacing)
      }
      ctx.stroke()
      ctx.setLineDash([])

      // Animated lightning bolt
      const time = Date.now() / 1000
      const shouldLightning = Math.sin(time * 2) > 0.9
      
      if (shouldLightning) {
        setIsLightning(true)
        ctx.strokeStyle = currentTheme === 'dark' ? 'rgba(96, 165, 250, 0.8)' : 'rgba(37, 99, 235, 0.8)'
        ctx.lineWidth = 3
        ctx.shadowBlur = 15
        ctx.shadowColor = currentTheme === 'dark' ? 'rgba(96, 165, 250, 1)' : 'rgba(37, 99, 235, 1)'
        
        ctx.beginPath()
        ctx.moveTo(centerX, startY)
        for (let i = 0; i < 4; i++) {
          const y = startY + (i * spacing)
          const offset = (Math.random() - 0.5) * 30
          ctx.lineTo(centerX + offset, y)
        }
        ctx.stroke()
        ctx.shadowBlur = 0
      } else {
        setIsLightning(false)
      }

      animationFrameId = requestAnimationFrame(drawLightning)
    }

    drawLightning()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [currentTheme])

  const experiences = [
    {
      year: 'July 2025 - December 2025',
      title: 'C++ Advanced Programming Tutor — CSCI251',
      company: 'University of Wollongong',
      location: 'Wollongong, NSW',
      points: [
        'Conducted code reviews and proof-read assignment submissions to ensure correctness, clarity, and adherence to C++ best practices',
        { text: 'Delivered bi-weekly tutorials for a cohort of ', highlight: '37', rest: ' students, supporting their understanding of advanced C++ concepts' },
        'Assisted with final exam marking, evaluating solutions for accuracy, logic, and implementation quality'
      ],
      logo: '/UOW LOGO.png'
    },
    {
      year: 'March 2025 - November 2025',
      title: 'Team Lead — GeoPulse (SafetyCulture × UOW Capstone)',
      company: 'SafetyCulture',
      location: 'Wollongong, NSW',
      points: [
        { text: 'Led a ', highlight: '5-member', rest: ' capstone project team, coordinating tasks, planning sprints, and maintaining delivery timelines' },
        'Performed code reviews, design reviews, and documentation reviews to ensure quality and consistency across the project',
        'Engaged with multiple stakeholders, managing expectations and presenting progress updates throughout the development cycle',
        { text: 'Achieved ', highlight: '2nd place', rest: ' out of ', highlight2: '40 groups', rest2: ', recognised for strong technical execution and effective team leadership' }
      ],
      logo: '/SC logo.webp'
    },
    {
      year: 'February 2025 - May 2025',
      title: 'Software Engineer (Infrastructure)',
      company: 'Matrix AI',
      location: 'Sydney, NSW',
      points: [
        'Designed a distributed tracing prototype with Jaeger and built a TUI-based visualizer (React Ink, TypeScript)',
        { text: 'Achieved ', highlight: '85%', rest: ' trace visibility and reduced debugging time by ', highlight2: '40%', rest2: ' through enhanced observability and debugging tools' },
        'Validated AWS infrastructure changes using Pulumi previews and automated tests to ensure safe deployments'
      ],
      logo: '/Matrix AI.png'
    },
    {
      year: 'December 2024 - February 2025',
      title: 'Software Engineer Intern',
      company: 'SafetyCulture',
      location: 'Sydney, NSW',
      points: [
        'Successfully integrated the Elcometer sensor into the Android and iOS app, enhancing functionality and increasing app usage',
        { text: 'Resulted in ', highlight: '350', rest: ' additional premium seats and ', highlight2: 'AUD 100K', rest2: ' in annual revenue' },
        'Actively participated in Code Care Week, effectively resolving multiple backlog tickets'
      ],
      logo: '/SC logo.webp'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen overflow-y-auto pt-20 sm:pt-32 pb-32 px-4 sm:px-6 relative"
    >
      {/* Canvas for lightning effect */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      <div className="max-w-6xl mx-auto relative pb-32" style={{ zIndex: 2 }}>
        {/* Timeline with nodes */}
        <div className="relative flex flex-col items-center space-y-32 sm:space-y-48 md:space-y-64 lg:space-y-72">
          {/* Upward Arrow at the top of timeline */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center mb-8"
          >
            <motion.svg 
              className={`w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 transition-all duration-300 ${
                currentTheme === 'dark'
                  ? isLightning 
                    ? 'text-blue-300 drop-shadow-[0_0_25px_rgba(96,165,250,1)]' 
                    : 'text-blue-400'
                  : isLightning 
                    ? 'text-blue-600 drop-shadow-[0_0_25px_rgba(37,99,235,1)]' 
                    : 'text-blue-700'
              }`}
              animate={isLightning ? {
                filter: [
                  'drop-shadow(0 0 25px rgba(96,165,250,1))',
                  'drop-shadow(0 0 35px rgba(96,165,250,1))',
                  'drop-shadow(0 0 25px rgba(96,165,250,1))'
                ]
              } : {}}
              transition={{ duration: 0.2, repeat: isLightning ? 2 : 0 }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth={isLightning ? 3.5 : 2.5}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M5 10l7-7m0 0l7 7m-7-7v18" 
              />
            </motion.svg>
            <motion.div 
              className={`w-2 h-12 sm:h-16 md:h-24 mt-2 transition-all duration-300 ${
                currentTheme === 'dark' 
                  ? 'bg-gradient-to-b from-blue-400 to-transparent' 
                  : 'bg-gradient-to-b from-blue-700 to-transparent'
              } ${
                isLightning ? (currentTheme === 'dark' ? 'shadow-[0_0_20px_rgba(96,165,250,1)]' : 'shadow-[0_0_20px_rgba(37,99,235,1)]') : ''
              }`}
              animate={isLightning ? {
                opacity: [0.8, 1, 0.8],
                scaleY: [1, 1.1, 1]
              } : {}}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="relative"
            >
              {/* Node Circle with Logo */}
              <div className={`w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 p-3 sm:p-4 md:p-5 overflow-hidden transition-all duration-300 ${
                currentTheme === 'dark' 
                  ? 'shadow-blue-500/50 border-blue-400/30' 
                  : 'shadow-blue-400/40 border-blue-500/40'
              }`}>
                <img 
                  src={exp.logo} 
                  alt={exp.company}
                  className="w-full h-full object-contain"
                  style={{ 
                    transform: exp.company === 'SafetyCulture' 
                      ? 'scale(2.25)' 
                      : exp.company === 'Matrix AI' 
                      ? 'scale(1.35)' 
                      : exp.company === 'University of Wollongong'
                      ? 'scale(1.26)'
                      : 'scale(1)' 
                  }}
                />
              </div>

              {/* Content Card */}
              <motion.div
                initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                className={`absolute top-0 ${index % 2 === 0 ? 'right-0 md:right-56' : 'left-0 md:left-56'} w-full max-w-[500px] mt-40 sm:mt-48 md:mt-0 px-4 md:px-0`}
              >
                <div className={`backdrop-blur-md rounded-xl p-4 sm:p-5 md:p-6 border transition-all duration-300 ${
                  currentTheme === 'dark'
                    ? 'bg-white/10 border-blue-500/30 hover:border-blue-400/50'
                    : 'bg-white/90 border-blue-400/40 hover:border-blue-600/60 shadow-lg'
                }`}>
                  <div className={`text-xs sm:text-sm font-bold mb-2 transition-colors duration-300 ${theme.accentBlue}`}>{exp.year}</div>
                  <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-1 transition-colors duration-300 ${theme.textPrimary}`}>{exp.title}</h3>
                  <p className={`font-semibold mb-1 text-sm sm:text-base transition-colors duration-300 ${theme.accentPurple}`}>{exp.company}</p>
                  <p className={`text-xs sm:text-sm mb-3 transition-colors duration-300 ${theme.textTertiary}`}>{exp.location}</p>
                  <ul className={`leading-relaxed space-y-1.5 sm:space-y-2 transition-colors duration-300 ${theme.textSecondary} text-sm sm:text-base`}>
                    {exp.points.map((point, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className={`mr-2 mt-1 transition-colors duration-300 ${theme.accentBlue}`}>•</span>
                        <span>
                          {typeof point === 'string' ? (
                            point
                          ) : (
                            <>
                              {point.text}
                              <span className={`font-bold transition-colors duration-300 ${theme.accentBlue}`}>{point.highlight}</span>
                              {point.rest}
                              <span className={`font-bold transition-colors duration-300 ${theme.accentBlue}`}>{point.highlight2}</span>
                              {point.rest2}
                            </>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
