const Event = require('../../structs/Event');

class threadCreate extends Event {
	constructor(client) {
        super(client);
    }

	async run(message, thread) {
		return thread.join();
	}
}
module.exports = threadCreate;
