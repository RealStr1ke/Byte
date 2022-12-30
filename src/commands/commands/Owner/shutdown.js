const { SlashCommandBuilder } = require('@discordjs/builders');
const Slash = require('../../../structs/templates/Slash');
const { EmbedBuilder } = require('discord.js');
const path = require('path');

class ShutdownCommand extends Slash {

	constructor(client) {
		super(client, {
			name        : 'shutdown',
			description : 'Shuts the bot down.',
			usage       : 'shutdown',
			directory   : __dirname,
			userPerms   : 'SendMessages',
			ownerOnly   : true,
		});
	}

	async run(interaction) {
		const ShutDownEmbed = new EmbedBuilder()
			.setTitle('🔴 **Bot is now shutting down.**')
			.setColor(this.client.config.embed.color)
			.setFooter({
				text: `Requested by ${interaction.user.username} • ${this.client.config.embed.footer}`,
				iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }),
			})
			.setTimestamp();
		interaction.reply({
			embeds: [ShutDownEmbed],
		});

		await this.client.utils.sleep(1);
		await this.client.destroy();
		await this.client.utils.sleep(1);
		return await process.exit();
	}

	command() {
		const command = new SlashCommandBuilder()
			.setName(this.name)
			.setDescription(this.description)
			.setDefaultPermission(true);
		return command;
	}
}

module.exports = ShutdownCommand;