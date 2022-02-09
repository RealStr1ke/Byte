const Command = require('../../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const path = require('path');
class UnbanCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'unban',
			description : 'Unbans a member from the current server.',
			usage       : 'unban <User ID>',
			args        : true,
			directory   : __dirname,
			userPerms   : ['BAN_MEMBERS'],
			botPerms    : ['SEND_MESSAGES', 'EMBED_LINKS', 'BAN_MEMBERS'],
			guildOnly   : true,
			requireData : true,
		});
	}

	async run(message, args, data) {
		let user;

		if (isNaN(args[0])) return message.channel.send('You must give a valid user ID.');
		if (args[0].length !== 18) return message.channel.send('You must give a valid user ID.');

		user = await message.guild.bans.fetch(args[0]).catch(() => {});
		if (!user) return message.channel.send('This user is not banned.');
		user = user.user;

		try {
			const UnbanEmbed = new MessageEmbed()
				.setTitle('**Unban**')
				.addField('**Server**', `${message.guild.name}`, true)
				.addField('**User**', user.tag, true)
				.addField('**Moderator**', `<@${message.author.id}>`, true)
				.setFooter({
					text: this.client.config.embed.footer,
					iconURL: this.client.user.displayAvatarURL(),
				})
				.setTimestamp();

			message.guild.members.unban(user)
				.catch(() => {});
			return message.channel.send({
				embeds: [UnbanEmbed],
			});
		} catch (error) {
			this.client.logger.fail(error.message);
			console.log(error);
			return message.channel.send(`An error occured while trying to unban ${user.tag}.`);
		}
	}
}

module.exports = UnbanCommand;
