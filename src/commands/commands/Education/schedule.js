const Command = require('../../../structs/templates/Command');
const { EmbedBuilder } = require('discord.js');

class ScheduleCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'schedule',
			description : 'Sets your schedule',
			usage       : 'schedule <set/clear> <Period #> <Subject>',
			args        : false,
			directory   : __dirname,
			userPerms   : 'SendMessages',
			guildOnly   : true,
			education   : true,
			requireData : true,
		});
	}

	async run(message, args, data) {
		if (!args || args.length < 1) {
			const ScheduleEmbed = new EmbedBuilder()
				.setTitle('**Here is your current schedule**')
				.setColor(this.client.config.embed.color)
				.setFooter(this.client.config.embed.footer)
				.setTimestamp();
			const schedule = data.student.schedule;
			for (const [key, value] of Object.entries(schedule)) {
				ScheduleEmbed.addField(`**Period ${key}**`, `\`${value}\``, true);
			}
			return message.channel.send({
				embeds: [ScheduleEmbed],
			});
		}

		if (!((args[0] == 'set') || (args[0] == 'clear'))) {
			return message.channel.send('Your first argument must be either `set` or `clear`. If you want to remove a single period from your schedule, you have to clear your schedule and add all of the periods that you want to keep back.');
		}

		if (args[0] == 'clear') {
			data.student.schedule = {};
			data.student.markModified('schedule');
			data.student.save();
			return message.channel.send('Your schedule was successfully cleared.');
		}

		const subject = (args.slice(2, args.length + 1)).join(' ');
		console.log(subject);
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

		if (args[0] == 'set') {
			if (!subjectExists.exists) return message.channel.send('This subject doesn\'t exist.');
			if (isNaN(args[1])) return message.channel.send('The given period is not a number.');
			data.student.schedule[`${args[1]}`] = subject;
			console.log(data.student.schedule[`${args[1]}`]);
			data.student.markModified('schedule');
			data.student.save();
			return message.channel.send(`Period ${args[1]} was successfully set to ${subject}.`);
		}
	}
}

module.exports = ScheduleCommand;