const Command = require('../../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const path = require('path');
const { existsSync } = require('fs');

class ScheduleCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'schedule',
			description : 'Sets your schedule',
			usage       : 'schedule <Period #> <Subject>',
			args        : false,
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
			guildOnly   : true,
			education   : true,
			requireData : true,
		});
	}

	async run(message, args, data) {
		if (!args || args.length < 1) {
			const ScheduleEmbed = new MessageEmbed()
				.setTitle('**Here is your current schedule**')
				.setColor(this.client.config.embed.color)
				.setFooter(this.client.config.embed.footer)
				.setTimestamp();
			const subjects = data.student;
			for (let i = 0; i < subjects.length; i++) {
				ScheduleEmbed.addField(`${i + 1}`, subjects[i], true);
			}
			return message.channel.send({
				embeds: [ScheduleEmbed],
			});
		}

		if (!((args[0] == 'add') || (args[0] == 'remove') || (args[0] == 'clear'))) {
			return message.channel.send('Your first argument must be either `add`, `remove`, `clear`.');
		}

		if (args[0] == 'clear') {
			data.guild.plugins.education.subjects = [];
			data.guild.markModified('plugins.education.subjects');
			data.guild.save();
			return message.channel.send('The subjects were successfully cleared.');
		}

		const subject = (args.slice(1, args.length + 1)).join(' ');
		let subjectExists = {};
		subjectExists.exists = false;
		const subjects = data.guild.plugins.education.subjects;
		for (let i = 0; i < subjects.length; i++) {
			if (subjects[i] == subject) {
				subjectExists = {};
				subjectExists.index = i;
				subjectExists.exists = true;
				break;
			}
		}

		if (args[0] == 'add') {
			if (subjectExists.exists) return message.channel.send('This subject already exists.');
			data.guild.plugins.education.subjects.push(subject);
			data.guild.markModified('plugins.education.subjects');
			data.guild.save();
			return message.channel.send(`The subject \`${subject}\` was successfully added.`);
		}
		if (args[0] == 'remove') {
			if (!subjectExists.exists) return message.channel.send(`The subject \`${subject}\` doesn't exist.`);
			data.guild.plugins.education.subjects.splice(subjectExists.index, 1);
			data.guild.markModified('plugins.education.subjects');
			data.guild.save();
			return message.channel.send(`The subject \`${subject}\` was successfully removed.`);
		}
	}
}

module.exports = ScheduleCommand;