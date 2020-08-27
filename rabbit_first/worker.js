// var amqp = require('amqp');
let amqp = require('amqplib')


// var rabbit = amqp.createConnection();
// rabbit.on('ready', function(){
//     rabbit.queue('first-queue-name', {autoDelete: false}, function(q){
//         q.bind('my-first-exchange', 'first-queue');
//         q.subscribe(function(message, headers, deliveryInfo, messageObject){
//             console.log(message);  
//             console.log(headers); 
//             console.log(deliveryInfo); 
//             console.log(messageObject);
//         }); 
//     });
// });

amqp.connect('amqp://localhost').then(function(conn) {
  let channel = null;
  return conn.createChannel()
    .then(function(ch) {
        console.log('#########################, firts')
        channel = ch;
        return ch.assertQueue('first-queue-name', {autoDelete: false})
    })
    .then((q)=>{
        console.log('#########################, firts')

        return channel.bindQueue('first-queue-name', 'my-first-exchange', 'first-queue')

    })
    .then( ok => {
        console.log('#########################, firts')

        return channel.consume('first-queue-name', function(message) {
            console.log(" [x] Received '%s'", message.content.toString());
            console.log(" [x] Received '%s'", Object.keys(message)); 
            console.log(" [x] Received '%s'", Object.keys(message.fields)); 
            console.log(" [x] Received '%s'", message.properties.headers);
          }, {noAck: false})
    })
    .then ((consumerTag) => {
        console.log(' [*] #########################, firts')
        console.log(consumerTag);
    })
    .finally(function() { 
    //   conn.close(); 
    });
})
  .catch(console.warn);



// var amqp = require('amqp');
// var rabbit = amqp.createConnection();
// rabbit.on('ready', function(){
//     rabbit.queue('first-queue-name', {autoDelete: false}, function(q){
//         q.bind('my-first-exchange', 'first-queue');
//         q.subscribe(function(message, headers, deliveryInfo, messageObject){
//             console.log(message); console.log(headers); console.log(deliveryInfo); console.log(messageObject);
//         }); 
//     });
// });