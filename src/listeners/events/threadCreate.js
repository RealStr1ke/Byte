const Event = require('../../structs/templates/Event');

class threadCreate extends Event {
	constructor(client) {
		super(client);
	}

	async run(thread) {
		return await thread.join();
	}
}
module.exports = threadCreate;
