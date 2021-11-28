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
        this.commandHandler = new CommandHandler(this, {
            directory: './src/commands/',
            prefix: config.prefix,
            ignoreCooldown: [],
            blockBots: true,
            allowMention: true,
            handleEdits: true,
            commandUtil: true
        });
        this.slashCommands = new Collection();
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

        this.classLoader = [];
        this.clientLoader = [];
        this.prefix = config.prefix;
        this.Util = Util;
        this.log = new Logger;
        this.Cli = new Cli(this);
        this.beautify = beautify
        this.chalk = chalk;
        this.flipnote = new Flipnote(process.env.FLIPNOTE);

        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.inhibitorHandler.loadAll();
        this.listenerHandler.loadAll();
        this.commandHandler.loadAll();
        

        
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
    formatDate(date) {
        let formats = {
            days: {
                0: 'Sunday',
                1: 'Monday',
                2: 'Tuesday',
                3: 'Wednesday',
                4: 'Thursday',
                5: 'Friday',
                6: 'Saturday'
            },
            month: {
                0: 'January',
                1: 'February',
                2: 'March',
                3: 'April',
                4: 'May',
                5: 'June',
                6: 'July',
                7: 'August',
                8: 'September',
                9: 'October',
                10: 'November',
                11: 'December'
            },
            date: {
                1: 'st',
                2: 'nd',
                3: 'rd',
                4: 'th',
                5: 'th',
                6: 'th',
                7: 'th',
                8: 'th',
                9: 'th',
                0: 'th'
            }
        }
        let dayOfWeek = formats.days[date.getDay()];
        let dayOfMonth = date.getDate().toString();
        let month = formats.month[date.getMonth()];
        let formatted = dayOfMonth.substring(2).length > 0 ? formats.date[dayOfMonth.substring(2)] : formats.date[dayOfMonth];
        return `${dayOfWeek} ${dayOfMonth}${formatted} ${month} | ${date.toLocaleTimeString()}`;
    }

    
}

const client = new ByteClient();
client.login(process.env.TOKEN);