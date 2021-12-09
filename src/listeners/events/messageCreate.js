const Event = require('../../../lib/structs/Event');

class messageCreate extends Event {
	constructor( client ) {
        super( client );
    }

	async run(message) {
		const client = this.client;
		
		if (message.author.bot) {
			return;
		}
        // if(message.content.startsWith(this.client.prefix)) return this.client.log.log(`${message.author.tag} ran the command ${message.content}`);
		const prefixMention = new RegExp(`^<@!?${client.user.id}> ?$`);
		if (message.content.match(prefixMention)) {
			message.reply(`My prefix on this guild is \`${client.config.prefix}\``);
		}
		const prefix = client.config.prefix;
  // if (!prefix) return;
		if (!message.content.startsWith(prefix)) return this.client.logger.log(`${message.guild.name} | #${message.channel.name} | ${message.author.tag}: ${message.content}`);

		const [ cmd, ...args ] = message.content.slice( prefix.length ).trim().split( / +/g );
        const command = client.commands.get( cmd.toLowerCase() ) || client.commands.get( client.aliases.get( cmd.toLowerCase() ) );

        if (!command) return;

        if ( command.nsfw && !message.channel.nsfw ) return message.reply( '**You must run this command in an NSFW channel.**' );
		// if ( message.guild && message.guild.disabledCommands.includes( cmd ) ) return message.reply('**This command is disabled in this guild.');
		// if ( !command.allowDMs && !message.guild ) return message.reply( '**This command cannot be used in DMs.**' );
		if ( command.ownerOnly && client.config.owner.id !== message.author.id ) return message.reply( '**This command can only be used by the owner of this bot.**' );
		if ( command.args && !args.length ) return message.reply(`You must use the command correctly: ${command.usage}`);
		
		command.setMessage(message);
		command.run(message,args);
		
	}
}
module.exports = messageCreate;
