const Command = require('../../../structs/templates/Command');
const { EmbedBuilder } = require('discord.js');
const path = require('path');
const { default: axios } = require('axios');

class DJSCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'djs',
			description : 'Searches discord.js documentation.',
			usage       : 'djs <search>',
			args        : true,
			directory   : __dirname,
			aliases     : ['djsdocs'],
			userPerms   : 'SEND_MESSAGES',
			ownerOnly   : true,
		});
	}

	async run(message, args) {
		const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(args.join(' '))}`;

		const embed = await axios.get(url);
		const { data } = embed;

		if (data && !data.error) {
			message.reply({
				embeds: [data],
			});
		} else {
			const ErrorEmbed = new EmbedBuilder()
				.setTitle(':x: Could not find any documentation for that.')
				.setDefault(this.client);
			message.reply({
				embeds: [ErrorEmbed],
			});
		}
	}
}

module.exports = DJSCommand;