const Command = require('../../structs/Command');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const path = require('path');
const { Canvacord } = require('canvacord');

class InvertCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'invert',
			description : 'Inverts the given user\'s avatar.',
			usage       : 'invert <User>',
			args        : false,
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
		});
	}

	async run(message, args) {
		const User = (await bot.functions.fetchUser(args[0])) || message.author;
		const inverted = await Canvacord.invert(User.displayAvatarURL({ format: 'png' }));
		const invert = new MessageAttachment(inverted, 'invert.png');

		return await message.reply({
			files: [invert],
		});

	}
}

module.exports = InvertCommand;