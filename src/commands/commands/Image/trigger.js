const Command = require('../../../structs/templates/Command');
const { EmbedBuilder, MessageAttachment } = require('discord.js');
const path = require('path');
const { Canvacord } = require('canvacord');

class TriggerCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'trigger',
			description : 'Sends a TRIGGERED image of that user being mad (lol).',
			usage       : 'trigger <User>',
			args        : false,
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
		});
	}

	async run(message, args) {
		const User = (await this.client.resolveUser(args[0])) || message.author;
		const triggered = await Canvacord.trigger(User.displayAvatarURL({ format: 'png', dynamic: true }));
		const Image = new MessageAttachment(triggered, 'trigger.png');

		return await message.reply({
			files: [Image],
		});

	}
}

module.exports = TriggerCommand;