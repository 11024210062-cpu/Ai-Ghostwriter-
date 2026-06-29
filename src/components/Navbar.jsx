import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between max-w-6xl mx-auto">

        {/* Logo */}
        <Link to="/" className="text-white text-xl font-bold">
          👻 AI Ghostwriter
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="text-gray-300 hover:text-white">
            Dashboard
          </Link>
          <Link to="/upload" className="text-gray-300 hover:text-white">
            Upload
          </Link>
          <Link to="/login" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold">
            Login
          </Link>
        </div>

      </div>
    </nav>
  )
}

export default Navbar