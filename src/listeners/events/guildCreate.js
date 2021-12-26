const Event = require('../../structs/Event');

class guildCreate extends Event {
	constructor(client) {
        super(client);
    }

	async run(guild) {
		this.client.logger.guildJoin(guild.name, guild.memberCount, guild.channels.channelCountWithoutThreads)
		let guildData = await this.client.findOrCreateGuild(guild.id);
		
	}
}
module.exports = guildCreate;
