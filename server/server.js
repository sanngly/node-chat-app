const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));
var users = new Users();

io.on('connection', (socket) => {
  console.log('New user connected.');
  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and Room name is required.');
    }
    socket.join(params.room);
    users.removeUser(socket.id);

    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('Admin','Welcome to node-chat-app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined into node-chat-app`));

    callback();
  });

  /* socket.on('createMessage', (newMessage, callback) => {
    console.log('createMessage', newMessage);
    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    callback('This is from the server');
    socket.broadcast.emit('newMessage', generateMessage(newMessage.from,newMessage.text)); 
  }); */

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} has left.`));
    }
    //console.log('User was disconnected from server');
  });
});
//.coords
server.listen(3000, () => console.log(`node-chat app listening on port ${port}!.`));
