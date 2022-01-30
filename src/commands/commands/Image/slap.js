const Command = require('../../../structs/templates/Command');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const path = require('path');
const { Canvacord } = require('canvacord');

class SlapCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'slap',
			description : 'Sends an image of the given user being slapped XD.',
			usage       : 'slap <User>',
			aliases     : ['punch'],
			args        : false,
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
		});
	}

	async run(message, args) {
		const User = (await this.client.resolveUser(args[0])) || message.author;
		const slapped = await Canvacord.slap(
			message.author.displayAvatarURL({ format: 'png', dynamic: true }),
			User.displayAvatarURL({ format: 'png', dynamic: true })
		);
		const Image = new MessageAttachment(slapped, 'slap.png');

		return await message.reply({
			files: [Image],
		});

	}
}

module.exports = SlapCommand;