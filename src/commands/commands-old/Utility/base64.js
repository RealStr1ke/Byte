const Command = require('../../../structs/templates/Command');
const { EmbedBuilder } = require('discord.js');
// const { default: axios } = require('axios');
const path = require('path');

class Base64Command extends Command {

	constructor(client) {
		super(client, {
			name        : 'base64',
			description : 'Converts the given information to Base64.',
			usage       : 'base64 <text>',
			args        : true,
			directory   : __dirname,
			userPerms   : 'SendMessages',
			ownerOnly   : false,
		});
	}

	async run(message, args) {
		try {
			// const { data: response } = await axios.request({
			// 	method: 'GET',
			// 	url: `https://some-random-api.ml/base64?encode=${args.join(' ')}`,
			// });

			const encoded = Buffer.from(args.join(' ')).toString('base64');
			
			const Base64Embed = new EmbedBuilder()
				.setTitle('__Base 64__')
				.setDescription(`\`${encoded}\``)
				.setDefault(this.client);

			await message.reply({
				embeds: [Base64Embed],
			});
		} catch (error) {
			const ErrorEmbed = new EmbedBuilder()
				.setTitle('An error occured while coverting to Base64.')
				.setDefault(this.client)
				.setColor('Red');
			console.log(error);
			await message.reply({
				embeds: [ErrorEmbed],
			});
		}
	}
}

module.exports = Base64Command;
