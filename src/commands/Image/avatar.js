const Slash = require('../../structs/templates/Slash');
const path = require('path');

class AvatarCommand extends Slash {

	constructor(client) {
		super(client, {
			name        : 'avatar',
			description : 'Retrieves the given user\'s avatar.',
			usage       : 'avatar <User>',
			directory   : __dirname,
			userPerms   : 'SendMessages',
			guildOnly   : false,

			options     : [
				{
					name        : 'user',
					description : 'The user\'s avatar to retrieve.',
					required    : true,
					type        : 'USER',
				},
			],
		});
	}

	async run(interaction) {
		const user = interaction.options.getUser('user');
		const avatar = {
			default: user.displayAvatarURL({ dynamic: true, size: 1024 }),
			png: user.displayAvatarURL({ format: 'png', size: 1024 }),
			jpg: user.displayAvatarURL({ format: 'jpg', size: 1024 }),
			gif: user.displayAvatarURL({ format: 'gif', size: 1024 }),
			webp: user.displayAvatarURL({ format: 'webp', size: 1024 }),
		};

		const AvatarEmbed = new this.Discord.EmbedBuilder()
			.setTitle('**Avatar**')
			.setImage(avatar.default)
			.setDescription(`**Links: [PNG](${avatar.png}) | [JPG](${avatar.jpg}) | [GIF](${avatar.gif}) | [WEBP](${avatar.webp})**`)
			.setFooter({
				text: `Requested by ${interaction.user.tag}`,
				iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }),
			})
			.setAuthor({
				name: user.tag,
				iconURL: avatar.default,
			})
			.setColor(this.client.config.embed.color)
			.setTimestamp();


		return await interaction.reply({
			embeds: [AvatarEmbed],
		});
	}
}

module.exports = AvatarCommand;