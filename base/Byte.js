// Modules
const { MessageEmbed, Util, Client, Collection, Intents } = require('discord.js');
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
const util = require('util');
const path = require('path');

// Configs and Classes
const Logger = require('../lib/Logger');
const Cli = require('../lib/classes/Cli');
const SlashHandler = require('../src/handlers/SlashHandler');
const config = require('../src/config')

class Byte extends Client {
	constructor() {
		super({
			// ownerID: this.client.config.owner.discord.id,
			allowedMentions: {
				parse: ["users"]
            },
            intents: config.intents,
            partials: config.partials
		});
		this.config = config;
		this.commands = new Collection();
		this.aliases = new Collection();
		this.wait = util.promisify(setTimeout);
		this.logger = new Logger;
		
		if(this.config.apiKeys.blagueXYZ){
			this.joker = new Joker(this.config.apiKeys.blagueXYZ, {
				defaultLanguage: "en"
			});
		}
		if(this.config.apiKeys.hypixelAPI){
			const hypixel = new Hypixel.Client(this.config.apiKeys.hypixelAPI);
		}
	}
	// This function is used to load a command and add it to the collection
	loadCommand (commandPath, commandName) {
		try {
			const props = new (require(`.${commandPath}${path.sep}${commandName}`))(this);
			this.logger.log(`Loading Command: ${props.help.name}. 👌`, "log");
			props.conf.location = commandPath;
			if (props.init){
				props.init(this);
			}
			this.commands.set(props.help.name, props);
			props.help.aliases.forEach((alias) => {
				this.aliases.set(alias, props.help.name);
			});
			return false;
		} catch (e) {
			return `Unable to load command ${commandName}: ${e}`;
		}
	}

	// This function is used to unload a command (you need to load them again)
	async unloadCommand (commandPath, commandName) {
		let command;
		if(this.commands.has(commandName)) {
			command = this.commands.get(commandName);
		} else if(this.aliases.has(commandName)){
			command = this.commands.get(this.aliases.get(commandName));
		}
		if(!command){
			return `The command \`${commandName}\` doesn't seem to exist, nor is it an alias. Try again!`;
		}
		if(command.shutdown){
			await command.shutdown(this);
		}
		delete require.cache[require.resolve(`.${commandPath}${path.sep}${commandName}.js`)];
		return false;
	}
}
module.exports = Byte;