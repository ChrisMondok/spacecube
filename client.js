window.WebSocket = window.WebSocket || window.MozWebSocket;

var toggleItem = function(item, show) {
    if (show)
        item.classList.remove('invisible');
    else
        item.classList.add('invisible');
}

var toggleMenu = function(show) {
    var menu = document.getElementById('menu');
    toggleItem(menu, show);
};

var toggleStatus = function(show, message) {
    var status = document.getElementById('status');
    if (message)
        status.innerText = message;

    toggleItem(status, show);
}

var newGameButton = document.getElementById('newGameButton');
var demoButton = document.getElementById('demoButton');
var tempEndGameButton = document.getElementById('tempEndGameButton');

newGameButton.addEventListener("click", function() {
    G = new Game();
    G.connect(function(game) {
        toggleStatus(true, "Finding a player");
        game.startNewGame();
    });
    toggleMenu(false);
    toggleStatus(true, "Connecting");
});

demoButton.addEventListener("click", function() {
    toggleMenu(false);
});

tempEndGameButton.addEventListener("click", function() {
    G.sendSolution();
});

var Game = function() {};
Game.prototype.connect = function(callback) {
    this.connection = new WebSocket('ws://mds-1nl6ds1:1337');
    var self = this;
    this.connection.onopen = function() {
        callback(self);
    };

    this.connection.onerror = function(error) {
        console.log(error);
    };

    this.connection.onmessage = function(message) {
        try {
            var data = JSON.parse(message.data);
        } catch (e) {
            console.error('INVALID JSON: ', message.data);
            return;
        }
        switch (data.action) {
            case "new-token":
                console.log(data)
                self.token = data.data;
                break;
            case "new-game":
                console.log(data);
                break;
            case "start-game":
                self.matchId = data.data;
                toggleStatus(true, "Start Game");
                break;
            case "end-game":
                toggleStatus(true, data.data);
                break;
            default:
                console.log("Unexpected action", data);
        }
    };
}

Game.prototype.startNewGame = function() {
    this.connection.send(JSON.stringify({
        action: "new-game-request"
    }));
};
Game.prototype.sendSolution = function() {
    this.connection.send(JSON.stringify({
        action: "solution-reached",
        data: this.matchId
    }));
};
