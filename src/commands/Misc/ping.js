const Command = require( "../../../lib/structs/Command" );
const { MessageEmbed } = require('discord.js');
class PingCommand extends Command {

    constructor(client) {
        super(client, {
            name        : "ping",
            description : "Shows the bot's connection status to the Discord API.",
            usage       : "ping",
            args        : false,
            category    : "General",
            cooldown    : 5000,
            aliases     : ["ping"],
            permLevel   : 0,
            userPerms   : "SEND_MESSAGES",
            allowDMs    : true,
        });
    }

    async run(message) {
		const sent = await message.reply('Pinging...');
		const timeDiff = (sent.editedAt || sent.createdAt) - (message.editedAt || message.createdAt);
		const embed = new MessageEmbed()
            .setThumbnail(this.client.avatar)
    	    .setTitle(`${this.client.user.username} Ping`)
	        .setDescription([
	            `🔂 **RTT**: ${timeDiff} ms`,
	            `💟 **Heartbeat**: ${Math.round(this.client.ws.ping)} ms`
	        ].join('\n'))
	        .setColor(this.client.color)
	        .setFooter(`Requested by ${message.author.username}`)
	        .setTimestamp();
		
		sent.edit('**Pinged!**')
		sent.edit({
			embeds: [embed]
		});
    }
}

module.exports = PingCommand;