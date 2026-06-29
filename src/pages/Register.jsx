import { useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleRegister() {
    if (!name || !email || !password) {
      setMessage('Please fill all fields!')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/auth/register',
        { name, email, password }
      )

      setSuccess(true)
      setMessage(`Welcome ${response.data.user.name}! Account created!`)

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 2000)

    } catch (error) {
      if (error.response?.data?.detail) {
        setMessage('Error: ' + error.response.data.detail)
      } else {
        setMessage('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Create Account
          </h2>

          <div className="mb-4">
            <label className="text-gray-400 text-sm mb-2 block">Full Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-400 text-sm mb-2 block">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-6">
            <label className="text-gray-400 text-sm mb-2 block">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {message && (
            <p className={`text-center mb-4 ${success ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </p>
          )}

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-white font-semibold py-3 rounded-lg"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="text-gray-400 text-center mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-green-400 hover:underline">Login</a>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Register