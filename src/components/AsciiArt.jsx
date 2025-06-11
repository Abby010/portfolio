import { useState, useEffect } from 'react'

const frames = [
  `  /\\_/\\\n ( o.o )\n  > ^ <`,
  `  /\\_/\\\n ( -.- )\n  > ^ <`,
]

export default function AsciiArt() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % frames.length)
    }, 500)
    return () => clearInterval(id)
  }, [])

  return (
    <pre className="mt-4 text-green-300 text-xs sm:text-sm font-mono leading-none whitespace-pre text-center">
      {frames[index]}
    </pre>
  )
}
