import PropTypes from 'prop-types'

export default function ResumeSection({ onClose }) {
  return (
    <section className="p-6 bg-white text-gray-900 max-w-3xl mx-auto" id="resume-section">
      <h2 className="text-2xl font-bold mb-4">Resume</h2>
      <p className="mb-4">This is a placeholder for the resume content.</p>
      <button onClick={onClose} className="px-3 py-1 rounded bg-gray-900 text-white">Close</button>
    </section>
  )
}

ResumeSection.propTypes = {
  onClose: PropTypes.func.isRequired,
}
