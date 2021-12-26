const Command = require("../../structs/Command");
const { MessageEmbed } = require('discord.js');
const path = require("path");
const { default: axios } = require("axios");

class CatCommand extends Command {

    constructor(client) {
        super(client, {
            name        : "cat",
            description : "Responds with a random cat picture.",
            usage       : "cat",
            args        : false,
			directory   : __dirname,
            aliases     : ["cat"],
            userPerms   : "SEND_MESSAGES",
            ownerOnly   : false,
        });
    }

    async run(message) {
		// let link = await (this.client.flipnote).image.cats();
        const response = await axios.get()
		const cat = new MessageEmbed()
			.setTitle('**😍 | Awwwww | 😍**')
			.setImage(link.file)
			.setFooter(`Requested by ${message.author.tag} • ${this.client.config.embed.footer}`, bot.user.displayAvatarURL())
        return message.channel.send({
            embeds: [cat]
        });
    }
}

module.exports = CatCommand;