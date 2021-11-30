const { Command } = require('../../../discord-akairo/src/index');

class FMLCommand extends Command {
    constructor() {
        super('fml', {
           aliases: ['fml', 'fmlq'],
            category: 'Fun',
            description: {
                content: 'Responds with a FML quote.',
                extended: 'Responds with a random "F*** my life" quote.'
            },
        });
    }
    
    async exec(message) {
        let body = await (this.client.flipnote).color('00ffd9');
		console.log(body);
        return message.channel.send(`> ${body}`);
    }
}

module.exports = FMLCommand;
