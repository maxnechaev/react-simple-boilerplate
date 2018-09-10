import React, { Component } from 'react';

function Message(props) {

  const { id, username, content, type, color, timeNow } = props;

    if (type == "incomingMessage"){
      return (
        <div className="message">
          <span className="currentTime">
            {timeNow}
          </span>
          <span id="username" className="message-username" style={{color: color}}>
            {username}
          </span>
          <span id="message" className="message-content">
            {content}
          </span>
        </div>
      )
    }

  if (type == "incomingNotification") {
      return (
        <div className="message">
          <span className="currentTime">
            {props.timeNow}
          </span>
          <span className="system notification message">
            {content}
          </span>
        </div>
      )
    }
}

export default Message;

// // dangerouslySetInnerHTML={{__html: message.content}}
