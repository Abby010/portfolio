import useTypingEffect from '../hooks/useTypingEffect.js'
import AsciiArt from './AsciiArt.jsx'

export default function NerdHero() {
  const message = 'Welcome to the Nerd Zone'
  const typed = useTypingEffect(message, 80)
  return (
    <section className="h-screen flex flex-col items-center justify-center px-4 text-center font-mono bg-purple-950 text-lime-300">
      <pre className="text-base sm:text-2xl">{typed}<span className="animate-pulse">|</span></pre>
      <AsciiArt />
    </section>
  )
}
