const Command = require('../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
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
			userPerms   : 'SEND_MESSAGES',
			ownerOnly   : false,
		});
	}

	async run(message) {
		const response = await axios.get('https://blague.xyz/api/joke/random?lang=EN');

		const JokeEmbed = new MessageEmbed()
			.setTitle('Here\'s an bad joke')
			.setDescription(`**${response.data.joke.question} ${response.data.joke.answer}**`)
			.setFooter(`You got joke #${response.data.joke.id} • ${this.client.config.embed.footer}`, this.client.user.displayAvatarURL())
			.setColor(this.client.config.embed.color)
			.setTimestamp();

		await message.reply({
			embeds: [JokeEmbed],
		});
	}
}

module.exports = JokeCommand;