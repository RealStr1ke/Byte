const { Listener } = require('../../../discord-akairo/src/index');

module.exports = class GuildCreateListener extends Listener {
    constructor() {
        super('guildCreate', {
            emitter: 'client',
            event: 'guildCreate'
        });
    }

    async exec(guild) {
        this.client.presence.set({
            status: 'online',
            activity: {
                name: `radabot.net | ${this.client.guilds.cache.size} servers`,
                type: 'WATCHING'
            }
        });
        let fetch = await this.client.users.fetch(guild.ownerID);
        let owner = this.client.users.cache.get(fetch.id);
        this.client.log.success(`${this.client.user.username} has been added to the guild ${guild.name}[${guild.id}]`);
    }
};