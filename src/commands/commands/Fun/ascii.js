const Command = require('../../../structs/templates/Command'),
	figlet = require('figlet'),
	util = require('util'),
	figletAsync = util.promisify(figlet);

class ASCIICommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'ascii',
			description : 'Turns the given text to ASCII text.',
			usage       : 'ascii <text>',
			args        : true,
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
			ownerOnly   : false,
		});
	}

	async run(message, args) {
		const text = args.join(' ');
		if (!text) {
			return message.reply(`You must run the command with the text you want to convert: ${this.usage}`);
		}
		if (text.length > 20) {
			return message.reply('Your message must be under 20 characters.');
		}

		const rendered = await figletAsync(text);
		await message.channel.send('```' + rendered + '```');
	} 
}

module.exports = ASCIICommand;
