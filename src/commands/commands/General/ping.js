const Command = require('../../../structs/templates/Command');
const { EmbedBuilder } = require('discord.js');
const path = require('path');

class PingCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'ping',
			description : 'Shows the bot\'s connection status to the Discord API.',
			usage       : 'ping',
			args        : false,
			aliases     : ['ping'],
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
		});
	}

	async run(message) {
		const sent = await message.reply('Pinging...');
		const timeDiff = (sent.editedAt || sent.createdAt) - (message.editedAt || message.createdAt);
		const embed = new EmbedBuilder()
			.setThumbnail(this.client.avatar)
			.setTitle(`${this.client.user.username} Ping`)
			.setDescription([
				`🔂 **RTT**: ${timeDiff} ms`,
				`💟 **Heartbeat**: ${Math.round(this.client.ws.ping)} ms`,
			].join('\n'))
			.setColor(this.client.config.embed.color)
			.setFooter({
				text: `Requested by ${message.author.username}`,
				iconURL: this.client.user.displayAvatarURL(),
			})
			.setTimestamp();

		sent.edit('**Pinged!**');
		sent.edit({
			embeds: [embed],
		});
	}
}

module.exports = PingCommand;