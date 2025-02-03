const http = require('http');
const url = require('url');
const utils = require('./modules/utils');

http.createServer(function (req, res) {
    const q = url.parse(req.url, true);
    res.writeHead(200, {'Content-type':'text/html'});
    const message = `<p style="color: blue">Hello ${q.query.name}. What a beautiful day. Server current date and time is ${utils.getDate()}</p>`
    res.end(message);
});

server.listen(process.env.PORT, "0.0.0.0", () => {
    console.log('listening ...');
})

//https://yourDomainName.xyz/COMP4537/labs/3/getDate/?name=John**