const Command = require( "../../../lib/structs/Command" );
const { MessageEmbed } = require('discord.js');
class PrefixCommand extends Command {

    constructor(client) {
        super(client, {
            name        : "prefix",
            description : "Changes the prefix of the bot for the current guild.",
            usage       : "prefix <prefix>",
            args        : false,
            category    : "Management",
            permLevel   : 0,
            userPerms   : "SEND_MESSAGES",
            guildOnly   : true
        });
    }

    async run(message, args) {
		if (args.length) {
			await this.client.prefixes.set(message.guild.id, args[0]);
			this.client.logger.success(`${message.author.tag} set the prefix of ${message.guild.name} to ${args[0]}`)
			return message.channel.send(`Successfully set prefix to \`${args[0]}\``);
		}
		return message.channel.send(`Prefix is \`${await this.client.prefixes.get(message.guild.id) || globalPrefix}\``);
    }
}

module.exports = PrefixCommand;