const Command = require( "../../../lib/structs/Command" );
const { MessageEmbed } = require('discord.js');
let restarting = false;

class RestartCommand extends Command {

    constructor(client) {
        super(client, {
            name        : "restart",
            description : "Restarts the bot process.",
            usage       : "restart",
            args        : false,
            category    : "Owner",
            aliases     : ["reboot"],
            userPerms   : "SEND_MESSAGES",
            ownerOnly   : true,
        });
    }

    async run(message) {
		if (restarting === true) {
		return;
	}

	let Timer = 5;
	const status = await message.reply(`**Byte is now preparing for restart. Time left: ${Timer} seconds.**`);

	setInterval(() => {
		--Timer;

		if (Timer > 0) {
			if (restarting === true) {
				return;
			}

			status.edit(`**Byte is now preparing for restart. Time left: ${Timer} seconds.**`);
		} else {
			if (restarting === true) {
				return;
			}

			status.edit(`**Byte is now restarting.**`)
				.then(msg => {
					restarting = true;

					this.client.destroy();
				})
				.then(async () => {
					this.client.start();
					status.edit("**Restart complete!**");
					restarting = false;
				});
		}
	}, 1 * 1000);
    }
}

module.exports = RestartCommand;