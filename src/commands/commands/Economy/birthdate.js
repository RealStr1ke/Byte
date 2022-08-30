const Command = require('../../../structs/templates/Command');
const { EmbedBuilder } = require('discord.js');
const path = require('path');

class BirthdateCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'birthdate',
			description : 'Sets your birthdate.',
			usage       : 'birthdate DD/MM/YYYY',
			args        : false,
			directory   : __dirname,
			userPerms   : 'SendMessages',
			requireData : true,
			guildOnly   : true,
		});
	}

	async run(message, args, data) {
		return message.channel.send('This command hasn\'t been completed yet.');
	}
}

module.exports = BirthdateCommand;
