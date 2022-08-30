const Command = require('../../../structs/templates/Command');
const { EmbedBuilder } = require('discord.js');
const path = require('path');

class ShutdownCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'shutdown',
			description : 'Shuts the bot down.',
			usage       : 'shutdown',
			args        : false,
			directory   : __dirname,
			aliases     : ['stop', 'quit'],
			userPerms   : 'SEND_MESSAGES',
			ownerOnly   : true,
		});
	}

	async run(message) {
		const ShutDownEmbed = new EmbedBuilder()
			.setTitle('🔴 **Bot is now shutting down.**')
			.setFooter({
				text: `Requested by ${message.author.tag} • ${this.client.config.embed.footer}`,
				iconURL: this.client.user.displayAvatarURL(),
			})
			.setColor(this.client.config.embed.color)
			.setTimestamp();
		message.channel.send({
			embeds: [ShutDownEmbed],
		});
		await this.client.utils.sleep(1);
		await this.client.destroy();
		await this.client.utils.sleep(1);
		await process.exit();
	}
}

module.exports = ShutdownCommand;