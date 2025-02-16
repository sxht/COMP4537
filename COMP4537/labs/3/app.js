let http = require('http');
http.createServer(function (request, responce) {
    responce.writeHead(200, {'Content-type':'text/plain'});
    responce.write("Response's coming from server ... \n");
    responce.end();
}).listen(8080);
console.log('listening ...');

const mo = require('./modules/math');
console.log(`Hello Steven. The sum is ${mo.add(3,4)}`);