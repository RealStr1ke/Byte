const Command = require( "../../../lib/structs/Command" );
const Discord = require('discord.js');

class ExecCommand extends Command {

    constructor(client) {
        super(client, {
            name        : "exec",
            description : "Executes a terminal command.",
            usage       : "exec",
            args        : true,
            category    : "Owner",
            aliases     : ["bash", "cmd"],
            userPerms   : "SEND_MESSAGES",
            ownerOnly   : true,
        });
    }

    async run(message, args) {
        const { exec } = require("child_process")
        let lola = args.join(" ")
        if (!lola) return message.channel.send("Please provide what to execute in the terminal!")
		if(lola.match('bash')) return message.channel.send('`**This command is disabled.`');
        exec(`${lola}`, (error, stdout) => {
            let response = (error || stdout)
            if (error) {
                const err = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('Terminal')
                    .setDescription(`\`\`\`kt
${error.message}\`\`\``)
                    .setTimestamp();
                message.channel.send({
                    embeds: [err]
                })
            } else {
                const result = new Discord.MessageEmbed()
                    .setColor(this.client.config.embed.color)
                    .setTitle('Terminal')
                    .setDescription(`\`\`\`kt
${response}\`\`\``)
                    .setTimestamp()
					.setFooter(this.client.config.embed.footer);
                message.channel.send({
                    embeds: [result]
                })
            }
        })
    }
}

module.exports = ExecCommand;