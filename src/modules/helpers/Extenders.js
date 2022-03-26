// const { Message, MessageEmbed, Interaction } = require('discord.js');
const { Message, MessageEmbed } = require('discord.js');

async function AmongUsMessage() {
	this.reply('Among Us!');
}

Message.prototype.sus = AmongUsMessage;
