import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import projects from '../data/projects.js'

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projects.find((p) => p.id === id)

  const [view, setView] = useState('tech')
  const toggleView = () => {
    setView((prev) => (prev === 'tech' ? 'eli5' : 'tech'))
  }

  if (!project) {
    return (
      <section className="p-6 text-center">
        <p>Project not found.</p>
        <Link className="underline" to="/">Back to projects</Link>
      </section>
    )
  }

  const description =
    view === 'tech' ? project.techDescription : project.eli5Description

  return (
    <section className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
      <button
        onClick={toggleView}
        className="mb-4 px-3 py-1 rounded bg-gray-900 text-white"
      >
        {view === 'tech' ? "Explain Like I'm 5" : 'Technical Description'}
      </button>
      <AnimatePresence mode="wait">
        <Motion.p
          key={view}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="leading-relaxed"
        >
          {description}
        </Motion.p>
      </AnimatePresence>
    </section>
  )
}
