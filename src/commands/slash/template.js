const Slash = require('../../../structs/templates/Slash');
const { SlashCommandBuilder } = require('@discordjs/builders');
const path = require('path');

class TemplateCommand extends Slash {

	constructor(client) {
		super(client, {
			name        : 'template',
			description : 'Just a command template that I made.',
			enabled     : true,
			userPerms   : 'SendMessages',
			botPerms    : 'SendMessages',
			guildOnly   : false,
			ownerOnly   : false,
			nsfw        : false,
			education   : false,
			requireData : false,
		});
	}

	async run(interaction) {
		return interaction.reply('This is a template command.');
	}

	command() {
		const command = new SlashCommandBuilder()
			.setName(this.name)
			.setDescription(this.description)
			.setDefaultPermission(true);
		return command;
	}
}

module.exports = TemplateCommand;