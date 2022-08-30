const Command = require('../../../structs/templates/Command');
const { EmbedBuilder } = require('discord.js');
const path = require('path');

class GradeCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'grade',
			description : 'Sets your grade level.',
			usage       : 'grade',
			args        : false,
			directory   : __dirname,
			aliases     : ['grd'],
			userPerms   : 'SendMessages',
			ownerOnly   : false,
			requireData : true,
		});
	}

	async run(message, args, data) {
		let grade = data.student.gradelevel;
		if (!args.length) return message.channel.send(`**Your current grade level is ${grade}.**`);

		grade = args[0];
		if (isNaN(grade)) return message.channel.send('This is not a number.');

		grade = parseInt(grade);
		if (grade > 12) return message.channel.send('You can\'t have a grade level above 12th grade');
		if (grade < 0) return message.channel.send('You can\'t have a grade level below kindergarten.');

		data.student.gradelevel = grade;
		data.student.markModified('gradelevel');
		data.student.save();

		const GradeEmbed = new EmbedBuilder()
			.setTitle(`**Your grade level has been successfully changed to ${grade}**`)
			.setColor(this.client.config.embed.color)
			.setFooter(this.client.config.embed.footer);

		return message.channel.send({
			embeds: [GradeEmbed],
		});
	}
}

module.exports = GradeCommand;