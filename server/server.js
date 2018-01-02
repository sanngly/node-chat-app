const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
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
 
  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      callback('Name and Room name is required.');
    }
    socket.join(params.room);
    socket.emit('newMessage', generateMessage('admin@node-chat-app.in','Welcome to node-chat-app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin@node-chat-app.in', `${params.name} joined into node-chat-app`));

    callback();
  });

  socket.on('createMessage', (newMessage, callback) => {
    console.log('createMessage', newMessage);
    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    callback('This is from the server');
    /* socket.broadcast.emit('newMessage', generateMessage(newMessage.from,newMessage.text)); */
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected from server');
  });
});
//.coords
server.listen(3000, () => console.log(`node-chat app listening on port ${port}!.`));
