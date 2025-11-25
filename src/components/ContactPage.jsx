import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function ContactPage() {
  const { theme, currentTheme } = useTheme()
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Create mailto link with form data
    const mailtoLink = `mailto:abhishekmehta0712@gmail.com?subject=${encodeURIComponent(formData.subject || 'Contact Form Submission')}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`
    
    // Open default email client
    window.location.href = mailtoLink
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-20 px-6 pr-20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Enhanced title */}
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-7xl font-black text-center mb-28 tracking-wider relative"
        >
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
            currentTheme === 'dark' 
              ? 'from-white via-blue-200 to-white' 
              : 'from-gray-800 via-blue-600 to-gray-800'
          }`}>
            GET IN TOUCH
          </span>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full" />
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            className="flex justify-center"
          >
            <div className="relative group">
              {/* Gradient border glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-30 group-hover:opacity-60 blur transition duration-300" />
              
              <div className={`relative backdrop-blur-xl rounded-2xl p-8 border space-y-6 w-[420px] shadow-2xl ${
                currentTheme === 'dark'
                  ? 'bg-black/60 border-blue-500/30 shadow-blue-500/20'
                  : 'bg-white/90 border-blue-300/50 shadow-blue-300/30'
              }`}>
                {/* Email */}
                <motion.a
                  href="mailto:abhishekmehta0712@gmail.com"
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-4 cursor-pointer"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                    <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-xs mb-1 tracking-wider ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>EMAIL</p>
                    <p className={`font-semibold text-sm hover:text-blue-500 transition-colors break-all ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>abhishekmehta0712@gmail.com</p>
                  </div>
                </motion.a>

                {/* Location */}
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-4 cursor-pointer"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-500/30 to-pink-600/30 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-pink-500/30">
                    <svg className="w-7 h-7 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-xs mb-1 tracking-wider ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>LOCATION</p>
                    <p className={`font-semibold text-base ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Sydney, NSW</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            className="flex justify-center"
          >
            <div className="relative group">
              {/* Gradient border glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-30 group-hover:opacity-60 blur transition duration-300" />
              
              <div className={`relative backdrop-blur-xl rounded-2xl p-8 border w-[500px] shadow-2xl ${
                currentTheme === 'dark'
                  ? 'bg-black/60 border-blue-500/30 shadow-blue-500/20'
                  : 'bg-white/90 border-blue-300/50 shadow-blue-300/30'
              }`}>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-5 py-4 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                        currentTheme === 'dark'
                          ? 'bg-white/5 border-blue-400/30 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/40 focus:bg-white/10 hover:bg-white/8'
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/40 focus:bg-white hover:bg-gray-100'
                      }`}
                      placeholder="NAME"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-5 py-4 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                        currentTheme === 'dark'
                          ? 'bg-white/5 border-blue-400/30 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/40 focus:bg-white/10 hover:bg-white/8'
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/40 focus:bg-white hover:bg-gray-100'
                      }`}
                      placeholder="YOUR EMAIL"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={`w-full px-5 py-4 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                        currentTheme === 'dark'
                          ? 'bg-white/5 border-blue-400/30 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/40 focus:bg-white/10 hover:bg-white/8'
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/40 focus:bg-white hover:bg-gray-100'
                      }`}
                      placeholder="SUBJECT"
                      required
                    />
                  </div>

                  <div>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows="5"
                      className={`w-full px-5 py-4 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                        currentTheme === 'dark'
                          ? 'bg-white/5 border-blue-400/30 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/40 focus:bg-white/10 hover:bg-white/8'
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/40 focus:bg-white hover:bg-gray-100'
                      }`}
                      placeholder="MESSAGE"
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full relative group/btn overflow-hidden bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/40 hover:shadow-xl hover:shadow-blue-500/60 tracking-wider text-base"
                  >
                    <span className="relative z-10">SEND MESSAGE</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
