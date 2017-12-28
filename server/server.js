const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected.');
  socket.emit('newEmail', {
    from: 'reach.sanjoy.ganguly@gmail.com',
    text: 'Hi, I am sending invitation for Zensar Interview',
    createdAt: 68787
  });
  socket.emit('newMessage', {
    from: 'Sardar',
    text: 'Hi, Today it is holiday today',
    createdAt: 123123
  });
  socket.on('createEmail', (newEmail) => {
    console.log('createEmail', newEmail);
  });
  socket.on('createMessage', (newMessage) => {
    console.log('createMessage', newMessage);
    io.emit('newMessage', {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: new Date().getTime()
    });
  });
  socket.on('disconnect', () => {
    console.log('User was disconnected from server');
  });
});

server.listen(3000, () => console.log(`node-chat app listening on port ${port}!.`));
