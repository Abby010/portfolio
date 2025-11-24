import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function ContactPage() {
  const canvasRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: ''
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let rotation = 0

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create particles for the globe
    const particles = []
    const particleCount = 200
    const radius = 80

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      particles.push({ x, y, z, theta, phi })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      rotation += 0.01

      // Draw connecting lines first (behind particles)
      ctx.strokeStyle = 'rgba(147, 197, 253, 0.4)'
      ctx.lineWidth = 2

      // Line to contact info (left) - from right side of globe
      const leftCardX = centerX - 200
      ctx.beginPath()
      ctx.moveTo(centerX + radius * 0.7, centerY)
      ctx.lineTo(leftCardX, centerY)
      ctx.stroke()

      // Line to contact form (right) - from left side of globe
      const rightCardX = centerX + 200
      ctx.beginPath()
      ctx.moveTo(centerX - radius * 0.7, centerY)
      ctx.lineTo(rightCardX, centerY)
      ctx.stroke()

      // Draw particles
      particles.forEach(particle => {
        // Rotate around Y axis
        const cosY = Math.cos(rotation)
        const sinY = Math.sin(rotation)
        const x = particle.x * cosY - particle.z * sinY
        const z = particle.x * sinY + particle.z * cosY
        const y = particle.y

        // Rotate around X axis
        const cosX = Math.cos(rotation * 0.7)
        const sinX = Math.sin(rotation * 0.7)
        const finalY = y * cosX - z * sinX
        const finalZ = y * sinX + z * cosX

        // Project to 2D
        const scale = 200 / (200 + finalZ)
        const screenX = centerX + x * scale
        const screenY = centerY + finalY * scale

        // Draw particle with glow
        const alpha = (finalZ + radius) / (radius * 2)
        ctx.fillStyle = `rgba(147, 197, 253, ${alpha * 0.8 + 0.2})`
        ctx.shadowBlur = 10
        ctx.shadowColor = 'rgba(147, 197, 253, 0.8)'
        ctx.beginPath()
        ctx.arc(screenX, screenY, 2 * scale, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        // Draw connections between nearby particles
        particles.forEach(other => {
          if (particle === other) return
          const dx = x - (other.x * cosY - other.z * sinY)
          const dy = y - other.y
          const dz = finalZ - (other.x * sinY + other.z * cosY)
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (distance < 30) {
            const otherScale = 200 / (200 + (other.y * sinX + (other.x * sinY + other.z * cosY) * cosX))
            const otherScreenX = centerX + (other.x * cosY - other.z * sinY) * otherScale
            const otherScreenY = centerY + (other.y * cosX - (other.x * sinY + other.z * cosY) * sinX) * otherScale

            ctx.strokeStyle = `rgba(147, 197, 253, ${(1 - distance / 30) * 0.2})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(screenX, screenY)
            ctx.lineTo(otherScreenX, otherScreenY)
            ctx.stroke()
          }
        })
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="relative w-full min-h-screen py-20 px-6">
      <h2 className="text-5xl md:text-6xl font-black text-gray-900 text-center mb-20">
        GET IN TOUCH
      </h2>

      <div className="relative max-w-7xl mx-auto min-h-[600px] flex items-center justify-center">
        {/* Central Globe Canvas */}
        <div className="relative z-10">
          <canvas
            ref={canvasRef}
            className="w-64 h-64 md:w-80 md:h-80"
          />
        </div>

        {/* Contact Info Card (Left) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute left-0 md:left-10 top-1/2 transform -translate-y-1/2 w-64 md:w-72 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-gray-200/50 z-20"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span className="text-sm text-gray-700 uppercase">EMAIL.USAN@EXAMPLE.COM</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span className="text-sm text-gray-700 uppercase">PHONE (555) 123 4567</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span className="text-sm text-gray-700 uppercase">LOCATION NEW YORK, NY</span>
            </div>
          </div>
        </motion.div>

        {/* Contact Form Card (Right) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="absolute right-0 md:right-10 top-1/2 transform -translate-y-1/2 w-64 md:w-72 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-gray-200/50 z-20"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="NAME"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-gray-900 placeholder-gray-500"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="subject"
                placeholder="SUBJECT"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-gray-900 placeholder-gray-500"
                required
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="MESSAGE"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-gray-900 placeholder-gray-500 resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              SEND MESSAGE
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

