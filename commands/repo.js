const { Command } = require('../discord-akairo/src/index');

class RepoCommand extends Command {
    constructor() {
        super('repo', {
           aliases: ['repo'] 
        });
    }
    
    exec(message) {
        return message.reply('https://github.com/RealStr1ke/Byte');
    }
}

module.exports = RepoCommand;