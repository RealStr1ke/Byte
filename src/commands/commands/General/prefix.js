const Command = require('../../../structs/templates/Command');
const { EmbedBuilder } = require('discord.js');
const path = require('path');

class PrefixCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'prefix',
			description : 'Shows the current command prefix',
			usage       : 'prefix',
			args        : false,
			directory   : __dirname,
			aliases     : ['prx'],
			userPerms   : 'SEND_MESSAGES',
			requireData : true,
		});
	}

	async run(message, args, data) {
		const prefix = data.guild.prefix;
		const PrefixEmbed = new EmbedBuilder()
			.setTitle(`${this.client.user.username}'s Prefix`)
			.addField('**Prefix**', `\`${prefix}\``, true)
			.addField('**Example**', `\`${prefix}help\``, true)
			.setAuthor({
				name: message.guild.name,
				iconURL: message.guild.iconURL({ dynamic: true }),
			})
			.setFooter({
				text: this.client.config.embed.footer,
				iconURL: this.client.user.displayAvatarURL(),
			})
			.setColor(this.client.config.embed.color)
			.setTimestamp();
		return message.channel.send({
			embeds: [PrefixEmbed],
		});
	}
}

module.exports = PrefixCommand;