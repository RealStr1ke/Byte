const Command = require('../../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const path = require('path');

class DailyCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'daily',
			description : 'Collect your daily reward!',
			usage       : 'daily',
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
			requireData : true,
			guildOnly   : true,
		});
	}

	async run(message, args, data) {
		if (43200000 - (Date.now() - data.member.cooldowns.daily) > 0) {
			const DailyEmbed = new MessageEmbed()
				.setTitle('Daily Reward')
				.setDescription([
					'You\'ve already claimed your daily reward today.',
					`Check back <t:${~~((data.member.cooldowns.daily / 1000) + 43200)}:R> at <t:${~~((data.member.cooldowns.daily / 1000) + 43200)}:t>.`,
				].join('\n'))
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

			return await message.reply({
				embeds: [DailyEmbed],
			});
		}

		data.member.economy.wallet = parseInt(data.member.economy.wallet) + (15000 * data.member.economy.multiplier);
		data.member.cooldowns.daily = Date.now();

		data.member.markModified('economy.wallet');
		data.member.markModified('cooldowns.daily');

		await data.member.save();

		const DailyEmbed = new MessageEmbed()
			.setTitle('Daily Reward')
			.setDescription([
				`You obtained your daily reward of ⏣15,000 coins!${data.member.economy.multiplier > 1 ? ` Wow, it also seems you also have a **${data.member.economy.multiplier}x** coin multiplier!` : ''}`,
				`You now have ⏣${await this.client.utils.formatNumber(data.member.economy.wallet)} coins in your wallet.`,
			].join('\n'))
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

		return await message.reply({
			embeds: [DailyEmbed],
		});
	}
}

module.exports = DailyCommand;