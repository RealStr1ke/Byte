// Submodules
const { Client, Collection, MessageEmbed, Util } = require('discord.js');
// const { GiveawaysManager } = require("discord-giveaways");
const { Player } = require('discord-player');

// Modules
const Stopwatch = require('statman-stopwatch');
const Hypixel = require('hypixel-api-reborn');
const Flipnote = require('alexflipnote.js');
const Amethyste = require('amethyste-api');
const mongoose = require('mongoose');
const path = require('path');
const glob = require('glob');
const util = require('util');

// Helpers
const Functions = require('../helpers/Functions');
const Database = require('../database/Handler');
const Logger = require('../helpers/Logger');
const Cli = require('../helpers/Cli');

// Structures
const Command = require('./Command.js');
const Event = require('./Event.js');

// Config
const config = require('../config');

class Byte extends Client {
	constructor() {
		super({
			allowedMentions: {
				parse: ['users'],
			},
			intents: config.intents,
			partials: config.partials,
		});
		this.config = require('../config');
		this.prefix = this.config.prefix;

		this.commands = new Collection();
		this.commands.aliases = new Collection();
		this.events = new Collection();
		this.slash = new Collection();

		this.wait = util.promisify(setTimeout);
		this.functions = new Functions(this);
		this.Cli = new Cli(this);
		this.logger = new Logger(this);
		this.stopwatch = new Stopwatch();

		// Database
		this.database = new Database(this);
		this.logs = require('../database/models/Log');
		this.guildsData = require('../database/models/Guild');
		this.membersData = require('../database/models/Member');
		this.usersData = require('../database/models/User');
		this.studentsData = require('../database/models/Student');

		// Database Cache
		this.databaseCache = {};
		this.databaseCache.users = new Collection();
		this.databaseCache.guilds = new Collection();
		this.databaseCache.members = new Collection();
		this.databaseCache.usersReminds = new Collection(); // members with active reminds
		this.databaseCache.mutedUsers = new Collection(); // members who are currently muted

		this.support = {};
		this.support.database = this.config.support.logs.database;
		this.support.commands = this.config.support.logs.commands;
		this.support.errors = this.config.support.logs.errors;
		this.support.status = this.config.support.logs.status;

		if (this.config.apiKeys.amethyste) {
			this.AmeAPI = new Amethyste(this.config.apiKeys.amethyste);
		}
		if (this.config.apiKeys.hypixelAPI) {
			this.hypixel = new Hypixel.Client(this.config.apiKeys.hypixelAPI);
		}
		if (this.config.apiKeys.flipnoteAPI) {
			this.flipnote = new Flipnote(this.config.apiKeys.flipnoteAPI);
		}

		// this.giveawaysManager = new GiveawaysManager(this, {
		// 	storage: `./giveaways.json`,
		// 	updateCoundownEvery: 10000,
		// 	default: {
		// 		botsCanWin: false,
		// 		exemptPermissions: [ 'MANAGE_MESSAGES', 'ADMINISTRATOR' ],
		// 		embedColor: this.config.embed.color,
		// 		reaction: '🎉',
		// 	},
		// });
	}

	async init() {
		console.clear();
		if (this.config.debug) {
			this.logger.success(`Client initialised —— Node ${process.version}.`);
		}
	}

	async startCLI() {
		this.Cli.init();
		this.sleep(1000);
		console.clear();
		this.Cli.start();
	}

	get directory() {
		return `${path.dirname(require.main.filename)}${path.sep}`;
	}

	getFiles(dir, ext) {
		// console.log(`${this.directory}${dir}/**/*${ext}`);
		return glob.sync(`${this.directory}${dir}/**/*${ext}`);
	}

