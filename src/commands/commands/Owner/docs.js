const Command = require('../../../structs/templates/Command');
const { EmbedBuilder } = require('discord.js');
const path = require('path');

class DocsCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'docs',
			description : 'Updates command documentation.',
			usage       : 'docs',
			args        : false,
			directory   : __dirname,
			aliases     : ['udc'],
			userPerms   : 'SendMessages',
			ownerOnly   : true,
		});
	}

	async run(message) {
		this.client.updateDocs();
		const DocsEmbed = new EmbedBuilder()
			.setTitle('Command documentation has been updated!')
			.setFooter({
				text: `Requested by ${message.author.tag} • ${this.client.config.embed.footer}`,
				iconURL: this.client.user.displayAvatarURL(),
			})
			.setColor(this.client.config.embed.color)
			.setTimestamp();
		return message.reply({
			embeds: [DocsEmbed],
		});

	}
}

module.exports = DocsCommand;