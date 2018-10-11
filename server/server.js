
const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const {generateMessage, generateLocationMessage} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
   console.log('New user connected.');
    socket.on('disconnect', () => {
        console.log('User disconnected.');
        socket.broadcast.emit('newMessage', generateMessage("Admin", "A User Disconnected."));
    });

    socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app"));
    socket.broadcast.emit('newMessage', {
        from: "Admin",
        text: "New User Connected.",
        createdAt: new Date().getTime()
    });
    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback(message);
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// APP
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
server.listen(port, () => {
    console.log(`Started on port ${port}`);
})