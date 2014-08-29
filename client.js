var button = document.getElementById('newGameButton')
// button.addEventListener("click", function)

window.WebSocket = window.WebSocket || window.MozWebSocket;

var Game = function() {};
Game.prototype.connect = function() {
    var connection = new WebSocket('ws://127.0.0.1:1337');
    connection.onopen = function() {
        // connection is opened and ready to use
    };

    connection.onerror = function(error) {
        // an error occurred when sending/receiving data
    };

    connection.onmessage = function(message) {
        // try to decode json (I assume that each message from server is json)
        try {
            var json = JSON.parse(message.data);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message.data);
            return;
        }
        // handle incoming message
    };
}
