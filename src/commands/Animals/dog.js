const Command = require("../../structs/Command");
const { MessageEmbed } = require('discord.js');
const path = require("path");

class DogCommand extends Command {

    constructor(client) {
        super(client, {
            name        : "dog",
            description : "Responds with a random dog picture.",
            usage       : "dog",
            args        : false,
			directory   : __dirname,
            aliases     : ["dogs"],
            userPerms   : "SEND_MESSAGES",
            ownerOnly   : false,
        });
    }

    async run(message) {
		let link = await (this.client.flipnote).image.cats();
		const cat = new MessageEmbed()
			.setTitle('**Here is your cat picture:**')
			.setImage(link.file)
			.setFooter(`Requested by ${message.author.tag} • ${this.client.config.embed.footer}`, this.client.user.displayAvatarURL());
        return message.channel.send({
            embeds: [cat]
        });
    }
}

module.exports = DogCommand;