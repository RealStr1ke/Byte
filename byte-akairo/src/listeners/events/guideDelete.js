const { Listener } = require('../../../discord-akairo/src/index');

module.exports = class GuildDeleteListener extends Listener {
    constructor() {
        super('guildDelete', {
            emitter: 'client',
            event: 'guildDelete'
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
        this.client.log.success(`${this.client.user.username} has been removed from the guild ${guild.name}[${guild.id}]`); 
    }
};