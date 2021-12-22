const glob = require("glob"),
	path = require("path"),
	Event = require('../../lib/structs/Event');

class ready extends Event {
	constructor(client) {
	    super(client, {
            listener: true,
        });
    }

	async run() {
		const time = (await this.client.startup.stop()) / 100;
		this.client.logger.startup(`Loaded ${this.client.commands.size} commands`)
		this.client.logger.startup(`Loaded ${this.client.events.size} events`);
        this.client.logger.startup(`Connected to the Discord API`);
        this.client.logger.startup(`Logged into as ${this.client.user.tag} on ${this.client.guilds.cache.size} servers`);
		this.client.user.setPresence({
			activities: [{ 
				name: this.client.config.status.name,
				type: this.client.config.status.type
			}], 
			status: 'idle' 
		});
		this.client.logger.startup(`Startup Time: ${time} seconds`)
		// this.client.logger.log(`You can use this link to invite this bot to your server ${this.client.generateInvite()}`)
        if (this.client.config.debug) {
			this.client.startCLI();
		}

	}
}
module.exports = ready;