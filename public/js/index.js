var socket = io(); //method loaded from the above library.here we are making the req from the client server to open up the web socket and keep the connection open.

        socket.on('connect', () => {
            console.log('Connected to server client'); //client prints "Connected to server" message on console.
        
        // socket.emit('createMessage', {
        //     from: 'jen@example.com',
        //     text: 'Hey. This is Madhu'
        // });
    });
        socket.on('disconnect', () => {
            console.log('Disconnected from server client');
        });

        // socket.on('newEmail', function(name){
        //     console.log('New email',name);
        // });
        socket.on('newMessage', function(message){
            console.log('New message in client', message);
        });