import React, { Component } from 'react';
import { animateScroll } from "react-scroll";
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
// import {v4 as uuid} from 'uuid';

// let nextId = 3;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    username: this.props.username,
      messages: []
    };
    this.addMessage = this.addMessage.bind(this);
  }



  componentDidMount() {
    let ws = new WebSocket("ws://localhost:3001");
    let connections = ws;
    this.connections = ws;

    ws.onopen = event => {
      console.log('Connected to server!');
    };


    let thisComponent = this;


    ws.onmessage = event => {
      var message = JSON.parse(event.data);
      console.log('here sent from the app to server', JSON.parse(event.data));
        // var content = "";
        // debugger;
        // switch(message.type) {
        //   case "id":
        //     id = message.id;
        //     break;
        //   case "userId":
        //     id = message.userId;
        //     // setUsername();
        //     break;
        //   case "username":
        //     username = message.username;
        //     break;
        //   case "message":
        //     content = message.tontent;
        //     break;
        // }
        thisComponent.setState({ messages: [...this.state.messages, message] }, this.scrollToBottom);


    };
  }

  addMessage(message) {
    this.connections.send(JSON.stringify(message));
  };


  scrollToBottom() {
    animateScroll.scrollToBottom({
      id: message.id
    });
  }

  render() {
    return (
      <main>
        <nav className="navbar">
          <a href="#" className="navbar-brand">
            Chatty
          </a>
        </nav>
        <div className="container">
          <MessageList messages={this.state.messages} />
          <ChatBar addMessage={this.addMessage} />
        </div>
      </main>
    );
  }

}

export default App;
