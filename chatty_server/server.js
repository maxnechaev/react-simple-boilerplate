const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');
const randomColor = require('randomcolor');

const PORT = 3001;
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

let usersOnline = 0;

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  usersOnline++;

  wss.broadcast(JSON.stringify({
    type: 'usersOnline',
    usersOnline: usersOnline
  }));

  ws.send(JSON.stringify({
    type: 'color',
    color: randomColor()
  }));

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

  ws.on('close', () => {
    console.log('Client disconnected')
    usersOnline--;
  });
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    {
      client.send(data);
    }
  });
};
