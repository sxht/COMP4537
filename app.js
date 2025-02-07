const http = require('http');
const url = require('url');
const fs = require('fs');
const api = require('./COMP4537/labs/4/modules/utils');
const en = require('./COMP4537/labs/4/lang/en/en');
let reqCounter = 0;

http.createServer(function (req, res) {
    const q = url.parse(req.url, true);

    if(req.method==="GET" && q.pathname.includes("/api/definitions/")){
        reqCounter++;
        console.log("GET request sent")
        const word = q.query.word
        const entry = api.getDefinition(word);

        res.writeHead(200, {'Content-Type':'application/json', 
            "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Methods":"*"
        });

        if(entry!=null){
            console.log("Entry found")
            res.end(JSON.stringify({"reqCounter": reqCounter, "entry": entry}));
        } else{
            console.log("Entry not found")
            res.end(en.notFound.replace("%1", reqCounter));
        }

    } else if(req.method==="POST" && q.pathname.includes("/api/definitions/")){
        reqCounter++;
        console.log("Post request sent")
        if(req.headers["access-control-request-method"]){
            res.setHeader("Access-Control-Allow-Origin","*");
            res.setHeader("Access-Control-Allow-Methods","POST");
            res.end("\nRequest# " + reqCounter);
        } else{
            let query ="";
            req.on("data", function(chunk){
                query+=chunk;
            });
            req.on("end", function() {
                let params = new URLSearchParams(query);
                let word = params.get("word");
                let definition = params.get("definition")
                res.setHeader("Content-Type", "text/plain")
                res.setHeader("Access-Control-Allow-Origin","*");
                res.write(api.addDefinition(word, definition, reqCounter));
                res.end();
            })
        }
    }
}).listen(8080, () => {
    console.log('listening ...');
})