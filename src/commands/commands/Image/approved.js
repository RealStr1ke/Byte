const Command = require('../../../structs/templates/Command');
const { MessageAttachment } = require('discord.js');
const path = require('path');
const { Canvacord } = require('canvacord');

class ApprovedCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'approved',
			description : 'Sends the given user\'s avatar as an "approved" image.',
			usage       : 'approved <User>',
			args        : false,
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
		});
	}

	async run(message, args) {
		const User = (await this.client.resolveUser(args[0])) || message.author;

		const approved = await this.client.AmeAPI.generate('approved', {
			url: User.displayAvatarURL({ format: 'png', size: 512 }),
		});

		const Image = new MessageAttachment(approved, 'approved.png');

		return await message.reply({
			files: [Image],
		});

	}
}

module.exports = ApprovedCommand;