import React, { Component } from 'react';

function ChatBar(props){

  const _usernameChanged = event =>{
    if (event.key == 'Tab') {
      props._usernameChanged(event.target.value);
    }
  }
  const _contentChanged = event => {
      if (event.key == 'Enter') {
      props.postMessage(event.target.value);
      }
    };

     return (
        <div className="chatbar">
          <input
            type="text"
            className="chatbar-username"
            id="username"
            placeholder="Enter username"
            onKeyDown={_usernameChanged}
          />

          <input
            type="text"
            className="chatbar-message"
            id="content"
            placeholder="Type a message and hit ENTER"
            onKeyDown={_contentChanged}
          />
          <button type="submit">
            Submit
          </button>
        </div>
  );
}

export default ChatBar;
