// Modules
const { MessageEmbed, Util, Client, Collection, Intents } = require('discord.js');
const Hypixel = require('hypixel-api-reborn');
const Flipnote = require('alexflipnote.js');
const beautify = require('js-beautify').js;
const Sequelize = require('sequelize');
const mongoose = require('mongoose');
const WebSocket = require('ws');
const path = require('path');
const glob = require('glob');
const Keyv = require('keyv');

const util = require("util"),
	fs = require("fs"),
	readdir = util.promisify(fs.readdir);
const { readdirSync } = require('fs');

// Classes and Structures
const Logger = require('../classes/Logger');
const Cli = require('../classes/Cli');
const Command = require("./Command.js"),
	Event = require("./Event.js");
const CustomUtil = require('../classes/Util');

const config = require('../../src/config');
const SQLite = require("better-sqlite3");

const Guild = require("../../lib/models/Guild"), 
	User = require("../../lib/models/User"), 
	Member = require("../../lib/models/Member"), 
	Log = require("../../lib/models/Log");

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
		this.Util = CustomUtil;

		this.guildsData = require("../../lib/models/Guild"); 
		this.usersData = require("../../lib/models/User"); 
		this.membersData = require("../../lib/models/Member"); 
		this.logs = require("../../lib/models/Log");

		// this.databaseCache = {};
		// this.databaseCache.users = new Collection();
		// this.databaseCache.guilds = new Collection();
		// this.databaseCache.members = new Collection();

		// this.databaseCache.usersReminds = new Collection(); // members with active reminds
		// this.databaseCache.mutedUsers = new Collection(); // members who are currently muted
		
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
				    this.logger.error(`[DISCORD CONSOLE LOGGER] ${err}`); 
				}
			});
		}
				
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
	
	// Event Handler
	async loadEvents() {
		const eventFiles = this.getFiles('src/listeners', `.js`);
		eventFiles.forEach(async (file) => {
			const name = ((file.split(".")[0]).split('/'))[(((file.split(".")[0]).split('/'))).length-1];
			if (this.config.debug) this.logger.log(`Loading Event: ${name}`);
			const event = new (require(file))(this);
			if (event.ignoreFile) return;
			this.events.set(event.name, event)
			// const event = new (require(`${file}`))(this);
			this.on(name, (...args) => event.run(...args));
			delete require.cache[require.resolve(`${file}`)];
		});
	};
	// Command Handler
	async loadCommands() {
		const cmdFiles = await this.getFiles('src/commands', '.js');
		for (const command of cmdFiles) {
			delete require.cache[command];
            const file = new (require( path.resolve(command)))(this);
			if(!(file instanceof Command)) return;
			if (this.config.debug) this.logger.log(`Loading Command: ${file.name}`);
            this.commands.set(file.name, file);
            if (file.aliases && Array.isArray(file.aliases))
                file.aliases.forEach((alias) => this.commands.aliases.set(alias, file.name));
        }
	};
	// Database Handler
	async loadDatabase() {
		mongoose.connect(this.config.mongodb, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			// useFindAndModify: false
		}).then(() => {
			this.logger.success('Connected to mongoDB database!');
		}).catch((err) => {
			this.logger.fail('An error occured while connecting to the database.');
			console.log(err);
		});
	}

	// Finds or creates a new user in the database
	async findOrCreateUser(userID) {
		let user;
		try {
			user = await User.findOne({
				id: userID
			});
			if (!user) {
				let user = await User.create({ id: userID });
				user.save();
				return user;
			}
			return user;
		} catch (err) {
			console.log(err);
		}
	}

	// Finds or creates a new member in the database
	async findOrCreateMember(userID, guildID) {
		let member;
		try {
			member = await Member.findOne({
				id: userID,
				guildID: guildID
			});
			if (!member) {
				let member = await Member.create({
					id: userID,
					guildID: guildID
				});
				member.save();
				return member;
			}
			return member;
		} catch (err) {
			console.log(err);
		}
	}

	// Finds or creates a new guild in the database
	async findOrCreateGuild(guildID) {
		let guild;
		try {
			guild = await Guild.findOne({
				id: guildID,
			});
			if (!guild) {
				let guild = await Guild.create({
					id: guildID,
				});
				guild.save();
				return guild;
			}
			return guild;
		} catch (err) {
			console.log(err);
		}
	}
	
	async login() {
		if (!this.config.token) {
			throw new Error("You must pass the token for your bot.")
		}
		super.login(this.config.token);
	};
	
	async start() {
		this.loadDatabase();
		this.loadCommands();
		this.loadEvents();
		this.sleep(10000);
		this.login();
	};
}
module.exports = Byte;