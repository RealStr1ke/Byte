const Slash = require('../../structs/templates/Slash');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const path = require('path');

class Base64Command extends Slash {

	constructor(client) {
		super(client, {
			name        : 'ping',
			description : 'Shows the bot\'s connection status to the Discord API.',
			usage       : 'ping',
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
			guildOnly   : true,
		});
	}

	async run(interaction) {
		try {
			const encoded = Buffer.from(args.join(' ')).toString('base64');
			
			const Base64Embed = new MessageEmbed()
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
			const ErrorEmbed = new MessageEmbed()
				.setTitle('An error occured while coverting to Base64.')
				.setDefault(this.client)
				.setColor('RED');
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