import { useState } from 'react'
import { timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"
import { useParams } from 'react-router-dom'
import { useCollection } from '../../hooks/useCollection'
import { useDocument } from '../../hooks/useDocument'

// styles and components
import './Message.css'
import MessageList from './MessageList'

export default function Message() {
  const { messagesError, documents: messages } = useCollection('messages')
  const { addDocument, response } = useFirestore('messages')
  const { id: recipientId } = useParams()
  const { recipientError, document: recipient } = useDocument('users', recipientId)
  const [newMessage, setNewMessage] = useState('')
  const { user } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newAuthor = {
      displayName: user.displayName,
      id: user.uid,
      photoURL: user.photoURL,
    }

    const newRecipient = {
      displayName: recipient.displayName,
      id: recipient.id,
      photoURL: recipient.photoURL,
    }

    const messageToAdd = {
      author: newAuthor,
      recipient: newRecipient,
      content: newMessage,
      createdAt: timestamp.fromDate(new Date())
    }

    console.log(messageToAdd)

    await addDocument(messageToAdd)
    if (!response.error) {
      setNewMessage('')
    }
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
  if (!messages) {
    return <div className="loading">Loading messages...</div>
  }


  return (
    <div>
      <h2 className="page-title">Message with {recipient.displayName}</h2>

      <MessageList messages={messages}/>

      <form className="send-message" onSubmit={handleSubmit}>
        <label>
          <span>Send a message:</span>
          <input
            required
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
        </label>
        <button className="btn">Send Message</button>
      </form>
    </div>

  )
}
