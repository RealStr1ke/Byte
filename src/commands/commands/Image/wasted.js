const Command = require('../../../structs/templates/Command');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const path = require('path');
const { Canvacord } = require('canvacord');

class WastedCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'wasted',
			description : 'Turns the given user\'s avatar into a WASTED image lmao.',
			usage       : 'wasted <User>',
			args        : false,
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
		});
	}

	async run(message, args) {
		const User = (await this.client.resolveUser(args[0])) || message.author;

		const Image = new MessageAttachment(`https://some-random-api.ml/canvas/wasted/?avatar=${User.displayAvatarURL({ format: 'png', dynamic: true })}`, 'wasted.png');
		return message.reply({
			files: [Image],
		});

	}
}

module.exports = WastedCommand;