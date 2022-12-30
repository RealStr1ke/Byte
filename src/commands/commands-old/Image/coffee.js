const Command = require('../../../structs/templates/Command');
const { EmbedBuilder } = require('discord.js');
const path = require('path');

class CoffeeCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'coffee',
			description : 'Responds with a random coffee picture.',
			usage       : 'coffee',
			args        : false,
			directory   : __dirname,
			aliases     : ['espresso'],
			userPerms   : 'SendMessages',
			ownerOnly   : false,
		});
	}

	async run(message) {
		const link = await (this.client.flipnote).image.coffee();
		const coffee = new EmbedBuilder()
			.setTitle('**Here is your coffee picture:**')
			.setImage(link.file)
			.setFooter(`Requested by ${message.author.tag}`);
		return message.channel.send({ embeds: [ coffee ] });
	}
}

module.exports = CoffeeCommand;