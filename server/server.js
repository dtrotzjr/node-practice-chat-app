
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
        socket.broadcast.emit('newMessage', {
            from: "Admin",
            text: "A User Disconnected.",
            createdAt: new Date().getTime()
        });
    });

    socket.emit('newMessage', {
        from: "Admin",
        text: "Welcome to the chat app",
        createdAt: new Date().getTime()
    });
    socket.broadcast.emit('newMessage', {
        from: "Admin",
        text: "New User Connected.",
        createdAt: new Date().getTime()
    });
    socket.on('createMessage', (message) => {
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// APP
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
server.listen(port, () => {
    console.log(`Started on port ${port}`);
})