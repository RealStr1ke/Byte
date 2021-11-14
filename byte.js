const { AkairoClient, CommandHandler } = require('./discord-akairo/src/index');
const { Intents } = require('discord.js');
const { owners, intents, partials, token } = require('./config.js');
class MyClient extends AkairoClient {
    constructor() {
        super({
            ownerID: owners
        }, 
        {
            disableMentions: 'everyone',
            intents: intents
        }
    );
    this.commandHandler = new CommandHandler(this, {
      directory: './commands/',
      prefix: '?'
    });
    this.commandHandler.loadAll();
    }
}

const client = new MyClient();
client.login('ODk1NzQxMDg2MDk2NTYwMTQ5.YV895A.iOYycgeihAmnU87qIUWahBdWW1Y');