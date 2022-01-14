const Slash = require('../structs/templates/Slash');
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const path = require('path');

class PingCommand extends Slash {

	constructor(client) {
		super(client, {
			name        : 'ping',
			description : 'Shows the bot\'s connection status to the Discord API.',
			usage       : 'ping',
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
			guildOnly   : true,
		});
	}

	async run(interaction) {
		const sent = await interaction.reply('Pinging...');
		const timeDiff = (sent.editedAt || sent.createdAt) - (interaction.createdAt);
		const embed = new MessageEmbed()
			.setThumbnail(this.client.avatar)
    	    .setTitle(`${this.client.user.username} Ping`)
	        .setDescription([
	            `🔂 **RTT**: ${timeDiff} ms`,
	            `💟 **Heartbeat**: ${Math.round(this.client.ws.ping)} ms`,
	        ].join('\n'))
	        .setColor(this.client.color)
	        .setFooter(`Requested by ${interaction.user.username}`)
	        .setTimestamp();

		sent.edit('**Pinged!**');
		sent.edit({
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