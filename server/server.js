const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected.');
  /* socket.emit('newEmail', generateMessage('reach.sanjoy.ganguly@gmail.com',
  'Hi, I am sending invitation for Zensar Interview')); */
  /* socket.emit('newMessage', generateMessage('Sardar','Hi, Today it is holiday today')); */
  /* socket.on('createEmail', (newEmail) => {
    console.log('createEmail', newEmail);
  }); */

  socket.emit('newMessage', generateMessage('admin@node-chat-app.in','Welcome to node-chat-app'));

  socket.broadcast.emit('newMessage', generateMessage('admin@node-chat-app.in', 'New user joined into node-chat-app'));

  socket.on('createMessage', (newMessage) => {
    console.log('createMessage', newMessage);
    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));

    /* socket.broadcast.emit('newMessage', generateMessage(newMessage.from,newMessage.text)); */
  });
  socket.on('disconnect', () => {
    console.log('User was disconnected from server');
  });
});

server.listen(3000, () => console.log(`node-chat app listening on port ${port}!.`));
