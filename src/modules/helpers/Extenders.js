// const { Message, MessageEmbed, Interaction } = require('discord.js');
const { Message, MessageEmbed } = require('discord.js');

async function AmongUsMessage() {
	this.reply('Among Us!');
}

function DefaultEmbedParams(client) {
	this
		.setAuthor({
			name: client.user.tag,
			iconURL: client.user.displayAvatarURL(),
		})
		.setFooter({
			text: client.config.embed.footer,
			iconURL: client.user.displayAvatarURL(),
		})
		.setColor(client.config.embed.color)
		.setTimestamp();
	return this;
}

function NowUnixTime() {
	return Math.round(Date.now() / 1000);
}

Date.prototype.nowUnix = NowUnixTime;
Message.prototype.sus = AmongUsMessage;
MessageEmbed.prototype.setDefault = DefaultEmbedParams;
