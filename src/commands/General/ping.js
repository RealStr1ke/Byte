const Command = require("../../structs/Command");
const { MessageEmbed } = require('discord.js');
const path = require("path");

class PingCommand extends Command {

    constructor(client) {
        super(client, {
            name        : "ping",
            description : "Shows the bot's connection status to the Discord API.",
            usage       : "ping",
            args        : false,
            aliases     : ["ping"],
			directory   : __dirname,
            userPerms   : "SEND_MESSAGES",
            guildOnly   : true
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