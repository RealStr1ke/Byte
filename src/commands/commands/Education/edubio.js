const Command = require('../../../structs/templates/Command');
const { EmbedBuilder } = require('discord.js');
const path = require('path');

class EduBioCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'edubio',
			description : 'Sets your profile bio.',
			usage       : 'edubio <bio>',
			args        : false,
			directory   : __dirname,
			aliases     : ['ebio'],
			userPerms   : 'SEND_MESSAGES',
			ownerOnly   : false,
			requireData : true,
		});
	}

	async run(message, args, data) {
		let bio = data.student.bio;
		if (!args.length) return message.channel.send(`**Your current bio is "${bio}"**`);

		bio = args.join(' ');
		data.student.bio = bio;
		data.student.markModified('bio');
		data.student.save();

		const BioEmbed = new EmbedBuilder()
			.setTitle('**Your bio has been successfully changed.**')
			.setDescription(`**${data.student.bio}**`)
			.setColor(this.client.config.embed.color)
			.setFooter({
				text: `Requested by ${message.author.tag} • ${this.client.config.embed.footer}`,
				iconURL: this.client.user.displayAvatarURL(),
			})
			.setTimestamp();

		return message.channel.send({
			embeds: [BioEmbed],
		});
	}
}

module.exports = EduBioCommand;