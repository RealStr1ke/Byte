const Command = require('../../../structs/templates/Command');
const Discord = require('discord.js');
const { inspect } = require('util');
const path = require('path');

class EvalCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'eval',
			description : 'Executes arbituary JavaScript code.',
			usage       : 'eval <code>',
			args        : true,
			aliases     : ['code'],
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
			ownerOnly   : true,
			requireData : true,
		});
	}

	async run(message, args, data) {
		const txt = args.join(' ');
		if (!txt) return message.channel.send('Please specify something to Evaluate');
		try {
			const evaled = eval(txt);
			let ff = inspect(evaled, { depth: 0 });
			if (String(ff).length > 2000) ff = 'Output is too long';
			const result = new Discord.MessageEmbed()
				.setTitle('JavaScript')
				.setTimestamp()
				.addField('Input', `\`\`\`${txt}}\`\`\``)
				.addField('Output', `\`\`\`js\n${ff}\`\`\``)
				.setColor(this.client.config.embed.color)
				.setFooter({
					text: this.client.config.embed.footer,
					iconURL: this.client.user.displayAvatarURL(),
				});
			message.channel.send({
				embeds: [result],
			});
		}
		catch (err) {
			const error = new Discord.MessageEmbed()
				.setTitle('Evaluation Error!')
				.addField('❌| Error', `${err}`)
				.setTimestamp()
				.setColor(this.client.config.embed.color)
				.setFooter({
					text: this.client.config.embed.footer,
					iconURL: this.client.user.displayAvatarURL(),
				});
			this.client.logger.fail(err.message);
			console.log(err);
			return message.channel.send({
				embeds: [error],
			});
		}
	}
}

module.exports = EvalCommand;