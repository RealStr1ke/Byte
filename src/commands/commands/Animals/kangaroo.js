const Command = require('../../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const path = require('path');
const { default: axios } = require('axios');

class KangarooCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'kangaroo',
			description : 'Responds with a random kangaroo picture.',
			usage       : 'kangaroo',
			args        : false,
			directory   : __dirname,
			aliases     : ['kgr'],
			userPerms   : 'SEND_MESSAGES',
			ownerOnly   : false,
		});
	}

	async run(message) {
		const response = await axios.get('https://some-random-api.ml/img/kangaroo');
		const KangarooEmbed = new MessageEmbed()
			.setTitle('**😍 | Awwwww | 😍**')
			.setImage(response.data.link)
			.setFooter({
                text: `Requested by ${message.author.tag} • ${this.client.config.embed.footer}`, 
                iconURL: this.client.user.displayAvatarURL()
            });
		return message.channel.send({
			embeds: [KangarooEmbed],
		});
	}
}

module.exports = KangarooCommand;