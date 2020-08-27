let http = require('http');
let amqp = require('amqplib')
// let amqp = require('amqp'); 
// let rabbit = amqp.createConnection();


// function startServer(ex) {
//   var server = http.createServer(function(req, res){ 
//       console.log(req.url);
//       ex.publish('first-queue', {
//           message: req.url
//       });
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.end('<h1>Simple HTTP Server in Node.js!</h1>'); 
//   });
//   server.listen(8001); 
// }

// rabbit.on('ready', function(){
//     rabbit.exchange('my-first-exchange', {
//         type: 'direct', 
//         autoDelete: false
//     }, 
//     function(ex){ 
//         startServer(ex);
//     }); 
// });

function startServer(ch, ex) {
  var server = http.createServer(function(req, res){ 
      console.log(req.url);
      
      ch.publish('my-first-exchange', 'first-queue', Buffer.from(req.url));
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('<h1>Simple HTTP Server in Node.js!</h1>'); 
  });
  server.listen(8001); 
}

amqp.connect('amqp://localhost').then(function(conn) {
  return conn.createChannel()
    .then(function(ch) {
        ch.assertExchange('my-first-exchange', 'direct', {autoDelete: false})
        .then(function(ex){
            startServer(ch, ex);
        })
        .catch(e => { console.log(e)})
    })
    .finally(function() { 
    //   conn.close(); 
    });
})
  .catch(console.warn);
   

// var http = require('http'), amqp = require('amqp');
// var rabbit = amqp.createConnection();

// rabbit.on('ready', function(){
// rabbit.exchange('my-first-exchange', {type: 'direct', autoDelete:false}, function(ex){ 
//     startServer(ex);
//   }); 
// });


// function startServer(ex) {
//   var server = http.createServer(function(req, res){ 
//     console.log(req.url);
//     ex.publish('first-queue', {message: req.url});
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end('<h1>Simple HTTP Server in Node.js!</h1>'); 
//   });
//   server.listen(8001); 
// }

