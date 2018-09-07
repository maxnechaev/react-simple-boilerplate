import React, { Component } from 'react';

function ChatBar(props){

  const usernameChanged = event =>{
    if (event.keyCode == 9 || event.key == 'Enter') {
      props.usernameChanged(event.target.value);
    }
  }
  const contentChanged = event => {
    if (event.key == 'Enter') {
      props.postMessage(event.target.value);
      event.target.value = '';
    }
  };

  return (
    <div id="formInput" className="chatbar">
      <input
        type="text"
        className="chatbar-username"
        id="username"
        placeholder="Anonymous"
        style={props.color}
        onKeyDown={usernameChanged}
      />

      <input
        type="text"
        className="chatbar-message"
        id="content"
        value={props.content}
        placeholder="Type a message and hit ENTER"
        onKeyDown={contentChanged}
      />
    </div>
  );
}

export default ChatBar;
