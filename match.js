var uuid = require('node-uuid');
var Message = require('./message');

var Match = (function() {
    var Match = function(opponent1, opponent2) {
        this.token = uuid.v1();
        this.opponent1 = opponent1;
        this.opponent2 = opponent2;
    };
    Match.prototype.getToken = function() {
        return this.token;
    };
    Match.prototype.issueNewToken = function() {
        this.token = uuid.v1();
        return this.token;
    };
    Match.prototype.begin = function() {
        var message = new Message('start-game', this.token);
        this.opponent1.connection.send(message.toString());
        this.opponent2.connection.send(message.toString());
    };
    Match.prototype.end = function(winningOpponent) {
        var winningMessage = new Message('end-game', 'You Win!');
        var losingMessage = new Message('end-game', 'You Lose!');

        if (this.opponent1.getToken() == winningOpponent.getToken()) {
            this.opponent1.connection.send(winningMessage.toString());
            this.opponent2.connection.send(losingMessage.toString());
        } else {
            this.opponent1.connection.send(losingMessage.toString());
            this.opponent2.connection.send(winningMessage.toString());
        }
    }
    return Match;
})();


module.exports = Match;
