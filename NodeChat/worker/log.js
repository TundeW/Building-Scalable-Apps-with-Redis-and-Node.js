var rabbitPromise = require('../queue/rabbit'), config = require('../config');

rabbitPromise.done(async function(channel){ 
    channel.prefetch(1)
    const debug_queue = await channel.assertQueue('debug.log', {autoDelete: false});
    channel.bindQueue(debug_queue.queue, config.rabbitMQ.exchange, '*.log');
    channel.consume(debug_queue.queue, function(message) {
            // console.log(" [x] Received '%s'", message.content.toString());
            console.log(`Debug-Routing:  ${message.fields.routingKey} ${message.content.toString()}`);
            channel.ackAll();
            // channel.reject(message);
      }, {noAck: false})
      .then ((consumerTag) => {
        console.log(' [*] #########################, worker')
        console.log(consumerTag);
    })


    const error_queue = await channel.assertQueue('error.log', {autoDelete: false});
    channel.bindQueue(error_queue.queue, config.rabbitMQ.exchange, 'error.log');
    channel.consume(error_queue.queue, function(message) {
            // console.log(" [x] Received '%s'", message.content.toString());
            console.log(`Debug-Routing:  ${message.fields.routingKey} ${message.content.toString()}`);
            channel.ackAll();
      }, {noAck: false})
      .then ((consumerTag) => {
        console.log(' [*] #########################, worker')
        console.log(consumerTag);
    })
});

