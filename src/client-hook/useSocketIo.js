import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';

const socket = io('http://localhost:3030');
const app = feathers();

// Set up Socket.io client with the socket
app.configure(socketio(socket));

// Receive real-time events through Socket.io
// app.service('messages')
//   .on('created', message => console.log('New message created', message));

// Call the `messages` service
// app.service('messages').create({
//   text: 'A message from a REST client'
// });

export default app;