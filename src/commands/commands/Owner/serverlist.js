const Command = require('../../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const ascii = require('ascii-table');
const path = require('path');

class ServerListCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'serverlist',
			description : 'Shows all the servers that this bot is in.',
			usage       : 'serverlist',
			args        : false,
			directory   : __dirname,
			aliases     : ['sl'],
			userPerms   : 'SEND_MESSAGES',
			ownerOnly   : true,
		});
	}

	async run(message) {
		const ServerTable = new ascii('Server List');
		ServerTable.setHeading('Guild Name', 'Guild ID', 'Member Count');

		const servers = Array.from(this.client.guilds.cache.values()).map(guild => {
			ServerTable.addRow(guild.name, guild.id, `${guild.memberCount} users`);
		});

		console.log(ServerTable.toString());

		await message.author.createDM();
		message.author.send(`\`\`\`\n${ServerTable.toString()}\`\`\``);
		return await message.react('✅');
	}
}

module.exports = ServerListCommand;