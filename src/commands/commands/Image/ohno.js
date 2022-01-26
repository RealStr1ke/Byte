const Command = require('../../../structs/templates/Command');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const path = require('path');
const { Canvacord } = require('canvacord');

class OhNoCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'ohno',
			description : 'Imagine being stupid smh.',
			usage       : 'ohno <Text>',
			aliases     : ['stupid'],
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

		const ohno = await Canvacord.ohno(args);
		const Image = new MessageAttachment(ohno, 'ohno.png');

		return await message.reply({
			files: [Image],
		});

	}
}

module.exports = OhNoCommand;