const express = require('express');
const ws = require('ws');
const app = express();
const port = 3000

// Set up a headless websocket server that prints any
// events that come in.
const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
  socket.on('message', (command) => {
    console.log('command received', command);

    switch(command) {
        case 'ping':
            socket.send(JSON.stringify({'command': 'pong'}));
        break;
    }
  });
});


// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
const server = app.listen(3000);
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});
