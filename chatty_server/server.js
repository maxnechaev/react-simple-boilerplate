const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));


let wss = new SocketServer({ server });
let clients = {};
wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    client.send(data);
  });
};

const clientConnected = (client, clientId) => {
  // Create client data
  clients[clientId] = {
    id: clientId,
    username: clientId.username

  };

  // Setup message to be sent to the client
  // Includes all currently connected clients
  const setupMsg = {
    type: 'setup',
    data: {
      id: clientId,
      connectedClients: clients
    }
  };

  // Connection message to be sent to the client
  // Tells the client who they are
  const connectionMsg = {
    type: 'connection',
    data: clients[clientId]
  };

  if (client.readyState === client.OPEN) {
    client.send(JSON.stringify(setupMsg));
  }
  wss.broadcast(JSON.stringify(connectionMsg));
  console.log(`>> ${clients[clientId].username}`, clients[clientId])
};

const clientDisconected = clientId => {
  const client = clients[clientId];

  if (!client) return;

  const disconnectionMsg = {
    type: 'disconnection',
    data: client
  };
  wss.broadcast(JSON.stringify(disconnectionMsg));
  console.log(`<< ${client.username} (${clientId}) disconnected`)
  delete clients[clientId];
};

const handleMessage = (incoming, client) => {
  // Broadcast message back no matter what
  wss.broadcast(incoming);

  // Catching race condition
  if (!client || typeof client.send !== 'function') return;

  const message = JSON.parse(incoming);
  switch (message.type) {
    case 'action':
      // Update client state based on id
      clients[message.data.id] = clients[message.data];
      break;

    case 'refresh':
      const setupMsg = {
        type: 'setup',
        data: {
          id: message.data.id,
          connectedClients: clients
        }
      };
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(setupMsg));
      }
      break;

    default:
      console.log(`Unsupported message:`, message)
  }
};

wss.on('connection', client => {
  console.log('Client connected');
  const clientId = uuid();
  const username = client.username;
  clientConnected(client, clientId);

  client.on('message', handleMessage, client);
  client.on('close', () => {
    clientDisconected(clientId);
  });



  // client.on('message', function incoming(message) {
  //   console.log(JSON.parse(message).username, ' sent ', JSON.parse(message).content);
  //   client.send(message);
  // });

  // client.on('close', () => console.log('Client disconnected'));
});
