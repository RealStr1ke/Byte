const Command = require('../../structs/templates/Command');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const path = require('path');
const { Canvacord } = require('canvacord');

class BedCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'bed',
			description : 'Inverts the given user\'s avatar.',
			usage       : 'bed <User>',
			args        : false,
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
		});
	}

	async run(message, args) {
		const User1 = (await this.client.resolveUser(args[0])) || message.author;
		const User2 = (await this.client.resolveUser(args[1])) || message.author;
		const bed = await Canvacord.bed(
			User1.displayAvatarURL({ format: "png" }),
			User2.displayAvatarURL({ format: "png" }),
		);
		const Image = new MessageAttachment(bed, 'bed.png');

		return await message.reply({
			files: [Image],
		});

	}
}

module.exports = BedCommand;