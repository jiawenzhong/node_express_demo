const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // // read the html file in the publi folder
    // if(req.url === '/') {
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), 
    //     (err, content) => {
    //         if(err) throw err;
    //         // set it to status 200, with html content
    //         res.writeHead(200, { 'Content_Type': 'text/html' });
    //         // load the page with the content in the file
    //         res.end(content);
    //     }); 
    // }
    // // fetch data in database
    // if(req.url === '/api/users') {
    //     const users = [
    //         { name: 'Bob Smith', age: 40},
    //         { name: 'John Doe', age: 30}
    //     ]
    //     res.writeHead(200, { 'Content_Type': 'application/json' });
    //     res.end(JSON.stringify(users));
    // }

    // build file path
    let filePath = path.join(__dirname, 'public',  req.url === '/' ?
    'index.html' : req.url);
    console.log(filePath);

    // extension of file
    let extname = path.extname(filePath);

    // initial content type
    let contenType = 'text/html';

    // check ext and set content type
    switch(extname) {
        case '.js':
            contenType = 'text/javascript';
            break;
        case '.css':
            contenType = 'text/css';
            break;
        case '.json':
            contenType = 'application/json';
            break;
        case '.png':
            contenType = 'image/png';
            break;
        case '.jpg':
            contenType = 'image/jpg';
            break;
    }

    // read file
    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code === 'ENOENT') {
                // page is not found
                fs.readFile(path.join(__dirname, 'public', '404.html'),
                (err, content) => {
                    res.writeHead(200, { 'Content_Type': 'text/html' });
                    res.end(content, 'utf8');
                });
            } else {
                // some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            } 
        }else {
            // success
            res.writeHead(200, { 'Content_Type': contenType });
            res.end(content, 'utf8');

        }
    });
});

// look for env variable, if not found, then run on 5000
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));