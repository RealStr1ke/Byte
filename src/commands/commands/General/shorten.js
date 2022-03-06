const Command = require('../../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const isurl = require('is-url');
const axios = require('axios');
const path = require('path');

class ShortenCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'shorten',
			description : 'Shortens a given URL.',
			usage       : 'shorten <URL>',
			aliases     : 'shorten <URL>',
			args        : true,
			directory   : __dirname,
			userPerms   : ['SEND_MESSAGES', 'KICK_MEMBERS'],
			botPerms    : ['SEND_MESSAGES', 'EMBED_LINKS', 'KICK_MEMBERS'],
		});
	}

	async run(message, args) {
		const url = args[0];
		if (!isurl(url)) return message.reply('Please provide a valid link with `https://`');

		const response = await axios.get(`https://is.gd/create.php?format=simple&url=${encodeURI(url)}`);
		if (response.data === 'Error: Please enter a valid URL to shorten') return message.reply('Please provide a valid link with `https://`');

		console.log(response.data);

		const ShortenEmbed = new MessageEmbed()
			.setTitle('**Here is your shortened URL.**')
			.setDescription([
				`**Original URL:** ${url}`,
				`**Shortened URL:** ${response.data}`,
			].join('\n'))
			.setColor(this.client.config.embed.color)
			.setFooter({
				text: this.client.config.embed.footer,
				iconURL: this.client.user.displayUse,
			})
			.setTimestamp();
		return message.reply({
			embeds: [ShortenEmbed],
		});
	}
}

module.exports = ShortenCommand;
