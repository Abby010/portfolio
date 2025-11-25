import { ThemeProvider } from './context/ThemeContext'
import { ParticleProvider } from './context/ParticleContext'
import PortfolioContainer from './components/PortfolioContainer'

export default function App() {
  return (
    <ThemeProvider>
      <ParticleProvider>
        <PortfolioContainer />
      </ParticleProvider>
    </ThemeProvider>
  )
}
