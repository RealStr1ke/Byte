// Modules
const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require('./discord-akairo/src/index');
const { Intents } = require('discord.js');
const google = require('google-it');

const config = require('./src/config');
const logger = require("./lib/classes/Logger.js");
require('dotenv').config();

class ByteClient extends AkairoClient {
    constructor() {
        super({
            ownerID: config.owners
        }, 
        {
            // fetchAllMembers: true,
            // allowedMentions: {
            //     repliedUser: true
            // },
            // partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
            intents: 32767
        });
        this.commandHandler = new CommandHandler(this, {
          directory: './commands/',
          prefix: '?',
          // ignoreCooldown: [],
          // blockBots: true,
          // allowMention: true,
          // handleEdits: true,
          // commandUtil: true
        });
        this.inhibitorHandler = new InhibitorHandler(this, {
          directory: './src/inhibitors/'
        });
        this.listenerHandler = new ListenerHandler(this, {
          directory: './src/listeners/'
        });
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            inhibitorHandler: this.inhibitorHandler,
            listenerHandler: this.listenerHandler
        });
        // this.commandHandler.useListenerHandler(this.listenerHandler);
        // this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        
        this.inhibitorHandler.loadAll();  
        this.listenerHandler.loadAll();
        this.commandHandler.loadAll();
        
    }
    async search(query, results) {
        return await google({ 'query': query, 'no-display': true, 'limit': results });
    }
    toggleCase(str) {
        if (str.length !== 1) return str;
        if (str.match(/^[A-z]$/)) {
            if (str.toUpperCase() === str) {
                return str.toLowerCase();
            } else {
                return str.toUpperCase();
            }
        }
        return str;
    }
    
}

const client = new ByteClient();
client.login(config.token);
