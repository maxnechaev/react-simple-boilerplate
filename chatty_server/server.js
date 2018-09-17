const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');
const randomColor = require('randomcolor');

const PORT = 3001;
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// setting initial number of online users
let usersOnline = 0;

const wss = new SocketServer({ server });

// on client connection event handler
wss.on('connection', (ws) => {
  console.log('Client connected');

// incrementing users online tag with each user connection
  usersOnline++;

// broadcasting number of online users to everybody
  wss.broadcast(JSON.stringify({
    type: 'usersOnline',
    usersOnline: usersOnline
  }));

// broadcasting users' username colors to everyone online
  ws.send(JSON.stringify({
    type: 'color',
    color: randomColor()
  }));

// on incoming message handler: system notification or chat message
  ws.on('message', function incoming(data) {
    const message = JSON.parse(data);

    switch (message.type) {
      case 'postNotification':
        message.type = 'incomingNotification';
        break;

      case 'postMessage':
        message.id = uuid();
        message.type = 'incomingMessage';
        break;

      default:
        throw new Error('Unknown event type ' + data.type);
    }

    wss.broadcast(JSON.stringify(message));
  });

// on client disconnection event handler
  ws.on('close', () => {
    console.log('Client disconnected')
    usersOnline--;
  });
});

// broadcasting the message back to the chat for everyone to see
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    {
      client.send(data);
    }
  });
};
