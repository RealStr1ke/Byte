const Command = require('../../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const path = require('path');
class ShortenCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'shorten',
			description : 'Kicks a member from the current server.',
			usage       : 'kick <member>',
			args        : true,
			directory   : __dirname,
			userPerms   : ['SEND_MESSAGES', 'KICK_MEMBERS'],
			botPerms    : ['SEND_MESSAGES', 'EMBED_LINKS', 'KICK_MEMBERS'],
		});
	}

	async run(message, args) {
		
	}
}

module.exports = ShortenCommand;
