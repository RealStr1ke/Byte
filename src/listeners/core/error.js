const Event = require('../../structs/Event');
const { MessageEmbed } = require('discord.js');

class error extends Event {
	constructor(client){
        super(client);
    }

	async run(message) {
		this.client.log.fail(error.message);
		let embed = new MessageEmbed()
            .setColor(this.client.color)
            .setTitle('Error')
            .setDescription(`Guild: **${message.guild ? message.guild.name : 'Direct messages'}**\nUser: \`${message.author.tag} (${message.author.id})\`\nCommand: \`${message.content}\`\n\n\`\`\`properties\n${error.stack}\`\`\``)
            .setTimestamp();
		this.client.support.errors.send({
			embeds: embed
		})
		// return message.reply({embeds: embed});
		return message.channel.send(`\`\`\`js\n${error.message}\`\`\``);
	}
}
module.exports = error;
