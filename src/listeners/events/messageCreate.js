const Event = require('../../structs/Event');
const Member = require('../../database/models/Member');
const User = require('../../database/models/User');
const Guild = require('../../database/models/Guild');

class messageCreate extends Event {
	constructor(client) {
        super(client);
    }

	async run(message) {
		const client = this.client;
		if (message.author.bot) return;

		const data = {
			member: await this.client.findOrCreateMember(message.author.id, message.guild.id), 
			user: await this.client.findOrCreateUser(message.author.id), 
			guild: await this.client.findOrCreateGuild(message.guild.id)
		};
		
		let prefix;

		if (message.guild) {
			if (message.content.startsWith(client.config.prefix)) {
				prefix = client.config.prefix;
			} else {
				if (message.content.startsWith(data.guild.prefix)) prefix = data.guild.prefix;
			}
		} else {
			prefix = client.config.prefix;
		}

		if (message.content.match(new RegExp(`^<@!?${client.user.id}> ?$`))) {
			if (message.guild) return message.reply(`My prefix on this guild is \`${data.guild.prefix}\``);
			return message.reply(`My global prefix is \`${client.config.prefix}\``);
		}
		
		if (!prefix) return;

		const [ cmd, ...args ] = message.content.slice( prefix.length ).trim().split( / +/g );
        const command = client.commands.get( cmd.toLowerCase() ) || client.commands.get( client.commands.aliases.get( cmd.toLowerCase() ) );

        if (!command) return;
		
        if (command.nsfw && !message.channel.nsfw) return message.reply( '**You must run this command in an NSFW channel.**' );
		if ( !command.guildOnly && !message.guild ) return message.reply( '**This command can only be used in guilds.**' );
		if (command.ownerOnly && this.client.config.owner.discord.id !== message.author.id) return message.reply('**This command can only be used by the owner of this bot.**');
		if ( command.args && !args.length ) return message.reply(`You must use the command correctly: \`${command.usage}\``);

		this.client.logger.command(message.author.tag, message.content, message.guild.name)
		// this.client.logger.log(`${message.author.tag} ran the command ${message.content}`);
		const log = new this.client.logs({
			commandName: command.name,
			author: { 
				username: message.author.username, 
				discriminator: message.author.discriminator, 
				id: message.author.id
			},
			guild: { 
				name: message.guild ? message.guild.name : "dm", 
				id: message.guild ? message.guild.id : "dm" 
			}
		});
		log.save();
		
		command.setMessage(message);
		if (command.requireData) {
			command.run(message,args,data);
		} else {
			command.run(message,args);
		}
		
	}
}
module.exports = messageCreate;
