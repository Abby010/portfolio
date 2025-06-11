import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import useTypingEffect from '../hooks/useTypingEffect.js'

function TerminalLine({ text, isCommand }) {
  const typed = useTypingEffect(text, 20)
  return <div className="whitespace-pre-wrap">{isCommand ? `> ${text}` : typed}</div>
}

TerminalLine.propTypes = {
  text: PropTypes.string.isRequired,
  isCommand: PropTypes.bool.isRequired,
}

export default function Terminal({ onCommand }) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.scrollTop = containerRef.current.scrollHeight
  }, [history])

  const runCommand = () => {
    const cmd = input.trim()
    if (!cmd) return
    setHistory((prev) => [...prev, { text: cmd, isCommand: true }])
    const output = onCommand(cmd)
    if (output) {
      setHistory((prev) => [...prev, { text: output, isCommand: false }])
    }
    setInput('')
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      runCommand()
    }
  }

  return (
    <div className="terminal" ref={containerRef}>
      {history.map((item, index) => (
        <TerminalLine key={index} text={item.text} isCommand={item.isCommand} />
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

Terminal.propTypes = {
  onCommand: PropTypes.func.isRequired,
}
