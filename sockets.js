module.exports = function () {
    const server = require('http').createServer();
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
            credentials: true
        },
    });

    server.listen(80);

    return io;
}