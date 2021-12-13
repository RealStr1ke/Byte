const Command = require( "../../../lib/structs/Command" );
const { MessageEmbed } = require('discord.js');

class ShutdownCommand extends Command {

    constructor(client) {
        super(client, {
            name        : "shutdown",
            description : "Shows the bot's connection status to the Discord API.",
            usage       : "shutdown",
            args        : false,
            category    : "Owner",
            aliases     : ["stop", "quit"],
            userPerms   : "SEND_MESSAGES",
            ownerOnly   : true,
        });
    }

    async run(message) {
		message.reply(`**Shutting down.**`);
		await this.client.sleep(1000);
        await this.client.destroy();
    }
}

module.exports = ShutdownCommand;