const Command = require('../../../structs/templates/Command');
const { EmbedBuilder } = require('discord.js');
const path = require('path');
const { default: axios } = require('axios');

class CatCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'cat',
			description : 'Responds with a random cat picture.',
			usage       : 'cat',
			args        : false,
			directory   : __dirname,
			aliases     : ['cat'],
			userPerms   : 'SendMessages',
			ownerOnly   : false,
		});
	}

	async run(message) {
		const response = await axios.get('https://aws.random.cat/meow');
		const CatEmbed = new EmbedBuilder()
			.setTitle('**😍 | Awwwww | 😍**')
			.setImage(response.data.file)
			.setFooter({
				text: `Requested by ${message.author.tag} • ${this.client.config.embed.footer}`,
				iconURL: this.client.user.displayAvatarURL(),
			})
			.setTimestamp();
		return message.channel.send({
			embeds: [CatEmbed],
		});
	}
}

module.exports = CatCommand;