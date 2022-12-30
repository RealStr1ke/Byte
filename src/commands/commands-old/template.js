const Command = require('../../../structs/templates/Command');
const path = require('path');

class TemplateCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'template',
			description : 'Just a command template that I made.',
			usage       : 'template',
			args        : false,
			argNum      : 0,
			aliases     : ['template', 'tmpl'],
			directory   : __dirname,
			example	    : ['template arg1', 'tmpl arg1'],
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

	async run(message, data) {
		return message.reply('This is a template command.');
	}
}

module.exports = TemplateCommand;