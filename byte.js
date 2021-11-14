const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require('./discord-akairo/src/index');
const { Intents } = require('discord.js');
const config = require('./config');

require('dotenv').config();

class ByteClient extends AkairoClient {
    constructor() {
        super({
            ownerID: config.owners
        }, 
        {
            disableMentions: 'everyone',
            intents: config.intents
        }
    );
    this.commandHandler = new CommandHandler(this, {
      directory: './commands/',
      prefix: '?'
    });
    this.inhibitorHandler = new InhibitorHandler(this, {
      directory: './inhibitors/'
    });
    this.listenerHandler = new ListenerHandler(this, {
      directory: './listeners/'
    });

    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.loadAll();
    this.commandHandler.loadAll();
    }
}

const client = new ByteClient();
client.login(config.token);