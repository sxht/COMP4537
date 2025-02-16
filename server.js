const http = require('http');
const url = require('url');
const utils = require('./COMP4537/labs/3/modules/utils');
const en = require('./COMP4537/labs/3/lang/en/en');
const fs = require('fs');

http.createServer(function (req, res) {

    const q = url.parse(req.url, true);

    if(q.pathname == '/COMP4537/labs/3/getDate/'){
        const message = `<p style="color: blue">${en.message.replace("%1", q.query.name)} ${utils.getDate()}</p>`;
        const greeter = new Greeter(message)
        greeter.greet(res);
        
    } else if (q.pathname.includes("File")){

        const filewriter = new FileWriter(q.pathname, q.query.text)

        if(q.pathname == '/COMP4537/labs/3/writeFile/'){
            filewriter.write(res)
        } else if(q.pathname.indexOf('/COMP4537/labs/3/readFile/') === 0){
            filewriter.read(res)
        }
    }
}).listen(8080, () => {
    console.log('listening ...');
})

class Greeter{
    constructor(message){
        this.message = message;
    }
    greet(res) {
        res.writeHead(200, {'Content-Type':'text/html', "Access-Control-Allow-Origin":"*"});
        res.end(this.message);
    }
}

class FileWriter{
    constructor(pathname, text){
        this.pathname = pathname;
        this.text = text;
        this.file = 'file.txt'
    }
    write(res){
        if(!fs.existsSync(this.file)){
            fs.writeFileSync(this.file, this.text, 'utf8');
            console.log('file created');
        } else{
            fs.appendFile(this.file, this.text, (err)=> {
                console.log(err);
            });
            console.log("file appended")
        }
        res.end();
    }
    read(res){
        this.file = this.pathname.replace('/COMP4537/labs/3/readFile/', '');
            fs.readFile(this.file, (err,data) => {
                if(err){
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    return res.end(`<h1>404: Your file [${this.file}] is not found!</h1>`);
                }
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            })
            console.log("file read")
    }
}