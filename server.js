var WebSocketServer = require('websocket').server,
    express = require('express'),
    app = express();

app.use(express.static(__dirname));

wsServer = new WebSocketServer({
    httpServer: app
});


var connections = [];

var matches = [];


wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);
    connections.push(connection);
    console.log(connection);
    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            // process WebSocket message
        }
    });

    connection.on('close', function(connection) {
        var index = connections.indexOf(connection);
        if (index != -1) {
            connections.splice(index, 1);
        }
    });
});


app.listen(1337);
