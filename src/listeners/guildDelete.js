const Event = require('../structs/templates/Event');

class guildDelete extends Event {
	constructor(client) {
		super(client);
	}

	async run(guild) {
		this.client.logger.guildLeave(guild.name, guild.memberCount, guild.channels.channelCountWithoutThreads);
		// await this.client.database.deleteGuild(guild.id);
	}
}
module.exports = guildDelete;
