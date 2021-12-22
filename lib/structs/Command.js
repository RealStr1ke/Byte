const { Permissions } = require( "discord.js" );
const path = require('path');

class Command {
	constructor(client, options = {}) {
        this.client      = client;

		this.name        = options.name        || null;
		this.directory   = options.directory   || false;
		this.aliases     = options.aliases     || [];
		this.description = options.description || "No information specified.";
		this.category    = options.category    || (options.directory ? options.directory.split(path.sep)[parseInt(options.directory.split(path.sep).length-1, 10)] : "Other");
		this.args        = options.args        || false;
		this.usage       = options.usage       || null;
        this.example     = options.example     || [];

		this.userPerms   = new Permissions( options.userPerms || "SEND_MESSAGES" ).freeze();
		this.botPerms    = new Permissions( options.botPerms  || "SEND_MESSAGES" ).freeze();
		this.guildOnly   = options.guildOnly   || false;
		this.ownerOnly   = options.ownerOnly   || false;
		this.nsfw        = options.nsfw        || false;
		this.requireData = options.requireData || false;
	}
	// {
	// 	// const category = (dirname ? dirname.split(path.sep)[parseInt(dirname.split(path.sep).length-1, 10)] : "Other");
	// 	this.client = client;
	// 	this.conf = { enabled, guildOnly, memberPermissions, botPermissions, nsfw, ownerOnly, cooldown};
	// 	this.help = { name, category, aliases };
	// }

	async run() {
		throw new Error( `Command ${this.name} doesn't provide a run method!` );
    }

    setMessage(message) {
        this.message = message;
    }
}

module.exports = Command;