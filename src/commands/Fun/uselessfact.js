const Command = require('../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const axios = require('axios'),
	path = require('path');

class UselessFactCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'uselessfact',
			description : 'Responds with a random useless fact.',
			usage       : 'uselessfact',
			args        : false,
			aliases     : ['uf'],
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
			ownerOnly   : false,
		});
	}

	async run(message) {
		const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');

		const UselessFactEmbed = new MessageEmbed()
			.setTitle('Here\'s a useless fact')
			.setDescription(response.data.text)
			.setFooter(`${this.client.config.embed.footer}`, this.client.user.displayAvatarURL())
			.setColor(this.client.config.embed.color)
			.setTimestamp();

		return await message.reply({
			embeds: [UselessFactEmbed],
		});

	}
}

module.exports = UselessFactCommand;