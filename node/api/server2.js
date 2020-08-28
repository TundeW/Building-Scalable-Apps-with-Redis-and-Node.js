const Http = require('http');
const fs = require('fs');
Http.createServer((req, res) => {
    console.log('########### INCOMING REQUEST:');;
    fs.appendFileSync('request.js', stringData);
    res.writeHead(200, { 'Content-Type':'application/json'});
    const resData = {
        status: 'Sucess',
        code: 200
    }
    const jsonResData = JSON.stringify(resData);
    res.end(jsonResData);
}).listen(4000);