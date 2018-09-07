import React, { Component } from 'react';
import Message from './Message.jsx';

function MessageList(props){
  const messageListItems = props.messages.map((message) =>
    <Message
      key={message.id}
      type={message.type}
      username={message.username}
      content={message.content}
      color={message.color}
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