	// Event Handler
	async loadEvents() {
		const eventFiles = this.getFiles('src/listeners', '.js');
		eventFiles.forEach(async (file) => {
			const name = ((file.split('.')[0]).split('/'))[(((file.split('.')[0]).split('/'))).length - 1];
			if (this.config.debug) this.logger.log(`Loading Event: ${name}`);
			const event = new (require(file))(this);
			this.events.set(event.name, event);
			if (event.once) {
				this.once(name, (...args) => event.run(...args));
			}
			else {
				this.on(name, (...args) => event.run(...args));
			}
			delete require.cache[require.resolve(`${file}`)];
		});
	}
	// Command Handler
	async loadCommands() {
		const cmdFiles = await this.getFiles('src/commands', '.js');
		if (this.config.debug) console.log(cmdFiles);
		for (const commandPath of cmdFiles) {
			const file = new (require(path.resolve(commandPath)))(this);
			if (!(file instanceof Command)) return;
			this.loadCommand(file.name, commandPath);
		}
	}

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
		}
		catch (error) {
			this.logger.fail(`Command ${commandPath} failed to load`);
			this.logger.fail(error.message);
			return false;
		}
	}

	async unloadCommand(commandName, commandPath) {
		let command;
		if (this.commands.has(commandName)) {
			command = this.commands.get(commandName);
		}
		else if (this.aliases.has(commandName)) {
			command = this.commands.get(this.aliases.get(commandName));
		}
		if (!command) {
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
			mongoose.connection.on('error', console.error.bind(console, 'Database connection error!'));
			mongoose.connection.on('open', () => this.logger.startup('Connected to mongoDB database!'));
			return true;
		}).catch((err) => {
			this.logger.fail('An error occured while connecting to the database.');
			console.log(err);
			return false;
		});
	}

	// This function is used to resolve a user from a string
	async resolveUser(search) {
		let user = null;
		if (!search || typeof search !== 'string') return;
		// Try ID search
		if (search.match(/^<@!?(\d+)>$/)) {
			const id = search.match(/^<@!?(\d+)>$/)[1];
			user = this.users.fetch(id).catch(() => {});
			if (user) return user;
		}
		// Try username search
		if (search.match(/^!?(\w+)#(\d+)$/)) {
			const username = search.match(/^!?(\w+)#(\d+)$/)[0];
			const discriminator = search.match(/^!?(\w+)#(\d+)$/)[1];
			user = this.users.find((u) => u.username === username && u.discriminator === discriminator);
			if (user) return user;
		}
		user = await this.users.fetch(search).catch(() => {});
		return user;
	}

	async resolveMember(search, guild) {
		let member = null;
		if (!search || typeof search !== 'string') return;
		// Try ID search
		if (search.match(/^<@!?(\d+)>$/)) {
			const id = search.match(/^<@!?(\d+)>$/)[1];
			member = await guild.members.fetch(id).catch(() => {});
			if (member) return member;
		}
		// Try username search
		if (search.match(/^!?(\w+)#(\d+)$/)) {
			guild = await guild.fetch();
			member = guild.members.cache.find((m) => m.user.tag === search);
			if (member) return member;
		}
		member = await guild.members.fetch(search).catch(() => {});
		return member;
	}

	async resolveRole(search, guild) {
		let role = null;
		if (!search || typeof search !== 'string') return;
		// Try ID search
		if (search.match(/^<@&!?(\d+)>$/)) {
			const id = search.match(/^<@&!?(\d+)>$/)[1];
			role = guild.roles.cache.get(id);
			if (role) return role;
		}
		// Try name search
		role = guild.roles.cache.find((r) => search === r.name);
		if (role) return role;
		role = guild.roles.cache.get(search);
		return role;
	}

	async login() {
		if (!this.config.token) {
			throw new Error('You must pass the token for your bot.');
		}
		super.login(this.config.token);
	}

	async destroy() {
		this.logger.shutdown('Bot is now shutting down.');
		this.database.closeDatabase();
		super.destroy();
	}

	async start() {
		this.stopwatch.start();
		this.database.loadDatabase();
		this.loadCommands();
		this.loadEvents();
		this.login();
	}
}
module.exports = Byte;