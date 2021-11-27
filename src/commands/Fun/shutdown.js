const { Command } = require('../../../discord-akairo/src/index');

class ShutdownCommand extends Command {
    constructor() {
        super('shutdown', {
           aliases: ['shutdown', 'stop', 'quit'] 
        });
    }
    
    async exec(message) {
        message.reply(`**Shutting down.**`);
        await this.client.destroy();
    }
}

module.exports = ShutdownCommand;


