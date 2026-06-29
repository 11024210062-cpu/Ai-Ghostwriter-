import { useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'

function Upload() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [result, setResult] = useState(null)

  function handleFileChange(event) {
    const selectedFile = event.target.files[0]
    if (selectedFile && selectedFile.name.endsWith('.txt')) {
      setFile(selectedFile)
      setMessage('')
    } else {
      setMessage('Please select a .txt file')
      setFile(null)
    }
  }

  async function handleUpload() {
    if (!file) { setMessage('Please select a file first'); return }
    setUploading(true)
    setMessage('Uploading...')
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await axios.post('http://127.0.0.1:8000/api/chat/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      setResult(response.data)
      setMessage('Chat uploaded successfully!')
    } catch (error) {
      setMessage('Upload failed. Make sure backend is running!')
    } finally {
      setUploading(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">Upload WhatsApp Chat</h1>
        <div className="border-2 border-dashed border-gray-600 rounded-xl p-12 text-center mb-6">
          <p className="text-gray-300 text-lg mb-4">Select your WhatsApp chat file</p>
          <label className="bg-gray-700 text-white px-6 py-3 rounded-lg cursor-pointer">
            Browse File
            <input type="file" accept=".txt" onChange={handleFileChange} className="hidden" />
          </label>
        </div>
        {file && <div className="bg-gray-800 rounded-lg px-4 py-3 mb-4"><p className="text-white">{file.name}</p></div>}
        {message && <p className="text-center mb-4 text-green-400">{message}</p>}
        {result && <div className="bg-gray-800 rounded-xl p-6 mb-6"><p className="text-white mb-2">Total messages: <span className="text-green-400">{result.total_messages}</span></p><a href="/dashboard" className="block text-center bg-green-500 text-white font-semibold py-3 rounded-lg mt-4">Go to Dashboard</a></div>}
        <button onClick={handleUpload} disabled={uploading || !file} className="w-full bg-green-500 disabled:bg-gray-600 text-white font-semibold py-4 rounded-xl text-lg">{uploading ? 'Uploading...' : 'Upload and Analyze Chat'}</button>
      </div>
    </Layout>
  )
}

export default Upload
