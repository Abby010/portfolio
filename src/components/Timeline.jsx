import { motion as Motion } from 'framer-motion'
import timeline from '../data/timeline.js'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay },
  }),
}

export default function Timeline() {
  return (
    <section className="py-16">
      <h2 className="text-2xl font-bold mb-8 px-4">My Journey</h2>
      <div className="overflow-x-auto px-4 scrollbar-hide">
        <div className="flex space-x-12 min-w-[640px] snap-x snap-mandatory scroll-smooth">
          {timeline.map((item, i) => (
            <Motion.div
              key={item.id}
              className="relative bg-white rounded-lg shadow p-6 min-w-[240px] snap-start"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.1}
            >
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm opacity-70">{item.date}</p>
              <p className="mt-2 text-sm leading-relaxed">{item.description}</p>
              {i < timeline.length - 1 && (
                <svg
                  className="absolute right-[-60px] top-1/2 w-16 h-8 text-gray-300"
                  viewBox="0 0 100 50"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M0 25 Q50 0 100 25" strokeWidth="2" />
                </svg>
              )}
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
