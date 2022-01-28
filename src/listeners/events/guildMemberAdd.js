const Event = require('../../structs/templates/Event');

class guildMemberAdd extends Event {
	constructor(client) {
		super(client);
	}

	async run(member) {
		await this.client.database.getMember(member.id, member.guild.id);
		await this.client.database.getUser(member.id);
		await this.client.database.getGuild(member.guild.id);
	}
}
module.exports = guildMemberAdd;

