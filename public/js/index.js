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

socket.emit('createMessage', {
   from: 'Frank',
   text: 'Hi'
}, function (response) {
    console.log(`Got it. ${response}`);
});

jQuery('#message-form').on('submit', function (evt) {
    evt.preventDefault();

    socket.emit('createMessage', {
       from:'User',
       text:jQuery('[name=message]').val()
    }, function () {

    });
});