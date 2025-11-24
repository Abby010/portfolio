import { useEffect, useRef } from 'react'

function RainBackground() {
  const canvasRef = useRef(null)

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

    const animate = () => {
      // Clear canvas with dark background
      ctx.fillStyle = '#0f172a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw and update drops
      ctx.strokeStyle = 'rgba(174, 194, 224, 0.5)'
      ctx.lineWidth = 1

      drops.forEach(drop => {
        // Draw drop as a line
        ctx.beginPath()
        ctx.moveTo(drop.x, drop.y)
        ctx.lineTo(drop.x, drop.y + drop.length)
        ctx.stroke()

        // Move drop down
        drop.y += drop.speed

        // Reset drop when it goes off screen
        if (drop.y > canvas.height) {
          drop.y = -10
          drop.x = Math.random() * canvas.width
          drop.speed = Math.random() * 3 + 2
          drop.length = Math.random() * 20 + 10
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
}

export default RainBackground
