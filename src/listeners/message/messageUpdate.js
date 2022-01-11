const Event = require('../../structs/Event');
class messageUpdate extends Event {
	constructor(client) {
		super(client);
	}

	async run(oldMessage, newMessage) {
		if (!newMessage.editedAt) return;
		this.client.emit('messageCreate', newMessage);
	}
}

module.exports = messageUpdate;