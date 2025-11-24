import { motion } from 'framer-motion'
import { Award, Trophy, Lightbulb, Target } from 'lucide-react'

const AWARDS_DATA = [
  {
    id: 1,
    title: 'Design Excellence Award',
    description: 'Recognized for outstanding innovation in user experience design and creative problem-solving approaches.',
    image: 'https://placehold.co/200x200/2563eb/white?text=Award+1',
    icon: Trophy,
    iconColor: 'text-yellow-500',
    position: 'top-left',
  },
  {
    id: 2,
    title: 'Innovation in Design',
    description: 'Celebrated for groundbreaking work in digital product design and forward-thinking design methodologies.',
    image: 'https://placehold.co/200x200/0ea5e9/white?text=Award+2',
    icon: Target,
    iconColor: 'text-blue-400',
    position: 'top-right',
  },
  {
    id: 3,
    title: 'Creative Achievement',
    description: 'Honored for exceptional creativity and artistic vision in transforming complex ideas into elegant solutions.',
    image: 'https://placehold.co/200x200/06b6d4/white?text=Award+3',
    icon: Award,
    iconColor: 'text-blue-400',
    position: 'bottom-left',
  },
  {
    id: 4,
    title: 'Outstanding Contribution',
    description: 'Acknowledged for significant contributions to the design community and mentorship of emerging talent.',
    image: 'https://placehold.co/200x200/8b5cf6/white?text=Award+4',
    icon: Lightbulb,
    iconColor: 'text-yellow-500',
    position: 'bottom-right',
  },
]

const positionClasses = {
  'top-left': 'md:top-20 md:left-20 top-10 left-10',
  'top-right': 'md:top-20 md:right-20 top-10 right-10',
  'bottom-left': 'md:bottom-20 md:left-20 bottom-10 left-10',
  'bottom-right': 'md:bottom-20 md:right-20 bottom-10 right-10',
}

export default function AwardsRecognition() {
  return (
    <div className="relative w-full min-h-screen py-20 px-6">
      <h2 className="text-5xl md:text-6xl font-black text-white text-center mb-20 drop-shadow-lg">
        AWARDS & RECOGNITION
      </h2>

      {/* Awards Cards positioned in network layout */}
      <div className="relative w-full min-h-[700px] max-w-7xl mx-auto">
        {AWARDS_DATA.map((award, index) => {
          const IconComponent = award.icon
          
          return (
            <motion.div
              key={award.id}
              className={`absolute ${positionClasses[award.position]} w-72 md:w-80`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                {/* Icon */}
                <div className="flex justify-center mb-3">
                  <div className={`${award.iconColor} drop-shadow-lg`}>
                    <IconComponent size={40} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Profile Image */}
                <div className="flex justify-center mb-4">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white/40 shadow-2xl ring-2 ring-white/20">
                    <img
                      src={award.image}
                      alt={award.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white text-center mb-3 drop-shadow-md">
                  {award.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-white/70 text-center leading-relaxed drop-shadow-sm">
                  {award.description}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

