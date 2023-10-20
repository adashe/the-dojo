import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCollection } from '../../hooks/useCollection'
import { useDocument } from '../../hooks/useDocument'

// styles and components
import './Message.css'
import MessageList from './MessageList'

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


  return (
    <div>
      <h2 className="page-title">Message with {recipient.displayName}</h2>

      <MessageList messages={messages}/>

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
