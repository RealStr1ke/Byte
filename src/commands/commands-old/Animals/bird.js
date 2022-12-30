const Command = require('../../../structs/templates/Command');
const { EmbedBuilder } = require('discord.js');
const path = require('path');
const { default: axios } = require('axios');

class BirdCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'bird',
			description : 'Responds with a random bird picture.',
			usage       : 'bird',
			args        : false,
			directory   : __dirname,
			userPerms   : 'SendMessages',
			ownerOnly   : false,
		});
	}

	async run(message) {
		const response = await axios.get('http://shibe.online/api/birds');
		const BirdEmbed = new EmbedBuilder()
			.setTitle('**😍 | Awwwww | 😍**')
			.setImage(response.data[0])
			.setFooter({
				text: `Requested by ${message.author.tag} • ${this.client.config.embed.footer}`,
				iconURL: this.client.user.displayAvatarURL(),
			});
		return message.channel.send({
			embeds: [BirdEmbed],
		});
	}
}

module.exports = BirdCommand;