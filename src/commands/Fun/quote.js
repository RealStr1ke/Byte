const { Command } = require('../../discord-akairo/src/index');
const config = require('../../config')

class QuoteCommand extends Command {
    constructor() {
        super('quote', {
           aliases: ['quote', 'q'] 
        });
    }
    
    exec(message) {
        const quotes = config.quotes; 
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        return message.reply(`**"${quote}"** ***- Kyle***`);
        // return message.reply('Pong!');
    }
}

module.exports = QuoteCommand;


