const Command = require('../../../structs/templates/Command');
const { EmbedBuilder } = require('discord.js');
const path = require('path');
const { default: axios } = require('axios');

class KoalaCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'koala',
			description : 'Responds with a random koala picture.',
			usage       : 'koala',
			args        : false,
			directory   : __dirname,
			userPerms   : 'SendMessages',
			ownerOnly   : false,
		});
	}

	async run(message) {
		const response = await axios.get('https://some-random-api.ml/img/koala');
		const KoalaEmbed = new EmbedBuilder()
			.setTitle('**😍 | Awwwww | 😍**')
			.setImage(response.data.link)
			.setFooter({
				text: `Requested by ${message.author.tag} • ${this.client.config.embed.footer}`,
				iconURL: this.client.user.displayAvatarURL(),
			});
		return message.channel.send({
			embeds: [KoalaEmbed],
		});
	}
}

module.exports = KoalaCommand;