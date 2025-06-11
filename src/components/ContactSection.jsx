import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import useTypingEffect from '../hooks/useTypingEffect.js'

function GlassForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }
  if (sent) {
    return (
      <p className="mt-4 text-center text-lg">Thanks for your message!</p>
    )
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/30 backdrop-blur-lg border border-white/40 p-6 rounded-lg shadow-lg max-w-md mx-auto"
    >
      <div className="mb-4">
        <label className="block mb-1" htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full rounded p-2 bg-white/60 text-gray-900"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1" htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full rounded p-2 bg-white/60 text-gray-900"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1" htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          required
          value={form.message}
          onChange={handleChange}
          className="w-full rounded p-2 bg-white/60 text-gray-900 h-24"
        />
      </div>
      <button type="submit" className="px-4 py-2 rounded bg-gray-900 text-white w-full">Send</button>
    </form>
  )
}

function LogLine({ text }) {
  const typed = useTypingEffect(text, 20)
  return <div className="whitespace-pre-wrap">{typed}</div>
}

LogLine.propTypes = {
  text: PropTypes.string.isRequired,
}

function ContactCLI() {
  const [input, setInput] = useState('')
  const [logs, setLogs] = useState([])
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.scrollTop = containerRef.current.scrollHeight
  }, [logs])

  const submit = () => {
    const msg = input.trim()
    if (!msg) return
    setLogs((prev) => [...prev, `> ${msg}`])
    setInput('')
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      submit()
    }
  }

  return (
    <div className="cli-box max-h-60" ref={containerRef}>
      {logs.map((log, idx) => (
        <LogLine key={idx} text={log} />
      ))}
      <div className="flex">
        <span>&gt;&nbsp;</span>
        <input
          className="flex-1 bg-transparent outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
      </div>
    </div>
  )
}

export default function ContactSection({ isNerd }) {
  return (
    <section className="p-6" id="contact">
      <h2 className="text-2xl font-bold mb-4 text-center">Contact</h2>
      {isNerd ? <ContactCLI /> : <GlassForm />}
    </section>
  )
}

ContactSection.propTypes = {
  isNerd: PropTypes.bool.isRequired,
}
