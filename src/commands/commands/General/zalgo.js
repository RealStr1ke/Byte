const Command = require('../../../structs/templates/Command');
const path = require('path');
const Zalgo = require('to-zalgo');

class ZalgoCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'zalgo',
			description : 'Changes the given text to zalgo text',
			usage       : 'zalgo <text>',
			args        : true,
			directory   : __dirname,
			aliases     : ['zlg'],
			userPerms   : 'SEND_MESSAGES',
		});
	}

	async run(message, args) {
		return await message.reply(Zalgo(args.join(' ')));
	}
}

module.exports = ZalgoCommand;