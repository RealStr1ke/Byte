const Command = require('../../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const axios = require('axios'),
	path = require('path');

class AdviceCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'advice',
			description : 'Responds with a random piece of advice.',
			usage       : 'advice',
			args        : false,
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
			ownerOnly   : false,
		});
	}

	async run(message) {
		const response = await axios.get('https://api.adviceslip.com/advice');

		const AdviceEmbed = new MessageEmbed()
			.setTitle('Here\'s an piece of advice')
			.setDescription(response.data.slip.advice)
			.setFooter(`You got advice #${response.data.slip.id} • ${this.client.config.embed.footer}`, this.client.user.displayAvatarURL())
			.setColor(this.client.config.embed.color)
			.setTimestamp();

		await message.reply({
			embeds: [AdviceEmbed],
		});

	}
}

module.exports = AdviceCommand;