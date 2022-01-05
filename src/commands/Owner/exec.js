const Command = require("../../structs/Command");
const Discord = require('discord.js');
const path = require("path");

class ExecCommand extends Command {

    constructor(client) {
        super(client, {
            name        : "exec",
            description : "Executes a terminal command.",
            usage       : "exec",
            args        : true,
			directory   : __dirname,
            aliases     : ["bash", "cmd"],
            userPerms   : "SEND_MESSAGES",
            ownerOnly   : true,
            requireData : true
        });
    }

    async run(message, args, data) {
        const { exec } = require("child_process")
        let lola = args.join(" ")
        if (!lola) return message.channel.send("Please provide what to execute in the terminal!")
		if(lola.match('bash')) return message.channel.send('`**This command is disabled.`');
        exec(`${lola}`, (error, stdout) => {
            let response = (error || stdout)
            if (error) {
                const err = new Discord.MessageEmbed()
                    .setTitle('Terminal')
                    .addField(`Input`, `\`\`\`
                    ${lola}\`\`\``)
                    .addField(`Error`,`\`\`\`kt\n${error.message}\`\`\``)
                    .setTimestamp()
                    .setColor(this.client.config.embed.color)
					.setFooter(this.client.config.embed.footer);
                message.channel.send({
                    embeds: [err]
                })
                this.client.logger.fail(error.message);
            } else {
                const result = new Discord.MessageEmbed()
                    .setTitle('Terminal')
                    .addField(`Input`, `\`\`\`${lola}\`\`\``)
                    .addField(`Output`, `\`\`\`kt\n${response}\`\`\``)
                    .setTimestamp()
                    .setColor(this.client.config.embed.color)
					.setFooter(this.client.config.embed.footer);
                message.channel.send({
                    embeds: [result]
                })
            }
        })
    }
}

module.exports = ExecCommand;