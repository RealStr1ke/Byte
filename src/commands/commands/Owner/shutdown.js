const Command = require('../../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const path = require('path');

class ShutdownCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'shutdown',
			description : 'Shuts the bot down.',
			usage       : 'shutdown',
			args        : false,
			directory   : __dirname,
			aliases     : ['stop', 'quit'],
			userPerms   : 'SEND_MESSAGES',
			ownerOnly   : true,
		});
	}

	async run(message) {
		message.reply('**Bot is now shutting down.**');
		await this.client.functions.sleep(1);
		await this.client.destroy();
		await process.exit();
	}
}

module.exports = ShutdownCommand;