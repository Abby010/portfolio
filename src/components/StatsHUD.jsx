import { useEffect, useState } from 'react'
import useTypingEffect from '../hooks/useTypingEffect.js'

export default function StatsHUD() {
  const username = 'octocat'
  const [stats, setStats] = useState(null)
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

  return (
    <aside className="fixed top-4 right-4 bg-purple-950/70 text-lime-300 font-mono p-4 rounded shadow-lg text-glow">
      <div>{typed}<span className="animate-pulse">|</span></div>
      {stats && (
        <ul className="mt-2 text-sm leading-snug">
          <li>Repos: {stats.public_repos}</li>
          <li>Followers: {stats.followers}</li>
          <li>Following: {stats.following}</li>
        </ul>
      )}
      <p className="mt-2 text-sm">Streak: {streak} days</p>
    </aside>
  )
}
