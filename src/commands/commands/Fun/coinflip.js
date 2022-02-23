const Command = require('../../../structs/templates/Command');
const path = require('path');

class CoinFlipCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'coinflip',
			description : 'Flips a coin, obviously.',
			usage       : 'coinflip',
			args        : false,
			directory   : __dirname,
			aliases     : ['cf'],
			userPerms   : 'SEND_MESSAGES',
			ownerOnly   : false,
		});
	}

	async run(message) {
		// In the future, this will integrate the economy to add coinflip betting.
		const sides = ['heads', 'tails'];
		const chance = Math.random() * sides.length;
		const result = `I flipped a coin for you and it landed on **${sides[Math.floor(Math.random() * sides.length)]}!**`;
		if (chance < 0.02) {
			result = 'I flipped a coin for you and it landed on it\'s edge! L+Ratio';
		}
		return message.reply(result);
	}
}

module.exports = CoinFlipCommand;
