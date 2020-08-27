var PacktChat = window.PacktChat || {}; 
PacktChat.Chat = function(el){
    var $root = $('#' + el),
    socket = io.connect("http://localhost:3000/packtchat"), 
    me = null,
    connected = false;
    //to be initialized
    var router,
    roomsCollection, 
    userCollection, 
    chatCollection;
    var GetMe = function GetMe(user){ 
        me = new User(user); 
        Backbone.history.stop(); 
        startChat(me); 
        Backbone.history.start(); 
        connected = true;
    };

    socket.on('connect', function(){
        if (!connected) {
            socket.emit('GetMe');
        }
    });

    socket.on('GetMe', GetMe);
}