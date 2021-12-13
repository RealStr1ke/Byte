const { Command } = require('../../../discord-akairo/src/index');
const { people } = ["Kyle"];

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
		const config = this.client.config
        const quotes = this.client.config.fun.quotes; 
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        // const people = people;
        // const person = people[Math.floor(Math.random() * people.length)];
        return message.reply(`**"${quote}"** *** - Kyle***`);
    }
}

module.exports = QuoteCommand;


