const { Command } = require('../../discord-akairo/src/index');

class PingCommand extends Command {
    constructor() {
        super('ping', {
           aliases: ['ping'] 
        });
    }
    
    exec(message) {
        return message.reply('Pong!');
    }
}

module.exports = PingCommand;