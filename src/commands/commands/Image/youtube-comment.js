const Command = require('../../../structs/templates/Command');
const { MessageAttachment } = require('discord.js');
const path = require('path');
const { Canvacord } = require('canvacord');

class YoutubeCommentCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'youtube-comment',
			description : 'Sends the given text in the form of a Youtube comment.',
			usage       : 'ytc <Text>',
			aliases     : ['ytc'],
			args        : true,
			directory   : __dirname,
			userPerms   : 'SendMessages',
		});
	}

	async run(message, args) {
		let user = await this.client.resolveUser(args[0]);
		let text = args.join(' ');


		if (user) {
			text = args.slice(1).join(' ');
		} else {
			user = message.author;
		}

		const ytc = await Canvacord.youtube({
			username: user.username,
			avatar: user.displayAvatarURL({ format: 'png' }),
			content: text,
		});
		const Image = new MessageAttachment(ytc, 'ytc.png');

		return await message.reply({
			files: [Image],
		});

	}
}

module.exports = YoutubeCommentCommand;