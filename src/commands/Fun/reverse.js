const Command = require("../../structs/Command");
const path = require("path");

class ReverseCommand extends Command {

    constructor(client) {
        super(client, {
            name        : "reverse",
            description : "Reverses the given text.",
            usage       : "rv",
            args        : true,
			directory   : __dirname,
            userPerms   : "SEND_MESSAGES",
            ownerOnly   : false,
        });
    }

    async run(message) {
		return message.reply(args.join(` `).split(``).reverse().join(""));
    }
}

module.exports = ReverseCommand;