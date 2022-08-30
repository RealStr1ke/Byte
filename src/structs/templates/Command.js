const { PermissionsBitField, Collection, EmbedBuilder } = require('discord.js');
const path = require('path');

class Command {
	constructor(client, options = {}) {
		this.client = client;
		this.options = options;

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

		this.userPerms = new PermissionsBitField(options.userPerms || 'SEND_MESSAGES').freeze();
		this.botPerms = new PermissionsBitField(options.botPerms || 'SEND_MESSAGES').freeze();
		this.guildOnly = options.guildOnly || false;
		this.ownerOnly = options.ownerOnly || false;
		this.nsfw = options.nsfw || false;
		this.education = options.education || false;
		this.requireData = options.requireData || false;

		this.cooldown = (options.cooldown || 2) * 1000;
		this.customCool = options.customCool || false;
		this.localCool = options.localCool ? true : false;
		if (this.localCool) this.cooldowns = new Collection();

		this.exclusive = options.exclusive;
		if (this.exclusive) this.instances = new Collection();
	}

	async run() {
		throw new Error(`Command ${this.name} doesn't provide a run method!`);
	}

	setMessage(message) {
		this.message = message;
	}

	async getCooldownTime(userID) {
		let time;
		if (this.localCool) {
			time = this.cooldowns.get(userID);
		} else {
			const data = await this.client.database.getUser(userID);
			time = data.cooldowns[`${this.name}`];
		}
		// console.log(`Current Time: ${Date.now()}`);
		// console.log(`Last Time Used: ${time}`);
		// console.log(`Time Can Use: ${time + this.cooldown}`);
		return time;
	}

	async setCooldownTime(userID) {
		if (!this.cooldown) return;
		if (this.localCool) {
			this.cooldowns.set(userID, Date.now());
		} else {
			const data = await this.client.database.getUser(userID);
			data.cooldowns[`${this.name}`] = Date.now();
			data.markModified(`cooldowns.${this.name}`);
			await data.save();
		}
	}

	async isOnCooldown(userID) {
		if (!this.cooldown) return false;
		let cooldown;
		if (this.localCool === true) {
			cooldown = this.cooldowns.get(userID);
		} else {
			const data = await this.client.database.getUser(userID);
			cooldown = data.cooldowns[`${this.name}`];
		}
		if (!cooldown) {
			if (this.localCool) {
				this.cooldowns.set(userID, 0);
			} else {
				const data = await this.client.database.getUser(userID);
				data.cooldowns[`${this.name}`] = 0;
				await data.save();
			}
			return false;
		}
		const timeLeft = (cooldown + this.cooldown) - Date.now();
		// console.log('Time Left: %d', timeLeft);
		// console.log(timeLeft > 0);
		return timeLeft > 0;
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
		const HelpEmbed = new EmbedBuilder()
			.setTitle(`${this.name.charAt(0).toUpperCase() + this.name.substring(1)}`)
			.setDescription(`${this.description}`)
			.addField('Usage', `\`${this.client.config.prefix}${this.usage}\``)
			.setTimestamp()
			.setColor(this.client.config.embed.color);
		if (this.examples) embed.addField('Examples', this.examples.map(e => `\`${prefix}${e}\``).join('\n'));
		return HelpEmbed;
	}

	getCooldownMessage(time) {
		// console.log('Time Can Use: %d', time + this.cooldown)
		const timeLeft = Math.round(((time + this.cooldown) - Date.now()) / 1000);
		const CooldownEmbed = new EmbedBuilder()
			.setTitle('You are still on cooldown.')
			.setDescription(`You may use this command again in ${timeLeft > 1 ? `${timeLeft} seconds` : '1 second'}.`)
			.setDefault(this.client);
		return CooldownEmbed;
	}
}

module.exports = Command;