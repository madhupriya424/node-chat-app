// a.attr: here if we provide the one value then it will fetch the value and return value Otherwise if we provide it two values then it will set values.
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
            var formattedTime = moment(message.createdAt).format('h:mm a');
            // console.log('newMessage', message);
            var li = jQuery('<li></li>');
            li.text(`${message.from} ${formattedTime}: ${message.text}`);

            jQuery('#messages').append(li);
        });

        socket.on('newLocationMessage', function(message){
            var formattedTime = moment(message.createdAt).format('h:mm a');
            var li = jQuery('<li></li>');
            var a = jQuery('<a target="_blank">My current location</a>'); //a target="_blank": it will help to open map in new tab.

            li.text(`${message.from} ${formattedTime}: `);
            a.attr('href', message.url);   //above*
            li.append(a);
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

            var messageTextBox = jQuery('[name=message]');

            socket.emit('createMessage', {     //socket.emit used to send data to particular people and io.emit used to send in all chats
                from: 'User',
                text: messageTextBox.val()
            }, function() {
                messageTextBox.val('')
            });
        });

        var locationButton = jQuery('#send-location');
        locationButton.on('click', function(){
            if(!navigator.geolocation){
                return alert('Geolocation not supported by your browser.');
            }
             
            locationButton.attr('disabled', 'disabled').text('Send location...');

            navigator.geolocation.getCurrentPosition(function(position){
                locationButton.removeAttr('disabled');
                
                socket.emit('createLocationMessage', {
                   latitude: position.coords.latitude,
                   longitude: position.coords.longitude
                });
            }, function(){
                locationButton.removeAttr('disabled');
                alert('Unable to fetch location.');
            });
        });



        // socket.on('newMessage', function(message){
        //     console.log('New message in client', message);
        // });