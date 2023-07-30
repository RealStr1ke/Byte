const Slash = require('../../structs/templates/Slash');
const path = require('path');

class EchoCommand extends Slash {

	constructor(client) {
		super(client, {
			name        : 'echo',
			description : 'Echos the given message.',
			usage       : 'echo',
			directory   : __dirname,
			userPerms   : 'SendMessages',
			ownerOnly   : true,

			options     : [
				{
					name        : 'Message',
					description : 'The message to echo.',
					required    : true,
					type        : 'STRING',
				},
			],
		});
	}

	async run(interaction) {
		const EchoEmbed = new this.Discord.EmbedBuilder()
			.setTitle(interaction.options.getString('Message'))
			.setColor(this.client.config.embed.color);

		interaction.reply({
			embeds: [EchoEmbed],
		});

		return await process.exit();
	}

	command() {
		const command = new this.Discord.SlashCommandBuilder()
			.setName(this.name)
			.setDescription(this.description)
			.setDefaultPermission(true);
		return command;
	}
}

module.exports = EchoCommand;