const Slash = require('../../structs/templates/Slash');
const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const path = require('path');

class BirdCommand extends Slash {

	constructor(client) {
		super(client, {
			name        : 'bird',
			description : 'Responds with a random bird picture.',
			usage       : 'bird',
			directory   : __dirname,
			userPerms   : 'SendMessages',
			guildOnly   : false,
		});
	}

	async run(interaction) {
		const response = await axios.get('http://shibe.online/api/birds');
		const BirdEmbed = new EmbedBuilder()
			.setTitle('**😍 | Awwwww | 😍**')
			.setImage(response.data[0])
			.setFooter({
				text: `Requested by ${interaction.author.tag} • ${this.client.config.embed.footer}`,
				iconURL: this.client.user.displayAvatarURL(),
			});
		return interaction.reply({
			embeds: [BirdEmbed],
		});
	}

	command() {
		const command = new SlashCommandBuilder()
			.setName(this.name)
			.setDescription(this.description)
			.setDefaultPermission(true);
		return command;
	}
}

module.exports = BirdCommand;