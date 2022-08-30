const Command = require('../../../structs/templates/Command');
const Discord = require('discord.js');
const path = require('path');

class ExecCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'exec',
			description : 'Executes a terminal command.',
			usage       : 'exec',
			args        : true,
			directory   : __dirname,
			aliases     : ['bash', 'cmd'],
			userPerms   : 'SendMessages',
			ownerOnly   : true,
		});
	}

	async run(message, args) {
		const { exec } = require('child_process');
		const lola = args.join(' ');
		if (!lola) return message.channel.send('Please provide what to execute in the terminal!');
		if (lola.match('bash')) return message.channel.send('`**This command is disabled.`');
		exec(`${lola}`, (error, stdout) => {
			const response = (error || stdout);
			if (error) {
				const err = new Discord.EmbedBuilder()
					.setTitle('Terminal')
					.addField('Input', `\`\`\`
                    ${lola}\`\`\``)
					.addField('Error', `\`\`\`kt\n${error.message}\`\`\``)
					.setTimestamp()
					.setDefault(this.client)
					.setColor('RED');
				message.channel.send({
					embeds: [err],
				});
				this.client.logger.fail(error.message);
			} else {
				const result = new Discord.EmbedBuilder()
					.setTitle('Terminal')
					.addField('Input', `\`\`\`${lola}\`\`\``)
					.addField('Output', `\`\`\`kt\n${response}\`\`\``)
					.setDefault(this.client);
				message.channel.send({
					embeds: [result],
				});
			}
		});
	}
}

module.exports = ExecCommand;