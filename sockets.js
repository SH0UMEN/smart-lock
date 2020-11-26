module.exports = function () {
    const server = require('http').createServer();
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
            credentials: true
        },
    });

    server.listen(process.env.PORT);
    console.log(process.env.PORT);

    return io;
}