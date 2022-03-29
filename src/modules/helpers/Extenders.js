// const { Message, MessageEmbed, Interaction } = require('discord.js');
const { Message, MessageEmbed } = require('discord.js');

async function AmongUsMessage() {
	this.reply('Among Us!');
}

async function DefaultEmbedParams() {
	this
		.setAuthor({
			name: this.client.user.tag,
			iconURL: this.client.user.displayAvatarURL(),
		})
		.setFooter({
			text: this.client.config.embed.footer,
			iconURL: this.client.user.displayAvatarURL(),
		})
		.setColor(this.client.config.embed.color)
		.setTimestamp();
}

Message.prototype.sus = AmongUsMessage;
MessageEmbed.prototype.setDefault = DefaultEmbedParams;
