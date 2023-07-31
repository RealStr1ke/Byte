const Slash = require('../../structs/templates/Slash');
const path = require('path');

class AvatarCommand extends Slash {

	constructor(client) {
		super(client, {
			name        : 'ban',
			description : 'Bans the given user.',
			usage       : 'ban <User>',
			directory   : __dirname,
			userPerms   : ['BanMembers'],
			botPerms    : ['SendMessages', 'EmbedLinks', 'BanMembers'],
			guildOnly   : true,

			options     : [
				{
					name        : 'member',
					description : 'The member to ban.',
					required    : true,
					type        : 'USER',
				},
				{
					name        : 'reason',
					description : 'The reason for banning the user.',
					required    : false,
					type        : 'STRING',
				},
			],
		});
	}

	async run(interaction) {
		const member = interaction.options.getMember('member');
		const reason = interaction.options.getString('reason') || 'No reason provided.';

		if (member.id === interaction.user.id) return await interaction.reply('Why do you want to ban yourself?');
		if (member.id === this.client.user.id) return await interaction.reply('Nice try, but you can\'t ban me.');
		if (member.roles.highest.position >= interaction.member.roles.highest.position) return await interaction.reply('You can\'t ban someone with a higher role than you.');
		if (!member.bannable) return await interaction.reply('I can\'t ban this user.');

		try {
			const BanEmbed = new this.Discord.EmbedBuilder()
				.setTitle('**Ban**')
				.addField('**Server:**', interaction.guild.name, true)
				.addField('**Moderator:**', interaction.user.tag, true)
				.addField('**Offender:**', member.user.tag, true)
				.addField('**Reason:**', reason, true)
				.setFooter({
					text: this.client.config.embed.footer,
					iconURL: this.client.user.displayAvatarURL(),
				})
				.setTimestamp();

			await interaction.guild.members.ban(member, {
				reason: `${reason}\n> — ${interaction.user.tag}`,
			});

			return await interaction.reply({
				embeds: [BanEmbed],
			});
		} catch (error) {
			this.client.logger.fail(error.message);
			const FailedBanEmbed = new this.Discord.EmbedBuilder().ErrorEmbed(this.client);
			return await interaction.reply({
				embeds: [FailedBanEmbed],
			});
		}
	}
}

module.exports = AvatarCommand;