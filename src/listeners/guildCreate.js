const Event = require('../structs/templates/Event');

class guildCreate extends Event {
	constructor(client) {
		super(client);
	}

	async run(guild) {
		this.client.logger.guildJoin(guild.name, guild.memberCount, guild.channels.channelCountWithoutThreads);
		await this.client.database.getGuild(guild.id);

	}
}
module.exports = guildCreate;
