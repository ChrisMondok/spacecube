var Message = (function() {
	var Message = function(action, data) {
		this.action = action;
		this.data = data;
	};
	Message.prototype.toString = function() {
		return JSON.stringify({
			action: this.action,
			data: this.data
		});
	};
	return Message;
})()

module.exports = Message;
