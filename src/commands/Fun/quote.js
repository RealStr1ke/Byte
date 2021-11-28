const { Command } = require('../../../discord-akairo/src/index');
const { quotes } = require('../../config')

class QuoteCommand extends Command {
    constructor() {
        super('quote', {
           aliases: ['quote', 'q'],
            category: 'Fun',
            description: {
                content: 'Responds with a quote.',
                extended: 'Responds with one of the quotes set in the configuration.'
            }, 
        });
    }
    
    exec(message) {
        const quotes = quotes; 
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        return message.reply(`**"${quote}"** ***- Kyle***`);
    }
}

module.exports = QuoteCommand;


