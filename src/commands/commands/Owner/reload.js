const Command = require('../../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const path = require('path');

class ReloadCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'reload',
			description : 'Reloads the given command.',
			usage       : 'reload <command/all>',
			args        : false,
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
			ownerOnly   : true,
		});
	}

	async run(message, args) {
		if (args.length) {
			const command = args[0];
			const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.commands.aliases.get(command));
			if (!cmd) {
				return message.channel.send('The given command was not found.');
			}
			const cmdLoc = `${cmd.directory}/${cmd.name}.js`;
			await this.client.unloadCommand(cmd.name, cmdLoc);
			await this.client.loadCommand(cmd.name, cmdLoc);
			message.channel.send(`The command \`${cmd.name}\` was successfully reloaded.`);
		}
	}
}

module.exports = ReloadCommand;