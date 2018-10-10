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
});