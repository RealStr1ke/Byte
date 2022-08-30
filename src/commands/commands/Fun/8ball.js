const Command = require('../../../structs/templates/Command');
const { EmbedBuilder } = require('discord.js');

class EightBallCommand extends Command {

	constructor(client) {
		super(client, {
			name        : '8ball',
			description : 'Ask the Magic 8-Ball!',
			usage       : '8ball <question>',
			args        : true,
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
		});
	}

	async run(message, args) {
		const question = args.join(' ');
		const answers = this.client.constants;

		const EightBall = new EmbedBuilder()
			.setTitle('🎱 The Magic 8-Ball 🎱')
			.addField('Question', question)
			.addField('Answer', `${answers[Math.floor(Math.random() * answers.length)]}`)
			.setColor(this.client.config.embed.color)
			.setFooter({
				text: this.client.config.embed.footer,
				iconURL: this.client.user.displayAvatarURL(),
			})
			.setTimestamp();

		return message.reply({
			embeds: [EightBall],
		});
	}
}

module.exports = EightBallCommand;
