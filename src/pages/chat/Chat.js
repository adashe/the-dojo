import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'

// styles
import './Chat.css'
import { useState } from 'react'

export default function Chat() {
  const { id } = useParams()
  const { error, document: chatTo } = useDocument('users', id)
  const [newMessage, setNewMessage] = useState('')

  if (error) {
    return <div className="error">{error}</div>
  }
  if (!chatTo) {
    return <div className="loading">Loading...</div>
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(newMessage)
  }

  return (
    <div>
      <h2 className="page-title">Chat with {chatTo.displayName}</h2>
      <form className="send-message" onSubmit={handleSubmit}>
        <label>
          <span>Send a message:</span>
          <textarea
            required
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          ></textarea>
        </label>
        <button className="btn">Send Message</button>
      </form>
    </div>

  )
}
