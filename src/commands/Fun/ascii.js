const Command = require("../../structs/Command"),
	figlet = require("figlet"),
	util = require("util"),
	figletAsync = util.promisify(figlet);

class ASCIICommand extends Command {

    constructor(client) {
        super(client, {
            name        : "ascii",
            description : "Turns the given text to ASCII text.",
            usage       : "ascii <text>",
            args        : true,
			directory   : __dirname,
            userPerms   : "SEND_MESSAGES",
            ownerOnly   : false,
        });
    }

    async run(message, args) {
		const text = args.join(" ");
		if (!text || text.length > 20) {
			return message.reply(`You must run the command with the text you want to convert: ${this.usage}`);
		}

		const rendered = await figletAsync(text);
		message.channel.send("```" + rendered + "```");
	}
}

module.exports = ASCIICommand;
