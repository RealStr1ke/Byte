const Slash = require('../../structs/templates/Slash');
const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const path = require('path');

class CatCommand extends Slash {

	constructor(client) {
		super(client, {
			name        : 'cat',
			description : 'Responds with a random cat picture.',
			usage       : 'cat',
			directory   : __dirname,
			userPerms   : 'SendMessages',
			guildOnly   : false,
		});
	}

	async run(interaction) {
		const response = await axios.get('http://shibe.online/api/cats');
		const CatEmbed = new EmbedBuilder()
			.setTitle('**😍 | Awwwww | 😍**')
			.setImage(response.data.file)
			.setFooter({
				text: `Requested by ${interaction.user.tag} • ${this.client.config.embed.footer}`,
				iconURL: this.client.user.displayAvatarURL(),
			});
		return interaction.reply({
			embeds: [CatEmbed],
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

module.exports = CatCommand;