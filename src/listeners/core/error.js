const Event = require('../../structs/templates/Event');
const { MessageEmbed } = require('discord.js');

class error extends Event {
	constructor(client) {
		super(client);
	}

	async run(error) {
		this.client.logger.fail(error.message);
		const embed = new MessageEmbed()
			.setTitle('Websocket Error')
			.setDescription(`Error: **${error.message}\nContent: \n ${error}`)
			.setColor(this.client.config.embed.color)
			.setTimestamp();
		this.client.support.errors.send({
			embeds: embed,
		});
		return message.channel.send(`\`\`\`js\n${error.message}\`\`\``);
	}
}
module.exports = error;
