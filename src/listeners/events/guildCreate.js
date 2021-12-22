const Event = require('../../../lib/structs/Event');
const Member = require('../../../lib/models/Member');
const User = require('../../../lib/models/User');

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
