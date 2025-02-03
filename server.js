const http = require('http');
const url = require('url');
const utils = require('./COMP4537/labs/3/modules/utils');
const en = require('./COMP4537/labs/3/lang/en/en');
const fs = require('fs');

http.createServer(function (req, res) {
    console.log("connected")
    const q = url.parse(req.url, true);
    if(q.pathname == '/COMP4537/labs/3/getDate/'){
        const name = q.query.name;
        const message = `<p style="color: blue">${en.message.replace("%1", name)} ${utils.getDate()}</p>`;
        res.writeHead(200, {'Content-type':'text/html'});
        res.end(message);
    } else if(q.pathname == '/COMP4537/labs/3/writeFile/'){

    } else if(q.pathname == '/COMP4537/labs/3/readFile/'){

    }
    
}).listen(8080, () => {
    console.log('listening ...');
})

//https://yourDomainName.xyz/COMP4537/labs/3/getDate/?name=John**