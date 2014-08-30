var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    WebSocketServer = require('ws').Server;

var Player = require('./player'),
    Match = require('./match');

app.use(express.static(__dirname));

var wsServer = new WebSocketServer({
    server: server
});

var players = {};
var lobby = [];
var matches = {};

var findOpponent = function(newOpponent) {
    if (lobby.length) {
        var existingOpponent = lobby.pop();
        var match = new Match(existingOpponent, newOpponent);
        matches[match.getToken()] = match;
        match.begin();
    } else {
        lobby.push(newOpponent)
    }
};

wsServer.on('connection', function(connection) {
    var newPlayer = new Player(connection),
        token = newPlayer.getToken();
    players[token] = newPlayer;
    console.log("Added connection", token, ".", "Total Players:", Object.keys(players).length)
    connection.send(JSON.stringify({
        action: "new-token",
        data: token
    }));
    connection.on('message', function(data) {
        var message = JSON.parse(data);
        switch (message.action) {
            case "new-game-request":
                findOpponent(newPlayer);
                break;
            case "solution-reached":
                matches[message.data].end();
                break;
            default:
                console.log("Unexpected action", message);
        }
    });

    connection.on('close', function(connection) {
        delete players[token];
        console.log("Removings connection", token, ".", "Total Players:", Object.keys(players).length);
    });
});


server.listen(1337);
