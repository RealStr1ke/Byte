// Modules
const { MessageEmbed, Util, Client, Collection, Intents } = require('discord.js');
const Stopwatch = require('statman-stopwatch');
const Hypixel = require('hypixel-api-reborn');
const Flipnote = require('alexflipnote.js');
const beautify = require('js-beautify').js;
const mongoose = require('mongoose');
const WebSocket = require('ws');
const path = require('path');
const glob = require('glob');

const util = require("util");
const fs = require("fs");
const readdir = util.promisify(fs.readdir);
const { readdirSync } = require('fs');

// Helpers
const Logger = require('../helpers/Logger');
const Cli = require('../helpers/Cli');
const Functions = require('../helpers/Functions');

// Structures
const Command = require("./Command.js");
const Event = require("./Event.js");

const config = require('../config');

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
		this.commands.aliases = new Collection();
		this.events = new Collection();
		this.slash = new Collection();

		this.wait = util.promisify(setTimeout);
		this.logger = new Logger;
		this.Functions = new Functions(this);
		
		this.Stopwatch = Stopwatch;
		this.sw = new Stopwatch();

		this.logs = require("../database/models/Log");
		this.guildsData = require("../database/models/Guild"); 
		this.membersData = require("../database/models/Member"); 
		this.usersData = require("../database/models/User"); 
		this.studentsData = require("../database/models/Student"); 

		this.databaseCache = {};
		this.databaseCache.users = new Collection();
		this.databaseCache.guilds = new Collection();
		this.databaseCache.members = new Collection();

		this.databaseCache.usersReminds = new Collection(); // members with active reminds
		this.databaseCache.mutedUsers = new Collection(); // members who are currently muted
		
		if (this.config.debug) this.logger.log(`Current Directory: ${this.directory}`);

		this.hypixel = new Hypixel.Client(this.config.apiKeys.hypixelAPI);
		this.flipnote = new Flipnote(this.config.apiKeys.flipnoteAPI)

		if(this.config.webhook.console){
			this.discordconsole = new DiscordConsoleLogger({ 
				hookURL: this.config.webhook.console,
				iconURL: this.config.embed.icon, 
				footer: this.config.embed.footer, 
				console: true, 
			    errorHandler: err => {
				    this.logger.fail(`[DISCORD CONSOLE LOGGER] ${err}`); 
				}
			});
		}

		console.clear();
		if (this.config.debug) this.logger.success(`Client initialised —— Node ${process.version}.`);
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
		this.logger.log(`Client starting..`)
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
	
	sleep(secs) {
		return new Promise((resolve) => setTimeout(resolve, secs * 1000));
	};
	
	get directory() {
        return `${path.dirname(require.main.filename)}${path.sep}`;
    };
	
	getFiles(dir, ext) {
		// console.log(`${this.directory}${dir}/**/*${ext}`);
		return glob.sync(`${this.directory}${dir}/**/*${ext}`);
	};
	
	// Event Handler
	async loadEvents() {
		const eventFiles = this.getFiles('src/listeners', `.js`);
		eventFiles.forEach(async (file) => {
			const name = ((file.split(".")[0]).split('/'))[(((file.split(".")[0]).split('/'))).length-1];
			if (this.config.debug) this.logger.log(`Loading Event: ${name}`);
			const event = new (require(file))(this);
			this.events.set(event.name, event)
			if (event.once) {
				this.once(name, (...args) => event.run(...args));
			} else {
				this.on(name, (...args) => event.run(...args));
			}
			delete require.cache[require.resolve(`${file}`)];
		});
	};
	// Command Handler
	async loadCommands() {
		const cmdFiles = await this.getFiles('src/commands', '.js');
		if (this.config.debug) console.log(cmdFiles);
		for (const commandPath of cmdFiles) {
			const file = new (require(path.resolve(commandPath)))(this);
			if(!(file instanceof Command)) return;
			this.loadCommand(file.name, commandPath);
        }
	};

	async loadCommand(commandName, commandPath) {
		try {
			if (this.config.debug) {
				console.log(commandPath);
				console.log(path.parse(commandPath));
			}
			const file = new (require(path.resolve(commandPath)))(this);
			if (this.config.debug) this.logger.log(`Loading Command: ${file.name}`);
	        this.commands.set(file.name, file);
			if (file.aliases && Array.isArray(file.aliases)) {
				file.aliases.forEach((alias) => this.commands.aliases.set(alias, file.name));
			}
			return true;
		} catch (error) {
			this.logger.fail(`Command ${commandPath} failed to load`);
			this.logger.fail(error.message);
			return false;
		}
	}

	async unloadCommand(commandName, commandPath) {
		let command;
		if(this.commands.has(commandName)) {
			command = this.commands.get(commandName);
		} else if(this.aliases.has(commandName)){
			command = this.commands.get(this.aliases.get(commandName));
		}
		if(!command){
			return `The command \`${commandName}\` doesn't seem to exist, nor is it an alias. Try again!`;
		}
		// delete require.cache[require.resolve(`.${commandPath}${path.sep}${commandName}.js`)];
		delete require.cache[require.resolve(commandPath)];
		return true;
	}
	
	// Database Handler
	async loadDatabase() {
		mongoose.connect(this.config.mongodb, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			// useFindAndModify: false
		}).then(() => {
			mongoose.connection.on("error", console.error.bind(console, "Database connection error!"));
			mongoose.connection.on("open", () => this.logger.startup("Connected to mongoDB database!"));	
			return true;
		}).catch((err) => {
			this.logger.fail('An error occured while connecting to the database.');
			console.log(err);
			return false;
		});
	}
	
	async login() {
		if (!this.config.token) {
			throw new Error("You must pass the token for your bot.")
		}
		super.login(this.config.token);
	};

	async destroy() {
		this.logger.shutdown('Bot is now shutting down.');
		mongoose.connection.close();
		super.destroy();
	}
	async start() {
		this.sw.start();
		this.loadDatabase();
		this.loadCommands();
		this.loadEvents();
		this.login();
	};
}
module.exports = Byte;