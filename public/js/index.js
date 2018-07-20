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

        socket.on('newMessage', function(message){
            console.log('newMessage', message);
            var li = jQuery('<li></li>');
            li.text(`${message.from}: ${message.text}`);

            jQuery('#messages').append(li);
        });

        // socket.emit('createMessage', {
        //     from: 'Frank',
        //     text: 'Hi'
        // }, function(data) {
        //     console.log('Got it', data);
        // });

        // socket.on('newEmail', function(name){
        //     console.log('New email',name);
        // });

        jQuery('#message-form').on('submit', function(e){
            e.preventDefault();    //to prevent the default behaviour

            socket.emit('createMessage', {
                from: 'User',
                text: jQuery('[name=message]').val()
            }, function() {

            });
        });

        var locationButton = jQuery('#send-location');
        locationButton.on('click', function(){
            if(!navigator.geolocation){
                return alert('Geolocation not supported by your browser.');
            }

            navigator.geolocation.getCurrentPosition(function(position){
               socket.emit('createLocationMessage', {
                   latitude: position.coords.latitude,
                   longitude: position.coords.longitude
               });
            }, function(){
                alert('Unable to fetch location.');
            });
        });



        // socket.on('newMessage', function(message){
        //     console.log('New message in client', message);
        // });