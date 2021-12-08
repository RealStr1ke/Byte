// Modules
const { MessageEmbed, Util, Client, Collection, Intents } = require('discord.js');
const { DiscordConsoleLogger } = require('discord-console-logger')
const { GiveawaysManager } = require("discord-giveaways");
const { Client: Joker } = require("blague.xyz");
const Hypixel = require('hypixel-api-reborn');
const { Player } = require("discord-player");
const Flipnote = require('alexflipnote.js');
const beautify = require('js-beautify').js;
const google = require('google-it');
const ball = require("8ball.js");
const WebSocket = require('ws');
// const chalk = require('chalk');
const path = require('path');
const glob = require('glob');

const util = require("util"),
	fs = require("fs"),
	readdir = util.promisify(fs.readdir);
const { readdirSync } = require('fs');

// Classes and Structures
const Logger = require('../classes/Logger');
const Cli = require('../classes/Cli');
const Command = require("./Command.js"),
	Event = require("./Event.js");

// const CommandHandler = require('./lib/handlers/CommandHandler');
// const ListenerHandler = require('./lib/handlers/ListenerHandler');
// const SlashHandler = require('./lib/handlers/SlashHandler');
// const InhibitorHandler = require('./lib/handlers/InhibitorHandler');

const config = require('../../src/config');

class Byte extends Client {
	constructor() {
		super({
			allowedMentions: {
				parse: ["users"]
            },
            intents: config.intents,
            partials: config.partials
		});
		this.config = config;
		
		this.commands = new Collection();
		this.aliases = new Collection();
		this.slash = new Collection();

		this.wait = util.promisify(setTimeout);
		this.logger = new Logger;

		this.discordconsole = new DiscordConsoleLogger({ 
			// Full Discord Webhook URL with ID and Token (required)
			hookURL: this.config.webhook.console,
			// Icon to Show in the embed footer (optional)
			iconURL: this.config.embed.icon, 
			// Footer Text to show on the embed (optional)
			footer: this.config.embed.footer, 
			// Sets if you want discord-console-logger to log to the console as well as your Discord Webhook (optional: default false)
			console: true, 
			// Error Handler (optional)
		    errorHandler: err => {
			    this.logger.error(`[DISCORD CONSOLE LOGGER] ${err}`); 
			}
		});
		
		if(this.config.apiKeys.blagueXYZ){
			this.joker = new Joker(this.config.apiKeys.blagueXYZ, {
				defaultLanguage: "en"
			});
		}
		if(this.config.apiKeys.hypixelAPI){
			const hypixel = new Hypixel.Client(this.config.apiKeys.hypixelAPI);
		}
		console.log(`Client initialised —— Node ${process.version}.`)
	};
	
	async login(token) {
        await super.login(token);
        // client.Cli.start()
    };
	
	async startCLI() {
		this.logger.log('Client starting in 5 seconds..')
		sleep(2000)
		this.logger.log('3 seconds..')
		sleep(1000)
		this.logger.log('2 seconds..')
		sleep(1000)
		this.logger.log('1 seconds..')
		sleep(1000)
		this.logger.log('Client starting..')
		this.Cli.start();
	};
	
    async search(query, results) {
            return await google({ 'query': query, 'no-display': true, 'limit': results });
    };
	
	generateInvite() {
		return super.generateInvite({
			permisions: this.config.permissions,
			scopes: this.config.scopes
		});
	};
	
	sleep (time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	};
	
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
    };
	
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
    };
	
	get directory() {
        return `${path.dirname(require.main.filename)}${path.sep}`;
    };
	
	getFiles(dir, ext) {
		// console.log(`${this.directory}${dir}/**/*${ext}`);
		return glob.sync(`${this.directory}${dir}/**/*${ext}`);
	};
	
	async loadEvents() {
		const eventFiles = this.getFiles('src/listeners', `.js`);
		eventFiles.forEach(async (file) => {
			const eventN = (file.split(".")[0]).split('/');
			const eventName = eventN[eventN.length-1];
			this.logger.log(`Loading Event: ${eventName}`);
			const event = new (require(`${file}`))(this);
			this.on(eventName, (...args) => event.run(...args));
			delete require.cache[require.resolve(`${file}`)];
		});
	};
	
	async loadCommands() {
		const cmdFiles = await this.getFiles('src/commands', '.js');
		for (const command of cmdFiles) {
			delete require.cache[command];
            const file = new (require( path.resolve(command)))(this);
			if(!(file instanceof Command)) return;
			this.logger.log(`Loading Command: ${file.name}`);
            this.commands.set( file.name, file);
            if (file.aliases && Array.isArray(file.aliases))
                file.aliases.forEach((alias) => this.aliases.set(alias, file.name));
        }
	};
	
	async login() {
		if (!this.config.token) {
			throw new Error("You must pass the token for your bot.")
		}
		super.login(this.config.token);
	};
	
	async start() {
		this.loadCommands();
		this.loadEvents();
		this.login();
	};
}
module.exports = Byte;