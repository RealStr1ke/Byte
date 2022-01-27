const Command = require('../../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const path = require('path');
class KickCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'kick',
			description : 'Kicks a member from the current server.',
			usage       : 'kick <member>',
			args        : true,
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
			botPerms    : ['SEND_MESSAGES', 'EMBED_LINKS', 'KICK_MEMBERS'],
			guildOnly   : true,
			requireData : true,
		});
	}

	async run(message, args, data) {

	}
}

module.exports = KickCommand;
