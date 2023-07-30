const Slash = require('../../../structs/templates/Slash');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const path = require('path');

class Base64Command extends Slash {

	constructor(client) {
		super(client, {
			name        : 'base64',
			description : 'Converts the given information to Base64.',
			usage       : 'base64',
			directory   : __dirname,
			userPerms   : 'SendMessages',
			guildOnly   : false,
		});
	}

	async run(interaction) {
		try {
			const encoded = Buffer.from(args.join(' ')).toString('base64');

			const Base64Embed = new EmbedBuilder()
				.setTitle('__Base 64__')
				.setDescription([
					`**Original:** ${args.join(' ')}`,
					`**Encoded:** \`${encoded}\``
				])
				.setDefault(this.client);

			await interaction.reply({
				embeds: [Base64Embed],
			});
		} catch (error) {
			const ErrorEmbed = new EmbedBuilder()
				.setTitle('An error occured while coverting to Base64.')
				.setDefault(this.client)
				.setColor('Red');
			// console.log(error);
			await interaction.reply({
				embeds: [ErrorEmbed],
			});
		}
	}


	command() {
		const command = new SlashCommandBuilder()
			.setName(this.name)
			.setDescription(this.description)
			.setDefaultPermission(true);
		return command;
	}
}

module.exports = Base64Command;