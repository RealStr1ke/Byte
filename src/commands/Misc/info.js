const { Command } = require('../../../discord-akairo/src/index');

class InfoCommand extends Command {
    constructor() {
        super('info', {
           aliases: ['info', 'inf'] 
        });
    }
    
    exec(message) {
      const infoEmbed = {
	color: 0x0099ff,
	title: 'Bot Info',
	url: 'https://github.com/RealStr1ke/Byte/',
	author: {
		name: 'RealStr1ke',
		icon_url: 'https://cdn.discordapp.com/avatars/411641088944766982/5489f885a60acfa2c50cca1fddd458d5.png?size=1024',
		url: 'https://github.com/RealStr1ke',
	},
	description: `This bot was made with the puspose to cure Str1ke's boredom and help students.`,
	thumbnail: {
		url: 'https://cdn.discordapp.com/avatars/896040118446616636/995c948376a9a5ccd3d7d9f6fcd24ff3.png?size=1024',
	},
	fields: [
		{
			name: 'Repository:',
			value: 'https://github.com/RealStr1ke/Byte',
		}
	],
	timestamp: new Date(),
	footer: {
		text: 'Imagine reading the footer text',
		icon_url: 'https://cdn.discordapp.com/avatars/896040118446616636/995c948376a9a5ccd3d7d9f6fcd24ff3.png?size=1024',
	}
};
        return message.reply(infoEmbed);
    }
}

module.exports = InfoCommand;