const Command = require('../../../structs/templates/Command');
const { EmbedBuilder } = require('discord.js');
const path = require('path');

class AvatarCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'avatar',
			description : 'Responds with the given user\'s avatar.',
			usage       : 'advice <User>',
			args        : false,
			directory   : __dirname,
			userPerms   : 'SendMessages',
		});
	}

	async run(message, args) {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
		const avatar = {
			default: member.user.displayAvatarURL({ dynamic: true, size: 1024 }),
			png: member.user.displayAvatarURL({ format: 'png', size: 1024 }),
			jpg: member.user.displayAvatarURL({ format: 'jpg', size: 1024 }),
			gif: member.user.displayAvatarURL({ format: 'gif', size: 1024 }),
			webp: member.user.displayAvatarURL({ format: 'webp', size: 1024 }),
		};

		const AvatarEmbed = new EmbedBuilder()
			.setTitle('**Avatar**')
			.setImage(avatar.default)
			.setDescription(`**Links: [PNG](${avatar.png}) | [JPG](${avatar.jpg}) | [GIF](${avatar.gif}) | [WEBP](${avatar.webp})**`)
			.setFooter({
				text: `Requested by ${message.member.displayName}`,
				iconURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 }),
			})
			.setAuthor({
				name: member.user.tag,
				iconURL: avatar.default,
			})
			.setColor(this.client.config.embed.color)
			.setTimestamp();

		return await message.reply({
			embeds: [AvatarEmbed],
		});

	}
}

module.exports = AvatarCommand;