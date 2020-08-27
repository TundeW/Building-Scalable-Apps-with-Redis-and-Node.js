var amqp = require('amqplib'), config = require('../config'), q = require('q');

module.exports = q.Promise(function(resolve, reject, notify){ 
    // var rabbit = amqp.createConnection(config.rabbitMQ.URL); 
    // rabbit.on('ready', function(){
    //    resolve(rabbit);
    // });

    amqp.connect('amqp://localhost').then(function(conn) {
    connection = conn;
    return conn.createChannel()
        .then(function(ch) {
            resolve(ch)
        })
        .finally(function() { 
        //   conn.close(); 
        });
    })
    .catch(console.warn);
});