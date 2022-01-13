const Event = require('../../structs/templates/Event');

class guildMemberAdd extends Event {
	constructor(client) {
		super(client);
	}

	async run(member) {
		const memberData = await this.client.findOrCreateMember(member.id, member.guild.id);
		const userData = await this.client.findOrCreateUser(member.id);
		const guildData = await this.client.findOrCreateGuild(member.guild.id);
	}
}
module.exports = guildMemberAdd;

