// Modules
const { MessageEmbed, Util, Client, Collection, Intents } = require('discord.js');
const { DiscordConsoleLogger } = require('discord-console-logger')
const { GiveawaysManager } = require("discord-giveaways");
const { Client: Joker } = require("blague.xyz");
const Hypixel = require('hypixel-api-reborn');
const { Player } = require("discord-player");
const Flipnote = require('alexflipnote.js');
const beautify = require('js-beautify').js;
const Sequelize = require('sequelize');
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
// const Util = require('../classes/Util');

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
		this.prefix = config.prefix;
		
		this.commands = new Collection();
		this.aliases = new Collection();
		this.slash = new Collection();

		this.wait = util.promisify(setTimeout);
		this.logger = new Logger;
		this.flipnote = new Flipnote(this.config.apiKeys.flipnoteAPI);

		// if(!this.config.apiKeys.blagueXYZ){
		// 	this.joker = new Joker(this.config.apiKeys.blagueXYZ, {
		// 		defaultLanguage: "en"
		// 	});
		// 	this.logger.success('BlagueXYZ API Loaded!');
		// }
		if(!this.config.apiKeys.hypixelAPI){
			const hypixel = new Hypixel.Client(this.config.apiKeys.hypixelAPI);
			this.logger.success('Hypixel API Loaded!');
		}
		if(this.config.webhook.console){
			this.discordconsole = new DiscordConsoleLogger({ 
				hookURL: this.config.webhook.console,
				iconURL: this.config.embed.icon, 
				footer: this.config.embed.footer, 
				console: true, 
			    errorHandler: err => {
				    this.logger.error(`[DISCORD CONSOLE LOGGER] ${err}`); 
				}
			});
		}
				
		console.log(`Client initialised —— Node ${process.version}.`);
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