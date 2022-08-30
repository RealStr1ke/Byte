const Command = require('../../../structs/templates/Command');
const { EmbedBuilder } = require('discord.js');
const path = require('path');

class BegCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'beg',
			description : 'Gives you a random number of coins.',
			usage       : 'beg',
			args        : false,
			directory   : __dirname,
			userPerms   : 'SendMessages',
			requireData : true,
			guildOnly   : true,
			ownerOnly   : true,
		});
	}

	async run(message, args, data) {
		const choice = Math.floor(Math.random() * 2);
		const BegEmbed = new EmbedBuilder();
		if (choice === 1) {
			const replies = this.client.constants.responses.beg.yes;
			const randomAmount = (Math.floor(Math.random() * 500) + 1) * data.member.economy.multiplier;
			const replyText = replies[Math.floor(Math.random() * replies.length)];

			data.member.economy.wallet = parseInt(data.member.economy.wallet) + randomAmount;

			BegEmbed
				.setDefault(this.client)
				.setTitle(`**${replyText}**`)
				.setDescription([
					`You recieved **⏣${await this.client.utils.formatNumber(randomAmount)}**`,
					`You now have **⏣${await this.client.utils.formatNumber(data.member.economy.wallet)}**`,
				].join('\n'))
				.setColor('GREEN');

		} else {
			const replies = this.client.constants.responses.beg.no;
			const replyText = replies[Math.floor(Math.random() * replies.length)];

			BegEmbed
				.setDefault(this.client)
				.setTitle(`**${replyText}**`)
				.setDescription([
					'You didn\'t recieve any money from begging.',
					`You still have **⏣${await this.client.utils.formatNumber(data.member.economy.wallet)}**`,
				].join('\n'))
				.setColor('RED');
		}

		data.member.markModified('economy.wallet');
		data.member.save();
		return await message.channel.send({
			embeds: [BegEmbed],
		});
	}
}

module.exports = BegCommand;
