var rabbitPromise = require('./rabbit'), config = require('../config'), q = require('q');

async function queueSetup(channel){
    // rabbit.queue('debug.log', {autoDelete: false}, function(q){
    //     q.bind(config.rabbitMQ.exchange, '*.log');
    //     q.close(); 
    // });

    // rabbit.queue('error.log', {autoDelete: false}, function(q){ 
    //     q.bind(config.rabbitMQ.exchange, 'error.log');
    //     q.close();
    // }); 

    const first_queue = await channel.assertQueue('debug.log', {autoDelete: false})
    channel.bindQueue(first_queue.queue, config.rabbitMQ.exchange, '*.log' )

    const second_queue = await channel.assertQueue('error.log', {autoDelete: false})
    channel.bindQueue(second_queue.queue, config.rabbitMQ.exchange, 'error.log' )

}

let channel = null;

module.exports = q.Promise(function(resolve, reject, notify){ 
    rabbitPromise.done(function(ch){
        channel = ch;
        ch.assertExchange(config.rabbitMQ.exchange, 'topic', {autoDelete: false})
        .then( ex => {
            queueSetup(channel);
            resolve({channel, ex});
        })
       
    }); 
});






