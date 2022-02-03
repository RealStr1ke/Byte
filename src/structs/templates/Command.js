const { Permissions, Collection, MessageEmbed } = require('discord.js');
const path = require('path');

class Command {
	constructor(client, options = {}) {
		this.client = client;

		this.name = options.name || null;
		this.directory = options.directory || false;
		this.aliases = options.aliases || [];
		this.description = options.description || 'No information specified.';
		this.category = options.category || (options.directory ? options.directory.split(path.sep)[parseInt(options.directory.split(path.sep).length - 1, 10)] : 'Other');
		this.args = options.args || false;
		this.argNum = options.argNum || null;
		this.usage = options.usage || null;
		this.example = options.example || [];
		this.enabled = options.enabled || true;

		this.userPerms = new Permissions(options.userPerms || 'SEND_MESSAGES').freeze();
		this.botPerms = new Permissions(options.botPerms || 'SEND_MESSAGES').freeze();
		this.guildOnly = options.guildOnly || false;
		this.ownerOnly = options.ownerOnly || false;
		this.nsfw = options.nsfw || false;
		this.education = options.education || false;
		this.requireData = options.requireData || false;

		this.cooldown = (options.cooldown || 2) * 1000;
		// if (this.cooldown) this.cooldowns = new Collection();

		this.exclusive = options.exclusive;
		if (this.exclusive) this.instances = new Collection();
	}

	async run() {
		throw new Error(`Command ${this.name} doesn't provide a run method!`);
	}

	setMessage(message) {
		this.message = message;
	}

	setCooldown(userID) {
		// Future Reference: This will implement the database instead of in-command Collection-based cooldowns.
	}

	async isOnCooldown(userID) {
		// Future Reference: This will implement the database instead of in-command Collection-based cooldowns.
	}

	setInstance(userID) {
		if (!this.exclusive) return;
		this.instances.set(userID, Date.now());
	}

	isInstanceRunning(userID) {
		if (!this.exclusive || !this.instances) return;
		const instance = this.instances.get(userID);

		if (instance && (Date.now() - instance > 1000 * 60 * 5)) {
			this.done(userID);
			return false;
		}
		return instance;
	}

	done(userID) {
		if (!this.exclusive) return;
		this.instances.delete(userID);
	}

	getHelpMessage() {
		const embed = new MessageEmbed()
			.setTitle(`${this.name.charAt(0).toUpperCase() + this.name.substring(1)}`)
			.setDescription(`${this.description}`)
			.addField('Usage', `\`${this.client.config.prefix}${this.usage}\``)
			.setTimestamp()
			.setColor(this.client.config.embed.color);
		if (this.examples) embed.addField('Examples', this.examples.map(e => `\`${prefix}${e}\``).join('\n'));
		return embed;
	}
}

module.exports = Command;