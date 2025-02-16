require('dotenv').config();
const dbPassword = process.env.DB_PASSWORD;
console.log("Database password:", dbPassword);

// ChatGPT was used to assist in this file
const mysql = require('mysql2');
const http = require('http');
const url = require('url');
const GET = 'GET';
const POST = 'POST';
const endPointRoot = '/api/v1/sql/'
const PORT = 8000;

const db = mysql.createConnection({
    host: 'db-mysql-sfo3-12197-do-user-18796691-0.g.db.ondigitalocean.com',
    user: 'doadmin',
    password: process.env.DB_PASSWORD,
    database: 'defaultdb',
    port: 25060,
    ssl: { rejectUnauthorized: false}
});

db.connect(function(err) {
    if (err) throw err;
    console.log('Connected!');
})


function cleanQuery(query) {
    if (!query || typeof query !== 'string') return null;

    // Trim and remove extra spaces
    query = query.trim();

    if ((query.startsWith("'") && query.endsWith("'")) || (query.startsWith('"') && query.endsWith('"'))) {
        query = query.slice(1, -1);
    }

    // Ensure the query starts with "SELECT"
    if (query.toUpperCase().startsWith('SELECT') || query.toUpperCase().startsWith('INSERT')) {
        return query;
    }
    
    return null;
}

function checkDB(){
    const createTable = `CREATE TABLE IF NOT EXISTS patients (
    patientid INT(11) PRIMARY KEY,
    name VARCHAR(100),
    dateOfBirth DATETIME
    );`
    console.log("IN checkDB")
    db.query(createTable, (err, data) =>{
        if(err){
            console.log(err)
            return res.end(err);
        }
        console.log(data);
    })
}

http.createServer(function (req, res) {
    res.writeHead(200, {
        "Content-type": 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
    });

    if (req.method === GET) {
        checkDB()
        const q = url.parse(req.url, true);
        const sqlQuery = cleanQuery(q.query["query"]);
        console.log("q.query: ", q.query)
        console.log("sqlQuery: ", sqlQuery)
        if (!sqlQuery || sqlQuery.split(' ')[0].toLowerCase() !== 'select') {
            const serverRes = {
                status: 400,
                message: 'Please provide a valid select query'
            }
            console.error("Invalid query: ", sqlQuery)
            return res.end(JSON.stringify(serverRes));
        }
        console.log("Query:", sqlQuery);

        db.query(sqlQuery, (err, data) => {
            if (err) {
                const serverRes = {
                    status: 404,
                    message: "Error querying database",
                    err
                }
                return res.end(JSON.stringify(serverRes));
            }
            return res.end(JSON.stringify(data));
        });
    }
    if (req.method === POST && req.url === endPointRoot) {
        checkDB()
        let body = '';
        req.on('data', function (chunk) {
            if (chunk != null) {
                body += chunk;
            }
        });

        req.on('end', function() {
            const sqlQuery = decodeURIComponent(body.trim().replace(/^userQuery=/, ""));
            console.log(sqlQuery);

            if (!sqlQuery) {
                const serverRes = {
                    status: 400,
                    message: 'Missing user query'
                }
                return res.end(JSON.stringify(serverRes));
            }
            
            db.query(sqlQuery, (err, data) => {
                if (err) {
                    console.error("MySQL error: ", err)
                    return res.end(JSON.stringify(serverRes));
                }
                const serverRes = {
                    status: 200,
                    message: 'Successfully inserted 1 new row'
                }
                return res.end(JSON.stringify(serverRes));
            });
        })
    }
}).listen(PORT);
console.log(`Listening on port ${PORT}`);
