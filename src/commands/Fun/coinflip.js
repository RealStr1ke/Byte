const Command = require("../../structs/Command");
const path = require("path");

class CoinFlipCommand extends Command {

    constructor(client) {
        super(client, {
            name        : "coinflip",
            description : "Flips a coin, obviously.",
            usage       : "coinflip",
            args        : false,
			directory   : __dirname,
            aliases     : ["cf"],
            userPerms   : "SEND_MESSAGES",
            ownerOnly   : false,
        });
    }

    async run(message) {
        // In the future, this will integrate the economy to add coinflip betting.
		const sides = ['heads', 'tails'];
        return message.reply(`I flipped a coin for you and it landed on ${sides[Math.floor(Math.random() * sides.length)]}!`);
    }
}

module.exports = CoinFlipCommand;