const Event = require('../structs/templates/Event');
const { MessageEmbed } = require('discord.js');

class guildCreate extends Event {
	constructor(client) {
		super(client);
	}

	async run(guild) {
		this.client.logger.guildJoin(guild.name, guild.memberCount, guild.channels.channelCountWithoutThreads);
		await this.client.database.getGuild(guild.id);

		const JoinEmbed = new MessageEmbed()
			.setTitle(`**Hi! My name is ${this.client.user.username}.**`)
			.setDescription(`**${[
				'Thank you for adding me to this guild!',
				`My default prefix is \`${this.client.prefix}\`.`,
				`To see all of my commands, type \`${this.client.prefix}help\``,
			].join('\n')}**`)
			.setAuthor({
				name: this.client.user.username,
				iconURL: this.client.user.displayAvatarURL({ size: 512, dynamic: true, format: 'png' }),
			})
			.setFooter({
				text: this.client.config.embed.footer,
				iconURL: this.client.user.displayUse,
			})
			.setTimestamp();

		guild.systemChannel.send({
			embeds: [JoinEmbed],
		});

		return;
	}
}
module.exports = guildCreate;
