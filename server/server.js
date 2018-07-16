//to install express
//Just like express makes very easy to set http server, socket io makes it much more easy to create http server.
//create a frontend which will interact with web server. Socket provide library for frontend and backend also. 
//help to make connection to transfer or send data whether it is client to server or server to client. 
// newEmail Event (server to client) - (from, text, createdAt)
// createEmail Event (client to server) - (to, text, schedule Timestamp) 

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

//const {generateMessage} = require('./utils/message');
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

   socket.emit('newMessage', {
    from: 'mike@example.com',
    text: 'Hey. What is going on',
    createdAt: '123'
   });


// socket.on('createEmail', (newEmail) => {
//     console.log('createEmail', newEmail);
// });

socket.on('createMessage', (message) => {
    console.log('Message is created on server', message);
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