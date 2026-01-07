const WebSocket = require('ws');

// Connect to the event service WebSocket
// Default port for event_service is usually 3011 based on main.ts
const ws = new WebSocket('ws://localhost:3011');

ws.on('open', function open() {
    console.log('Connected to WebSocket server!');

    // Send a test message if needed, or just wait for logs
    // ws.send(JSON.stringify({ event: 'events', data: 'test' }));
});

ws.on('message', function incoming(data) {
    console.log('Received:', data);
});

ws.on('close', function close() {
    console.log('Disconnected from WebSocket server');
});

ws.on('error', function error(err) {
    console.error('WebSocket error:', err.message);
    console.log('Make sure the event_service is running on port 3011');
});
