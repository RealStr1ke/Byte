const { Command } = require('../../../discord-akairo/src/index');

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping'],
            category: 'Miscellaneous',
            description: {
                content: 'The bots connection to discord.',
        		extended: 'Responds with the bot\'s connection status to the Discord API.',
                permissions: ['EMBED_LINKS']
            },
            clientPermissions: ['EMBED_LINKS']
        });
    }

    async exec(message) {
        const sent = await message.util.send('Pinging...');
        const timeDiff = (sent.editedAt || sent.createdAt) - (message.editedAt || message.createdAt);
    	const embed = this.client.util.embed()
            .setThumbnail(this.client.avatar)
    	    .setTitle(`${this.client.user.username} Ping`)
	        .setDescription([
	            `🔂 **RTT**: ${timeDiff} ms`,
	            `💟 **Heartbeat**: ${Math.round(this.client.ws.ping)} ms`
	        ].join('\n'))
	        .setColor(this.client.color)
	        .setFooter(`Requested by ${message.author.username}`)
	        .setTimestamp();
    	message.reply({
            embeds: [embed]
        });
    }
}

module.exports = PingCommand;
