const Event = require('../../structs/templates/Event');

class guildCreate extends Event {
	constructor(client) {
		super(client);
	}

	async run(guild) {
		this.client.logger.guildJoin(guild.name, guild.memberCount, guild.channels.channelCountWithoutThreads);
		const guildData = await this.client.database.createGuild(guild.id);

	}
}
module.exports = guildCreate;
