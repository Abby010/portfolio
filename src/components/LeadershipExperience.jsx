import { motion } from 'framer-motion'

export default function LeadershipExperience() {
  const volunteering = [
    {
      title: 'Video Game Society',
      role: 'Wellbeing Executive',
      description: 'Promoted mental health and wellbeing within the gaming community at UOW',
      icon: '🎮',
      color: 'from-green-400 to-teal-500'
    },
    {
      title: 'UOW Pulse',
      role: 'Volunteer',
      hours: '100+',
      description: 'Contributed over 100 hours to UOW Pulse, supporting community initiatives and student programs',
      logo: '/UOW LOGO.png',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      title: 'EIS Faculty',
      role: 'Engineering Mentor',
      organization: 'University of Wollongong',
      description: 'Mentored engineering students, providing guidance on academic and career development',
      logo: '/UOW LOGO.png',
      color: 'from-purple-400 to-pink-500'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative w-full">
        {/* Horizontal Line Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {volunteering.map((item, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6, type: "spring" }}
            >
                <div className={`relative bg-gradient-to-br ${item.color} p-0.5 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300`}>
                <div className="bg-black/80 backdrop-blur-md rounded-xl p-8 sm:p-10 w-full h-full flex flex-col justify-between min-h-[500px] sm:min-h-[600px]">
                  {/* Logo or Icon */}
                  <div className="flex items-center justify-center mb-8">
                    {item.logo ? (
                      <div className="w-48 h-32 bg-white rounded-md flex items-center justify-center p-6 overflow-hidden">
                        <img 
                          src={item.logo} 
                          alt={item.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-40 h-40 bg-white/10 rounded-lg flex items-center justify-center text-8xl">
                        {item.icon}
                      </div>
                    )}
                  </div>

                  {/* Hours Badge (if applicable) */}
                  {item.hours && (
                    <div className="flex justify-center mb-6">
                      <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                        <span className="text-white font-bold text-lg">{item.hours}</span>
                        <span className="text-gray-300 text-base ml-1">Hours</span>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-grow flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-white text-center mb-4">
                      {item.title}
                    </h3>
                    <p className="text-center text-blue-300 font-semibold text-lg mb-4">
                      {item.role}
                    </p>
                    {item.organization && (
                      <p className="text-center text-gray-400 text-base mb-6">
                        {item.organization}
                      </p>
                    )}
                    <p className="text-gray-300 text-base text-center leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Decorative Elements */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  delay: index * 0.5
                }}
                className={`absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-br ${item.color} rounded-full opacity-20 blur-sm`}
              />
              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  delay: index * 0.5 + 0.2
                }}
                className={`absolute -bottom-3 -left-3 w-8 h-8 bg-gradient-to-br ${item.color} rounded-full opacity-20 blur-sm`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

