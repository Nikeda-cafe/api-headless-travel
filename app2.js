// const { response } = require('express');
const http = require('http');

var server = http.createServer(
    (req,res) => {
        res.end('Hello Node')
    }
)

server.listen(3001)