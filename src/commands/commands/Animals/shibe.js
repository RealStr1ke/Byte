const Command = require('../../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const path = require('path');
const { default: axios } = require('axios');

class ShibeCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'shibe',
			description : 'Responds with a random shibe picture.',
			usage       : 'shibe',
			args        : false,
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
			ownerOnly   : false,
		});
	}

	async run(message) {
		const response = await axios.get('http://shibe.online/api/shibes');
		const ShibeEmbed = new MessageEmbed()
			.setTitle('**😍 | Awwwww | 😍**')
			.setImage(response.data[0])
			.setFooter({
				text: `Requested by ${message.author.tag} • ${this.client.config.embed.footer}`,
				iconURL: this.client.user.displayAvatarURL(),
			});
		return message.channel.send({
			embeds: [ShibeEmbed],
		});
	}
}

module.exports = ShibeCommand;