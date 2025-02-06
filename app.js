const http = require('http');
const url = require('url');
const fs = require('fs');
const api = require('./COMP4537/labs/4/modules/utils');
const en = require('./COMP4537/labs/4/lang/en/en');

http.createServer(function (req, res) {

    const q = url.parse(req.url, true);

    if(req.method==="GET" && q.pathname.includes("/api/definitions/")){
        console.log("get request sent")
        const word = q.query.word
        const definition = api.getDefinition(word);

        res.writeHead(200, {'Content-Type':'text/html', 
            "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Methods":"*"
        });

        if(definition){
            res.end(`<p>${definition}</p>`);
        } else{
            res.end(`<p>${en.notFound}</p>`);
        }

    } else if(req.method==="POST" && q.pathname.includes("/api/definitions/")){
        console.log("Post request sent")
        if(req.headers["access-control-request-method"]){
            res.setHeader("Access-Control-Allow-Origin","*");
            res.setHeader("Access-Control-Allow-Methods","POST");
            res.end();
        } else{
            let query ="";
            req.on("data", function(chunk){
                query+=chunk;
            });
            req.on("end", function() {
                let params = new URLSearchParams(query);
                let word = params.get("word");
                res.setHeader("Content-Type", "text/plain")
                res.setHeader("Access-Control-Allow-Origin","*");
                res.write(api.addDefinition(word));
                res.end();
            })
        }
    }
}).listen(8080, () => {
    console.log('listening ...');
})