const Command = require('../../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const path = require('path');

class ServerListCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'serverlist',
			description : '',
			usage       : 'serverlist',
			args        : false,
			directory   : __dirname,
			aliases     : ['sls'],
			userPerms   : 'SEND_MESSAGES',
			ownerOnly   : true,
		});
	}

	async run(message) {
		return;
	}
}

module.exports = ServerListCommand;