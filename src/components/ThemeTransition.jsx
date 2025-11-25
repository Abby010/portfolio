import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useParticles } from '../context/ParticleContext'

export default function ThemeTransition() {
  const canvasRef = useRef(null)
  const { isTransitioning, currentTheme, completeTransition } = useTheme()
  const { getParticles } = useParticles()
  const [phase, setPhase] = useState('idle') // idle, spiral, burst, fall, complete
  
  useEffect(() => {
    if (!isTransitioning) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const maxRadius = Math.sqrt(centerX ** 2 + centerY ** 2) * 1.5
    
    // Get ACTUAL particles from ParticleNetwork
    const actualParticles = getParticles()
    const transitionParticles = []
    
    // Clone current particle positions
    actualParticles.forEach((p) => {
      const dx = p.x - centerX
      const dy = p.y - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx)
      
      transitionParticles.push({
        x: p.x,
        y: p.y,
        originalX: p.x,
        originalY: p.y,
        angle: angle,
        distance: distance,
        spiralSpeed: 0.15 + Math.random() * 0.15,
        currentRadius: distance,
        targetRadius: 30 + Math.random() * 40, // Converge to center area
        blastSpeed: 0,
        blastAngle: 0,
        opacity: 1,
        size: 2.5 + Math.random() * 2,
        trailPoints: [],
      })
    })
    
    let animationFrame
    let startTime = Date.now()
    const spiralDuration = 600 // ms to spiral in - faster
    const burstDuration = 200 // ms for explosive burst - faster
    // const fallDuration = 2500 // ms for particles to fall and fade - COMMENTED OUT
    
    // Theme is already switched when animation starts
    // currentTheme is the NEW theme, oldTheme is the opposite
    const newTheme = currentTheme // Already switched!
    const oldTheme = currentTheme === 'dark' ? 'light' : 'dark'
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      
      // Background fade during transition - use old theme during spiral/burst (faster fade)
      const bgAlpha = Math.min(elapsed / 200, 0.3) // Faster fade, less opacity
      // Always use oldTheme for canvas overlay (new theme is already visible behind canvas)
      const themeToUse = oldTheme
      
      if (themeToUse === 'dark') {
        ctx.fillStyle = `rgba(0, 0, 0, ${bgAlpha})`
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${bgAlpha})`
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Phase 1: Spiral to center (0-1000ms)
      if (elapsed < spiralDuration) {
        setPhase('spiral')
        const progress = elapsed / spiralDuration
        const easeProgress = 1 - Math.pow(1 - progress, 3) // Ease out cubic
        
        transitionParticles.forEach((particle, index) => {
          // Spiral motion - accelerating spin
          const spinMultiplier = 1 + progress * 5 // Speed up over time
          particle.angle += particle.spiralSpeed * spinMultiplier
          
          // Shrink radius towards center
          particle.currentRadius = particle.distance * (1 - easeProgress) + particle.targetRadius * easeProgress
          
          const prevX = particle.x
          const prevY = particle.y
          
          particle.x = centerX + Math.cos(particle.angle) * particle.currentRadius
          particle.y = centerY + Math.sin(particle.angle) * particle.currentRadius
          
          // Store trail points (reduced for performance)
          particle.trailPoints.push({ x: prevX, y: prevY, opacity: 0.3 })
          if (particle.trailPoints.length > 4) particle.trailPoints.shift() // Reduced from 8 to 4
          
          // Draw motion trails (only every 3rd particle for performance)
          if (index % 3 === 0 && particle.trailPoints.length > 1) {
            ctx.beginPath()
            ctx.moveTo(particle.trailPoints[0].x, particle.trailPoints[0].y)
            for (let i = 1; i < particle.trailPoints.length; i++) {
              ctx.lineTo(particle.trailPoints[i].x, particle.trailPoints[i].y)
            }
            ctx.lineTo(particle.x, particle.y)
            
            if (oldTheme === 'dark') {
              ctx.strokeStyle = `rgba(96, 165, 250, ${0.4 * (1 - progress * 0.5)})`
            } else {
              ctx.strokeStyle = `rgba(37, 99, 235, ${0.5 * (1 - progress * 0.5)})`
            }
            ctx.lineWidth = 1.5
            ctx.stroke()
          }
          
          // Draw particle with growing intensity
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * (1 + progress * 0.5), 0, Math.PI * 2)
          
          if (oldTheme === 'dark') {
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`
            ctx.shadowBlur = 15 + progress * 20
            ctx.shadowColor = `rgba(147, 197, 253, ${0.8 + progress * 0.2})`
          } else {
            ctx.fillStyle = `rgba(37, 99, 235, ${particle.opacity})`
            ctx.shadowBlur = 12 + progress * 15
            ctx.shadowColor = `rgba(59, 130, 246, ${0.7 + progress * 0.3})`
          }
          
          ctx.fill()
          ctx.shadowBlur = 0
          
          // Draw spiral rings for visual drama (reduced frequency for performance)
          if (index % 30 === 0 && particle.currentRadius > 100) {
            ctx.beginPath()
            ctx.arc(centerX, centerY, particle.currentRadius, 0, Math.PI * 2)
            if (oldTheme === 'dark') {
              ctx.strokeStyle = `rgba(147, 51, 234, ${0.15 * (1 - progress)})`
            } else {
              ctx.strokeStyle = `rgba(124, 58, 237, ${0.25 * (1 - progress)})`
            }
            ctx.lineWidth = 2
            ctx.stroke()
          }
        })
        
        // Center vortex glow
        const vortexGradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, 150 * (1 - progress)
        )
        if (oldTheme === 'dark') {
          vortexGradient.addColorStop(0, `rgba(147, 197, 253, ${0.3 * progress})`)
          vortexGradient.addColorStop(0.5, `rgba(96, 165, 250, ${0.15 * progress})`)
          vortexGradient.addColorStop(1, 'rgba(59, 130, 246, 0)')
        } else {
          vortexGradient.addColorStop(0, `rgba(59, 130, 246, ${0.4 * progress})`)
          vortexGradient.addColorStop(0.5, `rgba(37, 99, 235, ${0.2 * progress})`)
          vortexGradient.addColorStop(1, 'rgba(29, 78, 216, 0)')
        }
        ctx.fillStyle = vortexGradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        animationFrame = requestAnimationFrame(animate)
      }
      // Phase 1.5: Explosive Burst (1000-1300ms)
      else if (elapsed < spiralDuration + burstDuration) {
        if (phase !== 'burst') {
          setPhase('burst')
          
          // Initialize particles for explosive burst from center
          transitionParticles.forEach(particle => {
            particle.blastAngle = Math.random() * Math.PI * 2
            particle.velocityX = Math.cos(particle.blastAngle) * (30 + Math.random() * 50)
            particle.velocityY = Math.sin(particle.blastAngle) * (30 + Math.random() * 50)
            particle.x = centerX
            particle.y = centerY
            particle.gravity = 0
          })
        }
        
        const burstProgress = (elapsed - spiralDuration) / burstDuration
        
        // Clear with fade - use OLD theme colors during burst
        if (oldTheme === 'light') {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
        } else {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        // Explosive burst - particles fly out rapidly
        transitionParticles.forEach(particle => {
          particle.x += particle.velocityX
          particle.y += particle.velocityY
          
          // Draw particle with OLD theme colors during burst
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * (1.5 + Math.random() * 0.5), 0, Math.PI * 2)
          
          if (oldTheme === 'light') {
            ctx.fillStyle = `rgba(59, 130, 246, ${0.9})`
            ctx.shadowBlur = 20
            ctx.shadowColor = 'rgba(96, 165, 250, 0.8)'
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${0.9})`
            ctx.shadowBlur = 20
            ctx.shadowColor = 'rgba(255, 255, 255, 0.8)'
          }
          
          ctx.fill()
          ctx.shadowBlur = 0
        })
        
        // Intense center flash with OLD theme colors during burst
        const flashSize = maxRadius * 2 * burstProgress
        const flashGradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, flashSize
        )
        
        if (oldTheme === 'light') {
          flashGradient.addColorStop(0, `rgba(255, 255, 255, ${0.9 * (1 - burstProgress)})`)
          flashGradient.addColorStop(0.4, `rgba(147, 197, 253, ${0.7 * (1 - burstProgress)})`)
          flashGradient.addColorStop(0.7, `rgba(96, 165, 250, ${0.4 * (1 - burstProgress)})`)
          flashGradient.addColorStop(1, 'rgba(59, 130, 246, 0)')
        } else {
          flashGradient.addColorStop(0, `rgba(0, 0, 0, ${0.9 * (1 - burstProgress)})`)
          flashGradient.addColorStop(0.4, `rgba(30, 58, 138, ${0.7 * (1 - burstProgress)})`)
          flashGradient.addColorStop(0.7, `rgba(29, 78, 216, ${0.4 * (1 - burstProgress)})`)
          flashGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        }
        
        ctx.fillStyle = flashGradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        animationFrame = requestAnimationFrame(animate)
      }
      // Phase 2: Particle Dropping - COMMENTED OUT
      // else if (elapsed < spiralDuration + burstDuration + fallDuration) {
      //   // New theme appears now - mark it
      //   if (!showNewTheme) {
      //     showNewTheme = true
      //   }
      //   
      //   if (phase !== 'fall') {
      //     setPhase('fall')
      //     // Initialize gravity for falling
      //     transitionParticles.forEach(particle => {
      //       particle.gravity = 0.5 + Math.random() * 0.3
      //     })
      //   }
      //   
      //   const fallProgress = (elapsed - spiralDuration - burstDuration) / fallDuration
      //   
      //   // Clear with minimal fade for trail effect - use NEW theme colors
      //   if (newTheme === 'light') {
      //     ctx.fillStyle = 'rgba(255, 255, 255, 0.08)'
      //   } else {
      //     ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      //   }
      //   ctx.fillRect(0, 0, canvas.width, canvas.height)
      //   
      //   // Apply gravity and draw falling particles
      //   transitionParticles.forEach(particle => {
      //     // Apply gravity
      //     particle.velocityY += particle.gravity
      //     particle.velocityX *= 0.98 // Slight air resistance
      //     
      //     // Update position
      //     particle.x += particle.velocityX
      //     particle.y += particle.velocityY
      //     
      //     // Fade out towards end
      //     particle.opacity = Math.max(0, 1 - fallProgress)
      //     
      //     // Draw particle with motion trails - use NEW theme colors
      //     ctx.beginPath()
      //     ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      //     
      //     if (newTheme === 'light') {
      //       ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity * 0.8})`
      //       ctx.shadowBlur = 12
      //       ctx.shadowColor = `rgba(96, 165, 250, ${particle.opacity * 0.6})`
      //     } else {
      //       ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.8})`
      //       ctx.shadowBlur = 12
      //       ctx.shadowColor = `rgba(255, 255, 255, ${particle.opacity * 0.6})`
      //     }
      //     
      //     ctx.fill()
      //     ctx.shadowBlur = 0
      //   })
      //   
      //   animationFrame = requestAnimationFrame(animate)
      // }
      // Phase 2: Complete - Clear canvas and show new theme immediately after burst
      else {
        // Always clear and complete, don't check phase to avoid getting stuck
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
          animationFrame = null
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        // End the transition immediately (theme was already switched when toggle was clicked)
        completeTransition()
        return // Exit animation loop
      }
    }
    
    animate()
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      // Ensure transition completes if component unmounts
      if (isTransitioning) {
        completeTransition()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTransitioning])
  
  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 9999 }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

