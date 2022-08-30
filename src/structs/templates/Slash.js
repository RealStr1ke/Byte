const { PermissionOverwrites } = require('discord.js');
const path = require('path');

class Slash {
	constructor(client, options = {}) {
		this.client = client;

		this.name = options.name || null;
		this.directory = options.directory || false;
		this.description = options.description || 'No information specified.';
		this.category = options.category || (options.directory ? options.directory.split(path.sep)[parseInt(options.directory.split(path.sep).length - 1, 10)] : 'Other');
		this.enabled = options.enabled || true;

		this.userPerms = new PermissionOverwrites(options.userPerms || 'SendMessages').freeze();
		this.botPerms = new PermissionOverwrites(options.botPerms || 'SendMessages').freeze();
		this.guildOnly = options.guildOnly || false;
		this.ownerOnly = options.ownerOnly || false;
		this.nsfw = options.nsfw || false;
		this.education = options.education || false;
		this.requireData = options.requireData || false;
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