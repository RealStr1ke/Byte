const Command = require('../../../structs/templates/Command');
const { EmbedBuilder, MessageActionRow, MessageButton } = require('discord.js');
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
			userPerms   : 'SendMessages',
		});
	}

	async run(message) {
		const Meme = async () => {
			const response = await axios.get('https://meme-api.herokuapp.com/gimme');
			const MemeEmbed = new EmbedBuilder()
				.setDescription(`[**${response.data.title}** (r/${response.data.subreddit})](${response.data.postLink})`)
				.setImage(response.data.url)
				.setFooter({
					text: this.client.config.embed.footer,
					iconURL: this.client.user.displayAvatarURL(),
				})
				.setColor(this.client.config.embed.color)
				.setTimestamp();
			return MemeEmbed;
		};

		let MemeEmbed;
		MemeEmbed = await Meme();

		const NextMeme = new MessageButton()
			.setCustomId('next')
			.setLabel('Next Meme')
			.setStyle('PRIMARY');
		const EndInteraction = new MessageButton()
			.setCustomId('end')
			.setLabel('End Interaction')
			.setStyle('DANGER');
		const MemeRow = new MessageActionRow()
			.addComponents(NextMeme, EndInteraction);

		const MemeMessage = await message.reply({
			embeds: [MemeEmbed],
			components: [MemeRow],
		});

		const NextFilter = i => i.customId === 'next' && i.user.id === message.author.id;
		const EndFilter = i => i.customId === 'end' && i.user.id === message.author.id;
		const FullFilter = NextFilter && EndFilter;
		const ButtonCollector = message.channel.createMessageComponentCollector({ FullFilter, time: 15000 });

		ButtonCollector.on('collect', async i => {
			if (NextFilter(i)) {
				await i.deferUpdate();
				await ButtonCollector.resetTimer({
					time: 30000,
				});
				MemeEmbed = await Meme();
				await MemeMessage.edit({
					embeds: [MemeEmbed],
					components: [MemeRow],
				});
			} else if (EndFilter(i)) {
				await i.deferUpdate();
				ButtonCollector.stop('User ended interaction.');
			}
		});

		ButtonCollector.on('end', async () => {
			NextMeme.setDisabled(true);
			EndInteraction.setDisabled(true);
			MemeRow.setComponents(NextMeme, EndInteraction);
			await MemeMessage.edit({
				embeds: [MemeEmbed],
				components: [MemeRow],
			});
		});


	}
}

module.exports = MemeCommand;