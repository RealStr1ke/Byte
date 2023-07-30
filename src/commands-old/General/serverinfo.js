const Command = require('../../../structs/templates/Command');
const { EmbedBuilder } = require('discord.js');
const path = require('path');

class ServerInfoCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'serverinfo',
			description : 'Gives information about the current server',
			usage       : 'serverinfo',
			args        : false,
			aliases     : ['si', 'sinfo'],
			directory   : __dirname,
			userPerms   : 'SendMessages',
			guildOnly   : true,
		});
	}

	async run(message, args) {
		const guild = message.guild;

		await guild.members.fetch();

		const memberCount = guild.members.cache.filter(m => !m.user.bot).size;
		const botCount = guild.members.cache.filter(m => m.user.bot).size;
		const channelCount = guild.channels.cache.filter(c => c.type === 'text').size;
		const voiceCount = guild.channels.cache.filter(c => c.type === 'voice').size;
		const categoryCount = guild.channels.cache.filter(c => c.type === 'category').size;

		const ServerInfo = new EmbedBuilder()
			.setTitle(`**${guild.name}'s Info**`)
			.setThumbnail(guild.iconURL({ dynamic: true }))
			.addField('**ID**', `\`${message.guild.id}\``, true)
			.addField('**Members**', `**Total:** ${message.guild.memberCount}\n**Members:** ${memberCount}\n**Bots:** ${botCount} `, true)
			.addField('**Guild Owner**', `<@${guild.ownerId}>`, true)
			.addField('**Boosts**', `${guild.premiumSubscriptionCount || 0}`, true)
			.addField('**Channels**', `**Text:** ${channelCount}\n**Voice:** ${voiceCount}\n**Categories:** ${categoryCount}`, true)
			.setAuthor({
				name: guild.name,
				iconURL: guild.iconURL({ dynamic: true }),
			})
			.setColor(this.client.config.embed.color)
			.setFooter({
				text: this.client.config.embed.footer,
				iconURL: this.client.user.displayUse,
			})
			.setTimestamp();

		if (message.guild?.welcome_screen?.description) ServerInfo.setDescription(message.guild.welcome_screen.description);
		if (message.guild?.banner) ServerInfo.setImage(`https://cdn.discordapp.com/banners/${message.guild.id}/${message.guild.banner}.png?size=1024`);
		if (message.guild?.vanity_url_code) {
			ServerInfo
				.addField('**Vanity URL**', `https://discord.gg/${message.guild.vanity_url_code}`, true)
				.setURL(`https://discord.gg/${message.guild.vanityURLCode}`);
		}
		message.channel.send({
			embeds: [ServerInfo],
		});
	}
}

module.exports = ServerInfoCommand;