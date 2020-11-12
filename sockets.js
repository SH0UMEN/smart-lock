const fs = require('fs');

module.exports = function () {
    const server = require('http').createServer(function (req, res) {
        console.log(req.url);

        if (req.url === "/favicon.ico") {
            res.writeHead(404);
            res.end();
            return;
        }

        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        fs.createReadStream('index.html').pipe(res);
    });

    server.listen(80);

// WebSockets
    const wsServer = require('http').createServer();
    const io = require('socket.io')(wsServer, {
        cors: {
            origin: '*',
            credentials: true
        },
    });

    wsServer.listen(3000);

    return io;
}