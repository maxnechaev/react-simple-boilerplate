import React, {Component} from 'react';

function getMessages() {
  return new Promise(resolve => {
    setTimeout(resolve, 500);
  }).then(() =>
  [
    {
      type: "incomingMessage",
      content: "I won't be impressed with technology until I can download food.",
      username: "Anonymous1"
    },
    {
      type: "incomingNotification",
      content: "Anonymous1 changed their name to nomnom",
    },
    {
      type: "incomingMessage",
      content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
      username: "Anonymous2"
    },
    {
      type: "incomingMessage",
      content: "...",
      username: "nomnom"
    },
    {
      type: "incomingMessage",
      content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
      username: "Anonymous2"
    },
    {
      type: "incomingMessage",
      content: "This isn't funny. You're not funny",
      username: "nomnom"
    },
    {
      type: "incomingNotification",
      content: "Anonymous2 changed their name to NotFunny",
    },
  ]
);
}

class MessageList extends Component {
  // constructor(props) {
  //   super();
  //   this.state = { messages };
  //     }
    componentDidMount() {
    getMessages().then(messages => {
      this.setState({
        messages
      });
    });
    console.log("HERE", this);
  }
  render() {
    // const messageListItems = this.state.messages.map(message => {
    //   return <Message type={message} />;
    // });
    return (
      <h1>Hi there</h1>
      // <ul>{messageListItems}</ul>
);
}
}
export default MessageList;
