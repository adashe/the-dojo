import formatDistanceToNow from 'date-fns/formatDistanceToNow'

// styles
import './Message.css'

export default function MessageList({ messages }) {

  return (
    <div className="message-list">
      <ul>
        {!messages && <p>No messages yet!</p>}
        {messages && messages.map(message => (
          <li key={message.id}>
            <div className="message-author">
              <p>from {message.fromUserDisplayName} to {message.toUserDisplayName}</p>
            </div>
            <div className="message-date">
              <p>{formatDistanceToNow(message.createdAt.toDate(), { addSuffix: true })}</p>
            </div>
            <div className="message-content">
              <p>{message.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
