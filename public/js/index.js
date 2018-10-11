const  socket = io();
socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
   console.log(`New message from: ${message.from}`);
   console.log(`              at: ${new Date(message.createdAt)}`);
   console.log(`            text: ${message.text}`);
   const li = jQuery('<li></li>');
   li.text(`${message.from}: ${message.text}`);
   jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    const li = jQuery('<li></li>');
    const a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (evt) {
    evt.preventDefault();
    const messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
       from:'User',
       text:messageTextBox.val()
    }, function () {
        messageTextBox.val('')
    });
});

const locationButton = jQuery('#send-location');

locationButton.on('click', function () {
   if(!navigator.geolocation) {
       return alert('Geolocation not supported on your browser.');
   }

   locationButton.attr('disabled', 'disabled').text('Sending location...');
   navigator.geolocation.getCurrentPosition((position) => {
       locationButton.removeAttr('disabled').text('Send Location');
       socket.emit('createLocationMessage', {
           latitude:position.coords.latitude,
           longitude:position.coords.longitude,
       });
   },(error) => {
       locationButton.removeAttr('disabled').text('Send Location');
       alert('Can\'t determine your location.');
   })
});