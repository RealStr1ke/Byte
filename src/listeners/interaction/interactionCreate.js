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
		if (!interaction.isCommand()) return;
        const command = bot.commands.slash.get(interaction.commandName);
		

	}
}
module.exports = interactionCreate;