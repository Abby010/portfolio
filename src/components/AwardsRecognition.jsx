import { motion } from 'framer-motion'

export default function AwardsRecognition() {
  const awards = [
    { id: 1, title: "Dean's Merit List", year: '2023, 2024', icon: '🏆', x: 25, y: 20, description: 'Top 5% of undergraduate students' },
    { id: 2, title: 'UOWx Leadership Award', year: '2024', icon: '⚡', x: 65, y: 25, description: 'Leadership and Communication skills' },
    { id: 3, title: 'Academic Excellence Award', year: '2024', icon: '⭐', x: 45, y: 50, description: 'Highest score in CSIT226: HCI (~200 students)' },
    { id: 4, title: "Dean's Scholar", year: '2022-2025', icon: '🎓', x: 20, y: 75, description: 'WAM: 92.5%' },
    { id: 5, title: 'GeoPulse Capstone', year: '2025', icon: '🥈', x: 70, y: 70, description: '2nd place out of 40 groups' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-20 px-6 relative"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-white text-center mb-16">Awards & Recognition</h2>

        {/* Network Layout */}
        <div className="relative h-[600px] w-full">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {awards.map((award, i) => {
              return awards.slice(i + 1).map((nextAward, j) => (
                <motion.line
                  key={`${i}-${j}`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{ duration: 1, delay: (i + j) * 0.1 }}
                  x1={`${award.x}%`}
                  y1={`${award.y}%`}
                  x2={`${nextAward.x}%`}
                  y2={`${nextAward.y}%`}
                  stroke="rgba(96, 165, 250, 0.5)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              ))
            })}
          </svg>

          {/* Award Cards */}
          {awards.map((award, index) => (
            <motion.div
              key={award.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.15, type: 'spring', stiffness: 200 }}
              className="absolute"
              style={{
                left: `${award.x}%`,
                top: `${award.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 2
              }}
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/60 hover:scale-105 transition-all duration-300 cursor-pointer shadow-2xl shadow-blue-500/20 w-64">
                <div className="text-6xl mb-3 text-center">{award.icon}</div>
                <h3 className="text-lg font-bold text-white text-center mb-2">{award.title}</h3>
                <p className="text-blue-300 text-center text-sm font-semibold mb-2">{award.year}</p>
                {award.description && (
                  <p className="text-gray-300 text-center text-xs">{award.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
