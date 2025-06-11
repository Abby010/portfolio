import { useState, useEffect } from 'react'

export default function useTypingEffect(text, speed = 100) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
    let index = 0
    const interval = setInterval(() => {
      index += 1
      setDisplayed(text.slice(0, index))
      if (index >= text.length) {
        clearInterval(interval)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  return displayed
}
