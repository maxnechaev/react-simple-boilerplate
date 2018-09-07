import React, { Component } from 'react';

class Message extends Component {
  render(){
    const { username, content, color } = this.props;
    return (
      <div className="message">
        <span id="username" className="message-username">
          {username}
        </span>
        <span id="message" className="message-content">
          {content}
        </span>
      </div>
    );
  }
}

export default Message;

// // dangerouslySetInnerHTML={{__html: message.content}}
