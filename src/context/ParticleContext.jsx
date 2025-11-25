import { createContext, useContext, useRef } from 'react'

const ParticleContext = createContext()

export function ParticleProvider({ children }) {
  const particlesRef = useRef([])
  
  const setParticles = (particles) => {
    particlesRef.current = particles
  }
  
  const getParticles = () => {
    return particlesRef.current
  }

  return (
    <ParticleContext.Provider value={{ setParticles, getParticles }}>
      {children}
    </ParticleContext.Provider>
  )
}

export function useParticles() {
  const context = useContext(ParticleContext)
  if (!context) {
    throw new Error('useParticles must be used within ParticleProvider')
  }
  return context
}

