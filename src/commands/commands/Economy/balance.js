const Command = require('../../../structs/templates/Command');
const { EmbedBuilder } = require('discord.js');
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
		const balance = new EmbedBuilder()
			.setTitle('**Your Stats:**')
			.addField('**Wallet:**', `\`${this.client.utils.formatNumber(data.user.economy.wallet)}\``, true)
			.addField('**Bank:**', `\`${this.client.utils.formatNumber(data.user.economy.bank)}\``, true)
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
