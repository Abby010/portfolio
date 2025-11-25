import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function Reading() {
  const canvasRef = useRef(null)
  const [isLightning, setIsLightning] = useState(false)
  const { theme, currentTheme } = useTheme()

  // Timeline effect
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

    const drawTimeline = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw the main timeline path
      ctx.beginPath()
      ctx.strokeStyle = currentTheme === 'dark' ? 'rgba(96, 165, 250, 0.3)' : 'rgba(37, 99, 235, 0.4)'
      ctx.lineWidth = 2
      ctx.setLineDash([10, 5])
      
      const centerX = canvas.width / 2
      const startY = 280
      const spacing = 600
      
      for (let i = 0; i < 5; i++) {
        const y = startY + (i * spacing)
        ctx.moveTo(centerX, y)
        ctx.lineTo(centerX, y + spacing)
      }
      ctx.stroke()
      ctx.setLineDash([])

      // Animated glow effect
      const time = Date.now() / 1000
      const shouldLightning = Math.sin(time * 2) > 0.9
      
      if (shouldLightning) {
        setIsLightning(true)
        ctx.strokeStyle = currentTheme === 'dark' ? 'rgba(96, 165, 250, 0.8)' : 'rgba(59, 130, 246, 0.9)'
        ctx.lineWidth = 3
        ctx.shadowBlur = 15
        ctx.shadowColor = currentTheme === 'dark' ? 'rgba(96, 165, 250, 1)' : 'rgba(59, 130, 246, 1)'
        
        ctx.beginPath()
        ctx.moveTo(centerX, startY)
        for (let i = 0; i < 6; i++) {
          const y = startY + (i * spacing)
          const offset = (Math.random() - 0.5) * 30
          ctx.lineTo(centerX + offset, y)
        }
        ctx.stroke()
        ctx.shadowBlur = 0
      } else {
        setIsLightning(false)
      }

      animationFrameId = requestAnimationFrame(drawTimeline)
    }

    drawTimeline()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [currentTheme])

  const books = [
    {
      title: 'The Making of a Manager',
      author: 'Julie Zhuo',
      quote: 'The transition from individual contributor to manager is a journey, not a destination. It requires a shift in mindset from "what can I do?" to "what can my team do?"',
      cover: '/TheMakingOfAManager.jpg',
      category: 'Leadership'
    },
    {
      title: 'Start with Why',
      author: 'Simon Sinek',
      quote: 'People don\'t buy what you do; they buy why you do it. And what you do simply proves what you believe.',
      cover: '/StartWithWhy.jpg',
      category: 'Leadership'
    },
    {
      title: 'The Monk Who Sold His Ferrari',
      author: 'Robin Sharma',
      quote: 'The purpose of life is a life of purpose.',
      cover: '/MOnkWhoSoldHisFerrari.jpg',
      category: 'Personal Growth'
    },
    {
      title: 'Deep Work',
      author: 'Cal Newport',
      quote: 'The ability to perform deep work is becoming increasingly rare at exactly the same time it is becoming increasingly valuable in our economy.',
      cover: '/DeepWork.jpg',
      category: 'Productivity'
    },
    {
      title: 'Atomic Habits',
      author: 'James Clear',
      quote: 'You do not rise to the level of your goals. You fall to the level of your systems.',
      cover: '/AtomicHabits.jpg',
      category: 'Personal Development'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen overflow-y-auto pt-20 sm:pt-32 pb-20 px-4 sm:px-6 relative"
    >
      {/* Canvas for timeline effect */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      <div className="max-w-7xl mx-auto relative pb-20" style={{ zIndex: 2 }}>
        {/* Timeline with book nodes */}
        <div className="relative flex flex-col items-center space-y-32 sm:space-y-48 md:space-y-64 lg:space-y-80">
          {/* Upward Arrow at the top of timeline */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center mb-8"
          >
            <motion.svg 
              className={`w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 transition-all duration-200 ${
                isLightning 
                  ? currentTheme === 'dark' 
                    ? 'text-blue-300 drop-shadow-[0_0_25px_rgba(96,165,250,1)]'
                    : 'text-blue-600 drop-shadow-[0_0_25px_rgba(59,130,246,1)]'
                  : currentTheme === 'dark' ? 'text-blue-400' : 'text-blue-500'
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
              className={`w-2 h-12 sm:h-16 md:h-24 mt-2 transition-all duration-200 ${
                currentTheme === 'dark' 
                  ? 'bg-gradient-to-b from-blue-400 to-transparent' 
                  : 'bg-gradient-to-b from-blue-500 to-transparent'
              } ${
                isLightning 
                  ? currentTheme === 'dark' 
                    ? 'shadow-[0_0_20px_rgba(96,165,250,1)]' 
                    : 'shadow-[0_0_20px_rgba(59,130,246,1)]'
                  : ''
              }`}
              animate={isLightning ? {
                opacity: [0.8, 1, 0.8],
                scaleY: [1, 1.1, 1]
              } : {}}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
          {books.map((book, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="relative"
            >
              {/* Book Cover Node */}
              <div className={`w-48 h-[280px] sm:w-64 sm:h-[360px] md:w-80 md:h-[450px] rounded-2xl flex items-center justify-center shadow-2xl border-4 p-2 sm:p-3 overflow-hidden ${
                currentTheme === 'dark'
                  ? 'bg-white shadow-blue-500/50 border-blue-400/30'
                  : 'bg-white shadow-blue-400/60 border-blue-500/50'
              }`}>
                <img 
                  src={book.cover} 
                  alt={book.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Book Details Card */}
              <motion.div
                initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                className={`absolute top-0 ${index % 2 === 0 ? 'right-0 md:right-96' : 'left-0 md:left-96'} w-full max-w-[1560px] mt-56 sm:mt-72 md:mt-0 px-4 md:px-0`}
              >
                <div className={`backdrop-blur-lg rounded-lg p-3 sm:p-4 md:p-5 border transition-all duration-300 shadow-lg ${
                  currentTheme === 'dark'
                    ? 'bg-white/20 border-blue-500/40 hover:border-blue-400/60'
                    : 'bg-white/95 border-gray-300 hover:border-blue-500'
                }`}>
                  <div className={`inline-block px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-bold mb-2 sm:mb-3 ${
                    currentTheme === 'dark'
                      ? 'bg-purple-500/40 text-purple-200'
                      : 'bg-purple-200 text-purple-800'
                  }`}>
                    {book.category}
                  </div>
                  <h3 className={`text-base sm:text-lg md:text-xl font-bold mb-2 drop-shadow-lg ${
                    currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{book.title}</h3>
                  <p className={`font-semibold mb-2 sm:mb-3 text-xs sm:text-sm drop-shadow-md ${
                    currentTheme === 'dark' ? 'text-blue-300' : 'text-blue-700'
                  }`}>by {book.author}</p>
                  
                  {/* Quote Section */}
                  <div className={`rounded-md p-2 sm:p-3 border-l-4 ${
                    currentTheme === 'dark'
                      ? 'bg-black/50 border-purple-400'
                      : 'bg-gray-100 border-purple-600'
                  }`}>
                    <p className={`text-xs sm:text-sm mb-1 sm:mb-2 italic font-semibold ${
                      currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>Quote:</p>
                    <p className={`leading-relaxed italic text-xs sm:text-sm ${
                      currentTheme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                    }`}>
                      "{book.quote}"
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="mt-2 sm:mt-3 flex items-center space-x-1">
                    <span className="text-yellow-400 text-sm sm:text-base">⭐⭐⭐⭐⭐</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

