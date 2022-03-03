const Event = require('../structs/templates/Event');
class debug extends Event {
	constructor(client) {
		super(client);
	}

	async run(info) {
		if (!this.client.config.debug) return;
		return this.client.logger.debug(info);
	}
}

module.exports = debug;