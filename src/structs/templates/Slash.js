const Discord = require('discord.js');
const path = require('path');

class Slash {
	constructor(client, options = {}) {
		this.client = client;

		this.name = options.name || null;
		this.directory = options.directory || false;
		this.description = options.description || 'No information specified.';
		this.args = options.args || null;
		this.category = options.category || (options.directory ? options.directory.split(path.sep)[parseInt(options.directory.split(path.sep).length - 1, 10)] : 'Other');
		this.enabled = options.enabled || true;

		// this.userPerms = new Discord.PermissionsBitField(options.userPerms || 'SendMessages').freeze();
		this.botPerms = new Discord.PermissionsBitField(options.botPerms || 'SendMessages').freeze();
		this.guildOnly = options.guildOnly || false;
		this.ownerOnly = options.ownerOnly || false;
		this.nsfw = options.nsfw || false;
		this.education = options.education || false;
		this.requireData = options.requireData || false;
		this.options = options.options || [];

		this.Discord = Discord;
	}

	async run() {
		throw new Error(`Command ${this.name} doesn't provide a run method!`);
	}

	setInteraction(interaction) {
		this.interaction = interaction;
	}

	async command() {
		throw new Error(`Command ${this.name} doesn't provide a prebuilt command!`);
	}
}

module.exports = Slash;