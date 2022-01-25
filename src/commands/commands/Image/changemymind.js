const Command = require('../../../structs/templates/Command');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const path = require('path');
const { Canvacord } = require('canvacord');

class ChangeMyMindCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'changemymind',
			description : 'Inverts the given user\'s avatar.',
			usage       : 'cmm <User>',
			aliases     : ['cmm'],
			args        : true,
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
		});
	}

	async run(message, args) {
		if (!args || !args[0]) {
			return await message.replyT('Please provide text.');
		}

		args = args.join(' ');

		const cmm = await Canvacord.changemymind(args);
		const Image = new MessageAttachment(cmm, 'cmm.png');

		return await message.reply({
			files: [Image],
		});

	}
}

module.exports = ChangeMyMindCommand;