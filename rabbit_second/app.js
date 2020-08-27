var express = require('express'), amqp = require('amqplib'), io = require('socket.io');
var app = express(); 
app.use(express.static(__dirname)); 
// var rabbit = amqp.createConnection();

// function startServer(ex){ 
//     app.get('/credit_charge', function(req, res){
//         rabbit.queue('', {exclusive: true, autoDelete: true}, function(q){ 
//             q.bind('credit_charge', q.name);
//             ex.publish('charge', {card: 'details'}, {replyTo: q.name}); 
//             q.subscribe(function(message){
//                 console.log(message); 
//                 q.destroy();
//                 q.close();
//                 res.send('Charged! Thanks!');
//             }); 
//         });
//     });
//     var server = app.listen(8002); 
// };

function startServer(channel, ex){ 
    app.get('/credit_charge', function(req, res){
        let queue = null;
        channel.assertQueue('', {exclusive: true, autoDelete: true})
        .then(q => {
            queue = q;
            return channel.bindQueue(q.queue, 'credit_charge', q.queue)
        })
        .then( _ =>{
            console.log(' [*] #########################, fir', queue.queue)
            console.log(' [*] #########################, exchange', ex.exchange)
            // channel.publish('credit_charge', 'charge', Buffer.from({card: 'details'}));

            channel.publish("credit_charge", 'charge', Buffer.from(JSON.stringify({message: 'details'})), {replyTo: queue.queue});
            console.log(' [*] #########################, firt')
            channel.consume(queue.queue, function(message) {
                console.log(' [*] #########################, firts')
                console.log(" [x] Received '%s'", message.content.toString());
                // channel.deleteQueue(queue.queue);
                // conn.close();
                return res.send('Charged! Thanks!')
              }, {noAck: false})
              .then ((consumerTag) => {
                console.log(' [*] #########################, firts')
                console.log(consumerTag);      
            })
        })
        
        
    });
    var server = app.listen(8002); 

    io = io.listen(server);
    io.on('connection', function(socket){
        
        let queue = null;
        channel.assertQueue(socket.id, {exclusive: true, autoDelete: true})
        .then(q => {
            queue = q;
            return channel.bindQueue(q.queue, 'credit_charge', q.queue)
        })
        .then( ok => {
            channel.consume(queue.queue, function(message) {
                console.log(' [*] #########################, panrts', message.properties.headers)
                socket.emit(message.properties.headers.emitEvent);
              }, {noAck: false})
              .then ((consumerTag) => {
                console.log(' [*] #########################, firts')
                console.log(consumerTag);      
            })
        })

        socket.on('charge', function(data){
            // channel.publish('charge', {card: 'details'}, {replyTo: q.name, headers: {emitEvent: 'charged'}});
            channel.publish('credit_charge', 'charge', Buffer.from('details'), {replyTo: queue.queue, headers: {emitEvent: 'charged'}});    

        });
        
        socket.on('disconnect', function(){ 
            // channel.deleteQueue(queue.queue);
            // connection.close();
        });
    });
};


let connection = null;


amqp.connect('amqp://localhost').then(function(conn) {
    let channel = null;
    let exchange = null;
    connection = conn;
  return conn.createChannel()
    .then(function(ch) {
        channel = ch;
        ch.assertExchange('credit_charge', 'direct', {autoDelete: false})
        .then(function(ex){
            exchange = ex;
            return channel.assertQueue('charge', {autoDelete: false})
        })
        .then((q)=>{
            console.log('#########################, firts', q)
            return channel.bindQueue('charge', 'credit_charge', q.queue)
        })
        .then((q)=>{
            console.log('#########################, firts')
            // return conn.close(); 
    
        })
        .then(function(ok) {
            startServer(channel, exchange);
        })
        
        .catch(e => { console.log(e)})
    })
    .finally(function() { 
    //   conn.close(); 
    });
})
  .catch(console.warn);

