const Event = require('../../../lib/structs/Event');
const Member = require('../../../lib/models/Member');
const User = require('../../../lib/models/User');

class guildMemberAdd extends Event {
	constructor(client) {
        super(client);
    }

	async run(member) {
		let memberData = await this.client.findOrCreateMember(member.id, member.guild.id);
		let userData = await this.client.findOrCreateUser(member.id);
		let guildData = await this.client.findOrCreateGuild(member.guild.id);
	}
}
module.exports = guildMemberAdd;
