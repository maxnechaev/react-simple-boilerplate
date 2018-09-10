import React, { Component } from 'react';
import { animateScroll } from "react-scroll";
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {
        username: "Anonymous"
      },
      messages: [],
      notification: "",
      usersOnline: 0,
      color: ""
    };
  }

  componentDidMount() {
    this.ws = new WebSocket("ws://localhost:3001");
    this.ws.onopen = () => {
      console.log('Connected to server');
    };

    this.ws.onmessage = event => {

      const data = JSON.parse(event.data);

      switch (data.type) {
        case 'incomingNotification':
          this.setState(
            { messages: [...this.state.messages, data] },
            this.scrollToBottom,
          );
          break;

        case 'incomingMessage':
          this.setState(
            { messages: [...this.state.messages, data] },
            this.scrollToBottom,
          );
          break;

        case 'usersOnline':
          this.setState(
            { usersOnline: data.usersOnline }
          );
          break;

        case 'color':
          this.setState(
            { color: data.color }
          );
          break;

        default:
          throw new Error("Unknown event type " + data.type);
      }
    }
  }

  usernameChanged = username => {
    const prevUsername = this.state.currentUser.username;

    this.setState({
      currentUser: {
        username: username
      }
    });

    const nameChange = prevUsername + " changed username to " + username;

    const notification = {
      type: "postNotification",
      content: nameChange
    }

    const postNotification = (message) => {
      this.ws.send(JSON.stringify(message));
    }
    postNotification(notification);

  };

  postMessage = content => {
    let message = {
      type: "postMessage",
      username: this.state.currentUser.username,
      content: content,
      color: this.state.color
    }

    if (content.length > 0) {
      this.ws.send(JSON.stringify(message));
    }
  };

  scrollToBottom() {
    animateScroll.scrollToBottom();
  }

  render() {

    return (
      <div>
        <nav className="navbar">
          <a href="#" className="navbar-brand">Chatty (▰˘◡˘▰)</a>
          <span id="usersOnline">
            {this.state.usersOnline} user(s) online
          </span>
          <img id="onlineSign" src="build/_ionicons_svg_md-checkmark-circle-outline.svg"></img>
        </nav>

        <MessageList
          messages={this.state.messages}
          notificationMsg={this.state.notification}
        />

        <ChatBar
          currentUser={this.state.currentUser.username}
          postMessage={this.postMessage}
          usernameChanged={this.usernameChanged}
          />
      </div>
    );
  }
}
export default App;
