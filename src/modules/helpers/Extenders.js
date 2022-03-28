// const { Message, MessageEmbed, Interaction } = require('discord.js');
const { Message } = require('discord.js');

async function AmongUsMessage() {
	this.reply('Among Us!');
}

Message.prototype.sus = AmongUsMessage;
