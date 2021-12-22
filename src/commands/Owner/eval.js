const Command = require( "../../../lib/structs/Command" );
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
		    // message.reply({ content:`\`\`\`js\n${ff}\`\`\``, allowedMentions: { repliedUser: false } })
			const result = new Discord.MessageEmbed()
		        .setColor(this.client.config.embed.color)
		        .setTitle('Output')
		        .setDescription(`\`\`\`js\n${ff}\`\`\``)
		        .setTimestamp()
				.setFooter(this.client.config.embed.footer);
		    message.channel.send({
		        embeds: [result]
		    });
		} catch (error) {
		    let errorEmbed = new Discord.MessageEmbed()
			    .setTitle('Evaluation Error!')
			    .setColor("RANDOM")
			    .addField("❌╎ Error",`${error}`)
		    message.channel.send({
				embeds: [errorEmbed]
			});
		}
    }
}

module.exports = EvalCommand;