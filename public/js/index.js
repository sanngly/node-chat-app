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
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);  
});

socket.emit('createMessage', {
  from: 'reach.sanjoy.ganguly@gmail.com',
  text: 'That works for me.'
}, function (data) {
  console.log('Got It Gotchha!.', data);
}); 

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name="message"]').val()
  }, function () {
    
  }); 

});
