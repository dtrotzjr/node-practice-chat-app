
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

const {Users} = require('./utils/users');
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        const user = users.removeUser(socket.id);
        io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        io.to(user.room).emit('newMessage', generateMessage("Admin", `${user.name} has left the room.`));
    });

    socket.on('join', (params, callback) => {
       if(!isRealString(params.name) || !isRealString(params.room)) {
           callback('Name and Room are required.');
       } else {
           socket.join(params.room);
           users.removeUser(socket.id);
           users.addUser(socket.id, params.name, params.room);

           io.to(params.room).emit('updateUserList', users.getUserList(params.room));

           socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app"));
           socket.broadcast.to(params.room).emit('newMessage', generateMessage("Admin", `${params.name} has joined room.`));

           callback();
       }
    });

    socket.on('createMessage', (message, callback) => {
        const instance = users.getUser(socket.id);
        io.to(instance.room).emit('newMessage', generateMessage(message.from, message.text));
        callback(message);
    });

    socket.on('createLocationMessage', (coords) => {
        const instance = users.getUser(socket.id);
        io.to(instance.room).emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// APP
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
server.listen(port, () => {
    console.log(`Started on port ${port}`);
})