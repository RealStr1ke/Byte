const { Command } = require('../../../discord-akairo/src/index');

class ShutdownCommand extends Command {
    constructor() {
        super('shutdown', {
           aliases: ['shutdown', 'stop', 'quit'],
            category: 'Owner',
            ownerOnly: true,
            description: {
                content: 'Shuts down the bot.',
                extended: 'Logs out of the bot and shuts down the process.',
            }, 
        });
    }
    
    async exec(message) {
        message.reply(`**Shutting down.**`);
		await this.client.sleep(1000);
        await this.client.destroy();
        
    }
}

module.exports = ShutdownCommand;


