// let http = require('http');
// // let amqp = require('amqplib')
// let amqp = require('amqp'); 
// let rabbit = amqp.createConnection({ 
//   port: 15672,
//   username: 'guest',
//   login: 'guest',
//   password: 'guest'
// });

// // add this for better debuging
// rabbit.on('error', function(e) {
//   console.log("Error from amqp: ", e);
// });

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

// // function startServer(ch) {
// //   var server = http.createServer(function(req, res){ 
// //       console.log(req.url);
// //       // ex.publish('first-queue', {
// //       //     message: req.url
// //       // });
// //       res.writeHead(200, {'Content-Type': 'text/html'});
// //       res.end('<h1>Simple HTTP Server in Node.js!</h1>'); 
// //   });
// //   server.listen(8001); 
// // }

// // amqp.connect('amqp://localhost').then(function(conn) {
// //   return conn.createChannel()
// //     .then(function(ch) {
// //       startServer(ch);
// //     })
// //     .finally(function() { 
// //       conn.close(); 
// //     });
// // })
// //   .catch(console.warn);
   

