const Command = require('../../../structs/templates/Command');
const { EmbedBuilder } = require('discord.js');
const path = require('path');
class SetPrefixCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'setprefix',
			description : 'Changes the prefix of the bot for the current guild.',
			usage       : 'setprefix <prefix>',
			args        : false,
			directory   : __dirname,
			userPerms   : ['SEND_MESSAGES', 'MANAGE_GUILD'],
			guildOnly   : true,
			requireData : true,
		});
	}

	async run(message, args, data) {
		if (args.length) {
			const prefix = args[0];
			if (prefix.match('default') || prefix.match(this.client.config.prefix)) {
				data.guild.prefix = this.client.config.prefix;
				data.guild.save();
				this.client.logger.success(`${message.author.tag} set the prefix of ${message.guild.name} to ${prefix}`);
				return message.reply(`The prefix has been reset to \`${this.client.config.prefix}\``);
			}
			if (prefix.length > 5) {
				return message.reply(`The prefix \`${prefix}\` is too long. Prefixes must be 5 characters or less.`);
			}
			data.guild.prefix = prefix;
			data.guild.markModified('prefix');
			data.guild.save();
			return message.channel.send(`Successfully set prefix to \`${data.guild.prefix}\``);
		}
		return message.channel.send(`Prefix is \`${data.guild.prefix}\``);
	}
}

module.exports = SetPrefixCommand;
