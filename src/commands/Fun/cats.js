const { Command } = require('../../../discord-akairo/src/index');
const { MessageEmbed } = require('discord.js');

class CatCommand extends Command {
    constructor() {
        super('cats', {
           aliases: ['cats', 'cat'],
            category: 'Fun',
            description: {
                content: 'Responds with a cat picture.',
                extended: 'Responds with a random picture of a cat.'
            },
        });
    }
    
    async exec(message) {
        let link = await (this.client.flipnote).image.cats();
		const cat = new MessageEmbed()
			.setTitle('**Here is your cat picture:**')
			.setImage(link.file)
			.setFooter(`Requested by ${message.author.tag}`)
        return message.channel.send({embeds: [ cat ]});
    }
}

module.exports = CatCommand;
