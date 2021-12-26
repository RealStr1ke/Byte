const Command = require("../../structs/Command");
const Discord = require('discord.js');
const { inspect } = require('util');
const path = require("path");

class EvalCommand extends Command {

    constructor(client) {
        super(client, {
            name        : "eval",
            description : "Executes arbituary JavaScript code.",
            usage       : "eval <code>",
            args        : true,
            aliases     : ['code'],
			directory   : __dirname,
            userPerms   : "SEND_MESSAGES",
            ownerOnly   : true,
        });
    }

    async run(message, args) {
        let txt = args.join(" ")
		if(!txt) return message.channel.send("Please specify something to Evaluate")                                                                                           
		try {
		    const evaled = eval(txt);
			let ff = inspect(evaled, { depth: 0});
		    if (String(ff).length > 2000) ff = "Output is too long";
			const result = new Discord.MessageEmbed()
		        .setTitle('JavaScript')
		        .setTimestamp()
		        .addField(`Input`, `\`\`\`${txt}}\`\`\``)
		        .addField(`Output`, `\`\`\`js\n${ff}\`\`\``)
		        .setColor(this.client.config.embed.color)
				.setFooter(this.client.config.embed.footer);
		    message.channel.send({
		        embeds: [result]
		    });
		} catch (err) {
		    let error = new Discord.MessageEmbed()
			    .setTitle('Evaluation Error!')
			    .addField("❌| Error",`${err}`)
		        .setTimestamp()
		        .setColor(this.client.config.embed.color)
				.setFooter(this.client.config.embed.footer);
		    message.channel.send({
				embeds: [error]
			});
		}
    }
}

module.exports = EvalCommand;