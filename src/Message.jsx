import React, { Component } from 'react';

class Message extends Component {

  render() {
    const { id, username, content, error } = this.props;

      return (
        <li className="message">
          <div id="username" className="message-username">
            <span><strong>

            {username || "Anonymous"}

            </strong></span>
          </div>
          <div id="message" className="message-content">
            <span>{content}</span>
          </div>
        </li>
      );
    }
  }


export default Message;
