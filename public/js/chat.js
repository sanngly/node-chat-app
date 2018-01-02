//var moment = require('moment');

var socket = io();

function scrollToBottom() {
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');

  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  } 
}
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

  var params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function(err) {
    if(err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    };
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newEmail', function (email) {
  console.log('New email', email);
});

socket.on('newMessage', function (message) {
  /* var formattedTimestamp = moment(message.createdAt).format('h:mm a');
  console.log('New message', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from} ${formattedTimestamp}: ${message.text}`);
  jQuery('#messages').append(li); */  

  var template = jQuery('#message-template').html();
  var formattedTimestamp = moment(message.createdAt).format('h:mm a');
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTimestamp
  });
  jQuery('#messages').append(html);  
  scrollToBottom();   
});

socket.on('newLocationMessage', function (message) {
  /* var formattedTimestamp = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Current Location</a>');
  li.text(`${message.from}: ${formattedTimestamp} `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li); */  

  var locationTemplate = jQuery('#location-message-template').html();
  var formattedTimestamp = moment(message.createdAt).format('h:mm a');
  var html = Mustache.render(locationTemplate, {
    from: message.from,
    createdAt: formattedTimestamp,
    url: message.url
  });
  jQuery('#messages').append(html);
  scrollToBottom()
});

socket.emit('createMessage', {
  from: 'reach.sanjoy.ganguly@gmail.com',
  text: 'That works for me.'
}, function (data) {
  console.log('Got It Gotchha!.', data);
}); 

var messageTextBox = jQuery('[name="message"]');
jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('');
  });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('geolocation not supported by your browser.');
  }
  locationButton.attr('disabled', 'disabled').text('Sending Location...');
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send Location');
    //console.log(position);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send Location');
    console.log('Unable to fetch the location');
  });
});