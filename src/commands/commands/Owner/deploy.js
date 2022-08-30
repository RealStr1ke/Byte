const Command = require('../../../structs/templates/Command');
const { EmbedBuilder } = require('discord.js');
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
		const StatusEmbed = new EmbedBuilder()
			.setTitle('🟡 Application commands deploying.')
			.setFooter({
				text: `Requested by ${message.author.tag} • ${this.client.config.embed.footer}`,
				iconURL: this.client.user.displayAvatarURL(),
			})
			.setColor(this.client.config.embed.color)
			.setTimestamp();

		const status = await message.channel.send(StatusEmbed);
		this.client.logger.startup('Application commands deploying.');

		await client.application?.commands.set(this.client.commands.slash.map(c => c.data))
			.catch(error => this.client.logger.fail(error.message));

		StatusEmbed.setTitle('🟢 Application commands deploying.');
		status.edit(StatusEmbed);
		this.client.logger.startup('Application commands deployed.');

	}
}

module.exports = DeployCommand;