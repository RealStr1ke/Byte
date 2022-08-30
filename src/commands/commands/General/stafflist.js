const Command = require('../../../structs/templates/Command');
const path = require('path');

class StaffListCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'stafflist',
			description : 'Lists all staff members of the current server',
			usage       : 'stafflist',
			args        : false,
			directory   : __dirname,
			userPerms   : 'SendMessages',
		});
	}

	async run(message, args) {
		return await message.reply('This command hasn\'t been implemented yet');
	}
}

module.exports = StaffListCommand;