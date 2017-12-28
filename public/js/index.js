var socket = io();
socket.on('connect', function() {
  console.log('Connected to server');

/*   socket.emit('createEmail', {
    to: 'reach.sanjoy.ganguly@gmail.com',
    text: 'Hi, This is to inform you please stop making sound.'
  });

  socket.emit('createMessage', {
    From: 'reach.sanjoy.ganguly@gmail.com',
    text: 'That works for me.'
  }); */
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newEmail', function (email) {
  console.log('New email', email);
});

socket.on('newMessage', function (message) {
  console.log('New message', message);
});
