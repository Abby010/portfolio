import { useState } from 'react'
import { motion } from 'framer-motion'
import ParticleNetwork from './ParticleNetwork'

const NAV_ITEMS = ['Work', 'About', 'Experience', 'Education', 'Contact']

const PROJECTS = [
  {
    id: 1,
    title: 'Project Alpha',
    subtitle: 'Matrix AI Platform',
    image: 'https://placehold.co/600x400/2563eb/white?text=Matrix+AI',
    description: 'Building scalable cloud infrastructure'
  },
  {
    id: 2,
    title: 'Project Beta',
    subtitle: 'SafetyCulture Mobile',
    image: 'https://placehold.co/600x400/0ea5e9/white?text=SafetyCulture',
    description: 'Mobile app performance optimization'
  },
  {
    id: 3,
    title: 'Project Gamma',
    subtitle: 'Geo Pulse Analytics',
    image: 'https://placehold.co/600x400/06b6d4/white?text=Geo+Pulse',
    description: 'Real-time location tracking platform'
  }
]

export default function PortfolioContainer() {
  const [activeNav, setActiveNav] = useState('Work')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 font-sans">

      {/* Particle Network Background */}
      <div className="fixed inset-0 overflow-hidden">
        <ParticleNetwork />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-transparent pointer-events-none" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                AM
              </div>
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                Abhishek Mehta_Creative Portfolio
              </span>
            </div>

            {/* Nav Items */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map(item => (
                <button
                  key={item}
                  onClick={() => setActiveNav(item)}
                  className={`text-sm font-medium transition-colors ${activeNav === item
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl md:text-9xl font-black italic text-gray-900 mb-8 leading-none"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            PUSHING
            <br />
            BOUNDARIES
          </motion.h1>
        </div>
      </section>

      {/* Project Cards */}
      <section className="relative z-10 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Project Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {project.subtitle}
                  </p>

                  <button className="w-full py-2.5 px-4 border-2 border-gray-900 text-gray-900 font-medium rounded-lg hover:bg-gray-900 hover:text-white transition-colors duration-300">
                    View Case Study
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center">
        <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-gray-900 transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-gray-900 transition-colors">GitHub</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Dribbble</a>
          <span>© 2025 Abhishek Mehta. All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  )
}
