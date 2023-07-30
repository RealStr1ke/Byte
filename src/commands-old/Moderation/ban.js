const Command = require('../../../structs/templates/Command');
const { EmbedBuilder } = require('discord.js');
const path = require('path');
class BanCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'ban',
			description : 'Bans a member from the current server.',
			usage       : 'ban <member> <reason>',
			args        : true,
			directory   : __dirname,
			userPerms   : ['BanMembers'],
			botPerms    : ['SendMessages', 'EmbedLinks', 'BanMembers'],
			guildOnly   : true,
			requireData : true,
		});
	}

	async run(message, args, data) {
		const target = await this.client.resolveMember(args[0], message.guild);

		if (!target) return message.channel.send('You must give a valid member.');
		if (target.id === message.author.id) return message.channel.send('Why do you want to ban yourself?');
		if (target.id === this.client.user.id) return message.channel.send('*Nice try*, but you can\'t ban me.');
		if (message.member.ownerID !== message.author.id && target.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('You can\'t ban a person that\'s above you in the role hierarchy');
		if (!target.bannable) return message.channel.send('This member isn\'t bannable.');
		const banList = await message.guild.bans.fetch();
		if (banList.some((member) => member.user.id === target.id)) return message.channel.send(`This user (${target.tag}) is already banned.`);


		try {
			const reason = args.slice(1);
			const BanEmbed = new EmbedBuilder()
				.setTitle('**Ban**')
				.addField('**Server**', `${message.guild.name}`, true)
				.addField('**Offender**', `<@${target.user.id}>`, true)
				.addField('**Reason**', `${reason.length ? reason.join(' ') : 'No Reason'}`, true)
				.addField('**Moderator**', `<@${message.author.id}>`, true)
				.setFooter({
					text: this.client.config.embed.footer,
					iconURL: this.client.user.displayAvatarURL(),
				})
				.setTimestamp();
			message.guild.members.ban(target, {
				reason: `${reason.length ? reason.join(' ') : 'No Reason'}\n> — <@${message.author.id}>`,
			});
			return message.channel.send({
				embeds: [BanEmbed],
			});
		} catch (error) {
			message.channel.send(`An error occured while trying to ban <@${target.id}>.`);
			this.client.logger.fail(error.message);
			return console.log(error);
		}
	}
}

module.exports = BanCommand;
