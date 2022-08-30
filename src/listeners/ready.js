const Event = require('../structs/templates/Event');
const { EmbedBuilder } = require('discord.js');
const path = require('path');

class ready extends Event {
	constructor(client) {
		super(client, {
			listener: true,
		});
	}

	async run() {
		this.client.status = true;
		this.client.loadSlashCommands();

		const time = (await this.client.stopwatch.stop()) / 100;

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

		const StartupEmbed = new EmbedBuilder()
			.setTitle('**Online**')
			.setColor('GREEN')
			.setTimestamp();
		const StatusLog = this.client.channels.cache.get(this.client.support.status);
		StatusLog.send({
			embeds: [StartupEmbed],
		});

		this.client.logger.startup(`Startup Time: ${time} seconds`);
		// this.client.logger.log(`You can use this link to invite this bot to your server ${this.client.generateInvite()}`)
		// if (this.client.config.debug) this.client.startCLI();

	}
}
module.exports = ready;