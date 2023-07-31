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
			guildOnly   : false,

			options     : [
				{
					name        : 'message',
					description : 'The message to echo.',
					required    : true,
					type        : 'STRING',
				},
			],
		});
	}

	async run(interaction) {
		const EchoEmbed = new this.Discord.EmbedBuilder()
			.setTitle(interaction.options.getString('message'))
			.setColor(this.client.config.embed.color);

		return await interaction.reply({
			embeds: [EchoEmbed],
		});
	}
}

module.exports = EchoCommand;