
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
const {isRealString} = require('./utils/validation');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        socket.broadcast.emit('newMessage', generateMessage("Admin", "A User Disconnected."));
    });

    socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app"));
    socket.broadcast.emit('newMessage', generateMessage("Admin", "New User Connected."));

    socket.on('join', (params, callback) => {
       if(!isRealString(params.name) || !isRealString(params.room)) {
           callback('Name and Room are required.');
       } else {
           callback();
       }
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