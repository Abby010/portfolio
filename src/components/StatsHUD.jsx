import { useEffect, useState } from 'react'
import useTypingEffect from '../hooks/useTypingEffect.js'

export default function StatsHUD() {
  const username = 'octocat'
  const [stats, setStats] = useState(null)
  const [open, setOpen] = useState(false)
  const typed = useTypingEffect('> Loaded AI_Project', 80)

  useEffect(() => {
    // Fetch basic GitHub profile stats
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => setStats(null))
  }, [username])

  // Demo streak counter; replace with real data if available
  const streak = 5

  const hudContent = (
    <>
      <div>
        {typed}
        <span className="animate-pulse">|</span>
      </div>
      {stats && (
        <ul className="mt-2 text-sm leading-snug">
          <li>Repos: {stats.public_repos}</li>
          <li>Followers: {stats.followers}</li>
          <li>Following: {stats.following}</li>
        </ul>
      )}
      <p className="mt-2 text-sm">Streak: {streak} days</p>
    </>
  )

  return (
    <>
      <aside className="fixed top-4 right-4 hidden md:block bg-purple-950/70 text-lime-300 font-mono p-4 rounded shadow-lg text-glow z-40">
        {hudContent}
      </aside>
      <button
        type="button"
        className="fixed bottom-4 right-4 z-40 rounded-full bg-purple-950 p-3 text-lime-300 shadow md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Show stats"
      >
        &#x1F4CA;
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 md:hidden">
          <div className="relative w-11/12 max-w-xs rounded bg-purple-950 p-4 text-lime-300 shadow-lg">
            <button
              type="button"
              className="absolute top-2 right-2"
              onClick={() => setOpen(false)}
              aria-label="Close stats"
            >
              ✕
            </button>
            {hudContent}
          </div>
        </div>
      )}
    </>
  )
}
