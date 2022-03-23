// const { Message, MessageEmbed, Interaction } = require('discord.js');
const { Message } = require('discord.js');

async function AmongUs() {
	this.reply('Among Us!');
}

Message.prototype.sus = AmongUs;