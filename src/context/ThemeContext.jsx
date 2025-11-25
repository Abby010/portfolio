import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export const themes = {
  dark: {
    name: 'dark',
    // Backgrounds
    bg: 'bg-black',
    bgGradient: 'bg-gradient-to-br from-gray-900 via-black to-gray-900',
    navBg: 'bg-black/30',
    cardBg: 'bg-white/5',
    cardBgHover: 'bg-white/10',
    
    // Text
    textPrimary: 'text-white',
    textSecondary: 'text-gray-300',
    textTertiary: 'text-gray-400',
    
    // Accents
    accentBlue: 'text-blue-400',
    accentPurple: 'text-purple-400',
    accentPink: 'text-pink-400',
    
    // Borders
    border: 'border-white/10',
    borderBlue: 'border-blue-500/30',
    borderHover: 'hover:border-blue-400/50',
    
    // Gradients
    gradientText: 'from-blue-400 via-purple-400 to-pink-400',
    gradientBg: 'from-blue-500/30 to-purple-500/30',
    
    // Shadows
    shadow: 'shadow-lg shadow-blue-500/50',
    
    // Raw colors for canvas
    particleColor: 'rgba(255, 255, 255, 0.9)',
    particleGlow: 'rgba(255, 255, 255, 1)',
    lineColor: 'rgba(255, 255, 255, 0.5)',
  },
  light: {
    name: 'light',
    // Backgrounds
    bg: 'bg-white',
    bgGradient: 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50',
    navBg: 'bg-white/95',
    cardBg: 'bg-white',
    cardBgHover: 'bg-gray-50',
    
    // Text
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-800',
    textTertiary: 'text-gray-700',
    
    // Accents
    accentBlue: 'text-blue-700',
    accentPurple: 'text-purple-700',
    accentPink: 'text-pink-700',
    
    // Borders
    border: 'border-gray-300',
    borderBlue: 'border-blue-400',
    borderHover: 'hover:border-blue-600',
    
    // Gradients
    gradientText: 'from-blue-700 via-purple-700 to-pink-700',
    gradientBg: 'from-blue-100 to-purple-100',
    
    // Shadows
    shadow: 'shadow-lg shadow-blue-200',
    
    // Raw colors for canvas
    particleColor: 'rgba(37, 99, 235, 0.6)',
    particleGlow: 'rgba(37, 99, 235, 0.8)',
    lineColor: 'rgba(124, 58, 237, 0.25)',
  }
}

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('dark')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const toggleTheme = () => {
    // Switch theme IMMEDIATELY when toggle is clicked
    setCurrentTheme(prev => prev === 'dark' ? 'light' : 'dark')
    setIsTransitioning(true)
    // The transition animation will just show the transition effect
  }

  const switchTheme = (newTheme) => {
    setCurrentTheme(newTheme)
  }

  const completeTransition = () => {
    setIsTransitioning(false)
  }

  const theme = themes[currentTheme]

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      currentTheme, 
      toggleTheme, 
      isTransitioning,
      switchTheme,
      completeTransition 
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

