const Event = require('../../structs/Event');

class messageCreate extends Event {
	constructor(client) {
        super(client);
    }

	async run(message) {
		const client = this.client;
		if (message.author.bot) return;

		// Collecting information from the database
		const data = {};
		data.user =  await this.client.database.getUser(message.author.id); 
		if (message.guild) {
			data.guild =  await this.client.database.getGuild(message.guild.id);
			data.member =  await this.client.database.getMember(message.author.id, message.guild.id); 
			if (data.guild.plugins.education.enabled) {
				data.student =  await this.client.database.getStudent(message.author.id, message.guild.id);
			}
		}
		
		// Retrieving the prefix of the guild/DM
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

		// Responds to a prefix mention
		if (message.content.match(new RegExp(`^<@!?${client.user.id}> ?$`))) {
			if (message.guild) return message.reply(`My prefix on this guild is \`${data.guild.prefix}\``);
			return message.reply(`My global prefix is \`${client.config.prefix}\``);
		}
		
		if (!prefix) return; // Returns if message doesn't start with a prefix

		// Trims the message into a potential command and arguments
		const [ cmd, ...args ] = message.content.slice( prefix.length ).trim().split( / +/g );
        const command = client.commands.get( cmd.toLowerCase() ) || client.commands.get( client.commands.aliases.get( cmd.toLowerCase() ) );

        if (!command) return; // Returns if the requested command wasn't found
		
		// Returns if the following requirements weren't met
        if (command.nsfw && !message.channel.nsfw) return message.reply( '**You must run this command in an NSFW channel.**' );
		if ( command.education && !message.guild ) return message.reply(`You can't use an education command in DMs.`);
		if ( !command.guildOnly && !message.guild ) return message.reply( '**This command can only be used in guilds.**' );
		if (command.ownerOnly && this.client.config.owner.id !== message.author.id) return message.reply('**This command can only be used by the owner of this bot.**');
		if ( command.args && !args.length ) return message.reply(`You must use the command correctly: \`${command.usage}\``);
		if ( command.education && !data.guild.education ) return message.reply(`This guild doesn't have the education module enabled.`);
		

		// Logs the command usage to the console and the database
		this.client.logger.command(message.author.tag, message.content, message.guild.name)
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
		
		// Runs the command
		command.setMessage(message);
		if (command.requireData) {
			command.run(message,args,data);
		} else {
			command.run(message,args);
		}
		
	}
}
module.exports = messageCreate;
