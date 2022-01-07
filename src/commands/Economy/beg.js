const Command = require("../../structs/Command");
const { MessageEmbed } = require('discord.js');
const path = require("path");

class BegCommand extends Command {

    constructor(client) {
        super(client, {
            name        : "beg",
            description : "Gives you a random number of coins.",
            usage       : "beg",
            args        : false,
			directory   : __dirname,
            userPerms   : "SEND_MESSAGES",
			requireData : true,
            ownerOnly   : true,
        });
    }

    async run(message, args, data) {
		const coins = Math.floor(Math.random() * 500) + 1;
		data.member.wallet += coins;
		data.member.save();
		const balance = new MessageEmbed()
			.setDescription(`**You begged and you recieved ${coins}. *Imagine needed to beg L* **`)
			.setColor(this.client.config.embed.color);
        return await message.channel.send({
			embeds: [balance]
		});
    }
}

module.exports = BegCommand;
