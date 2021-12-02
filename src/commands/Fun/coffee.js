const { Command } = require('../../../discord-akairo/src/index');
const { MessageEmbed } = require('discord.js');

class CoffeeCommand extends Command {
    constructor() {
        super('coffee', {
           aliases: ['coffee'],
            category: 'Fun',
            description: {
                content: 'Responds with a coffee picture.',
                extended: 'Responds with a random picture of a mug with coffee.'
            },
        });
    }
    
    async exec(message) {
        let link = await (this.client.flipnote).image.coffee();
		const coffee = new MessageEmbed()
			.setTitle('**Here is your coffee picture:**')
			.setImage(link.file)
			.setFooter(`Requested by ${message.author.tag}`)
        return message.channel.send({embeds: [ coffee ]});
    }
}

module.exports = CoffeeCommand;
