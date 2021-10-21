const WebSocketServer = require('ws').WebSocketServer;
const { getEntries } = require('./database');

let wss;

function startWebServer() {
  if (wss) {
    console.warn('WebServer already running');
    return;
  }
  const port = process.env.PORT || 8080;
  console.log('Starting WebServer on port ' + port);
  wss = new WebSocketServer({
    port,
  });

  wss.on('connection', function connection(ws) {
    console.log('New client connected');
    ws.on('message', function incoming(message) {
      const { command } = JSON.parse(message);
      console.log('Received command: ' + command);
      switch (command) {
        case 'ping':
          ws.send('pong');
          break;
        case 'entries':
          ws.send(JSON.stringify(getEntries()));
          break;
        default:
          console.error('Unknown command: ' + command);
          break;
      }
    });
  });
}

function showEntry(entry) {
  console.log(entry);
  for (const client of wss.clients) {
    client.send(JSON.stringify(entry));
  }
}

module.exports = {
  startWebServer,
  showEntry,
};
