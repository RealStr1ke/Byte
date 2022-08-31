const Event = require('../structs/templates/Event');
const { EmbedBuilder } = require('discord.js');

class error extends Event {
	constructor(client) {
		super(client);
	}

	async run(err) {
		this.client.logger.fail(err.message);
		if (this.client.config.support.logs.errors) {
			const ErrorEmbed = new EmbedBuilder()
				.setTitle('Websocket Error')
				.setDescription(`Error: **${err.message}\nContent: \n ${err}`)
				.setColor('Red')
				.setTimestamp();
			const ErrorLog = this.client.channels.cache.get(this.client.support.errors);
			ErrorLog.send({
				embeds: [ErrorEmbed],
			});
			// return message.channel.send(`\`\`\`js\n${err.message}\`\`\``);
		}
	}
}
module.exports = error;
