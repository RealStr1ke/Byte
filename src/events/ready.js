module.exports = class {

	constructor (client) {
		this.client = client;
	}

	async run() {
		// let slashCommands = this.client.slashHandler.getCommands('./src/slash/');
        // this.client.logger.log(`Loaded ${this.client.listenerHandler.modules.size} listeners`);
        // this.client.logger.log(`Loaded ${this.client.inhibitorHandler.modules.size} inhibitors`);
        // this.client.logger.log(`Loaded ${this.client.commandHandler.modules.size} commands`);
        // this.client.log.log(`Loaded ${slashCommands.length} slash commands`);
        this.client.presence.set({
            status: 'online',
            activity: {
                name: `${this.client.prefix}help | ${this.client.guilds.cache.size} servers`,
                type: 'WATCHING'
            }
        });
        this.client.logger.success(`Connected to the Discord API`);
        this.client.logger.success(`Presence Set`);
        this.client.logger.success(`Logged into as ${this.client.user.tag}`);
		this.client.logger.success(`Ready to serve ${this.client.users.cache.size} users in ${this.client.guilds.cache.size} servers`);
		// this.client.log.log(`You can use this link to invite this bot to your server ${this.client.generateInvite()}`)
        if (this.client.config.debug) {
			this.client.startCLI();
		}
	}
};  