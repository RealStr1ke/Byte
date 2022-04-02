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
			cooldown    : 86400,
			localCool   : false,
			customCool  : true,
		});
	}

	async run(message, args, data) {
		if (await this.isOnCooldown(message.author.id)) {
			const CooldownEmbed = this.getCooldownMessage(await this.getCooldownTime(message.author.id));
			return message.reply({
				embeds: [CooldownEmbed],
			});
		}

		data.user.economy.wallet = parseInt(data.user.economy.wallet) + (15000 * data.user.economy.multiplier);
		// data.user.cooldowns[this.category] = Date.now();

		data.user.markModified('economy.wallet');
		// data.user.markModified('cooldowns.daily');

		await data.user.save();

		const DailyEmbed = new MessageEmbed()
			.setTitle('Daily Reward')
			.setDescription([
				`Daily Reward: ⏣${await this.client.utils.formatNumber(15000 * data.user.economy.multiplier)} coins${data.user.economy.multiplier > 1 ? ` (**${data.user.economy.multiplier}x** coin multiplier)!` : '!'}`,
				`Wallet Balance: ⏣${await this.client.utils.formatNumber(data.user.economy.wallet)}`,
			].join('\n'))
			.setDefault(this.client);

		return message.reply({
			embeds: [DailyEmbed],
		});
	}

	getCooldownMessage(time) {
		const timeUse = Math.round(((time + this.cooldown) / 1000));
		const CooldownEmbed = new MessageEmbed()
			.setTitle('Daily Reward')
			.setDescription([
				'You\'ve already claimed your daily reward today.',
				`Check back <t:${timeUse}:R> at <t:${timeUse}:t>.`,
			].join('\n'))
			.setDefault(this.client);
		return CooldownEmbed;
	}
}

module.exports = DailyCommand;