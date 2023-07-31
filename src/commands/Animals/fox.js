const Slash = require('../../structs/templates/Slash');
const axios = require('axios');
const path = require('path');

class FoxCommand extends Slash {

	constructor(client) {
		super(client, {
			name        : 'fox',
			description : 'Responds with a random fox picture.',
			usage       : 'fox',
			directory   : __dirname,
			userPerms   : 'SendMessages',
			guildOnly   : false,
		});
	}

	async run(interaction) {
		const response = await axios.get('https://random-d.uk/api/v2/random');
		const FoxEmbed = new this.Discord.EmbedBuilder()
			.setTitle('**😍 | Awwwww | 😍**')
			.setImage(response.data.image)
			.setFooter({
				text: `Requested by ${interaction.user.tag} • ${this.client.config.embed.footer}`,
				iconURL: this.client.user.displayAvatarURL(),
			});
		return interaction.reply({
			embeds: [FoxEmbed],
		});
	}
}

module.exports = FoxCommand;