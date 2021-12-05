module.exports = class {

	constructor (client) {
		this.client = client;
	}

	async run(message){
		if(message.author.bot) return;
        // if(message.content.startsWith(this.client.prefix)) return this.client.log.log(`${message.author.tag} ran the command ${message.content}`);
		const prefixMention = new RegExp(`^<@!?${this.client.user.id}> ?$`);
		if (message.content.match(prefixMention)) {
			message.reply(`My prefix on this guild is \`${this.client.config.prefix}\``);
		}
        return this.client.logger.log(`${message.guild.name} | #${message.channel.name} | ${message.author.tag}: ${message.content}`);

	}
};  
