const Command = require('../../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const path = require('path');

class NameCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'name',
			description : 'Changes your set name',
			usage       : 'name <First> <Last>',
			args        : false,
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
			guildOnly   : true,
			ownerOnly   : false,
			education   : true,
			requireData : true,
		});
	}

	async run(message, args, data) {

		if (!args || args.length < 1) {
			const NameEmbed = new MessageEmbed()
				.setTitle(`**Your name is ${data.student.firstName + ' ' + data.student.lastName}**`)
				.setColor(this.client.config.embed.color)
				.setFooter(this.client.config.embed.footer)
				.setTimestamp();
			return message.channel.send({
				embeds: [NameEmbed],
		    });
		}

		if (!args[0] || !args[1]) {
			return message.reply('You must provide both your first name and your last name.');
		}

		const firstName = args[0];
		const lastName = args[1];

		data.student.firstName = firstName;
		data.student.lastName = lastName;

		data.student.markModified('firstName');
		data.student.markModified('lastName');

		data.student.save();

		const NameEmbed = new MessageEmbed()
			.setTitle(`**Your name is now set to ${firstName + ' ' + lastName}**`)
			.setColor(this.client.config.embed.color)
			.setFooter(this.client.config.embed.footer)
			.setTimestamp();

		return message.channel.send({
			embeds: [NameEmbed],
		});
	}
}

module.exports = NameCommand;