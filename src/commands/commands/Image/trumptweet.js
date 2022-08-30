const Command = require('../../../structs/templates/Command');
const { EmbedBuilder, MessageAttachment } = require('discord.js');
const axios = require('axios');
const path = require('path');

class TrumpTweetCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'trumptweet',
			description : 'Returns the given text as a tweet from Donald Trump.',
			usage       : 'trumptweet <Text>',
			example     : 'trumptweet Cope harder.',
			args        : false,
			aliases     : ['tt'],
			directory   : __dirname,
			userPerms   : 'SendMessages',
		});
	}

	async run(message, args) {
		let tweet = args.join(' ');
		if (tweet.length > 68) tweet = tweet.slice(0, 65) + '...';

		const response = await axios.get(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${tweet}`);
		const Image = new MessageAttachment(response.data.message, 'trumptweet.png');

		return message.reply({
			files: [Image],
		});

	}
}

module.exports = TrumpTweetCommand;