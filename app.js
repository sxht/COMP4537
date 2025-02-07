const http = require('http');
const url = require('url');
const fs = require('fs');
const api = require('./COMP4537/labs/4/modules/utils');
const en = require('./COMP4537/labs/4/lang/en/en');

let reqCounter = 0;

http.createServer((req, res) => {
    const q = url.parse(req.url, true);

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "GET" && q.pathname.startsWith("/api/definitions/")) {
        reqCounter++;
        console.log("GET request sent");

        const word = q.query.word;
        const entry = api.getDefinition(word);

        res.writeHead(200);
        res.end(JSON.stringify({
            reqCounter,
            entry: entry || en.notFound
        }));

    } else if (req.method === "POST" && q.pathname.startsWith("/api/definitions/")) {
        reqCounter++;
        console.log("POST request sent");

        if (req.headers["access-control-request-method"]) {
            res.writeHead(204);
            return res.end();
        }

        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            try {
                const params = new URLSearchParams(body);
                const word = params.get("word");
                const definition = params.get("definition");

                if (!word || !definition) {
                    throw new Error("Missing required fields: 'word' and 'definition'");
                }

                const response = api.addDefinition(word, definition, reqCounter);
                res.writeHead(201);
                res.end(JSON.stringify({ reqCounter, response }));

            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ reqCounter, error: error.message }));
            }
        });

    } else {
        reqCounter++;
        res.writeHead(404);
        res.end(JSON.stringify({ reqCounter, error: "404: Not Found" }));
    }

}).listen(8080, () => {
    console.log('Listening on port 8080...');
});
