const { Command } = require('../../../discord-akairo/src/index');

class ReloadCommand extends Command {
    constructor() {
        super('reload', {
            aliases: ['reload'],
            description: {
                content: 'Reloads a singular command or all commands.',
                permissions: []
            },
            args: [{
                id: 'commandID'
            }],
            ownerOnly: true,
            category: 'Management'
        });
    }

    exec(message, args) {
        if (args.commandID === 'all') {
            this.handler.reloadAll(); 
            return message.reply('**Successfully reloaded all commands**')
        }
        this.handler.reload(args.commandID);
        return message.reply(`**Successfully reloaded command** \`${args.commandID}\``);
    }
}

module.exports = ReloadCommand;