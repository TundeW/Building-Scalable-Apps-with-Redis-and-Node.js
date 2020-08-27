const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000, ()=> console.log('Serving running on port', 8000));

  console.log(`Worker ${process.pid} started`);
}



/*
 * Complete the timeConversion function below.
 */
function timeConversion(s) {
  /*
   * Write your code here.
   */
  let s = '07:03:15PM'
  var PM = time.match('PM') ? true : false
  
  time = time.split(':')
  var min = time[1]
  
  if (PM) {
      var hour = 12 + parseInt(time[0],10)
      var sec = time[2].replace('PM', '')
  } else {
      var hour = time[0]
      var sec = time[2].replace('AM', '')
  }
console.log(hour + ':' + min + ':' + sec)
}
console.log(timeConversion)