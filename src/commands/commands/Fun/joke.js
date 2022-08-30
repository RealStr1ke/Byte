const Command = require('../../../structs/templates/Command');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const path = require('path');

class JokeCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'joke',
			description : 'Responds with a random joke.',
			usage       : 'joke',
			args        : false,
			directory   : __dirname,
			userPerms   : 'SendMessages',
			ownerOnly   : false,
		});
	}

	async run(message) {
		const response = await axios.get('https://blague.xyz/api/joke/random?lang=EN');

		const JokeEmbed = new EmbedBuilder()
			.setTitle('Here\'s an bad joke')
			.setDescription(`**${response.data.joke.question} ${response.data.joke.answer}**`)
			.setFooter({
				text: this.client.config.embed.footer,
				iconURL: this.client.user.displayAvatarURL(),
			})
			.setColor(this.client.config.embed.color)
			.setTimestamp();

		await message.reply({
			embeds: [JokeEmbed],
		});
	}
}

module.exports = JokeCommand;