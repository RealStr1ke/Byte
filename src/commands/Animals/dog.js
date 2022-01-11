const Command = require('../../structs/Command');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const path = require('path');

class DogCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'dog',
			description : 'Responds with a random dog picture.',
			usage       : 'dog',
			args        : false,
			directory   : __dirname,
			aliases     : ['dogs'],
			userPerms   : 'SEND_MESSAGES',
			ownerOnly   : false,
		});
	}

	async run(message) {
		const response = await axios.get('https://dog.ceo/api/breeds/image/random');
		const DogEmbed = new MessageEmbed()
			.setTitle('**😍 | Awwwww | 😍**')
			.setImage(response.data.message)
			.setFooter(`Requested by ${message.author.tag} • ${this.client.config.embed.footer}`, this.client.user.displayAvatarURL())
			.setTimestamp();
		return message.channel.send({
			embeds: [DogEmbed],
		});
	}
}

module.exports = DogCommand;