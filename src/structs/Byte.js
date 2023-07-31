// Submodules
const { Client, Collection, Routes, REST } = require('discord.js');
// const { GiveawaysManager } = require('discord-giveaways');
// const { Routes } = require('discord-api-types/v10');
// const { REST } = require('@discordjs/rest');
const { Player } = require('discord-player');

// Modules
const Stopwatch = require('statman-stopwatch');
const Hypixel = require('hypixel-api-reborn');
const Flipnote = require('alexflipnote.js');
const Amethyste = require('amethyste-api');
const simpleGit = require('simple-git');
const Discord = require('discord.js');
// const dlogs = require('discord-logs');
const path = require('path');
const glob = require('glob');
const util = require('util');

// Helpers
const DocsUpdater = require('../modules/helpers/DocsUpdater');
const Database = require('../modules/database/Handler');
const Logger = require('../modules/helpers/Logger');
const Utils = require('../modules/helpers/Utils');
const Cli = require('../modules/helpers/Cli');

// Structures
const Command = require('./templates/Command.js');
const Slash = require('./templates/Slash.js');
const Event = require('./templates/Event.js');

// Config
const constants = require('../modules/constants/constants');
const config = require('../config');

// Running Extenders
require('../modules/helpers/Extenders');

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
		this.commands.data = new Collection();
		this.events = new Collection();
		this.slash = new Collection();

		// this.constants = constants;
		this.git = simpleGit().clean(simpleGit.CleanOptions.FORCE);
		this.DocsUpdater = new DocsUpdater(this);
		this.wait = util.promisify(setTimeout);
		this.stopwatch = new Stopwatch();
		this.logger = new Logger(this);
		this.utils = new Utils(this);
		this.constants = constants;
		this.Cli = new Cli(this);
		this.Discord = Discord;
		this.status = false;

		// Database
		this.database = new Database(this);
		this.logs = require('../modules/database/models/Log');
		this.guildsData = require('../modules/database/models/Guild');
		this.membersData = require('../modules/database/models/Member');
		this.usersData = require('../modules/database/models/User');
		this.studentsData = require('../modules/database/models/Student');

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
		this.support.debug = this.config.support.logs.debug;

		if (this.config.apiKeys.amethyste) this.AmeAPI = new Amethyste(this.config.apiKeys.amethyste);
		if (this.config.apiKeys.hypixelAPI) this.hypixel = new Hypixel.Client(this.config.apiKeys.hypixelAPI);
		if (this.config.apiKeys.flipnoteAPI) this.flipnote = new Flipnote(this.config.apiKeys.flipnoteAPI);

		this.player = new Player(this, {
			leaveOnEmpty: false,
			enableLive: true,
		});
		// this.dlogs = dlogs(this, {
		// 	debug: this.config.debug,
		// });
		// this.giveawaysManager = new GiveawaysManager(this, {
		// 	storage: './src/modules/data/giveaways.json',
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

	getInvite() {
		return super.generateInvite({
			permissions: this.config.permissions,
			scopes: this.config.permissions,
		});
	}

	async startCLI() {
		this.Cli.init();
		this.sleep(1000);
		console.clear();
		this.Cli.start();
	}

	async updateDocs() {
		this.DocsUpdater.update();
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
			if (!(event instanceof Event)) return;
			if (event.once) {
				this.once(name, (...args) => event.run(...args));
			} else {
				this.on(name, (...args) => event.run(...args));
			}
			delete require.cache[require.resolve(`${file}`)];
		});
	}
	// Command Handler
	async loadCommands() {
		const cmdFiles = await this.getFiles('src/commands/commands', '.js');
		// if (this.config.debug) console.log(cmdFiles);
		for (const commandPath of cmdFiles) {
			try {
				const file = new (require(path.resolve(commandPath)))(this);
				if (!(file instanceof Command)) return;
				this.loadCommand(file.name, commandPath);
			} catch (error) {
				this.logger.fail(`Failed to load command ${path.parse(commandPath).base}: ${error.message}`);
			}
		}
	}
	async reloadCommands() {
		const cmdFiles = await this.getFiles('src/commands/commands', '.js');
		// if (this.config.debug) console.log(cmdFiles);
		for (const commandPath of cmdFiles) {
			const file = new (require(path.resolve(commandPath)))(this);
			if (!(file instanceof Command)) return;
			this.unloadCommand(file.name, commandPath);
			this.loadCommand(file.name, commandPath);
		}
	}

	async loadSlashCommands() {
		const cmdFiles = await this.getFiles('src/commands', '.js');
		let commands = [];
		// console.log(cmdFiles);
		// if (this.config.debug) console.log(cmdFiles);
		for (const commandPath of cmdFiles) {
			const file = new (require(path.resolve(commandPath)))(this);

			if (!(file instanceof Slash)) {
				return;
			} else {
				let invalidCommand = false;
				if (!file.name) {
					this.logger.fail(`Failed to load command ${path.parse(commandPath).base}: Missing command name.`);
					invalidCommand = true;
				}
				if (!file.description) {
					this.logger.fail(`Failed to load command ${path.parse(commandPath).base}: Missing command description.`);
					invalidCommand = true;
				}
				if (!file.run) {
					this.logger.fail(`Failed to load command ${path.parse(commandPath).base}: Missing command run function.`);
					invalidCommand = true;
				}

				if (invalidCommand) return;
			}
			try {
				// Log the loading of the command
				// this.logger.log(`Loading Slash Command: ${file.name}`);

				// Form the Slash Command using the data from the file and SlashCommandBuilder
				const slash = new Discord.SlashCommandBuilder();
				slash.setName(file.name);
				slash.setDescription(file.description);
				if (file.options) {
					for (const currentOption of file.options) {
						const option = currentOption;
						let SCOption; // SlashCommand____Option, where ____ is the type of option

						switch (option.type) {
							case 'STRING':
								SCOption = new Discord.SlashCommandStringOption();
								break;
							case 'INTEGER':
								SCOption = new Discord.SlashCommandIntegerOption();
								break;
							case 'BOOLEAN':
								SCOption = new Discord.SlashCommandBooleanOption();
								break;
							case 'USER':
								SCOption = new Discord.SlashCommandUserOption();
								break;
							case 'CHANNEL':
								SCOption = new Discord.SlashCommandChannelOption();
								break;
							case 'ROLE':
								SCOption = new Discord.SlashCommandRoleOption();
								break;
							case 'MENTIONABLE':
								SCOption = new Discord.SlashCommandMentionableOption();
								break;
							case 'NUMBER':
								SCOption = new Discord.SlashCommandNumberOption();
								break;
							default:
								this.logger.fail(`Failed to load command ${path.parse(commandPath).base}: Invalid option type.`);
								return;
						}

						SCOption.setName(option.name);
						SCOption.setDescription(option.description);
						SCOption.setRequired(option.required);

						if (option.choices && (option.type === 'STRING' || option.type === 'INTEGER' || option.type === 'NUMBER')) {
							for (const choice of option.choices) {
								SCOption.addChoice(choice.name, choice.value);
							}
						}
						if (option.min && (option.type === 'INTEGER' || option.type === 'NUMBER')) SCOption.setMin(option.min);
						if (option.max && (option.type === 'INTEGER' || option.type === 'NUMBER')) SCOption.setMax(option.max);
						if (option.autocompletable) SCOption.setAutocomplete(true);

						switch (option.type) {
							case 'STRING':
								slash.addStringOption(SCOption);
								break;
							case 'INTEGER':
								slash.addIntegerOption(SCOption);
								break;
							case 'BOOLEAN':
								slash.addBooleanOption(SCOption);
								break;
							case 'USER':
								slash.addUserOption(SCOption);
								break;
							case 'CHANNEL':
								slash.addChannelOption(SCOption);
								break;
							case 'ROLE':
								slash.addRoleOption(SCOption);
								break;
							case 'MENTIONABLE':
								slash.addMentionableOption(SCOption);
								break;
							case 'NUMBER':
								slash.addNumberOption(SCOption);
								break;
							default:
								this.logger.fail(`Failed to load command ${path.parse(commandPath).base}: Invalid option type.`);
								return;
						}

						// TO-DO: Add support for subcommands
						// slash.addSubcommand(subcommand => {
						// 	subcommand.setName(option.name);
						// 	subcommand.setDescription(option.description);
						// 	if (option.options) {
						// 		for (const suboption of option.options) {
						// 			subcommand.addStringOption(option => {
						// 				option.setName(suboption.name);
						// 				option.setDescription(suboption.description);
						// 				option.setRequired(suboption.required);
						// 			});
						// 		}
						// 	}
						// });

					}
				}

				// console.log(slash.toJSON());

				if (file.guildOnly) {
					slash.setDMPermission(false);
				} else {
					slash.setDMPermission(true);
				}
				// slash.setDefaultMemberPermissions(file.userPerms);

				this.commands.set(file.name, file);
				this.commands.data.set(file.name, slash);

				commands.push(slash);



				// const command = file.command().toJSON();
				// console.log(command);
				// await this.api.applications(this.user.id).commands.post({
				// 	data: command
				// });
			} catch (error) {
				this.logger.fail(`Failed to load command ${path.parse(commandPath).base}: ${error}`);
			}
		}

		commands = commands.map(command => command.toJSON());
		// if (this.config.debug) console.log(`Slash Commands:\n${commands}`);

		const rest = new REST({
			version: '9',
		}).setToken(this.config.token);

		const client = await rest.get('/users/@me');
		await rest.put(
			Routes.applicationCommands(client.id), {
				body: commands,
			},
		);
		// console.log(commands);
		// const application = await rest.get(`/applications/${client.id}/commands`);
		// console.log(application);
		// console.log(client.id);


	}

	// Deprecated due to slash commands
	async loadCommand(commandName, commandPath) {
		try {
			// if (this.config.debug) {
			// 	console.log(commandPath);
			// 	console.log(path.parse(commandPath));
			// }
			const file = new (require(path.resolve(commandPath)))(this);
			if (this.config.debug) this.logger.log(`Loading Command: ${file.name}`);
			this.commands.set(file.name, file);
			if (file.aliases && Array.isArray(file.aliases)) {
				file.aliases.forEach((alias) => this.commands.aliases.set(alias, file.name));
			}
			return true;
		} catch (error) {
			this.logger.fail(`Command ${commandName} failed to load`);
			// this.logger.fail(error.message);
			return false;
		}
	}

	async unloadCommand(commandName, commandPath) {
		let command;
		if (this.commands.has(commandName)) {
			command = this.commands.get(commandName);
		} else if (this.aliases.has(commandName)) {
			command = this.commands.get(this.aliases.get(commandName));
		}
		if (!command) {
			return `The command \`${commandName}\` doesn't seem to exist, nor is it an alias. Try again!`;
		}
		// delete require.cache[require.resolve(`.${commandPath}${path.sep}${commandName}.js`)];
		delete require.cache[require.resolve(commandPath)];
		return true;
	}

	// RESOLVERS
	// Note: They all used to be async-ed.

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

	resolveRole(search, guild) {
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

	resolveChannel(search, guild) {
		let channel = null;
		if (!search || typeof search !== 'string') return;
		// Try ID Search
		if (search.match(/^<#?(\d+)>$/)) {
			const id = search.match(/^<#?(\d+)>$/)[1];
			channel = guild.channels.cache.get(id);
			if (channel) return channel;
		}
		// Try name search
		channel = guild.channels.cache.find((r) => search === r.name);
		if (channel) return channel;
		channel = guild.channels.cache.get(search);
		return channel;
	}

	async login() {
		if (!this.config.token) {
			throw new Error('You must pass the token for your bot.');
		}
		super.login(this.config.token);
	}

	async destroy() {
		this.status = false;
		const ShutDownEmbed = new Discord.EmbedBuilder()
			.setTitle('**Offline**')
			.setColor('Red')
			.setTimestamp();
		const StatusLog = this.channels.cache.get(this.support.status);
		StatusLog.send({
			embeds: [ShutDownEmbed],
		});

		this.logger.shutdown('Bot is now shutting down.');
		await this.utils.sleep(1);

		this.database.closeDatabase();
		super.destroy();
		// await this.utils.sleep(1);
		// await this.utils.sleep(1);
	}

	async start() {
		this.stopwatch.start();
		this.database.loadDatabase();
		// this.loadSlashCommands();
		// this.loadCommands();
		this.loadEvents();
		this.login();
	}
}
module.exports = Byte;