const Command = require('../../../structs/templates/Command');
const { EmbedBuilder } = require('discord.js');
const path = require('path');
const { default: axios } = require('axios');

class PandaCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'panda',
			description : 'Responds with a random panda picture.',
			usage       : 'panda',
			args        : false,
			directory   : __dirname,
			userPerms   : 'SendMessages',
			ownerOnly   : false,
		});
	}

	async run(message) {
		const response = await axios.get('https://some-random-api.ml/img/panda');
		const PandaEmbed = new EmbedBuilder()
			.setTitle('**😍 | Awwwww | 😍**')
			.setImage(response.data.link)
			.setFooter({
				text: `Requested by ${message.author.tag} • ${this.client.config.embed.footer}`,
				iconURL: this.client.user.displayAvatarURL(),
			});
		return message.channel.send({
			embeds: [PandaEmbed],
		});
	}
}

module.exports = PandaCommand;