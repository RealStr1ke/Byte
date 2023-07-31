const Slash = require('../../structs/templates/Slash');
const axios = require('axios');
const path = require('path');

class DogCommand extends Slash {

	constructor(client) {
		super(client, {
			name        : 'dog',
			description : 'Responds with a random dog picture.',
			usage       : 'dog',
			directory   : __dirname,
			userPerms   : 'SendMessages',
			guildOnly   : false,
		});
	}

	async run(interaction) {
		const response = await axios.get('https://dog.ceo/api/breeds/image/random');
		const DogEmbed = new EmbedBuilder()
			.setTitle('**😍 | Awwwww | 😍**')
			.setImage(response.data.message)
			.setFooter({
				text: `Requested by ${interaction.user.tag} • ${this.client.config.embed.footer}`,
				iconURL: this.client.user.displayAvatarURL(),
			});
		return interaction.reply({
			embeds: [DogEmbed],
		});
	}
}

module.exports = DogCommand;