
const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
   console.log('New user connected.');
    socket.on('disconnect', () => {
        console.log('User disconnected.');
    });

    socket.on('createMessage', (message) => {
        var now = Date.now();
        message['createdAt'] = now;
        socket.emit('newMessage', message);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// APP
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
server.listen(port, () => {
    console.log(`Started on port ${port}`);
})