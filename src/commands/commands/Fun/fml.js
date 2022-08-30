const Command = require('../../../structs/templates/Command');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const path = require('path');

class FMLCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'fml',
			description : 'Responds with a random FML (F*** my life) quote.',
			usage       : 'fml',
			args        : false,
			directory   : __dirname,
			userPerms   : 'SendMessages',
			ownerOnly   : false,
		});
	}

	async run(message) {
		const response = await axios.get('https://blague.xyz/api/vdm/random?lang=EN');
		const FMLEmbed = new EmbedBuilder()
			.setTitle('Here\'s an FML quote')
			.setDescription(`${response.data.vdm.content} **FML**`)
			.setFooter({
				text: this.client.config.embed.footer,
				iconURL: this.client.user.displayAvatarURL(),
			})
			.setColor(this.client.config.embed.color)
			.setTimestamp();

		await message.reply({
			embeds: [FMLEmbed],
		});
	}
}

module.exports = FMLCommand;