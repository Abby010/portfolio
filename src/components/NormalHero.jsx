export default function NormalHero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center px-4 text-center bg-white font-light">
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50 to-white pointer-events-none"
        aria-hidden="true"
      />
      <h2 className="z-10 text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900">
        Welcome to my Portfolio
      </h2>
      <p className="z-10 mt-4 text-lg sm:text-xl text-gray-600">
        Crafting clean experiences
      </p>
      <a
        href="#projects"
        className="z-10 mt-8 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700"
      >
        View Projects
      </a>
      <div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center"
        aria-hidden="true"
      >
        <span className="mb-2 text-xs text-gray-500">scroll</span>
        <svg
          className="h-5 w-5 animate-bounce text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
