const Command = require('../../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const path = require('path');

class SomeoneCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'someone',
			description : '',
			usage       : 'someone',
			args        : false,
			directory   : __dirname,
			aliases     : ['somebody', 'randomuser'],
			userPerms   : 'SEND_MESSAGES',
		});
	}

	async run(message) {
		await message.guild.members.fetch();
		const member = message.guild.members.cache.random(1)[0];

		const SomeoneEmbed = new MessageEmbed()
			.setTitle(`<@!${member.user.id}>`)
			.addField('Username', member.user.username, true)
			.addField('Discriminator', member.user.discriminator, true)
			.addField('ID', member.user.id, true)
			.setThumbnail(member.user.displayAvatarURL({
				size: 512,
				dynamic: true,
				format: 'png',
			}))
			.setColor(this.client.config.embed.color);

		message.channel.send({
			embeds: [SomeoneEmbed],
		});

	}
}

module.exports = SomeoneCommand;