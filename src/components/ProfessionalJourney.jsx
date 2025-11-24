import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const TIMELINE_DATA = [
  {
    id: 1,
    year: '2018-2019',
    title: 'Junior Designer',
    description: 'Developed foundational design principles and practices',
    image: 'https://placehold.co/300x200/2563eb/white?text=Junior+Designer',
    xPercent: 0.15,
    yOffset: 0,
  },
  {
    id: 2,
    year: '2019',
    title: 'Product Designer',
    description: 'Led product design initiatives and user experience improvements',
    image: 'https://placehold.co/300x200/0ea5e9/white?text=Product+Designer',
    xPercent: 0.4,
    yOffset: -50,
  },
  {
    id: 3,
    year: '2019-2022',
    title: 'Senior Product Designer',
    description: 'Led cross-functional teams and established design systems',
    image: 'https://placehold.co/300x200/06b6d4/white?text=Senior+Designer',
    xPercent: 0.65,
    yOffset: 0,
  },
  {
    id: 4,
    year: '2024',
    title: 'Lead UI/UX Designer',
    description: 'Leading design strategy and mentoring design teams',
    image: 'https://placehold.co/300x200/8b5cf6/white?text=Lead+Designer',
    xPercent: 0.9,
    yOffset: -50,
  },
]

export default function ProfessionalJourney() {
  const svgRef = useRef(null)
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 1200, height: 200 })

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: 200,
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId

    const resizeCanvas = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.offsetWidth
        canvas.height = 200
      }
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Lightning effect animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const svg = svgRef.current
      if (svg) {
        const path = svg.querySelector('path')
        if (path) {
          const pathLength = path.getTotalLength()
          const numBolts = 2
          
          for (let i = 0; i < numBolts; i++) {
            const offset = (Date.now() * 0.002 + i * 0.3) % 1
            const point = path.getPointAtLength(pathLength * offset)
            
            // Draw lightning bolt with glow
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)'
            ctx.lineWidth = 3
            ctx.shadowBlur = 15
            ctx.shadowColor = 'rgba(147, 197, 253, 1)'
            
            ctx.beginPath()
            
            // Create zigzag lightning pattern
            const segments = 8
            let currentX = point.x
            let currentY = point.y
            
            ctx.moveTo(currentX, currentY)
            
            for (let j = 0; j < segments; j++) {
              const angle = Math.atan2(
                path.getPointAtLength(pathLength * (offset + 0.01)).y - currentY,
                path.getPointAtLength(pathLength * (offset + 0.01)).x - currentX
              )
              const length = 12 + Math.random() * 8
              const nextX = currentX + Math.cos(angle) * length + (Math.random() - 0.5) * 15
              const nextY = currentY + Math.sin(angle) * length + (Math.random() - 0.5) * 10
              
              ctx.lineTo(nextX, nextY)
              currentX = nextX
              currentY = nextY
            }
            
            ctx.stroke()
            ctx.shadowBlur = 0
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [dimensions])

  // Create zigzag path based on node positions
  const createPath = () => {
    const baseY = 100
    const points = TIMELINE_DATA.map((item, index) => {
      const x = dimensions.width * item.xPercent
      const y = baseY + item.yOffset
      return { x, y }
    })

    if (points.length < 2) return ''

    let path = `M ${points[0].x} ${points[0].y}`
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`
    }
    return path
  }

  return (
    <div className="relative w-full py-20 px-6">
      <h2 className="text-5xl md:text-6xl font-black text-gray-900 text-center mb-20">
        PROFESSIONAL JOURNEY
      </h2>

      {/* SVG Path for timeline */}
      <div ref={containerRef} className="relative w-full h-64 mb-32">
        <svg
          ref={svgRef}
          className="absolute top-0 left-0 w-full h-full"
          style={{ overflow: 'visible' }}
        >
          <motion.path
            d={createPath()}
            fill="none"
            stroke="#93c5fd"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>

        {/* Lightning effect overlay */}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
        />

        {/* Timeline Nodes */}
        {TIMELINE_DATA.map((item, index) => {
          const baseY = 100
          const nodeY = baseY + item.yOffset
          
          return (
            <motion.div
              key={item.id}
              className="absolute"
              style={{
                left: `${item.xPercent * 100}%`,
                top: nodeY - 20,
                transform: 'translateX(-50%)',
                zIndex: 10,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.3, duration: 0.5 }}
            >
              {/* Node Circle with Image */}
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Year Label */}
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span className="text-sm font-bold text-gray-700 bg-white px-2 py-1 rounded shadow">
                    {item.year}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Content Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {TIMELINE_DATA.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 + 0.5, duration: 0.6 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {item.year}: {item.title}
              </h3>
              <p className="text-sm text-gray-600">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

