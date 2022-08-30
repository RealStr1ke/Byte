const Command = require('../../../structs/templates/Command');
const { EmbedBuilder, MessageAttachment } = require('discord.js');
const path = require('path');
const { Canvacord } = require('canvacord');

class FacePalmCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'facepalm',
			description : 'Smh.',
			usage       : 'facepalm <User>',
			aliases     : ['fp'],
			args        : false,
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
		});
	}

	async run(message, args) {
		const User = (await this.client.resolveUser(args[0])) || message.author;
		const facepalm = await Canvacord.facepalm(User.displayAvatarURL({ format: 'png', dynamic: true }));
		const Image = new MessageAttachment(facepalm, 'facepalm.png');

		return await message.reply({
			files: [Image],
		});

	}
}

module.exports = FacePalmCommand;