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
        this.client.logger.success(`Connected to the Discord API`);
        this.client.logger.success(`Logged into as ${this.client.user.tag}`);
        this.client.logger.success(`🟢 The bot is online.`);
		this.client.user.setPresence({
			activities: [{ 
				// name: `${this.client.prefix}help | ${this.client.guilds.cache.size} servers`,
				name: `${this.client.prefix}help`,
                type: 'WATCHING'
			}], 
			status: 'idle' 
		});
		
        this.client.logger.success(`Presence Set`);
		this.client.logger.success(`Ready to serve ${this.client.guilds.cache.size} servers`);
		this.client.logger.log(`You can use this link to invite this bot to your server ${this.client.generateInvite()}`)
        if (this.client.config.debug) {
			this.client.startCLI();
		}
	}
}
module.exports = ready;