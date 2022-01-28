const path = require('path');
const Event = require('../structs/templates/Event');

class ready extends Event {
	constructor(client) {
		super(client, {
			listener: true,
		});
	}

	async run() {
		this.client.loadSlashCommands();

		const time = (await this.client.stopwatch.stop()) / 100;
		this.client.support.database = this.client.channels.cache.get(this.client.config.support.logs.database);
		this.client.support.commands = this.client.channels.cache.get(this.client.config.support.logs.commands);
		this.client.support.errors = this.client.channels.cache.get(this.client.config.support.logs.errors);
		this.client.support.status = this.client.channels.cache.get(this.client.config.support.logs.status);


		this.client.logger.startup(`Loaded ${this.client.commands.size} commands`);
		this.client.logger.startup(`Loaded ${this.client.commands.slash.size} slash commands`);
		this.client.logger.startup(`Loaded ${this.client.events.size} events`);
		this.client.logger.startup('Connected to the Discord API');
		this.client.logger.startup(`Logged into as ${this.client.user.tag} on ${this.client.guilds.cache.size} servers`);
		this.client.user.setPresence({
			activities: [{
				name: this.client.config.status.name,
				type: this.client.config.status.type,
			}],
			status: 'idle',
		});
		this.client.logger.startup(`Startup Time: ${time} seconds`);
		// this.client.logger.log(`You can use this link to invite this bot to your server ${this.client.generateInvite()}`)
		if (this.client.config.debug) {
			this.client.startCLI();
		}

	}
}
module.exports = ready;