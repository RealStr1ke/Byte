const Command = require('../../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const path = require('path');
class SlowModeCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'slowmode',
			description : 'Sets the slowmode for the current channel.',
			usage       : 'slowmode <secs>',
			aliases     : ['sm'],
			args        : true,
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
			botPerms    : ['SEND_MESSAGES', 'EMBED_LINKS', 'KICK_MEMBERS'],
			guildOnly   : true,
		});
	}

	async run(message, args, data) {
		if (isNaN(args[0])) {
			return await message.reply('That\'s not a number.');
		}

		if (args[0] > 21600) {
			return await message.reply(
				'Please pick a shorter time. Discord allows a slowmode time of up to 6 hours.',
			);
		}

		message.channel.setRateLimitPerUser(args[0]);
		return await message.reply(`Slowmode is now ${args[0]} seconds.`);
	}
}

module.exports = SlowModeCommand;
