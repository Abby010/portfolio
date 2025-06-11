import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import projects from '../data/projects.js'

export default function ProjectGrid({ isNerd }) {
  return (
    <section className="p-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.id}
            className={`rounded-lg p-6 shadow transition-transform duration-300 transform hover:scale-105 ${
              isNerd
                ? 'bg-purple-950 text-lime-300 border border-lime-300'
                : 'bg-white text-gray-900'
            }`}
          >
            <h3 className={`text-xl font-semibold ${isNerd ? 'glitch-text' : ''}`}>
              <Link to={`/project/${project.id}`}>{project.title}</Link>
            </h3>
            <p className={`mt-2 text-sm opacity-80 ${isNerd ? 'glitch-text' : ''}`}>
              {project.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

ProjectGrid.propTypes = {
  isNerd: PropTypes.bool.isRequired,
}
