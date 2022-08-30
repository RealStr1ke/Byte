const Command = require('../../../structs/templates/Command');
const { EmbedBuilder, MessageAttachment } = require('discord.js');
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
		const User = (await this.client.resolveUser(args[0])) || message.author;
		const inverted = await Canvacord.invert(User.displayAvatarURL({ format: 'png' }));
		const Image = new MessageAttachment(inverted, 'invert.png');

		return await message.reply({
			files: [Image],
		});

	}
}

module.exports = InvertCommand;