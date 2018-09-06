import React from 'react';
import Message from './Message.jsx';

const MessageList = ({ messages }) => {
  const messageListItems = messages.map(message =>
  <Message key={message.id} username={message.username} content={message.content}/>)
return (
  <div className="message-list">
    <ul>{messageListItems}</ul>
  </div>
);
}

export default MessageList;
