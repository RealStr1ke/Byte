const Command = require('../../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const path = require('path');

class MemeCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'meme',
			description : 'Gets a random meme from r/memes, r/dankmemes, or r/me_irl subreddits.',
			usage       : 'meme',
			args        : false,
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
		});
	}

	async run(message) {
		const Meme = async (response) => {
			const MemeEmbed = new MessageEmbed()
				.setTitle(response.data.title)
				// .setDescription(`[r/${response.data.subreddit}](${response.data.postLink})`)
				.setImage(response.data.url)
				.setFooter({
					text: this.client.config.embed.footer,
					iconURL: this.client.user.displayAvatarURL(),
				})
				.setColor(this.client.config.embed.color)
				.setTimestamp();
			return MemeEmbed;
		};

		const firstRes = await axios.get('https://meme-api.herokuapp.com/gimme');
		const FirstMeme = await Meme(firstRes);
		const MemeMessage = await message.channel.send({
			embeds: [FirstMeme],
		});

		MemeMessage.react('⏭️');
		const filter = (reaction, user) => {
			return reaction.emoji.name === '⏭️' && user.id === message.author.id;
		};

		const collector = MemeMessage.createReactionCollector({
			filter,
			time: 15000,
		});

		collector.on('collect', async (reaction, user) => {
			if (reaction.me) return;
			console.log(reaction);
			if (!filter(reaction, user)) return reaction.users.remove(user.id);
			const res = await axios.get('https://meme-api.herokuapp.com/gimme');
			const CurrentMeme = Meme(res);
			MemeMessage.edit({
				embeds: [CurrentMeme],
			});
		});

		collector.on('end', async () => {
			MemeMessage.edit('```No more memes lol```');
		});

	}
}

module.exports = MemeCommand;