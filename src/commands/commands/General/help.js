const Command = require('../../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const path = require('path');

class HelpCommand extends Command {
	constructor(client) {
		super(client, {
			name        : 'help',
			description : 'Responds with command info.',
			usage       : 'help',
			example     : ['help [command]'],
			args        : false,
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
			botPerms    : ['SEND_MESSAGES', 'EMBED_LINKS'],
		});
	}

	async run(message, args) {
		const HelpEmbed = new MessageEmbed()
			.setTitle(`**${this.client.user.tag}**`)
			.setDescription(`Here are the commands for ${this.client.user.tag}`)
			.setAuthor({
				name: this.client.user.tag,
				iconURL: this.client.user.displayAvatarURL({ size: 512, dynamic: true, format: 'png' }),
			})
			.setFooter({
				text: this.client.config.embed.footer,
				iconURL: this.client.user.displayUse,
			})
			.setTimestamp();

		const categories = [];
		const commands = this.client.commands.filter((command) => command.enabled);

		commands.forEach((command) => {
			if (!categories.includes(command.category)) {
				if (command.category === 'Owner' && message.author.id !== this.client.config.owner.id) return;
				categories.push(command.category);
			}
		});

		categories.sort().forEach((category) => {
			const tCommands = commands.filter((command) => command.category === category);
			HelpEmbed.addField(`${category} (\`${tCommands.size}\`)`, tCommands.map((command) => `\`${command.name}\``).join(", "));
			// embed.addField(`${category}`+" - ("+tCommands.size+")", tCommands.map((cmd) => "`"+cmd.help.name+"`").join(", "));
		});
		return message.channel.send({
			embeds: [HelpEmbed],
		})
		// return message.channel.send(`Categories (Debugging): ${categories.join(', ')}`)
	}
}

module.exports = HelpCommand;