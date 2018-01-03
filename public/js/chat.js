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

socket.on('updateUserList', function (users) {
  var ol = jQuery('<ol></ol>');
  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);
});

socket.on('newMessage', function (message) {
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

/* socket.emit('createMessage', {
  from: 'reach.sanjoy.ganguly@gmail.com',
  text: 'That works for me.'
}, function (data) {
  console.log('Got It Gotchha!.', data);
});  */

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
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send Location');
    console.log('Unable to fetch the location');
  });
});