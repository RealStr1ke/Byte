const Event = require('../../../lib/structs/Event');

class messageCreate extends Event {
	constructor(client) {
        super(client);
    }

	async run(message) {
		const client = this.client;
		if (message.author.bot) return;
		let prefix;

		if (message.guild) {
			if (message.content.startsWith(client.config.prefix)) {
				prefix = client.config.prefix;
			} else {
				const guildPrefix = await client.prefixes.get(message.guild.id);
				if (message.content.startsWith(guildPrefix)) prefix = guildPrefix;
			}
		} else {
			prefix = client.config.prefix;
		}

		if (!prefix) return;

		if (message.content.match(new RegExp(`^<@!?${client.user.id}> ?$`))) {
			if (message.guild) return message.reply(`My prefix on this guild is \`${client.config.prefix}\``);
			return message.reply(`My global prefix is \`${client.config.prefix}\``);
		}

		const [ cmd, ...args ] = message.content.slice( prefix.length ).trim().split( / +/g );
        const command = client.commands.get( cmd.toLowerCase() ) || client.commands.get( client.commands.aliases.get( cmd.toLowerCase() ) );

        if (!command) return;

		this.client.logger.log(`${message.author.tag} ran the command ${message.content}`);
		
        if (command.nsfw && !message.channel.nsfw) return message.reply( '**You must run this command in an NSFW channel.**' );
		if ( !command.guildOnly && !message.guild ) return message.reply( '**This command cannot be used in DMs.**' );
		if (command.ownerOnly && this.client.config.owner.discord.id !== message.author.id) return message.reply('**This command can only be used by the owner of this bot.**');
		if ( command.args && !args.length ) return message.reply(`You must use the command correctly: ${command.usage}`);
		
		command.setMessage(message);
		command.run(message,args);
	}
}
module.exports = messageCreate;
