const Command = require( "../../../lib/structs/Command" );
const { MessageEmbed } = require('discord.js');
const axios = require("axios"),
	path = require('path');

class AdviceCommand extends Command {

    constructor(client) {
        super(client, {
            name        : "advice",
            description : "Responds with a random piece of advice.",
            usage       : "advice",
            args        : false,
			directory   : __dirname,
            userPerms   : "SEND_MESSAGES",
            ownerOnly   : false,
        });
    }

    async run(message) {
		axios.get("https://api.adviceslip.com/advice")
			.then(async response => {
				const AdviceEmbed = new MessageEmbed()
					.setTitle("Here's an piece of advice")
					.setDescription(response.data.slip.advice)
					.setFooter(`You got advice #${response.data.slip.id} • ${this.client.config.embed.footer}`, this.client.user.displayAvatarURL())
					.setColor(this.client.config.embed.color)
					.setTimestamp();
	
				await message.reply({
					embeds: [AdviceEmbed]
				});
		}).catch(err => console.error(err));
    }
}

module.exports = AdviceCommand;