const Slash = require('../../structs/templates/Slash');
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

			options     : [
				{
					name        : 'string',
					description : 'The string to convert.',
					required    : true,
					type        : 'STRING',
				},
			],
		});
	}

	async run(interaction) {
		const original = interaction.options.getString('string');
		const encoded = Buffer.from(original).toString('base64');

		const Base64Embed = new EmbedBuilder()
			.setTitle('__Base 64__')
			.setDescription([
				`**Original:** \`${original}\``,
				`**Encoded:** \`${encoded}\``,
			].join('\n'))
			.setDefault(this.client);

		await interaction.reply({
			embeds: [Base64Embed],
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

module.exports = Base64Command;