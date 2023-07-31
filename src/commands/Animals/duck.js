const Slash = require('../../structs/templates/Slash');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const path = require('path');

class DuckCommand extends Slash {

	constructor(client) {
		super(client, {
			name        : 'duck',
			description : 'Responds with a random duck picture.',
			usage       : 'duck',
			directory   : __dirname,
			userPerms   : 'SendMessages',
			guildOnly   : false,
		});
	}

	async run(interaction) {
		const response = await axios.get('https://random-d.uk/api/v2/random');
		const DuckEmbed = new EmbedBuilder()
			.setTitle('**😍 | Awwwww | 😍**')
			.setImage(response.data.url)
			.setFooter({
				text: `Requested by ${interaction.user.tag} • ${this.client.config.embed.footer}`,
				iconURL: this.client.user.displayAvatarURL(),
			});
		return interaction.reply({
			embeds: [DuckEmbed],
		});
	}
}

module.exports = DuckCommand;