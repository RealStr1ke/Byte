// Modules
const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require('./discord-akairo/src/index');
const { Intents, Collection } = require('discord.js');
const google = require('google-it');
const WebSocket = require('ws');
const beautify = require('js-beautify').js;
const Flipnote = require('alexflipnote.js');
const chalk = require('chalk');

// Config and Classes
const config = require('./src/config');
const Cli = require('./lib/classes/Cli');
const Logger = require('./lib/log');
const Util = require('./lib/structures/Util');
const SlashHandler = require('./src/handlers/SlashHandler');
require('dotenv').config();

class ByteClient extends AkairoClient {
    constructor() {
        super({
            ownerID: config.owners
        }, 
        {
            disableMentions: 'everyone',
            fetchAllMembers: false,
            allowedMentions: {
                repliedUser: true
            },
            intents: config.intents,
            partials: config.partials
        });
        this.slashCommands = new Collection();
        this.commandHandler = new CommandHandler(this, {
            directory: './src/commands/',
            prefix: config.prefix,
            ignoreCooldown: [],
            blockBots: true,
            allowMention: true,
            handleEdits: true,
            commandUtil: true
        });
        this.slashHandler = new SlashHandler(this, {
            directory: './src/slash/'
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
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.inhibitorHandler.loadAll();
        this.listenerHandler.loadAll();
        this.commandHandler.loadAll();
        this.classLoader = [];
        this.clientLoader = [];
        this.prefix = config.prefix;
        this.Util = Util;
        this.log = new Logger;
        this.Cli = new Cli(this);
        this.beautify = beautify
        this.chalk = chalk;
        this.flipnote = new Flipnote(process.env.FLIPNOTE);
        

        
    }
    async login(token) {
        await super.login(token);
        // client.Cli.start()
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
client.login(process.env.TOKEN);