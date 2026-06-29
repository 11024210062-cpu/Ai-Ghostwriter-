function Home() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          AI Ghostwriter 👻
        </h1>
        <p className="text-gray-400 text-xl mb-8">
          Chat in your own style — powered by AI
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/register" className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg">
            Get Started
          </a>
          <a href="/login" className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded-lg">
            Login
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home