import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCollection } from '../../hooks/useCollection'
import { useDocument } from '../../hooks/useDocument'

// styles
import './Chat.css'

export default function Chat() {
  const { messagesError, documents: messages } = useCollection('messages')
  const { id: recipientId } = useParams()
  const { recipientError, document: recipient } = useDocument('users', recipientId)
  const [newMessage, setNewMessage] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(newMessage)
  }

  if (recipientError) {
    return <div className="error">{recipientError}</div>
  }
  if (!recipient) {
    return <div className="loading">Loading...</div>
  }

  if (messagesError) {
    return <div className="error">{messagesError}</div>
  }
  if (!recipient) {
    return <div className="loading">Loading...</div>
  }

  console.log(messages)

  return (
    <div>
      <h2 className="page-title">Chat with {recipient.displayName}</h2>

      <div className="message-list">
        <ul>
          {!messages && <p>No messages yet!</p>}
          {messages && messages.map(message => (
            <li key={message.id}>
              <div className="message-author">
                <p>from {message.fromUserDisplayName} to {message.toUserDisplayName}</p>
              </div>
              <div className="message-content">
                <p>{message.content}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>


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
