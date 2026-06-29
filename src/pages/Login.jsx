import Layout from '../components/Layout'

function Login() {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Welcome Back 👋
          </h2>
          <div className="mb-4">
            <label className="text-gray-400 text-sm mb-2 block">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-6">
            <label className="text-gray-400 text-sm mb-2 block">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg">
            Login
          </button>
          <p className="text-gray-400 text-center mt-4">
            Don't have an account?{' '}
            <a href="/register" className="text-green-400 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Login