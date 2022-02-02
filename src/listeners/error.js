const Event = require('../structs/templates/Event');
const { MessageEmbed } = require('discord.js');

class error extends Event {
	constructor(client) {
		super(client);
	}

	async run(err) {
		this.client.logger.fail(err.message);
		const embed = new MessageEmbed()
			.setTitle('Websocket Error')
			.setDescription(`Error: **${err.message}\nContent: \n ${err}`)
			.setColor(this.client.config.embed.color)
			.setTimestamp();
		this.client.support.errors.send({
			embeds: embed,
		});
		return message.channel.send(`\`\`\`js\n${err.message}\`\`\``);
	}
}
module.exports = error;
