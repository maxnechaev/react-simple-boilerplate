import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: '',
      username: '',
      content: '',
      errors: []
    };
  }
  render() {
    return (

      <form onSubmit={this._handleSubmit}>

      <div className="error">
        <span>{this.state.errors.map(err =>
          <div key={err}>{err}</div>
        )}
        </span>
      </div>

        <div className="chatbar">
          <input
            type="text"
            className="chatbar-username"
            id="username"
            placeholder="Enter username"
            value={this.state.username}
            onChange={this._usernameChanged}
          />

          <input
            type="text"
            className="chatbar-message"
            id="content"
            placeholder="Type a message and hit ENTER"
            value={this.state.content}
            onChange={this._contentChanged}
          />
          <button type="submit">
          Submit
          </button>
        </div>

      </form>
    );
  }

  _handleSubmit = event => {
    event.preventDefault();
    const errors = [];

    if (this.state.content === '') {
      errors.push('Message field cannot be empty');
    }
    if (errors.length !== 0) {
      this.setState({ errors });
      return;
    }

    const message = {
      username: this.state.username,
      content: this.state.content
    };

    this.props.addMessage(message);

    this.setState({
      errors: [],
      currentUser: username,
      content: ''
    });
    (".chatbar-message").focus;
  };

  _usernameChanged = event => {
    this.setState({ username: event.target.value });
  };

  _contentChanged = event => {
    this.setState({ content: event.target.value });
  };
}

export default ChatBar;
