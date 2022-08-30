const Slash = require('../../structs/templates/Slash');
const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const path = require('path');

class PingCommand extends Slash {

	constructor(client) {
		super(client, {
			name        : 'ping',
			description : 'Shows the bot\'s connection status to the Discord API.',
			usage       : 'ping',
			directory   : __dirname,
			userPerms   : 'SendMessages',
			guildOnly   : true,
		});
	}

	async run(interaction) {
		// const time = new Date().getTime() - interaction.createdTimestamp;
		// const sent = await interaction.reply('Pinging...');
		const timeDiff = new Date().getTime() - (interaction.createdTimestamp);
		const embed = new EmbedBuilder()
			.setThumbnail(this.client.avatar)
			.setTitle(`${this.client.user.username} Ping`)
			.setDescription([
				`🔂 **RTT**: ${timeDiff} ms`,
				`💟 **Heartbeat**: ${Math.round(this.client.ws.ping)} ms`,
			].join('\n'))
			.setColor(this.client.color)
			.setFooter({
				text: `Requested by ${interaction.user.username}`,
				iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }),
			})
			.setTimestamp();

		return interaction.reply({
			embeds: [embed],
		});
	}

	command() {
		const command = new SlashCommandBuilder()
			.setName(this.name)
			.setDescription(this.description)
			.setDefaultPermission(true);
		return command;
	}
}

module.exports = PingCommand;