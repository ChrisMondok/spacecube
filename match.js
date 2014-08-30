var uuid = require('node-uuid');

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
        var message = {
            action: 'start-game',
            data: this.token
        };
        this.opponent1.connection.send(JSON.stringify(message));
        this.opponent2.connection.send(JSON.stringify(message));
    };
    Match.prototype.end = function(winningOpponent) {
        var winningMessage = {
            action: 'end-game',
            data: 'You Win!'
        };
        var losingMessage = {
            action: 'end-game',
            data: 'You Lose!'
        };
        if (this.opponent1 == winningOpponent) {
            this.opponent1.connection.send(JSON.stringify(winningMessage));
            this.opponent2.connection.send(JSON.stringify(losingMessage));
        } else {
            this.opponent1.connection.send(JSON.stringify(losingMessage));
            this.opponent2.connection.send(JSON.stringify(winningMessage));
        }
    }
    return Match;
})();


module.exports = Match;
