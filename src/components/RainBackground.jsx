import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

const RainBackground = forwardRef((props, ref) => {
  const canvasRef = useRef(null)
  const staticDropsRef = useRef([])

  useImperativeHandle(ref, () => ({
    clearDroplets: () => {
      staticDropsRef.current = []
    }
  }))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create rain drops
    const drops = []
    const dropCount = 120

    for (let i = 0; i < dropCount; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 3 + 2,
        length: Math.random() * 20 + 10
      })
    }

    // Animation loop
    let animationFrameId
    let frameCount = 0

    const animate = () => {
      frameCount++

      // Clear canvas to allow gradient background to show through
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 1. Draw Static Accumulating Droplets
      ctx.fillStyle = 'rgba(30, 58, 138, 0.3)'
      staticDropsRef.current.forEach(drop => {
        ctx.beginPath()
        ctx.arc(drop.x, drop.y, drop.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Add new static drop every few frames (accumulate)
      if (frameCount % 10 === 0) {
        staticDropsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1
        })
      }

      // 2. Draw Falling Rain
      ctx.strokeStyle = 'rgba(30, 58, 138, 0.4)' // Dark Blue
      ctx.lineWidth = 1

      drops.forEach(drop => {
        // Draw drop as a line
        ctx.beginPath()
        ctx.moveTo(drop.x, drop.y)
        ctx.lineTo(drop.x - drop.length * 0.5, drop.y + drop.length) // Draw diagonal line
        ctx.stroke()

        // Move drop diagonally (Left and Down)
        drop.x -= drop.speed * 0.5
        drop.y += drop.speed

        // Reset drop when it goes off screen
        if (drop.y > canvas.height) {
          drop.y = -10
          drop.x = Math.random() * (canvas.width + 200) // Start wider to cover diagonal drift
          drop.speed = Math.random() * 3 + 2
          drop.length = Math.random() * 20 + 10
        }

        // Loop fix for x-axis
        if (drop.x < -10) {
          drop.x = canvas.width + 10
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  )
})

RainBackground.displayName = 'RainBackground'

export default RainBackground
