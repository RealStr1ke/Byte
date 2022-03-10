const Command = require('../../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const path = require('path');
const axios = require('axios');

class GitHubCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'github',
			description : 'Gives information about the given GitHub repository',
			usage       : 'github <repo>',
			args        : true,
			aliases     : ['gh'],
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
		});
	}

	async run(message, args) {
		const repo = args[0];
		if (!repo.includes('/', 1)) {
			return message.reply('You must specify a proper repository. **Example:** \`RealStr1ke/Byte\`');
		}
		let res;
		try {
			res = await axios.get(`https://api.github.com/repos/${repo}`);
		} catch (error) {
			this.client.logger.fail(error.message);
			return message.channel.send('**The repository you specified doesn\'t exist.**');
		}
		try {
			const GitHubEmbed = new MessageEmbed()
				.setAuthor(this.client.user.tag, this.client.user.displayAvatarURL({ size: 512, dynamic: true, format: 'png' }))
				.setTitle(`${repo}`)
				.setDescription(`[${repo}](https://github.com/${repo})`)
				.addField('Stars', `${res.data.stargazers_count}`, true)
				.addField('Forks', `${res.data.forks_count}`, true)
				.addField('Programming Language', res.data.language, true)
				.addField('Repository Owner', `[${res.data.owner.login}](${res.data.owner.html_url})`, true)
				.setColor(this.client.config.embed.color)
				.setFooter({
					text: `Requested by ${message.author.tag} • ${this.client.config.embed.footer}`,
					iconURL: this.client.user.displayAvatarURL(),
				})
				.setTimestamp();

			return await message.reply({
				embeds: [GitHubEmbed],
			});
		} catch (error) {
			this.client.logger.fail(error.message);
		}
	}
}

module.exports = GitHubCommand;