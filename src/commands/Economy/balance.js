const Command = require("../../structs/Command");
const { MessageEmbed } = require('discord.js');
const path = require("path");

class BalanceCommand extends Command {

    constructor(client) {
        super(client, {
            name        : "balance",
            description : "Responds with the user's balance.",
            usage       : "balance <user>",
            args        : false,
			directory   : __dirname,
            aliases     : ["bal"],
            userPerms   : "SEND_MESSAGES",
            ownerOnly   : false,
        });
    }

    async run(message) {
		let link = await (this.client.flipnote).image.cats();
		const cat = new MessageEmbed()
			.setTitle('**Here is your cat picture:**')
			.setImage(link.file)
			.setFooter(`Requested by ${message.author.tag}`)
        return message.channel.send({embeds: [ cat ]});
		// message.channel.send(`Your wallet bal is ${profileData.coins}, you banks bal is ${profileData.bank}`);
    }
}

module.exports = BalanceCommand;