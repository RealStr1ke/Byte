const Event = require('../structs/templates/Event');
const { MessageEmbed } = require('discord.js');

class messageCreate extends Event {
	constructor(client) {
		super(client);
	}

	async run(message) {
		const client = this.client;
		if (message.author.bot || message.system) return;

		// Collecting information from the database
		const data = {};
		data.user = await this.client.database.getUser(message.author.id);
		if (message.guild) {
			data.guild = await this.client.database.getGuild(message.guild.id);
			data.member = await this.client.database.getMember(message.author.id, message.guild.id);
			if (data.guild.plugins.education.enabled) {
				data.student = await this.client.database.getStudent(message.author.id, message.guild.id);
			}
		}

		// Leveling System
		if (message.guild && data.member) {
			let gain = ~~(Math.random() * 10) + 5;
			if (~~(Math.random() * 501) === 500) gain *= 5;
			data.member.exp += gain;

			const level = ~~(0.1 * Math.sqrt(data.member.exp));
			if (data.member.level < level) {
				data.member.level = level;
				data.member.markModified('level');
			}
			data.member.markModified('exp');
			data.member.save();

			data.member = await this.client.database.getMember(message.author.id, message.guild.id);
		}


		// Retrieving the prefix of the guild/DM
		let prefix;
		if (message.guild) {
			if (message.content.startsWith(client.config.prefix)) {
				prefix = this.client.config.prefix;
			} else if (message.content.startsWith(data.guild.prefix)) {prefix = data.guild.prefix;}
		} else {
			prefix = client.config.prefix;
		}

		// Responds to a prefix mention
		if (message.content.match(new RegExp(`^<@!?${client.user.id}> ?$`))) {
			if (message.guild) return message.reply(`My prefix on this guild is \`${data.guild.prefix}\``);
			return message.reply(`My global prefix is \`${client.config.prefix}\``);
		}

		if (!prefix) return; // Returns if message doesn't start with a prefix

		// Trims the message into a potential command and arguments
		const [ cmd, ...args ] = message.content.slice(prefix.length).trim().split(/ +/g);
		const command = this.client.commands.get(cmd.toLowerCase()) || client.commands.get(client.commands.aliases.get(cmd.toLowerCase()));

		if (!command) return; // Returns if the requested command wasn't found

		// Stops the command from executing if an instance is already running
		const instanceExists = command.isInstanceRunning(message.author.id);
		if (instanceExists) {
			const inProgress = new MessageEmbed()
				.setDescription('Command already in progress, please wait for it.');
			return message.reply({
				embeds: [inProgress],
			}).then(reply => {
				setTimeout(() => reply.delete(), 3000);
			});
		}

		// Returns if the following requirements weren't met
		if (message.guild && this.client.config.owner.id !== message.author.id) {
			const userPerms = message.channel.permissionsFor(message.member).missing(command.userPerms);
			if (userPerms.length) return message.reply('**You lack the required privileges to execute this command**');

			const botPerms = message.channel.permissionsFor(this.client.user).missing(command.botPerms);
			if (botPerms.length) return message.reply('**I do not have sufficient rights to execute this command.**');
		}
		if (command.ownerOnly && this.client.config.owner.id !== message.author.id) return message.reply('**This command can only be used by the owner of this bot.**');
		if (command.guildOnly && !message.guild) return message.reply('**This command can only be used in guilds.**');
		if (command.education && !message.guild) return message.reply('**You can\'t use an education command in DMs.**');
		if (command.nsfw && !message.channel.nsfw) return message.reply('**NSFW Commands can only be run in NSFW channels.**');
		if (command.args && !args.length) return message.reply(`**You must use the command correctly: \`${command.usage}\`**`);
		if (command.education && data.guild.education == false) return message.reply('**This guild doesn\'t have the education module enabled.**');
		if (await command.isOnCooldown(message.author.id) && !command.customCool) {
			const time = parseInt(await command.getCooldownTime(message.author.id));
			const CooldownEmbed = command.getCooldownMessage(time);
			return message.channel.send({
				embeds: [CooldownEmbed],
			});
		}

		// Logs the command usage to the database
		const log = new this.client.logs({
			commandName: command.name,
			author: {
				username: message.author.username,
				discriminator: message.author.discriminator,
				id: message.author.id,
			},
			guild: {
				name: message.guild ? message.guild.name : 'DM',
				id: message.guild ? message.guild.id : 'DM',
			},
		});
		log.save();

		// Runs the command
		try {
			message.channel.sendTyping();

			command.setInstance(message.author.id);
			command.setMessage(message);

			if (command.requireData) {
				command.run(message, args, data);
			} else {
				command.run(message, args);
			}
			command.setCooldownTime(message.author.id);
			command.done(message.author.id);
		} catch (error) {
			command.done(message.author.id);
			message.channel.send('**This command was not able to execute properly. Please try again later.**');
			this.client.logger.fail(error.message);
			const ErrorEmbed = new MessageEmbed()
				.setColor(this.client.config.embed.color)
				.setTitle('Error')
				.setDescription(`Guild: **${message.guild ? message.guild.name : 'Direct Messages'}**\nUser: \`${message.author.tag} (${message.author.id})\`\nCommand: \`${message.content}\`\n\n\`\`\`properties\n${error.stack}\`\`\``)
				.setTimestamp();
			const ErrorLog = this.client.channels.cache.get(this.client.support.errors);
			ErrorLog.send({
				embeds: [ErrorEmbed],
			});
			if (this.client.config.debug) message.channel.send(`\`\`\`js\n${error.message}\`\`\``);
		}
		// Logs the command usage to the console
		return this.client.logger.command(message.author.tag, message.content, !message.guild ? 'Direct Messages' : message.guild.name);
	}
}
module.exports = messageCreate;
