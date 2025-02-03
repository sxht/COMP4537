const http = require('http');
const url = require('url');
const utils = require('./modules/utils');
const en = require('./lang/en/en');

http.createServer(function (req, res) {
    const q = url.parse(req.url, true);
    const name = q.query.name;
    const message = `<p style="color: blue">${en.greeting.replace("%1", name)} $utils.getDate()}</p>`;
    res.writeHead(200, {'Content-type':'text/html'});
    res.end(message);
}).listen(process.env.PORT, "0.0.0.0", () => {
    console.log('listening ...');
})

//https://yourDomainName.xyz/COMP4537/labs/3/getDate/?name=John**