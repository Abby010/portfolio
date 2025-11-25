import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import ParticleNetwork from './ParticleNetwork'
import ThemeTransition from './ThemeTransition'
import ProfessionalJourney from './ProfessionalJourney'
import LeadershipExperience from './LeadershipExperience'
import AwardsRecognition from './AwardsRecognition'
import ContactPage from './ContactPage'
import Reading from './Reading'
import Projects from './Projects'

const NAV_ITEMS = ['About', 'Experience', 'Projects', 'Education & Awards', 'Volunteering', 'Reading', 'Contact']

export default function PortfolioContainer() {
  const [currentPage, setCurrentPage] = useState('About')
  const { theme, toggleTheme, currentTheme } = useTheme()

  return (
    <div className={`min-h-screen ${theme.bg} font-sans relative overflow-hidden transition-colors duration-300`}>
      {/* Theme Transition */}
      <ThemeTransition />
      
      {/* Particle Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        <ParticleNetwork />
      </div>

      {/* Navigation */}
      <nav className={`relative ${theme.navBg} backdrop-blur-md border-b ${theme.borderBlue} transition-colors duration-300`} style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white text-lg">
                AM
              </div>
              <span className={`${theme.textPrimary} font-bold tracking-wider text-sm transition-colors duration-300`}>
                ABHISHEK MEHTA_SOFTWARE ENGINEER
              </span>
            </div>

            {/* Nav Items and Theme Toggle */}
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item}
                    onClick={() => setCurrentPage(item)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      currentPage === item
                        ? currentTheme === 'dark' 
                          ? 'bg-blue-500/30 text-white shadow-lg shadow-blue-500/50'
                          : 'bg-blue-100 text-blue-700 shadow-md shadow-blue-200'
                        : currentTheme === 'dark'
                          ? 'text-gray-300 hover:bg-white/10 hover:text-white'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`relative p-3 rounded-xl ${
                  currentTheme === 'dark'
                    ? 'bg-white/10 hover:bg-white/20'
                    : 'bg-gray-200 hover:bg-gray-300'
                } transition-all duration-300 group`}
                aria-label="Toggle theme"
              >
                <div className="relative w-6 h-6">
                  {/* Sun Icon */}
                  <motion.svg
                    initial={false}
                    animate={{
                      scale: currentTheme === 'light' ? 1 : 0,
                      rotate: currentTheme === 'light' ? 0 : 180,
                      opacity: currentTheme === 'light' ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 text-yellow-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </motion.svg>
                  
                  {/* Moon Icon */}
                  <motion.svg
                    initial={false}
                    animate={{
                      scale: currentTheme === 'dark' ? 1 : 0,
                      rotate: currentTheme === 'dark' ? 0 : -180,
                      opacity: currentTheme === 'dark' ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </motion.svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative" style={{ zIndex: 5 }}>
      <AnimatePresence mode="wait">
          {currentPage === 'About' && (
          <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
              className="min-h-screen flex items-center justify-center px-6 py-20"
            >
              <div className="max-w-7xl w-full relative">
                {/* Innovative Asymmetric Layout */}
                <div className="grid grid-cols-12 gap-8 items-center">
                  
                  {/* Left Side - Profile Picture with Creative Border */}
                  <motion.div
                    initial={{ x: -100, opacity: 0, rotate: -10 }}
                    animate={{ x: 0, opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="col-span-5 relative flex justify-center items-center"
                  >
                    {/* Profile Picture Container - Smaller Size */}
                    <div className="relative w-80 h-80">
                      {/* Decorative Elements */}
                      <div className={`absolute -inset-4 rounded-full blur-2xl animate-pulse ${
                        currentTheme === 'dark' 
                          ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30' 
                          : 'bg-gradient-to-br from-blue-300/40 to-purple-300/40'
                      }`} />
                      
                      <div className="relative w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full animate-spin-slow" style={{ padding: '4px' }} />
                        <div className={`relative ${currentTheme === 'dark' ? 'bg-black' : 'bg-white'} rounded-full p-2 w-full h-full transition-colors duration-300`}>
                          <img
                            src="/Profile Pic.jpg"
                            alt="Abhishek Mehta"
                            className={`w-full h-full rounded-full object-cover border-4 ${
                              currentTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Decorative Corner Elements */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className={`absolute -bottom-8 -left-8 w-24 h-24 border-4 rounded-lg ${
                          currentTheme === 'dark' ? 'border-blue-500/30' : 'border-blue-300/50'
                        }`}
                      />
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className={`absolute -top-8 -right-8 w-20 h-20 border-4 rounded-full ${
                          currentTheme === 'dark' ? 'border-purple-500/30' : 'border-purple-300/50'
                        }`}
                      />
                    </div>
                  </motion.div>

                  {/* Right Side - Text Content */}
                  <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="col-span-7 space-y-6"
                  >
                    {/* Title with Glitch Effect */}
                    <motion.div
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h1 className={`text-7xl font-black ${theme.textPrimary} mb-4 leading-tight transition-colors duration-300`}>
                        ABHISHEK
                  <br />
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText}`}>
                          MEHTA
                        </span>
                </h1>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="flex items-center space-x-4"
                    >
                      <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                      <p className={`text-2xl ${theme.accentBlue} tracking-widest font-light transition-colors duration-300`}>
                        SOFTWARE ENGINEER
                      </p>
                    </motion.div>

                    {/* Description */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className={`backdrop-blur-lg rounded-2xl p-6 border-2 transition-all duration-300 ${
                        currentTheme === 'dark'
                          ? 'bg-white/10 border-blue-500/30 hover:border-blue-400/50'
                          : 'bg-white/90 border-gray-300 hover:border-blue-500 shadow-lg'
                      }`}
                    >
                      <p className={`text-lg ${theme.textSecondary} leading-relaxed transition-colors duration-300`}>
                        I specialise in{' '}
                        <span className={`${theme.accentBlue} font-semibold`}>mobile development</span>{' '}
                        and{' '}
                        <span className={`${theme.accentPurple} font-semibold`}>infrastructure engineering</span>.
                        My work focuses on building reliable mobile experiences and understanding the backend systems that support them. 
                        I enjoy working across the layers that connect user-facing apps to stable, well-designed infrastructure.
                      </p>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                      className="flex space-x-4 pt-4"
                    >
                      <a
                        href="https://github.com/Abby010"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center space-x-2 px-5 py-3 rounded-lg border transition-all duration-300 group ${
                          currentTheme === 'dark'
                            ? 'bg-[#333333] hover:bg-[#24292e] border-gray-600 hover:border-gray-500'
                            : 'bg-white hover:bg-gray-50 border-gray-300 hover:border-gray-400 shadow-md'
                        }`}
                      >
                        <svg className={`w-6 h-6 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`} fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        <span className={`font-medium ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>GitHub</span>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/abhishek0712/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-5 py-3 bg-[#0A66C2] hover:bg-[#004182] rounded-lg border border-[#0A66C2] hover:border-[#004182] transition-all duration-300 group shadow-md"
                      >
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        <span className="text-white font-medium">LinkedIn</span>
                      </a>
                    </motion.div>

                    {/* Stats or Highlights */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                      className="grid grid-cols-3 gap-4 pt-6"
                    >
                      <div className={`${theme.cardBg} backdrop-blur-sm rounded-xl p-4 border ${theme.border} ${
                        currentTheme === 'dark' ? 'hover:border-blue-400/50' : 'hover:border-blue-500'
                      } transition-all ${currentTheme === 'light' ? 'shadow-md' : ''}`}>
                        <div className={`text-3xl font-bold ${theme.accentBlue} mb-1 transition-colors duration-300`}>92.5%</div>
                        <div className={`text-sm ${theme.textTertiary} transition-colors duration-300`}>Dean's Scholar</div>
                      </div>
                      <div className={`${theme.cardBg} backdrop-blur-sm rounded-xl p-4 border ${theme.border} ${
                        currentTheme === 'dark' ? 'hover:border-purple-400/50' : 'hover:border-purple-500'
                      } transition-all ${currentTheme === 'light' ? 'shadow-md' : ''}`}>
                        <div className={`text-3xl font-bold ${theme.accentPurple} mb-1 transition-colors duration-300`}>2+</div>
                        <div className={`text-sm ${theme.textTertiary} transition-colors duration-300`}>Years Experience</div>
                      </div>
                      <div className={`${theme.cardBg} backdrop-blur-sm rounded-xl p-4 border ${theme.border} ${
                        currentTheme === 'dark' ? 'hover:border-pink-400/50' : 'hover:border-pink-500'
                      } transition-all ${currentTheme === 'light' ? 'shadow-md' : ''}`}>
                        <div className={`text-3xl font-bold ${theme.accentPink} mb-1 transition-colors duration-300`}>Top 5%</div>
                        <div className={`text-sm ${theme.textTertiary} transition-colors duration-300`}>Dean's Merit</div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
          </motion.div>
        )}

          {currentPage === 'Experience' && <ProfessionalJourney key="experience" />}

          {currentPage === 'Projects' && <Projects key="projects" />}

          {currentPage === 'Education & Awards' && (
          <motion.div
              key="education"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
              className="min-h-screen py-20 px-6 overflow-y-auto"
            >
              <div className="max-w-7xl mx-auto pb-20">
                <motion.h2 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-5xl font-bold text-center mb-16"
                >
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText} transition-colors duration-300`}>
                    Education & Awards
                  </span>
                </motion.h2>
                
                {/* Soft Background Container - Reduces harsh contrast */}
                <div className={`relative backdrop-blur-sm rounded-3xl p-8 ${
                  currentTheme === 'dark' 
                    ? 'bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-transparent' 
                    : 'bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-transparent border border-gray-200'
                }`}>
                  {/* Innovative Grid Layout */}
                  <div className="relative grid grid-cols-12 gap-6">
                    
                    {/* Main Degree Card - Large, Prominent */}
                    <motion.div
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className={`col-span-7 row-span-2 backdrop-blur-lg rounded-3xl p-8 border transition-all duration-300 shadow-2xl ${
                        currentTheme === 'dark'
                          ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30 border-blue-500/30 hover:border-blue-400/50'
                          : 'bg-white/90 border-gray-200 hover:border-blue-400 shadow-lg'
                      }`}
                    >
                      <div className="flex items-start space-x-6 mb-6">
                        <div className="w-48 h-48 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 p-6 overflow-hidden shadow-lg">
                          <img 
                            src="/UOW LOGO.png" 
                            alt="University of Wollongong"
                            className="w-full h-full object-contain"
                            style={{ transform: 'scale(1.23)' }}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className={`text-4xl font-bold ${theme.textPrimary} mb-3 leading-tight transition-colors duration-300`}>
                            Bachelor of Computer Science
                            <span className={`block text-2xl ${theme.accentBlue} mt-2 transition-colors duration-300`}>(Dean's Scholar)</span>
                          </h3>
                          <p className={`${theme.accentBlue} text-xl font-semibold transition-colors duration-300`}>
                            University of Wollongong
                          </p>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-3 ${theme.textSecondary} text-lg transition-colors duration-300`}>
                        <svg className={`w-5 h-5 ${theme.accentBlue}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>August 2022 – November 2025</span>
                      </div>
                    </motion.div>

                    {/* Grade Card - Compact, Eye-catching */}
                    <motion.div
                      initial={{ y: -50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className={`col-span-5 row-span-2 rounded-2xl p-8 shadow-2xl hover:scale-105 transition-transform duration-300 flex items-center justify-center ${
                        currentTheme === 'dark'
                          ? 'bg-gradient-to-br from-blue-400 to-cyan-500'
                          : 'bg-gradient-to-br from-blue-500 to-cyan-600'
                      }`}
                    >
                      <div className="text-center">
                        <p className="text-white/80 text-sm font-semibold mb-3 uppercase tracking-wider">
                          WAM / Grade
                        </p>
                        <p className="text-white text-7xl font-black mb-4">92.5%</p>
                        <div className="flex items-center justify-center space-x-1 mb-4">
                          <span className="text-white text-3xl">⭐⭐⭐⭐⭐</span>
                        </div>
                        <div className="mt-6 pt-6 border-t-2 border-white/30">
                          <p className="text-white text-xl font-bold tracking-wide">
                            High Distinction
                          </p>
                          <p className="text-white/90 text-lg font-semibold mt-1">
                            Average
                          </p>
                        </div>
                      </div>
                    </motion.div>



                  </div>
                </div>

                {/* Spacer */}
                <div className="my-16"></div>

                {/* Awards & Recognition Section */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="relative"
                >
                  <h3 className={`text-4xl font-bold text-center mb-12 text-transparent bg-clip-text ${
                    currentTheme === 'dark'
                      ? 'bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400'
                      : 'bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500'
                  }`}>
                    Awards & Recognition
                  </h3>

                  {/* Awards in a Creative Layout */}
                  <div className="relative max-w-6xl mx-auto grid grid-cols-2 gap-6">
                    {/* Dean's Merit List - Large Card */}
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.4 }}
                      className={`group col-span-1 backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 hover:scale-105 relative ${
                        currentTheme === 'dark'
                          ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30 hover:border-yellow-400/50'
                          : 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300 hover:border-yellow-500 shadow-md'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-3xl shadow-lg flex-shrink-0">
                          🏅
                        </div>
                        <div>
                          <h4 className={`${theme.textPrimary} font-bold text-xl mb-2 transition-colors duration-300`}>Dean's Merit List</h4>
                          <p className={`font-semibold mb-1 transition-colors duration-300 ${
                            currentTheme === 'dark' ? 'text-yellow-300' : 'text-yellow-600'
                          }`}>2023, 2024</p>
                          <p className={`${theme.textSecondary} text-sm transition-colors duration-300`}>Top 5% of undergraduate students</p>
                        </div>
                      </div>
                      {/* Tooltip */}
                      <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-80 shadow-xl z-50 ${
                        currentTheme === 'dark'
                          ? 'bg-gray-900 text-white border border-yellow-500/50'
                          : 'bg-white text-gray-900 border border-yellow-400 shadow-2xl'
                      }`}>
                        <p className={`font-semibold mb-1 ${currentTheme === 'dark' ? 'text-yellow-300' : 'text-yellow-600'}`}>About Dean's Merit List</p>
                        <p className={`text-xs leading-relaxed ${currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                          A prestigious recognition awarded to the top 5% of undergraduate students at UOW based on academic performance. Recipients demonstrate exceptional achievement and consistent excellence throughout the academic year.
                        </p>
                        <div className={`absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-8 border-transparent ${
                          currentTheme === 'dark' ? 'border-t-gray-900' : 'border-t-white'
                        }`}></div>
                      </div>
                    </motion.div>

                    {/* UOWx Leadership - Large Card */}
                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.6 }}
                      className={`group col-span-1 backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 hover:scale-105 relative ${
                        currentTheme === 'dark'
                          ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/30 hover:border-blue-400/50'
                          : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-300 hover:border-blue-500 shadow-md'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-3xl shadow-lg flex-shrink-0">
                          🗣️
                        </div>
                        <div>
                          <h4 className={`${theme.textPrimary} font-bold text-xl mb-2 transition-colors duration-300`}>UOWx Leadership</h4>
                          <p className={`${theme.accentBlue} font-semibold mb-1 transition-colors duration-300`}>2024</p>
                          <p className={`${theme.textSecondary} text-sm transition-colors duration-300`}>Leadership & Communication skills award</p>
                        </div>
                      </div>
                      {/* Tooltip */}
                      <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-80 shadow-xl z-50 ${
                        currentTheme === 'dark'
                          ? 'bg-gray-900 text-white border border-blue-500/50'
                          : 'bg-white text-gray-900 border border-blue-400 shadow-2xl'
                      }`}>
                        <p className={`font-semibold mb-1 ${theme.accentBlue}`}>About UOWx Award</p>
                        <p className={`text-xs leading-relaxed ${currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                          UOWx is the University of Wollongong's co-curricular recognition program that validates leadership, communication, and personal development skills gained through extracurricular activities, volunteering, and community engagement.
                        </p>
                        <div className={`absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-8 border-transparent ${
                          currentTheme === 'dark' ? 'border-t-gray-900' : 'border-t-white'
                        }`}></div>
                      </div>
                    </motion.div>

                    {/* Academic Excellence - Large Card */}
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.8 }}
                      className={`group col-span-1 backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 hover:scale-105 relative ${
                        currentTheme === 'dark'
                          ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 hover:border-purple-400/50'
                          : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300 hover:border-purple-500 shadow-md'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center text-3xl shadow-lg flex-shrink-0">
                          🧠
                        </div>
                        <div>
                          <h4 className={`${theme.textPrimary} font-bold text-xl mb-2 transition-colors duration-300`}>Academic Excellence</h4>
                          <p className={`${theme.accentPurple} font-semibold mb-1 transition-colors duration-300`}>CSIT226</p>
                          <p className={`${theme.textSecondary} text-sm transition-colors duration-300`}>Highest score (~200 students)</p>
                        </div>
                      </div>
                      {/* Tooltip */}
                      <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-80 shadow-xl z-50 ${
                        currentTheme === 'dark'
                          ? 'bg-gray-900 text-white border border-purple-500/50'
                          : 'bg-white text-gray-900 border border-purple-400 shadow-2xl'
                      }`}>
                        <p className={`font-semibold mb-1 ${theme.accentPurple}`}>About Academic Excellence Award</p>
                        <p className={`text-xs leading-relaxed ${currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                          Awarded for achieving the highest score in CSIT226: Human Computer Interaction among ~200 students. This award recognizes outstanding achievement in user-centered design and HCI principles, sponsored by Objective.
                        </p>
                        <div className={`absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-8 border-transparent ${
                          currentTheme === 'dark' ? 'border-t-gray-900' : 'border-t-white'
                        }`}></div>
                      </div>
                    </motion.div>

                    {/* Capstone 2nd Place - Large Card */}
                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 2.0 }}
                      className={`group col-span-1 backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 hover:scale-105 relative ${
                        currentTheme === 'dark'
                          ? 'bg-gradient-to-br from-green-500/20 to-teal-500/20 border-green-500/30 hover:border-green-400/50'
                          : 'bg-gradient-to-br from-green-50 to-teal-50 border-green-300 hover:border-green-500 shadow-md'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center text-3xl shadow-lg flex-shrink-0">
                          🥈
                        </div>
                        <div>
                          <h4 className={`${theme.textPrimary} font-bold text-xl mb-2 transition-colors duration-300`}>Capstone 2nd Place</h4>
                          <p className={`font-semibold mb-1 transition-colors duration-300 ${
                            currentTheme === 'dark' ? 'text-green-300' : 'text-green-600'
                          }`}>2025</p>
                          <p className={`${theme.textSecondary} text-sm transition-colors duration-300`}>Out of 40 groups</p>
                        </div>
                      </div>
                      {/* Tooltip */}
                      <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-80 shadow-xl z-50 ${
                        currentTheme === 'dark'
                          ? 'bg-gray-900 text-white border border-green-500/50'
                          : 'bg-white text-gray-900 border border-green-400 shadow-2xl'
                      }`}>
                        <p className={`font-semibold mb-1 ${currentTheme === 'dark' ? 'text-green-300' : 'text-green-600'}`}>About Capstone Project</p>
                        <p className={`text-xs leading-relaxed ${currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                          GeoPulse - A SafetyCulture × UOW collaboration project that achieved 2nd place out of 40 competing groups. Recognized for strong technical execution, effective team leadership, stakeholder management, and innovative solution design.
                        </p>
                        <div className={`absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-8 border-transparent ${
                          currentTheme === 'dark' ? 'border-t-gray-900' : 'border-t-white'
                        }`}></div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          )}

          {currentPage === 'Volunteering' && <LeadershipExperience key="volunteering" />}

          {currentPage === 'Reading' && <Reading key="reading" />}

          {currentPage === 'Contact' && <ContactPage key="contact" />}
      </AnimatePresence>
        </div>
    </div>
  )
}
