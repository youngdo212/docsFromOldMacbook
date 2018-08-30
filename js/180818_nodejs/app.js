const http = require('http');
const fs = require('fs');
const url = require('url');

const hostname = '127.0.0.1'
const port = 3000;

const server = http.createServer((req, res) => {

  fs.readFile('./login/index.html', (err, data) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write('hello, world');
    res.end();
  })
})

server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}/`)
})