
const WebSocket = require('ws');

// Integrate WebSocket with the HTTP server
const wss = new WebSocket.Server({ port: 8080 });

// Array to keep track of all connected clients
const clients = [];

wss.on('connection', function connection(ws) {
    console.log("WS connection arrived");

    // Add the new connection to our list of clients
    clients.push(ws);

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);

        // Broadcast the message to all clients
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                console.log("message",message.toString())
                client.send(message.toString());
            }
        });
    });

    ws.on('close', () => {
        // Remove the client from the array when it disconnects
        const index = clients.indexOf(ws);
        if (index > -1) {
            clients.splice(index, 1);
        }
    });

    // Send a welcome message on new connection
    ws.send('Welcome to the chat!');
});

console.log("The WebSocket server is running on port 8080");