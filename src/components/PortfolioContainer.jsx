import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ParticleNetwork from './ParticleNetwork'

const NAV_ITEMS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' }
]

const PROJECTS_HERO = [
  {
    id: 1,
    title: 'Project Alpha',
    subtitle: 'Urban Redesign',
    image: 'https://placehold.co/600x400/2563eb/white?text=Urban+Redesign',
  },
  {
    id: 2,
    title: 'Project Beta',
    subtitle: 'Generative Art',
    image: 'https://placehold.co/600x400/0ea5e9/white?text=Generative+Art',
  },
  {
    id: 3,
    title: 'Project Gamma',
    subtitle: 'Industrial Design',
    image: 'https://placehold.co/600x400/06b6d4/white?text=Industrial+Design',
  }
]

const PROJECTS_FEATURED = [
  {
    id: 1,
    title: 'Urban Redesign',
    subtitle: 'Architecture',
    image: 'https://placehold.co/600x400/2563eb/white?text=Urban',
  },
  {
    id: 2,
    title: 'Generative Art Study',
    subtitle: 'Digital Art',
    image: 'https://placehold.co/600x400/0ea5e9/white?text=Art',
  },
  {
    id: 3,
    title: 'Industrial Design Concept',
    subtitle: 'Product Design',
    image: 'https://placehold.co/600x400/06b6d4/white?text=Industrial',
  },
  {
    id: 4,
    title: 'Project Beta',
    subtitle: 'Urban Redesign',
    image: 'https://placehold.co/600x400/8b5cf6/white?text=Beta',
  },
  {
    id: 5,
    title: 'Landscape Photography',
    subtitle: 'Photography',
    image: 'https://placehold.co/600x400/ec4899/white?text=Landscape',
  },
  {
    id: 6,
    title: 'Mobile App UI/X',
    subtitle: 'Kinetic Typography',
    image: 'https://placehold.co/600x400/14b8a6/white?text=Mobile',
  }
]

export default function PortfolioContainer() {
  const [currentPage, setCurrentPage] = useState('work')

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId)
  }

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

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
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-sm font-medium transition-colors ${currentPage === item.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <AnimatePresence mode="wait">
        {currentPage === 'work' && (
          <motion.div
            key="work"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            {/* Hero Section */}
            <section className="relative z-10 pt-32 pb-20 px-6">
              <div className="max-w-7xl mx-auto text-center">
                <h1
                  className="text-7xl md:text-9xl font-black italic text-gray-900 mb-8 leading-none"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  PUSHING
                  <br />
                  BOUNDARIES
                </h1>
              </div>
            </section>

            {/* Project Cards */}
            <section className="relative z-10 pb-24 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {PROJECTS_HERO.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.6 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
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
          </motion.div>
        )}

        {currentPage === 'experience' && (
          <motion.div
            key="experience"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            {/* Featured Projects Page */}
            <section className="relative z-10 pt-20 pb-24 px-6">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-5xl md:text-6xl font-black text-gray-900 text-center mb-16">
                  FEATURED PROJECTS
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {PROJECTS_FEATURED.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
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
          </motion.div>
        )}

        {currentPage === 'about' && (
          <motion.div
            key="about"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            {/* About Page */}
            <section className="relative z-10 pt-20 pb-24 px-6">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  {/* Left: Profile Photo */}
                  <div className="flex justify-center md:justify-end">
                    <div className="w-80 h-96 bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src="https://placehold.co/400x500/1e293b/white?text=Profile"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Right: Bio Content */}
                  <div className="space-y-6">
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                      ABOUT ABHISHEK MEHTA
                    </h2>
                    <p className="text-xl text-gray-700 font-semibold">
                      Creative Technologist & Designer
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      I'm a Full-Stack Software Engineer specialized in building scalable cloud infrastructure and mobile applications. With 3+ years of industry experience, I create meaningful digital products that balance user needs with business goals.
                      <br /><br />
                      My expertise spans AWS, Pulumi, React, and mobile development. I'm passionate about solving complex problems with clean, efficient code and always learning new technologies.
                    </p>
                    <button className="px-8 py-3 border-2 border-gray-900 text-gray-900 font-medium rounded-lg hover:bg-gray-900 hover:text-white transition-colors duration-300">
                      Download CV
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

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
