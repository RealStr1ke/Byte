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
        const response = await axios.get(`https://aws.random.cat/meow`)
		const CatEmbed = new MessageEmbed()
			.setTitle('**😍 | Awwwww | 😍**')
			.setImage(response.data.file)
			.setFooter(`Requested by ${message.author.tag} • ${this.client.config.embed.footer}`, this.client.user.displayAvatarURL())
        return message.channel.send({
            embeds: [CatEmbed]
        });
    }
}

module.exports = CatCommand;