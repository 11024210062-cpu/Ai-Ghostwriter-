import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'

function Dashboard() {
  const [chats, setChats] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [message, setMessage] = useState('')
  const [reply, setReply] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingChats, setLoadingChats] = useState(true)

  useEffect(() => {
    fetchChats()
  }, [])

  async function fetchChats() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/chat/history')
      setChats(response.data.chats)
      if (response.data.chats.length > 0) {
        const lastChat = response.data.chats[response.data.chats.length - 1]
        setSelectedChat(lastChat)
      }
    } catch (error) {
      console.error('Error fetching chats:', error)
    } finally {
      setLoadingChats(false)
    }
  }

  async function handleGenerateReply() {
    if (!message.trim()) return
    if (!selectedChat) {
      alert('Please upload a WhatsApp chat first!')
      return
    }
    setLoading(true)
    setReply('')
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/replies/generate',
        {
          message: message,
          chat_id: selectedChat.id,
          user_name: "Navya"
        }
      )
      setReply(response.data.generated_reply)
    } catch (error) {
      console.error('Error:', error)
      setReply('Error generating reply. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400 mb-8">Generate AI replies in your personal texting style</p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-green-400">{chats.length}</p>
            <p className="text-gray-400 text-sm mt-1">Chats Uploaded</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-blue-400">
              {chats.reduce((sum, c) => sum + c.total_messages, 0)}
            </p>
            <p className="text-gray-400 text-sm mt-1">Messages Analyzed</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-purple-400">AI</p>
            <p className="text-gray-400 text-sm mt-1">Style Profile</p>
          </div>
        </div>

        {chats.length > 0 && (
          <div className="bg-gray-800 rounded-xl p-4 mb-6">
            <h2 className="text-white font-semibold mb-3">Select Chat Profile</h2>
            <div className="flex gap-2 flex-wrap">
              {chats.map(chat => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedChat?.id === chat.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {chat.filename} (id:{chat.id})
                </button>
              ))}
            </div>
            {selectedChat && (
              <p className="text-gray-400 text-sm mt-2">
                Using chat id: {selectedChat.id} with {selectedChat.total_messages} messages
              </p>
            )}
          </div>
        )}

        {!loadingChats && chats.length === 0 && (
          <div className="bg-gray-800 rounded-xl p-8 text-center mb-6">
            <p className="text-white font-semibold mb-2">No chats uploaded yet</p>
            <p className="text-gray-400 mb-4">Upload a WhatsApp chat to get started</p>
            <a href="/upload" className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold">
              Upload Chat
            </a>
          </div>
        )}

        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          <h2 className="text-white font-semibold mb-4">Generate AI Reply</h2>
          <div className="mb-4">
            <label className="text-gray-400 text-sm mb-2 block">Message you received:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type the message you want to reply to..."
              rows={3}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>
          <button
            onClick={handleGenerateReply}
            disabled={loading || !message.trim()}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? 'Generating...' : 'Generate Reply'}
          </button>
        </div>

        {reply && (
          <div className="bg-gray-800 rounded-xl p-6 border border-green-500 mb-6">
            <h2 className="text-white font-semibold mb-3">Suggested Reply</h2>
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-white text-lg">{reply}</p>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => navigator.clipboard.writeText(reply)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Copy Reply
              </button>
              <button
                onClick={handleGenerateReply}
                className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Regenerate
              </button>
              <button
                onClick={() => setReply('')}
                className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {chats.length > 0 && (
          <div className="bg-gray-800 rounded-xl p-6 mt-6">
            <h2 className="text-white font-semibold mb-4">Upload History</h2>
            <div className="space-y-3">
              {chats.map(chat => (
                <div key={chat.id} className="bg-gray-700 rounded-lg px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{chat.filename}</p>
                    <p className="text-gray-400 text-sm">{chat.total_messages} messages</p>
                  </div>
                  <span className="text-green-400 text-sm font-medium">Analyzed</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </Layout>
  )
}

export default Dashboard