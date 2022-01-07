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
			requireData : true,
            ownerOnly   : false,
        });
    }

    async run(message, args, data) {
		const balance = new MessageEmbed()
			.setTitle('**Your Stats:**')
			.addField('**Wallet:**', `\`${data.member.wallet}\``, true)
			.addField('**Bank:**', `\`${data.member.bank}\``, true)
			.setFooter(`Requested by ${message.author.tag}`)
			.setColor(this.client.config.embed.color)
			.setTimestamp();
        return await message.channel.send({
			embeds: [balance]
		});
    }
}

module.exports = BalanceCommand;
