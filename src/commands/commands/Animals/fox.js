const Command = require('../../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const axios = require('axios'),
	path = require('path');

class FoxCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'fox',
			description : 'Sends a random fox picture.',
			usage       : 'fox',
			args        : false,
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
			ownerOnly   : false,
		});
	}

	async run(message) {
		const response = await axios.get('https://randomfox.ca/floof/');

		const FoxEmbed = new MessageEmbed()
			.setTitle('**😍 | Awwwww | 😍**')
			.setImage(response.data.image)
			.setFooter({
				text: `Requested by ${message.author.tag} • ${this.client.config.embed.footer}`,
				iconURL: this.client.user.displayAvatarURL(),
			})
			.setColor(this.client.config.embed.color)
			.setTimestamp();

		await message.reply({
			embeds: [FoxEmbed],
		});

	}
}

module.exports = FoxCommand;