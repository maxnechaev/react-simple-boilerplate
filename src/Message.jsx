import React, {Component} from 'react';

class Message extends React.Component {
  render() {
    return <li>{this.props.type}</li>;
  }
}
export default Message;
