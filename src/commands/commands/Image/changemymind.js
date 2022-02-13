const Command = require('../../../structs/templates/Command');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const path = require('path');
const { Canvacord } = require('canvacord');

class ChangeMyMindCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'changemymind',
			description : 'Sends a "Change My Mind" image with the given text.',
			usage       : 'cmm <Text>',
			aliases     : ['cmm'],
			args        : true,
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
		});
	}

	async run(message, args) {
		args = args.join(' ');

		const cmm = await Canvacord.changemymind(args);
		const Image = new MessageAttachment(cmm, 'cmm.png');

		return await message.reply({
			files: [Image],
		});

	}
}

module.exports = ChangeMyMindCommand;