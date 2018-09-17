import React, { Component } from 'react';
import Message from './Message.jsx';

// Mapping over the messages list
function MessageList(props){
  let time = new Date().toLocaleTimeString();
  const messageListItems = props.messages.map((message) =>
    <Message
      key={message.id}
      type={message.type}
      username={message.username}
      content={message.content}
      color={message.color}
      timeNow={time}
    />);
  return (
    <main className="messages">
      <div>
        {messageListItems}
      </div>
    </main>
  );
}

export default MessageList;
