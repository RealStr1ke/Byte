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
            guildOnly   : true,
			requireData : true
        });
    }

    async run(message, args, data) {
		if (args.length) {
			const prefix = args[0];
			if(prefix.length > 5){
				return message.reply(`The prefix ${prefix} is too long. Prefixes must be 5 characters or under.`);
			}
			data.guild.prefix = prefix;
			data.guild.save();
			this.client.logger.success(`${message.author.tag} set the prefix of ${message.guild.name} to ${prefix}`)
			return message.channel.send(`Successfully set prefix to \`${data.guild.prefix}\``);
		}
		return message.channel.send(`Prefix is \`${data.guild.prefix}\``);
    }
}

module.exports = PrefixCommand;