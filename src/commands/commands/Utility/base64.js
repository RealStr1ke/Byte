const Command = require('../../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const { default: axios } = require('axios');
const path = require('path');

class Base64Command extends Command {

	constructor(client) {
		super(client, {
			name        : 'base64',
			description : 'Converts the given information to Base64.',
			usage       : 'base64 <text>',
			args        : true,
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
			ownerOnly   : false,
		});
	}

	async run(message, args) {
		try {
			const { data: response } = await axios.request({
				method: 'GET',
				url: `https://some-random-api.ml/base64?encode=${args.join(' ')}`,
			});

			const Base64Embed = new MessageEmbed()
				.setTitle('__Base 64__')
				.setDescription(`\`${response.base64}\``)
				.setDefault(this.client);

			await message.reply({
				embeds: [Base64Embed],
			});
		} catch (error) {
			const ErrorEmbed = new MessageEmbed()
				.setTitle('An error occured while coverting to Base64.')
				.setDefault(this.client)
				.setColor('RED');
			console.log(error);
			await message.reply({
				embeds: [ErrorEmbed],
			});
		}
	}
}

module.exports = Base64Command;