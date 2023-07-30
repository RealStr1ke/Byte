const Command = require('../../../structs/templates/Command');
const { EmbedBuilder } = require('discord.js');
const path = require('path');

class EducationCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'education',
			description : 'Toggles the education module.',
			usage       : 'education',
			args        : false,
			directory   : __dirname,
			aliases     : ['edu'],
			userPerms   : ['SendMessages', 'ManageGuild'],
			guildOnly   : true,
			requireData : true,
		});
	}

	async run(message, args, data) {
		let eduStatus = data.guild.plugins.education.enabled;

		if (eduStatus == false) {
			data.guild.plugins.education.enabled = true;
		} else {
			data.guild.plugins.education.enabled = false;
		}

		data.guild.markModified('plugins.education.enabled');
		data.guild.save();

		eduStatus = data.guild.plugins.education.enabled;
		const status = new EmbedBuilder()
			.setTitle(`**The education module has been toggled to ${eduStatus}**`)
			.setColor(this.client.config.embed.color)
			.setFooter(this.client.config.embed.footer);

		return message.channel.send({
			embeds: [status],
		});
	}
}

module.exports = EducationCommand;