const Command = require('../../../structs/templates/Command');
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
			userPerms   : ['SendMessages', 'ManageChannels'],
			botPerms    : ['SendMessages', 'ManageChannels'],
			guildOnly   : true,
			ownerOnly   : true,
		});
	}

	async run(message, args) {
		if (isNaN(args[0])) return message.reply('**That\'s not a number.**');
		if (args[0] > 21600) return message.reply('**Please pick a shorter time. Discord allows a slowmode time of up to 6 hours.**');
		if (args[0] < 0) return message.reply('Nice try nerd.');

		message.channel.setRateLimitPerUser(args[0]);
		if (args[0] == 0) return message.reply('**Slowmode is now disabled.**');
		return message.reply(`**Slowmode is now ${args[0]} seconds.**`);
	}
}

module.exports = SlowModeCommand;
