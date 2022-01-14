const glob = require('glob');
const path = require('path');
const Event = require('../../structs/templates/Event');

class interactionCreate extends Event {
	constructor(client) {
	    super(client, {
			listener: true,
		});
	}

	async run(interaction) {
		const client = this.client;

		console.log(interaction.name);
		// if (!interaction.isCommand()) return;
		if (interaction.user.bot) return;

		// Collecting information from the database
		const data = {};
		data.user = await this.client.database.getUser(interaction.user.id);
		if (interaction.guild) {
			data.guild = await this.client.database.getGuild(interaction.guild.id);
			data.member = await this.client.database.getMember(interaction.user.id, interaction.guild.id);
			if (data.guild.plugins.education.enabled) {
				data.student = await this.client.database.getStudent(interaction.user.id, interaction.guild.id);
			}
		}


        const command = this.client.commands.slash.get(interaction.commandName);
		if (!command) return; // Returns if the requested command wasn't found

		// Returns if the following requirements weren't met
		if (command.nsfw && !interaction.channel.nsfw) return interaction.reply('**You must run this command in an NSFW channel.**');
		if (command.education && !interaction.guild) return interaction.reply('You can\'t use an education command in DMs.');
		if (!command.guildOnly && !interaction.guild) return interaction.reply('**This command can only be used in guilds.**');
		if (command.ownerOnly && this.client.config.owner.id !== interaction.user.id) return interaction.reply('**This command can only be used by the owner of this bot.**');
		if (command.education && !data.guild.education) return interaction.reply('This guild doesn\'t have the education module enabled.');

		// Runs the command
		try {
			command.setInteraction(interaction);
			if (command.requireData) {
				command.run(interaction, data);
			}
			else {
				command.run(interaction);
			}
		}
		catch (error) {
			this.client.logger.fail(error.message);
		}
		// Logs the command usage to the console
		this.client.logger.command(interaction.user.tag, interaction.name, interaction.guild.name);

	}
}
module.exports = interactionCreate;