const Command = require('../../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const path = require('path');
class KickCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'kick',
			description : 'Kicks a member from the current server.',
			usage       : 'kick <member>',
			args        : true,
			directory   : __dirname,
			userPerms   : ['SEND_MESSAGES', 'KICK_MEMBERS'],
			botPerms    : ['SEND_MESSAGES', 'EMBED_LINKS', 'KICK_MEMBERS'],
			guildOnly   : true,
			requireData : true,
		});
	}

	async run(message, args, data) {
		const target = await this.client.resolveMember(args[0], message.guild);

		if (!target) return message.channel.send('You must give a valid member.');
		if (target.id === message.author.id) return message.channel.send('Why do you want to kick yourself?');
		if (target.id === this.client.user.id) return message.channel.send('*Nice try*, but you can\'t kick me.');
		if (message.member.ownerID !== message.author.id && target.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('You can\'t kick a person that\'s above you in the role hierarchy');
		if (!target.kickable) return message.channel.send('This member isn\'t kickable.');
		
		try {
			const reason = args.slice(1);
			const KickEmbed = new MessageEmbed()
				.setTitle('**Kick**')
				.addField('**Server**', `${message.guild.name}`, true)
				.addField('**Offender**', `<@${target.user.id}>`, true)
				.addField('**Reason**', `${reason.length ? reason.join(' ') : 'No Reason'}`, true)
				.addField('**Moderator**', `<@${message.author.id}>`, true)
				.setFooter({
					text: this.client.config.embed.footer,
					iconURL: this.client.user.displayAvatarURL(),
				})
				.setTimestamp();
			member.kick(`${reason.length ? reason.join(' ') : 'No Reason'}\n> — <@${message.author.id}>`);

			return message.channel.send({
				embeds: [KickEmbed],
			});
		} catch (error) {
			message.channel.send(`An error occured while trying to ban <@${target.id}>.`);
			this.client.logger.fail(error.message);
			return console.log(error);
		}
	}
}

module.exports = KickCommand;
