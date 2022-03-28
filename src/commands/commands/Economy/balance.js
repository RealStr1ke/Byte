const Command = require('../../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const path = require('path');

class BalanceCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'balance',
			description : 'Responds with the user\'s balance.',
			usage       : 'balance <user>',
			args        : false,
			directory   : __dirname,
			aliases     : ['bal'],
			userPerms   : 'SEND_MESSAGES',
			guildOnly   : true,
			requireData : true,
			ownerOnly   : false,
		});
	}

	async run(message, args, data) {
		const balance = new MessageEmbed()
			.setTitle('**Your Stats:**')
			.addField('**Wallet:**', `\`${data.member.economy.wallet}\``, true)
			.addField('**Bank:**', `\`${data.member.economy.bank}\``, true)
			.setAuthor({
				name: this.client.user.tag,
				iconURL: this.client.user.displayAvatarURL(),
			})
			.setFooter({
				text: this.client.config.embed.footer,
				iconURL: this.client.user.displayAvatarURL(),
			})
			.setColor(this.client.config.embed.color)
			.setTimestamp();
		return await message.channel.send({
			embeds: [balance],
		});
	}
}

module.exports = BalanceCommand;
