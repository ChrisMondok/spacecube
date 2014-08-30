var uuid = require('node-uuid');

var Player = (function() {
    var Player = function(connection) {
        this.token = uuid.v1();
        connection.id = this.token;
        this.connection = connection;
    }
    Player.prototype.getToken = function() {
        return this.token;
    }
    Player.prototype.issueNewToken = function() {
        this.token = uuid.v1();
        return this.token;
    }

    return Player;
})();


module.exports = Player;
