const Command = require('../../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const path = require('path');
const moment = require('moment');
const { serverInfo } = require('../../../modules/constants/constants'),
	{ channelTypes } = serverInfo;

class ChannelInfoCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'channelinfo',
			description : 'Gives information about the given channe',
			usage       : 'channelinfo',
			args        : false,
			aliases     : ['ci', 'cinfo'],
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
			guildOnly   : true,
		});
	}

	async run(message, args) {
		await message.guild.members.fetch();

		let channel = message.channel;
		if (args[0]) channel = this.client.resolveChannel(args[0], message.guild) || message.channel;

		const ChannelInfo = new MessageEmbed()
			.setTitle(`**<#${channel.id}>'s Info**`)
			.addField('Channel', `<#${channel.id}>`, true)
			.addField('ID', `\`${channel.id}\``, true)
			.addField('Type', `\`${channelTypes[channel.type]} Channel\``, true)
			.addField('Users', `\`${Array.from(channel.members.values()).filter(member => !member.user.bot).length}\``, true)
			.addField('Bots', `\`${Array.from(channel.members.values()).filter(member => member.user.bot).length}\``, true)
			.addField('Created On', `\`${moment(channel.createdAt).format('MMM DD YYYY')}\``, true)
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.setAuthor({
				name: message.guild.name,
				iconURL: message.guild.iconURL({ dynamic: true }),
			})
			.setFooter({
				text: this.client.config.embed.footer,
				iconURL: this.client.user.displayUse,
			})
			.setColor(this.client.config.embed.color)
			.setTimestamp();
		if (channel.topic) ChannelInfo.setDescription(channel.topic);
		if (channel.type === 'GUILD_TEXT') {
			ChannelInfo
				.spliceFields(3, 0, { name: 'Slowmode', value: `\`${channel.rateLimitPerUser} secs\``, inline: true })
				.spliceFields(6, 0, { name: 'NSFW', value: `\`${channel.nsfw}\``, inline: true });
		} else if (channel.type === 'GUILD_NEWS') {
			ChannelInfo
				.spliceFields(6, 0, { name: 'NSFW', value: `\`${channel.nsfw}\``, inline: true });
		} else if (channel.type === 'GUILD_VOICE') {
			ChannelInfo
				.spliceFields(0, 1, { name: 'Channel', value: `${voice} ${channel.name}`, inline: true })
				.spliceFields(5, 0, { name: 'User Limit', value: `\`${channel.userLimit}\``, inline: true })
				.spliceFields(6, 0, { name: 'Full', value: `\`${channel.full}\``, inline: true });
			if (channel.members.array().length > 0) ChannelInfo.addField('Members Joined', channel.members.array().join(' '));
		} else {
			return message.reply('**Please enter a valid channel or provide a valid channel ID.**');
		}

		message.channel.send({
			embeds: [ChannelInfo],
		});
	}
}

module.exports = ChannelInfoCommand;