const Command = require('../../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const path = require('path');
const { default: axios } = require('axios');

class RedPandaCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'redpanda',
			description : 'Responds with a random red panda picture.',
			usage       : 'redpanda',
			args        : false,
			directory   : __dirname,
			aliases     : ['redp', 'rpanda'],
			userPerms   : 'SEND_MESSAGES',
			ownerOnly   : false,
		});
	}

	async run(message) {
		const response = await axios.get('https://some-random-api.ml/img/red_panda');
		const RedPandaEmbed = new MessageEmbed()
			.setTitle('**😍 | Awwwww | 😍**')
			.setImage(response.data.link)
			.setFooter({
				text: `Requested by ${message.author.tag} • ${this.client.config.embed.footer}`,
				iconURL: this.client.user.displayAvatarURL(),
			});
		return message.channel.send({
			embeds: [RedPandaEmbed],
		});
	}
}

module.exports = RedPandaCommand;