const Command = require('../../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const path = require('path');

class DeployCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'deploy',
			description : 'Deploys all application commands.',
			usage       : 'deploy',
			args        : false,
			directory   : __dirname,
			aliases     : ['dp'],
			userPerms   : 'SEND_MESSAGES',
			ownerOnly   : true,
		});
	}

	async run(message) {
		this.client.logger.startup('Application commands deploying.');
		await client.application?.commands.set(this.client.commands.slash.map(c => c.data))
			.catch(error => this.client.logger.fail(error.message));
		this.client.logger.startup('Application commands deployed.');

	}
}

module.exports = DeployCommand;