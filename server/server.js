//to install express
//Just like express makes very easy to set http server, socket io makes it much more easy to create http server.
//create a frontend which will interact with web server. Socket provide library for frontend and backend also. 
//help to make connection to transfer or send data whether it is client to server or server to client. 
// newEmail Event (server to client) - (from, text, createdAt)
// createEmail Event (client to server) - (to, text, schedule Timestamp) 
//Broadcasting different way to emit event on servers.It is a term to emit an event to server and to everybody but one specific user.
//In this viseo we deploy our node app to live using heroku

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.Port || 3000;    //for heroku configuration
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {   // here server print "New User connected" message.
    console.log('New User connected server'); //whenever user connected to the app it will print message in the console.
 //lets u register the event listener we can listen to specific event and do something when that event happen. 

// socket.emit('newEmail', {
//     from : 'mike@example.com', 
//     text : 'Hey. What is going on',
//     createdAt : 123

//    socket.emit('newMessage', {  //emit to a single connection
//     from: 'mike@example.com',
//     text: 'Hey. What is going on',
//     createdAt: '123'
//    });


// socket.on('createEmail', (newEmail) => {
//     console.log('createEmail', newEmail);
// });
 
//socket.emit from Admin text welcome to chatApp
socket.emit('newMessage', {
    from : 'Admin', 
    text : 'Welcome to chat App',
    createdAt: new Date().getTime()
});

//socket.broadcast.emit from Admin text New User joined
socket.broadcast.emit('newMessage', {
    from : 'Admin', 
    text : 'New User Joined',
    createdAt: new Date().getTime()
});

socket.on('createMessage', (message, callback) => {
    console.log('Message is created on server', message);
    io.emit('newMessage', generateMessage(message.from, message.text));  
    callback();
});
 
// io.emit('newMessage', {   //emit to every single connection
    //  from: message.from,
    //  text: message.text,
    //  createdAt: new Date().getTime()
    // }); 

    // socket.broadcast.emit('newMessage', {  ////everyone will get this message other than this.
    //     from: message.from,
    //      text: message.text,
    //      createdAt: new Date().getTime()
    // });
  
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

socket.on('disconnect', function(){
    console.log('User was disconnected server')
});
});

server.listen(port, function() {              //behind the scene it will call "http.createServer(app);" method 
    console.log(`Server is up on port ${port}`);
});

//Here we will make http by ourself so that we can able to connect our socket to it.
//npm i Socket.io@1.4.8 --save
//configure server to also make use of socket io