const Command = require('../../../structs/templates/Command');
const path = require('path');

class ReverseCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'reverse',
			description : 'Reverses the given text.',
			usage       : 'reverse <text>',
			args        : true,
			aliases     : ['rv'],
			directory   : __dirname,
			userPerms   : 'SendMessages',
			ownerOnly   : false,
		});
	}

	async run(message, args) {
		return message.reply(args.join(' ').split('').reverse().join(''));
	}
}

module.exports = ReverseCommand;