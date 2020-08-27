var amqp = require('amqplib');
// var rabbit = amqp.createConnection();


// rabbit.on('ready', function(){
//     rabbit.exchange('credit_charge', {autoDelete: false}, function(ex){
//         rabbit.queue('charge', {autoDelete: false}, function(q){ 
//             q.bind('credit_charge', 'charge'); 
//             q.subscribe(function(message, headers, deliveryInfo, messageObject){
//                 setTimeout(function(){
//                     console.log(message);
//                     console.log(headers);
//                     console.log(deliveryInfo); 
//                     ex.publish(deliveryInfo.replyTo, {message: 'done'}, {headers: headers}); 
//                 }, 1500);
//             }); 
//         });
//     }); 
// });


amqp.connect('amqp://localhost').then(function(conn) {
  let channel = null;
  return conn.createChannel()
    .then( ch => {
        channel = ch;
        ch.assertExchange('credit_charge', 'direct', {autoDelete: false})
    })
    .then(function(ex) {
        console.log('#########################, worker')
        return channel.assertQueue('charge', {autoDelete: false})
    })
    .then((q)=>{
        console.log('#########################, worker')

        return channel.bindQueue('charge', 'credit_charge', 'charge')

    })
    .then( ok => {
        console.log('#########################, worker')

        return channel.consume('charge', function(message) {
            setTimeout(()=>{
                console.log(" [x] Received '%s'", message.content.toString());
                channel.publish('credit_charge', message.properties.replyTo, Buffer.from('done'), {headers: message.properties.headers});    
            },1500);
          }, {noAck: false})
    })
    .then ((consumerTag) => {
        console.log(' [*] #########################, worker')
        console.log(consumerTag);
    })
    .finally(function() { 
    //   conn.close(); 
    });
})
  .catch(console.warn);