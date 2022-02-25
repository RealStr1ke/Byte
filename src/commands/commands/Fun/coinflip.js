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
		console.log(chance);
		let result;
		const edgeString = 'L + ratio + don\'t care + didn\'t ask + cry about it + stay mad + get real + mald seethe cope harder + mad + basic + skill issue + you fell off + the audacity + triggered + any askers + redpilled + get a life + ok and? + cringe + touch grass + donowalled + not based + you\'re a (insert stereotype) + not funny didn\'t laugh + you\'re* + grammar issue + go outside + get good + reported + ad hominem + GG! + ur mom + mad about ping smh + Peak Slayer > Mid 3';
		if (chance < 0.25) {
			result = `I flipped a coin for you and it landed on it\'s edge! ${edgeString}`;
		} else {
			result = `I flipped a coin for you and it landed on ${sides[Math.floor(Math.random() * sides.length)]}!`;
		}
		return message.reply(`**${result}**`);
	}
}

module.exports = CoinFlipCommand;
